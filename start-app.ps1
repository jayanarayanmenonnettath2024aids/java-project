#!/usr/bin/env pwsh
# Digital Receipt Collector - Complete Application Starter
# This script starts both backend and frontend together

$ErrorActionPreference = "Stop"

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Digital Receipt Collector - Full Stack Startup" -ForegroundColor Green
Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Set Java and Maven paths
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot"
$env:MAVEN_HOME = "C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.11"
$env:PATH = "$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

Write-Host "✅ JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
Write-Host "✅ Maven set to: $env:MAVEN_HOME" -ForegroundColor Green
Write-Host ""

# Verify Java
Write-Host "Verifying Java version..." -ForegroundColor Yellow
java -version
Write-Host ""

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Building the backend..." -ForegroundColor Yellow
Write-Host "(This may take a minute...)" -ForegroundColor Gray
Write-Host ""

# Build the project (skip tests for faster startup)
mvn clean install -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 2: Starting backend server..." -ForegroundColor Yellow
Write-Host ""

# Start backend in background
$backendJob = Start-Job -ScriptBlock {
    param($javaHome, $mavenHome, $projectPath)
    
    $env:JAVA_HOME = $javaHome
    $env:MAVEN_HOME = $mavenHome
    $env:PATH = "$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"
    
    Set-Location $projectPath
    & "$mavenHome\bin\mvn.cmd" spring-boot:run
} -ArgumentList $env:JAVA_HOME, $env:MAVEN_HOME, (Get-Location)

Write-Host "✅ Backend server starting in background (Job ID: $($backendJob.Id))..." -ForegroundColor Green
Write-Host ""

# Wait for backend to start
Write-Host "Waiting for backend to be ready..." -ForegroundColor Yellow
$maxRetries = 30
$retryCount = 0
$backendReady = $false

while ($retryCount -lt $maxRetries -and -not $backendReady) {
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api-docs" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $backendReady = $true
        }
    } catch {
        # Server not ready yet
    }
    $retryCount++
    Write-Host "." -NoNewline -ForegroundColor Gray
}

Write-Host ""

if ($backendReady) {
    Write-Host "✅ Backend is ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "====================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Step 3: Opening frontend..." -ForegroundColor Yellow
    Write-Host ""
    
    # Open frontend in default browser
    Start-Process "http://localhost:8080/swagger-ui.html"
    Start-Sleep -Seconds 2
    Start-Process "$PSScriptRoot\frontend\index.html"
    
    Write-Host "✅ Frontend opened in browser!" -ForegroundColor Green
    Write-Host ""
    Write-Host "====================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 Application is running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Backend API:     http://localhost:8080" -ForegroundColor Cyan
    Write-Host "📍 Swagger UI:      http://localhost:8080/swagger-ui.html" -ForegroundColor Cyan
    Write-Host "📍 Frontend:        Opened in browser" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "====================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
    Write-Host ""
    
    # Keep the script running and show backend logs
    Write-Host "Backend Logs:" -ForegroundColor Cyan
    Write-Host "------------" -ForegroundColor Gray
    
    # Monitor the background job
    try {
        while ($true) {
            $jobOutput = Receive-Job -Job $backendJob -Keep
            if ($jobOutput) {
                $jobOutput | ForEach-Object { Write-Host $_ }
            }
            
            # Check if job is still running
            if ($backendJob.State -eq "Completed" -or $backendJob.State -eq "Failed") {
                Write-Host ""
                Write-Host "❌ Backend server stopped!" -ForegroundColor Red
                break
            }
            
            Start-Sleep -Seconds 1
        }
    } finally {
        # Cleanup
        Write-Host ""
        Write-Host "Stopping backend server..." -ForegroundColor Yellow
        Stop-Job -Job $backendJob -ErrorAction SilentlyContinue
        Remove-Job -Job $backendJob -ErrorAction SilentlyContinue
        Write-Host "✅ Application stopped" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Backend failed to start after $maxRetries attempts!" -ForegroundColor Red
    Write-Host "Please check the logs above for errors." -ForegroundColor Yellow
    Stop-Job -Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $backendJob -ErrorAction SilentlyContinue
    exit 1
}
