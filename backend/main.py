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
import hashlib
import re
import base64

def clean_base64_from_content(content: str) -> str:
    """Remove base64 encoded data from markdown content"""
    
    # Pattern for base64 image data URLs
    base64_pattern = r'data:image/[^;]+;base64,[A-Za-z0-9+/]+=*'
    
    # Pattern for standalone base64 blocks (long strings of base64 characters)
    standalone_base64_pattern = r'[A-Za-z0-9+/]{100,}=*'
    
    # Remove base64 image data URLs
    content = re.sub(base64_pattern, '[IMAGE REMOVED]', content)
    
    # Remove standalone base64 blocks
    content = re.sub(standalone_base64_pattern, '[DATA REMOVED]', content)
    
    # Clean up multiple consecutive newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content

def is_base64_heavy(content: str) -> bool:
    """Check if content has a lot of base64 data"""
    base64_chars = len(re.findall(r'[A-Za-z0-9+/=]', content))
    total_chars = len(content)
    
    # If more than 70% of content is base64-like characters, it's probably data
    return (base64_chars / total_chars) > 0.7 if total_chars > 0 else False

# Better text chunking instead of truncation
def chunk_text(text: str, max_chars: int = 7000) -> List[str]:
    """Split long text into chunks while preserving meaning"""
    if len(text) <= max_chars:
        return [text]
    
    # Try to split on paragraphs first
    paragraphs = text.split('\n\n')
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        if len(current_chunk + para) <= max_chars:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = para + "\n\n"
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

# Generate clean ASCII IDs
def generate_clean_id(original_id: str) -> str:
    """Generate ASCII-only ID from filename"""
    # Remove file extension and clean up
    clean_id = re.sub(r'[^\w\-_]', '_', original_id)
    clean_id = re.sub(r'_+', '_', clean_id)  # Multiple underscores to single
    clean_id = clean_id.strip('_')
    
    # If still too long or problematic, use hash
    if len(clean_id) > 50:
        hash_suffix = hashlib.md5(original_id.encode()).hexdigest()[:8]
        clean_id = clean_id[:40] + "_" + hash_suffix
    
    return clean_id

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

class GenerateQueriesRequest(BaseModel):
    category_name: str
    category_description: str
    sections: List[str]
    product: str

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
        batch_size = 20
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            print(f"Processing batch {i//batch_size + 1}/{(len(texts)-1)//batch_size + 1}")
            
            response = openai.embeddings.create(
                model="text-embedding-3-small",
                input=batch
            )
            
            batch_embeddings = [item.embedding for item in response.data]
            all_embeddings.extend(batch_embeddings)
            
            import time
            time.sleep(0.5)
        
        return all_embeddings
    except Exception as e:
        print(f"Error getting embeddings: {e}")
        return []

# Generate S3 URL for images
def get_image_url(image_filename: str, product: str) -> str:
    try:
        # Clean up the filename - remove any path components
        clean_filename = os.path.basename(image_filename)
        
        # Skip if no bucket configured
        bucket = os.getenv('S3_BUCKET')
        if not bucket:
            print("S3_BUCKET environment variable not set")
            return ""
        
        # Handle different folder structures
        # If it's already in attachments folder, remove the prefix since files are stored directly
        if image_filename.startswith('attachments/'):
            s3_key = f'{product}/{clean_filename}'
        else:
            # Otherwise, assume it's just a filename
            s3_key = f'{product}/{clean_filename}'
        
        # Generate presigned URL
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': bucket,
                'Key': s3_key
            },
            ExpiresIn=3600  # 1 hour
        )
        
        print(f"Generated S3 URL for {s3_key}: {url[:50]}...")
        return url
        
    except Exception as e:
        print(f"Error generating image URL for {image_filename} in {product}: {e}")
        return ""

# Process markdown content and replace image references
def process_content_images(content: str, product: str) -> str:
    # Find image references in markdown: ![alt](filename)
    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    
    def replace_image(match):
        alt_text = match.group(1)
        filename = match.group(2)
        
        # Skip if it's already a full URL
        if filename.startswith(('http://', 'https://', 'data:')):
            return match.group(0)
        
        # Generate signed URL
        image_url = get_image_url(filename, product)
        if image_url:
            print(f"Replaced image reference: {filename} -> {image_url[:50]}...")
            return f'![{alt_text}]({image_url})'
        else:
            print(f"Failed to generate URL for image: {filename}")
            return match.group(0)  # Return original if URL generation fails
    
    processed_content = re.sub(image_pattern, replace_image, content)
    
    # Count how many images were processed
    original_images = len(re.findall(image_pattern, content))
    processed_images = len(re.findall(image_pattern, processed_content))
    
    if original_images > 0:
        print(f"Processed {original_images} images in content for {product}")
    
    return processed_content

def extract_frontmatter_attachments(content: str) -> List[str]:
    """Extract attachment filenames from frontmatter"""
    attachments = []
    
    # Look for frontmatter section
    frontmatter_match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        
        # Look for attachments section
        attachments_match = re.search(r'attachments:\s*\n((?:\s*-\s*[^\n]+\n?)*)', frontmatter)
        if attachments_match:
            attachments_text = attachments_match.group(1)
            # Extract individual attachment filenames
            attachment_lines = re.findall(r'^\s*-\s*([^\n]+)', attachments_text, re.MULTILINE)
            attachments.extend(attachment_lines)
    
    return attachments

def extract_image_descriptions(content: str) -> List[dict]:
    """Extract image descriptions and filenames from markdown content"""
    images = []
    
    # Find all image references: ![description](filename)
    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    matches = re.findall(image_pattern, content)
    
    for description, filename in matches:
        images.append({
            'description': description.strip(),
            'filename': filename.strip(),
            'full_reference': f'![{description}]({filename})'
        })
    
    return images

def build_image_context(articles: List[dict]) -> str:
    """Build context about available images from search results"""
    all_images = []
    
    for article in articles:
        # Extract frontmatter attachments
        attachments = extract_frontmatter_attachments(article['content'])
        
        # Extract image descriptions
        image_descriptions = extract_image_descriptions(article['content'])
        
        # Combine both types of image information
        for attachment in attachments:
            all_images.append({
                'type': 'attachment',
                'filename': attachment,
                'description': f'Attachment: {attachment}',
                'article_title': article['title'],
                'product': article['product']
            })
        
        for img in image_descriptions:
            all_images.append({
                'type': 'inline',
                'filename': img['filename'],
                'description': img['description'],
                'article_title': article['title'],
                'product': article['product']
            })
    
    if not all_images:
        return ""
    
    # Build context string
    context = "\n\nAVAILABLE IMAGES:\n"
    for i, img in enumerate(all_images, 1):
        context += f"{i}. {img['description']} ({img['filename']}) - from '{img['article_title']}' ({img['product']})\n"
    
    return context

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
                
                # Clean base64 data from content
                original_length = len(content)
                content = clean_base64_from_content(content)
                cleaned_length = len(content)
                
                if original_length > cleaned_length * 2:  # Significant reduction
                    print(f"Cleaned {os.path.basename(file_path)}: {original_length} -> {cleaned_length} chars")
                
                # Extract title
                title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                title = title_match.group(1) if title_match else os.path.basename(file_path).replace('.md', '')
                
                # Generate clean ID
                base_id = f"{product}_{os.path.basename(file_path)}"
                clean_id = generate_clean_id(base_id)
                
                # Create the full text for embedding
                full_text = f"{title}\n\n{content}"
                
                # Check if still too long after cleaning
                if len(full_text) > 7000:
                    print(f"Chunking article: {title} ({len(full_text)} chars)")
                    text_chunks = chunk_text(full_text, max_chars=6000)
                    
                    for i, chunk in enumerate(text_chunks):
                        chunk_id = f"{clean_id}_chunk_{i}"
                        articles.append({
                            'id': chunk_id,
                            'title': f"{title} (Part {i+1})",
                            'content': chunk,
                            'product': product,
                            'file_path': file_path,
                            'chunk_index': i,
                            'total_chunks': len(text_chunks)
                        })
                else:
                    # Article is good size after cleaning
                    articles.append({
                        'id': clean_id,
                        'title': title,
                        'content': full_text,
                        'product': product,
                        'file_path': file_path,
                        'chunk_index': 0,
                        'total_chunks': 1
                    })
                    
            except Exception as e:
                print(f"Error loading {file_path}: {e}")
    
    print(f"Loaded {len(articles)} article chunks total")
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
        
        print(f"Processing {len(articles)} article chunks for embeddings...")
        
        # Prepare data for vectorization - using the content that was already chunked
        texts = [article['content'] for article in articles]  # This should now be chunked
        
        # Check text lengths before sending to OpenAI
        for i, text in enumerate(texts):
            if len(text) > 8000:
                print(f"WARNING: Text {i} is still {len(text)} chars - this will fail!")
        
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
                    'product': article['product'],
                    'chunk_index': article.get('chunk_index', 0),
                    'total_chunks': article.get('total_chunks', 1)
                }
            })
        
        # Upload to Pinecone in batches
        batch_size = 100
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i + batch_size]
            index.upsert(vectors=batch)
        
        return {
            "message": f"Successfully ingested {len(articles)} article chunks",
            "original_articles": len(glob.glob("../data/*/articles/*.md")),
            "total_chunks": len(articles),
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
    """Generate chat response with RAG context and image monitoring"""
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
        
        # Build image context using the new function
        image_context = build_image_context(search_results["articles"])
        
        # Log what we're sending to AI (for monitoring)
        print(f"\n=== CHAT REQUEST DEBUG ===")
        print(f"User Query: {request.message}")
        print(f"Product: {request.product}")
        print(f"Articles Found: {len(search_results['articles'])}")
        print(f"Context Length: {len(context)} chars")
        print(f"Image Context Length: {len(image_context)} chars")
        if image_context:
            print(f"Image Context: {image_context}")
        
        # Build conversation history
        messages = [
            {
                "role": "system",
                "content": f"""You are a helpful assistant for a help center. Use the following knowledge base articles to answer user questions.

Context from knowledge base:
{context}

{image_context}

IMPORTANT INSTRUCTIONS FOR IMAGE USAGE:
- When the user asks about visual elements, interfaces, screenshots, or procedures that would benefit from visual reference, INCLUDE the relevant images
- Look at the available images list above and determine which ones are most relevant to the user's question
- If the user asks about UI elements, navigation, screenshots, or visual procedures, include the appropriate images
- Use the image descriptions to match them to the user's needs
- Include images using markdown format: ![description](image_url)

General Instructions:
- Answer based on the provided context from the knowledge base
- Use rich formatting to make your responses more readable:
  - Use **bold text** for important terms and concepts
  - Use *italic text* for emphasis
  - Use `code` for technical terms, file names, or commands
  - Include [clickable links](url) when referencing external resources
  - Include ![alt text](image_url) for images when relevant
- DO NOT produce any links that contain the strings "help.radix.com"or "rediq.zendesk.com")
- You can include links to other external resources when helpful (documentation, APIs, etc.)
- If a specific help article is referenced, do not link to it, rather ask the user at the end if they's like more information about that topic.
- Use the information from the knowledge base to provide direct answers
- If you need to reference specific features or procedures, describe them based on the context provided
- Be helpful and specific
- If the context doesn't contain enough information, say so
- Include step-by-step guidance when appropriate
- Format lists and instructions clearly"""
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
        
        ai_response = response.choices[0].message.content
        
        # Log AI response analysis
        print(f"\n=== AI RESPONSE ANALYSIS ===")
        print(f"Response Length: {len(ai_response)} chars")
        
        # Check if AI used any images
        image_usage = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', ai_response)
        if image_usage:
            print(f"Images Used: {len(image_usage)}")
            for alt_text, url in image_usage:
                print(f"  - {alt_text}")
        else:
            print("No images used in response")
        
        print(f"=== END DEBUG ===\n")
        
        return {
            "response": ai_response,
            "product_filter": request.product,
            "debug_info": {
                "available_images": len(search_results["articles"]), # Changed to search_results["articles"]
                "images_used": len(image_usage),
                "context_length": len(context),
                "image_context_length": len(image_context)
            }
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

@app.post("/generate-queries")
async def generate_suggested_queries(request: GenerateQueriesRequest):
    """Generate suggested queries based on category and sections"""
    try:
        # Build context about the category and its sections
        sections_text = "\n".join([f"- {section}" for section in request.sections])
        
        prompt = f"""Based on the following help center category information, generate 4 relevant and specific questions that users might ask about this category.

Category: {request.category_name}
Description: {request.category_description}
Product: {request.product}
Available Sections: {sections_text}

Generate 4 questions that are:
1. Specific to the category and its sections
2. Common user questions that would be helpful
3. Varied in complexity (from basic to advanced)
4. Focused on practical usage and problem-solving

Return only the questions, one per line, without numbering or additional text."""

        # Get OpenAI response
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a help center assistant that generates relevant user questions based on category information."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )
        
        # Parse the response into individual questions
        questions_text = response.choices[0].message.content.strip()
        questions = [q.strip() for q in questions_text.split('\n') if q.strip()]
        
        # Clean up questions (remove numbering if present)
        cleaned_questions = []
        for question in questions:
            # Remove common numbering patterns (only numbers, not letters)
            question = re.sub(r'^\d+\.?\s*', '', question)
            question = question.strip()
            if question:
                cleaned_questions.append(question)
        
        # Ensure we have exactly 4 questions
        if len(cleaned_questions) > 4:
            cleaned_questions = cleaned_questions[:4]
        elif len(cleaned_questions) < 4:
            # Add fallback questions if we don't have enough
            fallback_questions = [
                f"How do I get started with {request.category_name}?",
                f"What are the main features of {request.category_name}?",
                f"How can I troubleshoot issues with {request.category_name}?",
                f"What are the best practices for using {request.category_name}?"
            ]
            while len(cleaned_questions) < 4:
                cleaned_questions.append(fallback_questions[len(cleaned_questions)])
        
        return {"queries": cleaned_questions}
    
    except Exception as e:
        # Return fallback questions if API fails
        fallback_questions = [
            f"How do I get started with {request.category_name}?",
            f"What are the main features of {request.category_name}?",
            f"How can I troubleshoot issues with {request.category_name}?",
            f"What are the best practices for using {request.category_name}?"
        ]
        return {"queries": fallback_questions}

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

@app.get("/debug-long-articles")
async def debug_long_articles():
    """Find articles that are unusually long"""
    try:
        articles = []
        products = ['radix', 'rediq']
        
        for product in products:
            article_path = f"../data/{product}/articles/*.md"
            files = glob.glob(article_path)
            
            for file_path in files:
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                    title = title_match.group(1) if title_match else os.path.basename(file_path).replace('.md', '')
                    
                    articles.append({
                        'filename': os.path.basename(file_path),
                        'title': title,
                        'length': len(content),
                        'word_count': len(content.split()),
                        'product': product
                    })
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
        
        # Sort by length, show longest first
        articles.sort(key=lambda x: x['length'], reverse=True)
        
        return {
            "longest_articles": articles[:10],  # Top 10 longest
            "articles_over_50k": [a for a in articles if a['length'] > 50000],
            "articles_over_100k": [a for a in articles if a['length'] > 100000]
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/debug-s3-images")
async def debug_s3_images():
    """Debug S3 image connection and processing"""
    try:
        # Test S3 connection
        s3_config = {
            "bucket": os.getenv('S3_BUCKET'),
            "region": os.getenv('AWS_REGION', 'us-east-1'),
            "access_key_set": bool(os.getenv("AWS_ACCESS_KEY_ID")),
            "secret_key_set": bool(os.getenv("AWS_SECRET_ACCESS_KEY"))
        }
        
        # Test image URL generation
        test_images = [
            ("radix", "example-image.png"),
            ("rediq", "example-image.png"),
            ("radix", "screenshot.png"),
            ("rediq", "screenshot.png"),
            ("radix", "attachments/19328829504013.png"),
            ("rediq", "attachments/example-attachment.png")
        ]
        
        image_urls = []
        for product, filename in test_images:
            try:
                url = get_image_url(filename, product)
                image_urls.append({
                    "product": product,
                    "filename": filename,
                    "url": url,
                    "success": bool(url)
                })
            except Exception as e:
                image_urls.append({
                    "product": product,
                    "filename": filename,
                    "url": "",
                    "success": False,
                    "error": str(e)
                })
        
        # Test content processing
        test_content = """
        Here's an example with an image: ![Example](example-image.png)
        And another: ![Screenshot](screenshot.png)
        And an attachment: ![Map showing construction projects](attachments/19328829504013.png)
        """
        
        processed_radix = process_content_images(test_content, "radix")
        processed_rediq = process_content_images(test_content, "rediq")
        
        return {
            "s3_config": s3_config,
            "image_urls": image_urls,
            "test_content_original": test_content,
            "test_content_processed_radix": processed_radix,
            "test_content_processed_rediq": processed_rediq
        }
        
    except Exception as e:
        return {"error": str(e), "error_type": type(e).__name__}

@app.get("/debug-chat-context")
async def debug_chat_context():
    """Debug chat context and image processing"""
    try:
        # Get recent chat context from memory (if available)
        # For now, return the structure of what would be sent to AI
        sample_context = {
            "search_results": {
                "query": "example query",
                "articles_found": 3,
                "articles": [
                    {
                        "title": "Sample Article",
                        "content": "Sample content with ![image description](attachments/example.png)",
                        "product": "radix",
                        "score": 0.85
                    }
                ]
            },
            "image_processing": {
                "images_found": 1,
                "image_descriptions": ["image description"],
                "s3_urls_generated": ["https://s3.amazonaws.com/bucket/radix/attachments/example.png"],
                "image_context": "Available images: 1. image description (attachments/example.png)"
            },
            "ai_prompt_structure": {
                "system_message": "You are a helpful assistant...",
                "context_included": True,
                "image_context_included": True,
                "instructions_for_images": "When relevant to the user's question, include images using markdown format..."
            }
        }
        
        return {
            "debug_info": sample_context,
            "note": "This shows the structure of context sent to AI. Check server logs for actual chat context during conversations.",
            "endpoints_to_test": [
                "/debug-articles-with-images - to see available images",
                "/debug-s3-images - to test image URL generation"
            ]
        }
        
    except Exception as e:
        return {"error": str(e), "error_type": type(e).__name__}

@app.get("/debug-articles-with-images")
async def debug_articles_with_images():
    """Find articles that contain image references"""
    try:
        articles_with_images = []
        products = ['radix', 'rediq']
        
        for product in products:
            article_path = f"../data/{product}/articles/*.md"
            files = glob.glob(article_path)
            
            for file_path in files:
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find image references
                    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
                    image_matches = re.findall(image_pattern, content)
                    
                    if image_matches:
                        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                        title = title_match.group(1) if title_match else os.path.basename(file_path).replace('.md', '')
                        
                        articles_with_images.append({
                            'filename': os.path.basename(file_path),
                            'title': title,
                            'product': product,
                            'image_count': len(image_matches),
                            'images': image_matches,
                            'sample_content': content[:500] + "..." if len(content) > 500 else content
                        })
                        
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
        
        return {
            "total_articles_with_images": len(articles_with_images),
            "articles": articles_with_images[:10]  # Show first 10
        }
        
    except Exception as e:
        return {"error": str(e), "error_type": type(e).__name__}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)