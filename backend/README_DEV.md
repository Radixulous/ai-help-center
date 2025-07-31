# AI Help Center - Backend Development Setup

This guide will help you set up and run the AI Help Center backend locally for development.

## 🚀 Quick Start

### Windows Users
```bash
# Navigate to the backend directory
cd backend

# Run the development server (this will handle everything automatically)
start_dev_server.bat
```

### Mac/Linux Users
```bash
# Navigate to the backend directory
cd backend

# Make the script executable (first time only)
chmod +x start_dev_server.sh

# Run the development server
./start_dev_server.sh
```

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually or the scripts don't work:

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory with your API keys:

```env
PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your_s3_bucket_name
```

### 4. Run the Development Server
```bash
# Option 1: Use the development script
python dev_server.py

# Option 2: Run directly with uvicorn
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 🌐 Access Points

Once the server is running, you can access:

- **Frontend**: http://localhost:3000 (run `npm run dev` in the frontend directory)
- **Backend API**: http://127.0.0.1:8000
- **API Documentation**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

## 🔄 Hot Reloading

The development server includes hot reloading, which means:
- Changes to your Python files will automatically restart the server
- You don't need to manually restart after making code changes
- The server watches the current directory for changes

## 🧪 Testing the Setup

### 1. Health Check
Visit http://127.0.0.1:8000/health to verify the server is running.

### 2. Test API Endpoints
```bash
# Test the root endpoint
curl http://127.0.0.1:8000/

# Test OpenAI connection
curl http://127.0.0.1:8000/test-openai

# Test chat endpoint
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "product": "radix"}'
```

### 3. Test Frontend Connection
1. Start your frontend development server (`npm run dev` in the frontend directory)
2. Open http://localhost:3000
3. Try sending a message - it should connect to your local backend

## 🐛 Troubleshooting

### Common Issues

**1. Port 8000 already in use**
```bash
# Find what's using the port
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Mac/Linux

# Kill the process or use a different port
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

**2. Virtual environment not activating**
```bash
# Windows PowerShell (if batch script doesn't work)
.\venv\Scripts\Activate.ps1

# Mac/Linux
source venv/bin/activate
```

**3. Missing dependencies**
```bash
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

**4. Environment variables not loading**
- Make sure your `.env` file is in the `backend` directory
- Check that the file has no spaces around the `=` sign
- Restart the server after adding new environment variables

### Debug Endpoints

The backend includes several debug endpoints to help troubleshoot:

- `/debug-articles` - Check if articles are loading correctly
- `/debug-embeddings` - Test embedding generation
- `/debug-s3-images` - Test S3 image processing
- `/debug-article-queries` - Check article query generation

## 📁 Project Structure

```
backend/
├── main.py                 # Main FastAPI application
├── requirements.txt        # Python dependencies
├── dev_server.py          # Development server script
├── start_dev_server.bat   # Windows startup script
├── start_dev_server.sh    # Mac/Linux startup script
├── README_DEV.md          # This file
├── .env                   # Environment variables (create this)
└── venv/                  # Virtual environment (auto-created)
```

## 🔄 Development Workflow

1. **Start the backend server** using one of the methods above
2. **Start the frontend server** (`npm run dev` in the frontend directory)
3. **Make changes** to your code
4. **Test changes** - the backend will auto-reload, frontend may need manual refresh
5. **Commit and push** when ready to deploy to Render

## 🚀 Deployment

When you're ready to deploy:
1. Commit your changes to GitHub
2. Render will automatically deploy the updated backend
3. The frontend will continue to use the production backend URL

## 📞 Support

If you encounter issues:
1. Check the console output for error messages
2. Use the debug endpoints to test individual components
3. Verify your environment variables are set correctly
4. Check that all dependencies are installed 