@echo off
echo 🚀 Starting AI Help Center Development Server
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo ❌ Virtual environment not found!
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Failed to create virtual environment. Make sure Python is installed.
        pause
        exit /b 1
    )
)

REM Activate virtual environment
echo ✅ Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if needed
echo 📦 Checking dependencies...
pip install -r requirements.txt

REM Start the development server
echo 🌐 Starting server...
python dev_server.py

pause 