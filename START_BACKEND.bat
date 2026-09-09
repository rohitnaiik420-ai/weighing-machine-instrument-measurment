@echo off
title TRUEMEASURE FastAPI Backend Server (SIH 2026)
cls
echo ============================================================
echo   TRUEMEASURE BACKEND SERVER - Smart India Hackathon 2026
echo   Team: Alpha Coders
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b 1
)

echo [2/3] Checking database and seeding initial SIH test data...
python backend/run_server.py --test-only
if errorlevel 1 (
    echo [ERROR] Pre-flight checks failed!
    pause
    exit /b 1
)

echo [3/3] Starting FastAPI Uvicorn server on port 8000...
echo.
echo  * Interactive Swagger Docs: http://localhost:8000/docs
echo  * ReDoc Documentation:      http://localhost:8000/redoc
echo  * Root API:                 http://localhost:8000/
echo.
echo Press Ctrl+C in this window to stop the server.
echo ============================================================
echo.

python backend/run_server.py --port 8000 --reload
pause
