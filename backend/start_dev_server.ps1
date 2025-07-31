# AI Help Center Development Server - PowerShell Script
Write-Host "🚀 Starting AI Help Center Development Server" -ForegroundColor Green
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "❌ Virtual environment not found!" -ForegroundColor Red
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to create virtual environment. Make sure Python is installed." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Activate virtual environment
Write-Host "✅ Activating virtual environment..." -ForegroundColor Green
& "venv\Scripts\Activate.ps1"

# Install dependencies if needed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Start the development server
Write-Host "🌐 Starting server..." -ForegroundColor Green
python dev_server.py

Read-Host "Press Enter to exit" 