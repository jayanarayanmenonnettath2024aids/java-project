#!/usr/bin/env pwsh
# Simple Full Stack Starter - Opens backend and frontend in separate windows

Write-Host "Starting Digital Receipt Collector..." -ForegroundColor Cyan
Write-Host ""

# Start backend in new window
Write-Host "1. Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; .\build-and-run.ps1"

Write-Host "2. Waiting 15 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Open frontend in browser
Write-Host "3. Opening frontend in browser..." -ForegroundColor Yellow
Start-Process "$PSScriptRoot\frontend\index.html"

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API:  http://localhost:8080" -ForegroundColor Cyan
Write-Host "Swagger UI:   http://localhost:8080/swagger-ui.html" -ForegroundColor Cyan
Write-Host "Frontend:     Opened in browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop: Close the backend PowerShell window" -ForegroundColor Yellow
