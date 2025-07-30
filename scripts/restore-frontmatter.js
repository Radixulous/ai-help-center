#!/usr/bin/env node

/**
 * Frontmatter Restoration Script
 * 
 * This script restores the original frontmatter from the source Zendesk archives
 * and combines it with the generated suggested queries.
 * 
 * Usage: node restore-frontmatter.js
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

// Configuration
const SOURCE_PATHS = {
  radix: "C:\\Users\\BenBeggs\\OneDrive - Radix\\Product\\Analytics\\Zendesk Article Archives\\Radix ZD Stuff\\RADIX - output_markdown",
  rediq: "C:\\Users\\BenBeggs\\OneDrive - Radix\\Product\\Analytics\\Zendesk Article Archives\\redIQ ZD Stuff\\redIQ - output_markdown"
};

const TARGET_PATHS = {
  radix: "C:\\Users\\BenBeggs\\Documents\\GitHub\\ai-help-center\\data\\radix\\articles",
  rediq: "C:\\Users\\BenBeggs\\Documents\\GitHub\\ai-help-center\\data\\rediq\\articles"
};

/**
 * Parse frontmatter from markdown content
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
  let currentKey = null;
  let inArray = false;
  
  console.log(`    Raw frontmatter lines: ${lines.length}`);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    console.log(`    Line ${i}: "${line}" (trimmed: "${trimmedLine}")`);
    
    if (!trimmedLine) continue;
    
    // Check if this is an array item
    if (trimmedLine.startsWith('-')) {
      if (currentKey && !obj[currentKey]) {
        obj[currentKey] = [];
      }
      if (currentKey && Array.isArray(obj[currentKey])) {
        let arrayItem = trimmedLine.substring(1).trim();
        console.log(`    Adding array item to ${currentKey}: ${arrayItem}`);
        obj[currentKey].push(arrayItem);
      }
      inArray = true;
      continue;
    }
    
    // Check for key-value pairs
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      // Reset array mode when we find a new key
      inArray = false;
      
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      console.log(`    Found key-value: "${key}" = "${value}"`);
      
      if (value === '' || value === null) {
        // This might be the start of an array
        console.log(`    Starting array for key: ${key}`);
        obj[key] = [];
        currentKey = key;
        inArray = true;
      } else {
        // Regular key-value pair
        currentKey = key;
        
        // Handle quoted strings
        let cleanValue = value;
        if (value.startsWith("'") && value.endsWith("'")) {
          cleanValue = value.slice(1, -1);
        } else if (value.startsWith('"') && value.endsWith('"')) {
          cleanValue = value.slice(1, -1);
        }
        
        console.log(`    Setting ${key} = ${cleanValue}`);
        obj[key] = cleanValue;
      }
    }
  }
  
  console.log(`    Final parsed object keys: ${Object.keys(obj).join(', ')}`);
  return obj;
}

/**
 * Convert object to YAML-like frontmatter
 */
function objectToFrontmatter(obj) {
  const lines = [];
  
  // Define the order we want for the frontmatter
  const keyOrder = ['id', 'title', 'product', 'category', 'section', 'attachments', 'created_at', 'updated_at', 'suggested_queries'];
  
  // Add keys in the preferred order
  for (const key of keyOrder) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (Array.isArray(value)) {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`- ${item}`);
        }
      } else if (typeof value === 'string' && (value.includes(':') || value.includes('\n') || value.includes("'"))) {
        lines.push(`${key}: '${value}'`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    }
  }
  
  // Add any remaining keys that weren't in our preferred order
  for (const [key, value] of Object.entries(obj)) {
    if (!keyOrder.includes(key)) {
      if (Array.isArray(value)) {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`- ${item}`);
        }
      } else if (typeof value === 'string' && (value.includes(':') || value.includes('\n') || value.includes("'"))) {
        lines.push(`${key}: '${value}'`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    }
  }
  
  return lines.join('\n');
}

/**
 * Process a single file pair
 */
async function processFilePair(targetFilePath, sourceFilePath, product) {
  try {
    console.log(`Processing: ${path.basename(targetFilePath)}`);
    
    // Read both files
    const [targetContent, sourceContent] = await Promise.all([
      fs.readFile(targetFilePath, 'utf8'),
      fs.readFile(sourceFilePath, 'utf8')
    ]);
    
    // Parse both files
    const targetParsed = parseFrontmatter(targetContent);
    const sourceParsed = parseFrontmatter(sourceContent);
    
    if (!sourceParsed.hasFrontmatter) {
      console.log(`  ⚠ Source file has no frontmatter, skipping...`);
      return;
    }
    
    if (!targetParsed.hasFrontmatter) {
      console.log(`  ⚠ Target file has no frontmatter, skipping...`);
      return;
    }
    
    // Parse frontmatter objects
    const targetFrontmatter = parseFrontmatterToObject(targetParsed.frontmatter);
    const sourceFrontmatter = parseFrontmatterToObject(sourceParsed.frontmatter);
    
    // Extract suggested queries from target (if they exist)
    const suggestedQueries = targetFrontmatter.suggested_queries || [];
    
    // Build the new frontmatter object with data from source
    const newFrontmatter = {
      id: sourceFrontmatter.id || 'unknown',
      title: sourceFrontmatter.title || 'Untitled',
      product: product === 'radix' ? 'Radix' : 'redIQ',
      category: sourceFrontmatter.category || 'General',
      section: sourceFrontmatter.section || 'General',
      attachments: sourceFrontmatter.attachments || [],
      created_at: sourceFrontmatter.created_at || '',
      updated_at: sourceFrontmatter.updated_at || ''
    };
    
    console.log(`  Debug - Source frontmatter keys: ${Object.keys(sourceFrontmatter).join(', ')}`);
    console.log(`  Debug - Extracted: id=${sourceFrontmatter.id}, title=${sourceFrontmatter.title}, category=${sourceFrontmatter.category}`);
    
    // Add suggested queries if they exist
    if (suggestedQueries.length > 0) {
      newFrontmatter.suggested_queries = suggestedQueries;
    }
    
    // Build the new file content
    const newFrontmatterText = objectToFrontmatter(newFrontmatter);
    const newContent = `---\n${newFrontmatterText}\n---\n${targetParsed.content}`;
    
    // Write the updated file
    await fs.writeFile(targetFilePath, newContent, 'utf8');
    
    console.log(`  ✓ Restored frontmatter with ${Object.keys(newFrontmatter).length} fields`);
    if (suggestedQueries.length > 0) {
      console.log(`  ✓ Preserved ${suggestedQueries.length} suggested queries`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing ${path.basename(targetFilePath)}: ${error.message}`);
  }
}

/**
 * Process all files for a product
 */
async function processProduct(product) {
  console.log(`\n📁 Processing ${product} articles...`);
  
  const targetDir = TARGET_PATHS[product];
  const sourceDir = SOURCE_PATHS[product];
  
  try {
    // Check if directories exist
    await fs.access(targetDir);
    await fs.access(sourceDir);
    
    // Get all markdown files in target directory using readdir instead of glob
    console.log(`  Looking for files in: ${targetDir}`);
    const allFiles = await fs.readdir(targetDir);
    const targetFiles = allFiles
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(targetDir, file));
    
    console.log(`  Found ${allFiles.length} total files, ${targetFiles.length} .md files`);
    
    if (targetFiles.length === 0) {
      console.log(`  No markdown files found in ${targetDir}`);
      return;
    }
    
    console.log(`  Found ${targetFiles.length} target files to process`);
    
    let processed = 0;
    let skipped = 0;
    
    for (const targetFile of targetFiles) {
      const filename = path.basename(targetFile);
      const sourceFile = path.join(sourceDir, filename);
      
      console.log(`  Checking: ${filename}`);
      
      try {
        // Check if source file exists
        await fs.access(sourceFile);
        console.log(`    ✓ Found matching source file`);
        await processFilePair(targetFile, sourceFile, product);
        processed++;
      } catch (error) {
        console.log(`    ⚠ No matching source file, skipping...`);
        skipped++;
      }
    }
    
    console.log(`\n✅ Completed ${product}: ${processed} processed, ${skipped} skipped`);
    
  } catch (error) {
    console.error(`❌ Error processing ${product}: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Frontmatter Restoration\n');
  
  // Verify all paths exist
  console.log('📂 Verifying paths...');
  for (const [product, sourcePath] of Object.entries(SOURCE_PATHS)) {
    try {
      await fs.access(sourcePath);
      console.log(`  ✓ Source path for ${product}: ${sourcePath}`);
    } catch (error) {
      console.error(`  ❌ Source path for ${product} not found: ${sourcePath}`);
      console.error('Please check the path and try again.');
      process.exit(1);
    }
  }
  
  for (const [product, targetPath] of Object.entries(TARGET_PATHS)) {
    try {
      await fs.access(targetPath);
      console.log(`  ✓ Target path for ${product}: ${targetPath}`);
    } catch (error) {
      console.error(`  ❌ Target path for ${product} not found: ${targetPath}`);
      console.error('Please check the path and try again.');
      process.exit(1);
    }
  }
  
  // Process each product
  await processProduct('radix');
  await processProduct('rediq');
  
  console.log('\n🎉 Frontmatter Restoration completed!');
  console.log('\nWhat happened:');
  console.log('✅ Restored original frontmatter (id, title, category, section, attachments, etc.)');
  console.log('✅ Added product field ("Radix" or "redIQ")');
  console.log('✅ Preserved existing suggested_queries');
  console.log('✅ Maintained article content');
  console.log('\nNext steps:');
  console.log('1. Review a few files to ensure the frontmatter looks correct');
  console.log('2. Test your RAG system with the restored data');
  console.log('3. Run the backend refresh endpoint: curl -X POST http://127.0.0.1:8000/refresh-queries-cache');
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