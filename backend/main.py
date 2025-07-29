# Save this entire file as main.py in your backend directory
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import glob
import boto3
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
import openai
import re
from typing import List, Optional

load_dotenv()

app = FastAPI(title="AI Help Center", description="RAG-powered help center")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize clients
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
openai.api_key = os.getenv("OPENAI_API_KEY")
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION", "us-east-1")
)

# Pinecone index
INDEX_NAME = "help-center"
DIMENSION = 1536  # OpenAI text-embedding-3-small dimension

# Request models
class SearchRequest(BaseModel):
    query: str
    product: Optional[str] = None
    limit: int = 5

class ChatRequest(BaseModel):
    message: str
    product: Optional[str] = None
    conversation_history: List[dict] = []

# Initialize Pinecone index
def init_pinecone():
    try:
        # Check if index exists
        if INDEX_NAME not in [index.name for index in pc.list_indexes()]:
            pc.create_index(
                name=INDEX_NAME,
                dimension=DIMENSION,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1")
            )
            print(f"Created index: {INDEX_NAME}")
        
        return pc.Index(INDEX_NAME)
    except Exception as e:
        print(f"Error initializing Pinecone: {e}")
        return None

# Get embeddings from OpenAI with detailed error handling
def get_embeddings(texts: List[str]) -> List[List[float]]:
    try:
        all_embeddings = []
        batch_size = 20  # Even smaller batches
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            print(f"Processing batch {i//batch_size + 1}/{(len(texts)-1)//batch_size + 1} ({len(batch)} texts)")
            
            # Check for text length issues
            for j, text in enumerate(batch):
                if len(text) > 8000:  # OpenAI limit is ~8192 tokens
                    print(f"Warning: Text {i+j} is {len(text)} characters, truncating...")
                    batch[j] = text[:8000]
            
            try:
                response = openai.embeddings.create(
                    model="text-embedding-3-small",
                    input=batch
                )
                
                batch_embeddings = [item.embedding for item in response.data]
                all_embeddings.extend(batch_embeddings)
                print(f"Batch {i//batch_size + 1} completed successfully")
                
            except Exception as batch_error:
                print(f"Batch {i//batch_size + 1} failed: {batch_error}")
                # Try individual texts if batch fails
                for text in batch:
                    try:
                        single_response = openai.embeddings.create(
                            model="text-embedding-3-small",
                            input=[text[:8000]]  # Truncate to be safe
                        )
                        all_embeddings.extend([single_response.data[0].embedding])
                    except Exception as single_error:
                        print(f"Single text failed: {single_error}")
                        # Add a zero vector as placeholder
                        all_embeddings.append([0.0] * 1536)
            
            # Delay between batches
            import time
            time.sleep(1)
        
        print(f"Total embeddings generated: {len(all_embeddings)}")
        return all_embeddings
        
    except Exception as e:
        print(f"Critical error in get_embeddings: {e}")
        print(f"Error type: {type(e).__name__}")
        return []

# Generate S3 URL for images
def get_image_url(image_filename: str, product: str) -> str:
    try:
        return s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': os.getenv('S3_BUCKET'),
                'Key': f'{product}/{image_filename}'
            },
            ExpiresIn=3600  # 1 hour
        )
    except Exception as e:
        print(f"Error generating image URL: {e}")
        return ""

# Process markdown content and replace image references
def process_content_images(content: str, product: str) -> str:
    # Find image references in markdown: ![alt](filename)
    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    
    def replace_image(match):
        alt_text = match.group(1)
        filename = match.group(2)
        # Generate signed URL
        image_url = get_image_url(filename, product)
        if image_url:
            return f'![{alt_text}]({image_url})'
        return match.group(0)  # Return original if URL generation fails
    
    return re.sub(image_pattern, replace_image, content)

# Load articles from markdown files
def load_articles():
    articles = []
    products = ['radix', 'rediq']
    
    for product in products:
        article_path = f"../data/{product}/articles/*.md"
        files = glob.glob(article_path)
        
        for file_path in files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract title (first # heading or filename)
                title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                title = title_match.group(1) if title_match else os.path.basename(file_path).replace('.md', '')
                
                articles.append({
                    'id': f"{product}_{os.path.basename(file_path)}",
                    'title': title,
                    'content': content,
                    'product': product,
                    'file_path': file_path
                })
            except Exception as e:
                print(f"Error loading {file_path}: {e}")
    
    return articles

@app.get("/")
async def root():
    return {"message": "AI Help Center API", "status": "running"}

@app.post("/ingest")
async def ingest_articles():
    """Load articles into Pinecone vector database"""
    try:
        index = init_pinecone()
        if not index:
            raise HTTPException(status_code=500, detail="Failed to initialize Pinecone")
        
        articles = load_articles()
        if not articles:
            raise HTTPException(status_code=404, detail="No articles found")
        
        # Prepare data for vectorization
        texts = [f"{article['title']}\n\n{article['content']}" for article in articles]
        embeddings = get_embeddings(texts)
        
        if not embeddings:
            raise HTTPException(status_code=500, detail="Failed to generate embeddings")
        
        # Prepare vectors for Pinecone
        vectors = []
        for i, article in enumerate(articles):
            vectors.append({
                'id': article['id'],
                'values': embeddings[i],
                'metadata': {
                    'title': article['title'],
                    'content': article['content'][:8000],  # Limit metadata size
                    'product': article['product']
                }
            })
        
        # Upload to Pinecone in batches
        batch_size = 100
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i + batch_size]
            index.upsert(vectors=batch)
        
        return {
            "message": f"Successfully ingested {len(articles)} articles",
            "articles_by_product": {
                "radix": len([a for a in articles if a['product'] == 'radix']),
                "rediq": len([a for a in articles if a['product'] == 'rediq'])
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@app.post("/search")
async def search_articles(request: SearchRequest):
    """Search articles using vector similarity"""
    try:
        index = init_pinecone()
        if not index:
            raise HTTPException(status_code=500, detail="Pinecone not available")
        
        # Get query embedding
        query_embedding = get_embeddings([request.query])
        if not query_embedding:
            raise HTTPException(status_code=500, detail="Failed to generate query embedding")
        
        # Build filter for product
        filter_dict = {}
        if request.product:
            filter_dict['product'] = request.product
        
        # Search Pinecone
        results = index.query(
            vector=query_embedding[0],
            top_k=request.limit,
            include_metadata=True,
            filter=filter_dict if filter_dict else None
        )
        
        # Format results
        articles = []
        for match in results.matches:
            content = process_content_images(match.metadata['content'], match.metadata['product'])
            articles.append({
                'id': match.id,
                'title': match.metadata['title'],
                'content': content,
                'product': match.metadata['product'],
                'score': match.score
            })
        
        return {"articles": articles, "query": request.query}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.post("/chat")
async def chat_completion(request: ChatRequest):
    """Generate chat response with RAG context"""
    try:
        # Search for relevant articles
        search_request = SearchRequest(
            query=request.message,
            product=request.product,
            limit=3
        )
        search_results = await search_articles(search_request)
        
        # Build context from search results
        context = ""
        sources = []
        for article in search_results["articles"]:
            context += f"Title: {article['title']}\nContent: {article['content']}\n\n"
            sources.append({
                'title': article['title'],
                'product': article['product'],
                'id': article['id']
            })
        
        # Build conversation history
        messages = [
            {
                "role": "system",
                "content": f"""You are a helpful assistant for a help center. Use the following knowledge base articles to answer user questions.

Context from knowledge base:
{context}

Instructions:
- Answer based on the provided context
- If you reference images, they are already properly formatted with URLs
- Be helpful and specific
- If the context doesn't contain enough information, say so
- Include step-by-step guidance when appropriate"""
            }
        ]
        
        # Add conversation history
        for msg in request.conversation_history[-5:]:  # Last 5 messages
            messages.append(msg)
        
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        # Get OpenAI response
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=1000,
            temperature=0.3
        )
        
        return {
            "response": response.choices[0].message.content,
            "sources": sources,
            "product_filter": request.product
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "pinecone": "connected" if init_pinecone() else "disconnected",
        "s3": "configured" if os.getenv('S3_BUCKET') else "not configured"
    }

@app.get("/test-openai")
async def test_openai():
    """Test OpenAI API connection"""
    try:
        response = openai.embeddings.create(
            model="text-embedding-3-small",
            input=["test"]
        )
        return {"status": "success", "embedding_length": len(response.data[0].embedding)}
    except Exception as e:
        return {"status": "failed", "error": str(e)}

@app.get("/debug-articles")
async def debug_articles():
    """Debug article loading"""
    try:
        articles = load_articles()
        return {
            "total_articles": len(articles),
            "by_product": {
                "radix": len([a for a in articles if a['product'] == 'radix']),
                "rediq": len([a for a in articles if a['product'] == 'rediq'])
            },
            "sample_article": articles[0] if articles else None,
            "article_paths_checked": [
                "../data/radix/articles/*.md",
                "../data/rediq/articles/*.md"
            ]
        }
    except Exception as e:
        return {"error": str(e), "error_type": type(e).__name__}

@app.get("/debug-embeddings")
async def debug_embeddings():
    """Debug embedding generation with small batch"""
    try:
        articles = load_articles()[:5]  # Just first 5 articles
        texts = [f"{article['title']}\n\n{article['content']}" for article in articles]
        
        # Check text lengths
        text_lengths = [len(text) for text in texts]
        
        # Try generating embeddings for small batch
        embeddings = get_embeddings(texts)
        
        return {
            "articles_tested": len(articles),
            "text_lengths": text_lengths,
            "max_length": max(text_lengths),
            "embeddings_generated": len(embeddings),
            "embedding_dimension": len(embeddings[0]) if embeddings else 0
        }
    except Exception as e:
        return {"error": str(e), "error_type": type(e).__name__}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)