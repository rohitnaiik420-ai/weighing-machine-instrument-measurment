@echo off
title TRUEMEASURE Full-Stack Launcher (SIH 2026)
cls
echo ============================================================
echo   TRUEMEASURE FULLSTACK LAUNCHER - SIH 2026
echo   Team: Alpha Coders
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting FastAPI Backend on Port 8000...
start "TRUEMEASURE Backend (Port 8000)" cmd /k "call START_BACKEND.bat"

echo [2/3] Waiting 3 seconds for backend initialization...
ping -n 4 127.0.0.1 >nul

echo [3/3] Starting React Frontend Dashboard on Port 5173...
start "TRUEMEASURE Frontend (Port 5173)" cmd /k "call START_DASHBOARD.bat"

echo.
echo ============================================================
echo   All services launched!
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:8000
echo   - Swagger:  http://localhost:8000/docs
echo ============================================================
echo.
