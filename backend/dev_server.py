#!/usr/bin/env python3
"""
Development server script for the AI Help Center backend.
This script sets up the environment and runs the FastAPI server with hot reloading.
"""

import os
import sys
import subprocess
import uvicorn
from pathlib import Path

def check_venv():
    """Check if we're in a virtual environment"""
    return hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)

def setup_environment():
    """Set up the environment for development"""
    # Get the backend directory
    backend_dir = Path(__file__).parent.absolute()
    
    # Change to backend directory
    os.chdir(backend_dir)
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Check if required environment variables are set
    required_vars = [
        'PINECONE_API_KEY',
        'OPENAI_API_KEY',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'S3_BUCKET'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print("⚠️  Warning: The following environment variables are not set:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\nYou can set them in a .env file in the backend directory.")
        print("The server will start but some features may not work properly.\n")

def install_dependencies():
    """Install dependencies if needed"""
    try:
        import fastapi
        import pinecone
        import openai
        import boto3
        print("✅ All required packages are already installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("Installing dependencies...")
        
        if check_venv():
            subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        else:
            print("⚠️  Not in a virtual environment. Please activate your venv first:")
            print("   Windows: .\\venv\\Scripts\\activate")
            print("   Mac/Linux: source venv/bin/activate")
            sys.exit(1)

def main():
    """Main function to run the development server"""
    print("🚀 Starting AI Help Center Development Server")
    print("=" * 50)
    
    # Setup environment
    setup_environment()
    
    # Check dependencies
    install_dependencies()
    
    # Check if we're in a virtual environment
    if not check_venv():
        print("⚠️  Warning: Not running in a virtual environment")
        print("   It's recommended to activate your virtual environment first:")
        print("   Windows: .\\venv\\Scripts\\activate")
        print("   Mac/Linux: source venv/bin/activate")
        print()
    
    print("🌐 Starting server on http://127.0.0.1:8000")
    print("📚 API documentation available at http://127.0.0.1:8000/docs")
    print("🔍 Health check available at http://127.0.0.1:8000/health")
    print("=" * 50)
    print("Press Ctrl+C to stop the server")
    print()
    
    # Run the server with hot reloading
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,  # Enable hot reloading
        reload_dirs=["."],  # Watch current directory for changes
        log_level="info"
    )

if __name__ == "__main__":
    main() 