# ====================================================
# Build and Run Script for Digital Receipt Collector
# ====================================================

Write-Host "====================================================`n" -ForegroundColor Cyan
Write-Host "  Digital Receipt Collector - Build & Run`n" -ForegroundColor Cyan
Write-Host "====================================================`n" -ForegroundColor Cyan

# Set JAVA_HOME to Java 17
$javaHome = "C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot"
if (Test-Path $javaHome) {
    $env:JAVA_HOME = $javaHome
    Write-Host "✅ JAVA_HOME set to: $javaHome`n" -ForegroundColor Green
} else {
    Write-Host "❌ Java 17 not found at: $javaHome`n" -ForegroundColor Red
    Write-Host "Please check your Java installation.`n" -ForegroundColor Yellow
    exit 1
}

# Set Maven path
$mavenHome = "C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.11"
$mvnCmd = "$mavenHome\bin\mvn.cmd"
if (-not (Test-Path $mvnCmd)) {
    Write-Host "❌ Maven not found at: $mvnCmd`n" -ForegroundColor Red
    Write-Host "Please check your Maven installation.`n" -ForegroundColor Yellow
    exit 1
}
$env:PATH = "$mavenHome\bin;$env:PATH"
Write-Host "✅ Maven set to: $mavenHome`n" -ForegroundColor Green

# Verify Java version
Write-Host "Verifying Java version..." -ForegroundColor Yellow
& "$javaHome\bin\java.exe" -version

Write-Host "`n====================================================`n" -ForegroundColor Cyan
Write-Host "Step 1: Cleaning previous builds..." -ForegroundColor Yellow
& $mvnCmd clean

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Maven clean failed!`n" -ForegroundColor Red
    exit 1
}

Write-Host "`n====================================================`n" -ForegroundColor Cyan
Write-Host "Step 2: Building the project..." -ForegroundColor Yellow
Write-Host "(This may take a few minutes on first run...)`n" -ForegroundColor Gray

& $mvnCmd install -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Build failed!`n" -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Check if MySQL is running" -ForegroundColor White
    Write-Host "2. Verify database credentials in application.properties" -ForegroundColor White
    Write-Host "3. Ensure database 'digital_receipt_db' exists`n" -ForegroundColor White
    exit 1
}

Write-Host "`n✅ Build successful!`n" -ForegroundColor Green

Write-Host "====================================================`n" -ForegroundColor Cyan
Write-Host "Step 3: Starting the application..." -ForegroundColor Yellow
Write-Host "`nApplication will be available at:" -ForegroundColor White
Write-Host "- API Base: http://localhost:8080" -ForegroundColor Cyan
Write-Host "- Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor Cyan
Write-Host "`nPress Ctrl+C to stop the application`n" -ForegroundColor Gray
Write-Host "====================================================`n" -ForegroundColor Cyan

& $mvnCmd spring-boot:run
