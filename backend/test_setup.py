#!/usr/bin/env python3
"""
Test script to verify the backend setup and dependencies.
Run this to check if everything is configured correctly.
"""

import sys
import os
from pathlib import Path

def test_imports():
    """Test if all required packages can be imported"""
    print("🔍 Testing package imports...")
    
    try:
        import fastapi
        print("✅ FastAPI imported successfully")
    except ImportError as e:
        print(f"❌ FastAPI import failed: {e}")
        return False
    
    try:
        import uvicorn
        print("✅ Uvicorn imported successfully")
    except ImportError as e:
        print(f"❌ Uvicorn import failed: {e}")
        return False
    
    try:
        import pinecone
        print("✅ Pinecone imported successfully")
    except ImportError as e:
        print(f"❌ Pinecone import failed: {e}")
        return False
    
    try:
        import openai
        print("✅ OpenAI imported successfully")
    except ImportError as e:
        print(f"❌ OpenAI import failed: {e}")
        return False
    
    try:
        import boto3
        print("✅ Boto3 imported successfully")
    except ImportError as e:
        print(f"❌ Boto3 import failed: {e}")
        return False
    
    try:
        from dotenv import load_dotenv
        print("✅ Python-dotenv imported successfully")
    except ImportError as e:
        print(f"❌ Python-dotenv import failed: {e}")
        return False
    
    return True

def test_environment():
    """Test environment variables"""
    print("\n🔍 Testing environment variables...")
    
    from dotenv import load_dotenv
    load_dotenv()
    
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
        value = os.getenv(var)
        if value:
            print(f"✅ {var} is set")
        else:
            print(f"❌ {var} is not set")
            missing_vars.append(var)
    
    if missing_vars:
        print(f"\n⚠️  Missing environment variables: {', '.join(missing_vars)}")
        print("Create a .env file in the backend directory with these variables.")
        return False
    
    return True

def test_file_structure():
    """Test if required files exist"""
    print("\n🔍 Testing file structure...")
    
    backend_dir = Path(__file__).parent
    
    required_files = [
        'main.py',
        'requirements.txt'
    ]
    
    for file in required_files:
        file_path = backend_dir / file
        if file_path.exists():
            print(f"✅ {file} exists")
        else:
            print(f"❌ {file} missing")
            return False
    
    return True

def test_data_directory():
    """Test if data directory exists"""
    print("\n🔍 Testing data directory...")
    
    data_dir = Path(__file__).parent.parent / 'data'
    if data_dir.exists():
        print("✅ Data directory exists")
        
        # Check for article files
        radix_articles = list(data_dir.glob('radix/articles/*.md'))
        rediq_articles = list(data_dir.glob('rediq/articles/*.md'))
        
        print(f"✅ Found {len(radix_articles)} Radix articles")
        print(f"✅ Found {len(rediq_articles)} ReDIQ articles")
        
        return True
    else:
        print("❌ Data directory not found")
        return False

def main():
    """Main test function"""
    print("🧪 AI Help Center Backend Setup Test")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_environment,
        test_file_structure,
        test_data_directory
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test failed with error: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your backend is ready to run.")
        print("\nTo start the development server:")
        print("  python dev_server.py")
        print("  or")
        print("  uvicorn main:app --host 127.0.0.1 --port 8000 --reload")
    else:
        print("⚠️  Some tests failed. Please fix the issues above before running the server.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 