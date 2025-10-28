# ====================================================
# Database Setup Script
# ====================================================

Write-Host "====================================================`n" -ForegroundColor Cyan
Write-Host "  Creating MySQL Database`n" -ForegroundColor Cyan
Write-Host "====================================================`n" -ForegroundColor Cyan

# Create database setup SQL
$sqlCommands = @"
CREATE DATABASE IF NOT EXISTS digital_receipt_db;
USE digital_receipt_db;

-- Create admin user (optional)
-- CREATE USER 'receipt_admin'@'localhost' IDENTIFIED BY 'admin123';
-- GRANT ALL PRIVILEGES ON digital_receipt_db.* TO 'receipt_admin'@'localhost';
-- FLUSH PRIVILEGES;

SHOW DATABASES;
"@

# Save SQL to temp file
$sqlFile = "$env:TEMP\setup_db.sql"
$sqlCommands | Out-File -FilePath $sqlFile -Encoding utf8

Write-Host "Connecting to MySQL...`n" -ForegroundColor Yellow
Write-Host "Note: If this is the first time, press ENTER when prompted for password`n" -ForegroundColor Yellow
Write-Host "If connection fails, the default root password might be empty or 'root'`n" -ForegroundColor Yellow

# Execute SQL file
& "C:\tools\mysql\current\bin\mysql.exe" -u root -p -e "source $sqlFile"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Database created successfully!`n" -ForegroundColor Green
    
    Write-Host "====================================================`n" -ForegroundColor Cyan
    Write-Host "  Next Steps:`n" -ForegroundColor Cyan
    Write-Host "====================================================`n" -ForegroundColor Cyan
    Write-Host "1. Update src\main\resources\application.properties" -ForegroundColor White
    Write-Host "   Change spring.datasource.password to your MySQL root password`n" -ForegroundColor White
    Write-Host "2. Build the project:" -ForegroundColor White
    Write-Host "   mvn clean install`n" -ForegroundColor White
    Write-Host "3. Run the application:" -ForegroundColor White
    Write-Host "   mvn spring-boot:run`n" -ForegroundColor White
    Write-Host "4. Access Swagger UI:" -ForegroundColor White
    Write-Host "   http://localhost:8080/swagger-ui.html`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Database creation failed!`n" -ForegroundColor Red
    Write-Host "Please try manually:" -ForegroundColor Yellow
    Write-Host "1. Run: mysql -u root -p" -ForegroundColor White
    Write-Host "2. Enter your root password (or press ENTER if no password)" -ForegroundColor White
    Write-Host "3. Run: CREATE DATABASE digital_receipt_db;" -ForegroundColor White
    Write-Host "4. Run: SHOW DATABASES;`n" -ForegroundColor White
}

# Clean up
Remove-Item $sqlFile -ErrorAction SilentlyContinue

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
