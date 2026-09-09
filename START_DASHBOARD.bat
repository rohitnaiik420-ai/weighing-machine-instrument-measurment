@echo off
setlocal enabledelayedexpansion
title TRUEMEASURE - Digital Verification Platform
color 0B

echo ===============================================================================
echo                TRUEMEASURE - DIGITAL VERIFICATION PLATFORM
echo         Weighing ^& Measuring Instruments Verification Dashboard (Web)
echo             Legal Metrology Department, Ministry of Consumer Affairs
echo ===============================================================================
echo.

:: 1. Verify Node.js is installed
where node >nul 2>nul
if errorlevel 1 goto NoNode

:: 2. Set directory to project folder
set "PROJECT_DIR=%~dp0truemeasure-dashboard"
if not exist "%PROJECT_DIR%\" set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: 3. Check if server is already running on port 5173
echo [1/3] Checking server status...
powershell -NoProfile -Command "if ((Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -ErrorAction SilentlyContinue).StatusCode -eq 200) { exit 0 } else { exit 1 }" >nul 2>nul
if errorlevel 1 goto StartServer

echo.
echo [OK] TRUEMEASURE Dashboard is ALREADY RUNNING!
echo [INFO] Opening dashboard in your default browser...
echo.
start "" http://localhost:5173
echo Dashboard URL: http://localhost:5173
echo.
echo You can keep this window open or close it anytime.
ping -n 4 127.0.0.1 >nul
exit /b 0

:StartServer
:: 4. Verify node_modules
echo [2/3] Checking dependencies...
if exist "node_modules\" goto LaunchVite

echo [INFO] First time setup: Installing packages, please wait...
call npm install
if errorlevel 1 goto InstallFailed
echo [OK] Packages installed successfully.

:LaunchVite
:: 5. Launch Vite server
echo.
echo [3/3] Launching TRUEMEASURE Dashboard...
echo ===============================================================================
echo  Dashboard will automatically open at: http://localhost:5173
echo  Press Ctrl+C in this terminal when you wish to stop the server.
echo ===============================================================================
echo.

call npm run dev
if errorlevel 1 goto ViteFailed
exit /b 0

:NoNode
color 0C
echo [ERROR] Node.js was not detected on your system.
echo Please download and install Node.js from https://nodejs.org/
echo.
echo After installing Node.js, re-run this script.
echo.
pause
exit /b 1

:InstallFailed
color 0C
echo [ERROR] Package installation failed. Please check your internet connection.
pause
exit /b 1

:ViteFailed
color 0C
echo.
echo [ERROR] Vite server encountered an issue.
pause
exit /b 1
