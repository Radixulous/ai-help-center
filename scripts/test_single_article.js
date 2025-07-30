#!/usr/bin/env node

/**
 * Test Single Article Script
 * 
 * This script tests the query generation on a single article
 * to verify the functionality before running on all articles.
 * 
 * Usage: node test-single-article.js [path-to-article.md]
 */

const { generateSuggestedQueries, processArticleFile } = require('./generate_article_queries.js');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function testSingleArticle(filePath) {
  try {
    console.log(`🧪 Testing query generation on: ${path.basename(filePath)}\n`);
    
    // Check if file exists
    await fs.access(filePath);
    
    // Determine product from path
    const product = filePath.includes('radix') ? 'radix' : 'rediq';
    
    // Process the article
    await processArticleFile(filePath, product);
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    process.exit(1);
  }
}

// Get file path from command line argument or use a default
const filePath = process.argv[2] || '../data/radix/articles/Adding Competitors to a ProForma Property [16339996080525].md';

if (!filePath) {
  console.error('Usage: node test-single-article.js [path-to-article.md]');
  process.exit(1);
}

// Run the test
testSingleArticle(path.resolve(filePath));