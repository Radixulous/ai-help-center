#!/usr/bin/env node

/**
 * Article Query Generator Script
 * 
 * This script processes all markdown files in the radix and rediq data folders,
 * uses OpenAI to generate suggested queries for each article, and adds them
 * to the frontmatter of each article.
 * 
 * Usage: node generate-article-queries.js
 * 
 * Prerequisites:
 * - npm install openai dotenv glob
 * - Set OPENAI_API_KEY in your .env file
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configuration
const DATA_DIRS = ['../data/radix/articles', '../data/rediq/articles'];
const QUERIES_PER_ARTICLE = 3; // Number of suggested queries to generate per article
const DELAY_BETWEEN_CALLS = 500; // Delay in ms between API calls to avoid rate limits

/**
 * Clean base64 and other binary content from markdown
 */
function cleanContent(content) {
  // Remove base64 encoded data
  const base64Pattern = /data:image\/[^;]+;base64,[A-Za-z0-9+/]+=*/g;
  const standaloneBase64Pattern = /[A-Za-z0-9+/]{100,}=*/g;
  
  let cleaned = content.replace(base64Pattern, '[IMAGE REMOVED]');
  cleaned = cleaned.replace(standaloneBase64Pattern, '[DATA REMOVED]');
  
  // Clean up multiple consecutive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned;
}

/**
 * Extract frontmatter and content from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)/s);
  
  if (!frontmatterMatch) {
    return { frontmatter: '', content: content, hasFrontmatter: false };
  }
  
  return {
    frontmatter: frontmatterMatch[1],
    content: frontmatterMatch[2],
    hasFrontmatter: true
  };
}

/**
 * Parse YAML-like frontmatter into an object
 */
function parseFrontmatterToObject(frontmatterText) {
  const obj = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Handle array values
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // If JSON parsing fails, keep as string
        }
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      obj[key] = value;
    }
  }
  
  return obj;
}

/**
 * Convert object back to YAML-like frontmatter
 */
function objectToFrontmatter(obj) {
  const lines = [];
  
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`- ${item}`);
      }
    } else if (typeof value === 'string' && (value.includes(':') || value.includes('\n'))) {
      lines.push(`${key}: '${value}'`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  return lines.join('\n');
}

/**
 * Generate suggested queries using OpenAI
 */
async function generateSuggestedQueries(title, content, category, product) {
  const cleanedContent = cleanContent(content);
  
  // Truncate content if too long (keep first 4000 characters)
  const truncatedContent = cleanedContent.length > 4000 
    ? cleanedContent.substring(0, 4000) + '...' 
    : cleanedContent;
  
  const prompt = `You are an AI assistant helping to generate suggested search queries for a help center article.

Article Title: ${title}
Product: ${product}
Category: ${category}
Article Content: ${truncatedContent}

Generate ${QUERIES_PER_ARTICLE} concise, single-sentence questions that users might ask to find this specific article. Each query should:
1. Be a natural question a user would type in a search box
2. Be specific enough to lead to this particular article
3. Use terminology that matches the article content
4. Be phrased as a question or search phrase
5. Be different from each other (avoid similar phrasing)

Return only the queries, one per line, without numbering or additional text.

Examples of good queries:
- "How do I add competitors to a ProForma property?"
- "What does calculated NOI not matching original NOI mean?"
- "How can I combine floor plans in the rent roll?"`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates concise, specific search queries for help center articles. Always return exactly the requested number of queries, one per line, without any additional formatting or text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const queries = response.choices[0].message.content
      .trim()
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0)
      .slice(0, QUERIES_PER_ARTICLE); // Ensure we don't exceed the requested number

    return queries;
  } catch (error) {
    console.error(`Error generating queries: ${error.message}`);
    // Return fallback queries
    return [
      `How do I use ${title}?`,
      `What is ${title}?`,
      `${title} troubleshooting`
    ].slice(0, QUERIES_PER_ARTICLE);
  }
}

/**
 * Process a single markdown file
 */
async function processArticleFile(filePath, product) {
  try {
    console.log(`Processing: ${path.basename(filePath)}`);
    
    const content = await fs.readFile(filePath, 'utf8');
    const { frontmatter, content: articleContent, hasFrontmatter } = parseFrontmatter(content);
    
    // Parse existing frontmatter
    let frontmatterObj = {};
    if (hasFrontmatter) {
      frontmatterObj = parseFrontmatterToObject(frontmatter);
    }
    
    // Check if suggested_queries already exists
    if (frontmatterObj.suggested_queries && Array.isArray(frontmatterObj.suggested_queries)) {
      console.log(`  ✓ Already has suggested queries, skipping...`);
      return;
    }
    
    // Extract title and category
    const title = frontmatterObj.title || path.basename(filePath, '.md');
    const category = frontmatterObj.category || 'General';
    
    // Generate suggested queries
    console.log(`  → Generating queries for "${title}"...`);
    const suggestedQueries = await generateSuggestedQueries(title, articleContent, category, product);
    
    if (suggestedQueries.length === 0) {
      console.log(`  ⚠ No queries generated, skipping...`);
      return;
    }
    
    // Add suggested queries to frontmatter
    frontmatterObj.suggested_queries = suggestedQueries;
    
    // Reconstruct the file
    const newFrontmatter = objectToFrontmatter(frontmatterObj);
    const newContent = `---\n${newFrontmatter}\n---\n${articleContent}`;
    
    // Write back to file
    await fs.writeFile(filePath, newContent, 'utf8');
    
    console.log(`  ✓ Added ${suggestedQueries.length} suggested queries`);
    suggestedQueries.forEach((query, i) => {
      console.log(`    ${i + 1}. ${query}`);
    });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CALLS));
    
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

/**
 * Process all articles in a directory
 */
async function processDirectory(dirPath, product) {
  console.log(`\n📁 Processing ${product} articles in: ${dirPath}`);
  
  try {
    const pattern = path.join(dirPath, '*.md');
    const files = glob.sync(pattern);
    
    if (files.length === 0) {
      console.log(`  No markdown files found in ${dirPath}`);
      return;
    }
    
    console.log(`  Found ${files.length} articles to process`);
    
    for (const file of files) {
      await processArticleFile(file, product);
    }
    
    console.log(`\n✅ Completed processing ${product} articles`);
    
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Article Query Generator\n');
  
  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.error('Please add OPENAI_API_KEY to your .env file');
    process.exit(1);
  }
  
  // Process each directory
  for (const dirPath of DATA_DIRS) {
    const fullPath = path.resolve(__dirname, dirPath);
    const product = dirPath.includes('radix') ? 'radix' : 'rediq';
    
    // Check if directory exists
    try {
      await fs.access(fullPath);
      await processDirectory(fullPath, product);
    } catch (error) {
      console.error(`❌ Directory not found: ${fullPath}`);
      console.error('Please ensure the data directories exist relative to this script');
    }
  }
  
  console.log('\n🎉 Article Query Generator completed!');
  console.log('\nNext steps:');
  console.log('1. Review the generated queries in your article files');
  console.log('2. Edit any queries that need refinement');
  console.log('3. Update your application to use these pre-generated queries');
}

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Script interrupted by user');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = {
  generateSuggestedQueries,
  processArticleFile,
  processDirectory
};