# Article Query Generator

This utility script processes help center articles and generates suggested search queries using OpenAI, then adds them directly to the article frontmatter for improved search suggestions.

## 🚀 Quick Start

### 1. Setup

Create a new directory for the utility scripts (e.g., `scripts/` in your project root):

```bash
mkdir scripts
cd scripts
```

Copy the three generated files:
- `generate-article-queries.js` (main script)
- `package.json` (dependencies)
- `test-single-article.js` (test script)

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the scripts directory:

```bash
# .env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Test on a Single Article

Before processing all articles, test on a single file:

```bash
# Test with a specific file
node test-single-article.js "../data/radix/articles/Adding Competitors to a ProForma Property [16339996080525].md"

# Or use the default test file
npm run test
```

### 5. Generate Queries for All Articles

```bash
npm run generate
```

## 📋 What the Script Does

1. **Scans** all `.md` files in `../data/radix/articles/` and `../data/rediq/articles/`
2. **Analyzes** each article's content, title, and category
3. **Generates** 3 suggested queries per article using OpenAI GPT-4
4. **Adds** the queries to the article's frontmatter as `suggested_queries:`
5. **Preserves** all existing frontmatter and content

## 📄 Example Output

After running the script, your article frontmatter will look like this:

```yaml
---
attachments:
- 23668882694285.png
category: ProForma
created_at: '2023-06-01T23:14:30Z'
id: 16339996080525
title: Adding Competitors to a ProForma Property
updated_at: '2024-08-22T18:41:52Z'
suggested_queries:
- How do I add competitors to a ProForma property?
- What are the different ways to find competitors in ProForma?
- How does CompMatch recommend competitors for my property?
---

[Rest of article content remains unchanged]
```

## ⚙️ Configuration

You can modify these settings in `generate-article-queries.js`:

```javascript
const QUERIES_PER_ARTICLE = 3; // Number of queries per article
const DELAY_BETWEEN_CALLS = 500; // Delay between API calls (ms)
```

## 🔧 Backend Integration

After generating the queries, update your backend to use them:

1. **Copy the updated backend code** from the provided `updated_backend_queries.py`
2. **Add the new functions** to your existing `main.py`
3. **Replace the existing `/generate-queries` endpoint**
4. **Restart your backend server**

The updated backend will:
- ✅ Use pre-generated queries from article frontmatter
- ✅ Fall back to OpenAI generation if needed
- ✅ Filter queries by product and category
- ✅ Provide better, more relevant suggestions

## 🔍 New Backend Endpoints

### `/generate-queries` (Updated)
Now uses pre-generated queries first, with OpenAI fallback.

### `/refresh-queries-cache` (New)
Refreshes the article queries cache after adding new articles.

```bash
curl -X POST http://localhost:8000/refresh-queries-cache
```

### `/debug-article-queries` (New)
Debug endpoint to see what queries are available.

```bash
curl http://localhost:8000/debug-article-queries
```

## 📊 Script Output Example

```
🚀 Starting Article Query Generator

📁 Processing radix articles in: /path/to/data/radix/articles
  Found 45 articles to process

Processing: Adding Competitors to a ProForma Property [16339996080525].md
  → Generating queries for "Adding Competitors to a ProForma Property"...
  ✓ Added 3 suggested queries
    1. How do I add competitors to a ProForma property?
    2. What are the different ways to find competitors in ProForma?
    3. How does CompMatch recommend competitors for my property?

Processing: API Response Data Definitions [17703147105421].md
  → Generating queries for "API Response Data Definitions"...
  ✓ Added 3 suggested queries
    1. What do the API response fields mean?
    2. How do I understand Radix API data definitions?
    3. What is the difference between subject and comp data in the API?

[... continues for all articles ...]

✅ Completed processing radix articles

📁 Processing rediq articles in: /path/to/data/rediq/articles
  Found 28 articles to process

[... continues for rediq articles ...]

🎉 Article Query Generator completed!

Next steps:
1. Review the generated queries in your article files
2. Edit any queries that need refinement
3. Update your application to use these pre-generated queries
```

## 🛠️ Troubleshooting

### Common Issues

**1. "OPENAI_API_KEY not found"**
- Ensure you have a `.env` file in the scripts directory
- Verify your OpenAI API key is correct and has sufficient credits

**2. "Directory not found"**
- Check that the data directories exist relative to the script location
- Adjust the `DATA_DIRS` paths in the script if needed

**3. "Rate limit exceeded"**
- Increase `DELAY_BETWEEN_CALLS` in the script
- The script includes automatic retry logic for rate limits

**4. "No markdown files found"**
- Verify the article directories contain `.md` files
- Check file permissions

### Skipping Articles

The script will automatically skip articles that already have `suggested_queries` in their frontmatter. To regenerate queries for an article, remove the `suggested_queries:` section from its frontmatter.

## 🔄 Workflow Integration

### Initial Setup
1. Run the script to generate queries for all existing articles
2. Update your backend with the new query logic
3. Test the improved suggestions in your frontend

### Ongoing Maintenance
1. When adding new articles, run the script again
2. Call `/refresh-queries-cache` endpoint to update the backend cache
3. Review and refine generated queries as needed

### Manual Query Refinement

You can manually edit the generated queries in any article's frontmatter:

```yaml
suggested_queries:
- How do I add competitors to my ProForma property analysis?
- What is CompMatch and how does it recommend competitors?
- Can I search for competitors by name or location in ProForma?
```

## 📈 Benefits

### Before (Dynamic Generation)
- ❌ Slow response times (API calls every time)
- ❌ Generic, category-based suggestions
- ❌ No connection to specific articles
- ❌ Inconsistent quality

### After (Pre-generated Queries)
- ✅ Fast response times (cached queries)
- ✅ Article-specific, relevant suggestions
- ✅ Direct mapping to help content
- ✅ Consistent, curated quality
- ✅ Better user experience

## 🔧 Advanced Usage

### Custom Query Templates

You can modify the OpenAI prompt in the script to generate different styles of queries:

```javascript
const prompt = `Generate 3 specific user questions for this help article:
Title: ${title}
Content: ${truncatedContent}

Focus on:
- Troubleshooting scenarios
- Step-by-step procedures
- Feature explanations

Return practical questions users would actually search for.`;
```

### Batch Processing Specific Categories

To process only specific categories or products, modify the `DATA_DIRS` array:

```javascript
// Process only Radix articles
const DATA_DIRS = ['../data/radix/articles'];

// Process only specific categories
// (You'd need to add filtering logic in the processDirectory function)
```

### Integration with CI/CD

Add the script to your deployment pipeline:

```yaml
# .github/workflows/update-queries.yml
name: Update Article Queries
on:
  push:
    paths:
      - 'data/*/articles/*.md'

jobs:
  update-queries:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: |
          cd scripts
          npm install
          node generate-article-queries.js
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'Auto-update article suggested queries'
```

## 📞 Support

If you encounter issues:

1. Check the console output for specific error messages
2. Verify your OpenAI API key and billing status
3. Ensure file permissions allow reading/writing article files
4. Test with a single article first using the test script

The script includes comprehensive error handling and will continue processing even if individual articles fail.