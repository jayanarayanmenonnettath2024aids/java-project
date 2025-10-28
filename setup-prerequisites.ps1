# Digital Receipt Collector - Automated Setup Script
# Run this script as Administrator

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Digital Receipt Collector - Setup Script" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator', then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Step 1: Install Chocolatey if not present
Write-Host "Step 1: Checking Chocolatey..." -ForegroundColor Yellow
if (-not (Test-Command choco)) {
    Write-Host "Installing Chocolatey package manager..." -ForegroundColor Cyan
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Host "✅ Chocolatey installed" -ForegroundColor Green
} else {
    Write-Host "✅ Chocolatey already installed" -ForegroundColor Green
}
Write-Host ""

# Step 2: Install Java 17
Write-Host "Step 2: Installing Java 17..." -ForegroundColor Yellow
choco install openjdk17 -y
Write-Host "✅ Java 17 installed" -ForegroundColor Green
Write-Host ""

# Step 3: Install Maven
Write-Host "Step 3: Installing Maven..." -ForegroundColor Yellow
choco install maven -y
Write-Host "✅ Maven installed" -ForegroundColor Green
Write-Host ""

# Step 4: Install MySQL
Write-Host "Step 4: Installing MySQL 8.0..." -ForegroundColor Yellow
choco install mysql -y
Write-Host "✅ MySQL installed" -ForegroundColor Green
Write-Host ""

# Refresh environment variables
Write-Host "Refreshing environment variables..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify installations
Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Verifying Installations" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Java version:" -ForegroundColor Yellow
java -version
Write-Host ""

Write-Host "Maven version:" -ForegroundColor Yellow
mvn -version
Write-Host ""

Write-Host "MySQL version:" -ForegroundColor Yellow
mysql --version
Write-Host ""

# Start MySQL service
Write-Host "Starting MySQL service..." -ForegroundColor Yellow
net start MySQL80

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Close this PowerShell window" -ForegroundColor White
Write-Host "2. Open a NEW PowerShell window (to refresh environment)" -ForegroundColor White
Write-Host "3. Run: mysql -u root -p" -ForegroundColor White
Write-Host "   (Default password is usually 'root' or empty)" -ForegroundColor Gray
Write-Host "4. Create database: CREATE DATABASE digital_receipt_db;" -ForegroundColor White
Write-Host "5. Update application.properties with your MySQL password" -ForegroundColor White
Write-Host "6. Run: cd C:\Users\JAYAN\Downloads\java" -ForegroundColor White
Write-Host "7. Run: mvn clean install" -ForegroundColor White
Write-Host "8. Run: mvn spring-boot:run" -ForegroundColor White
Write-Host ""
Write-Host "See INSTALLATION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
