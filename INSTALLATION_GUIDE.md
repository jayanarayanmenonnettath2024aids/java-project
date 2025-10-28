# 🚀 PREREQUISITES INSTALLATION GUIDE

## Current Status Check

✅ **Windows OS** - Detected  
❌ **Java 17+** - You have Java 8, need to upgrade to Java 17  
❌ **Maven 3.6+** - Not installed  
❌ **MySQL 8.0+** - Not installed  

---

## STEP-BY-STEP INSTALLATION

### 1️⃣ Install Java 17 (Required)

**Option A: Using Chocolatey (Recommended - Easiest)**

1. Open PowerShell as Administrator
2. Install Chocolatey if not already installed:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. Install OpenJDK 17:
   ```powershell
   choco install openjdk17 -y
   ```

4. Verify installation:
   ```powershell
   java -version
   ```
   Should show: `openjdk version "17.x.x"`

**Option B: Manual Download**

1. Download OpenJDK 17 from: https://adoptium.net/
2. Choose: **Temurin 17 (LTS)** → **Windows** → **x64** → **.msi installer**
3. Run the installer (check "Set JAVA_HOME" and "Add to PATH")
4. Restart PowerShell
5. Verify: `java -version`

---

### 2️⃣ Install Maven (Required)

**Option A: Using Chocolatey**

```powershell
choco install maven -y
```

Verify:
```powershell
mvn -version
```

**Option B: Manual Download**

1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Apache\maven`
3. Add to System Environment Variables:
   - Variable: `MAVEN_HOME`
   - Value: `C:\Program Files\Apache\maven`
   - Add to PATH: `%MAVEN_HOME%\bin`
4. Restart PowerShell
5. Verify: `mvn -version`

---

### 3️⃣ Install MySQL 8.0+ (Required)

**Option A: Using Chocolatey**

```powershell
choco install mysql -y
```

**Option B: Manual Download**

1. Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
2. Choose: **Windows (x86, 32-bit), MSI Installer**
3. Run installer and choose:
   - **Developer Default** (recommended)
   - Set root password (remember this!)
   - Configure MySQL Server on port 3306
4. Start MySQL service:
   ```powershell
   net start MySQL80
   ```

5. Verify:
   ```powershell
   mysql --version
   ```

---

## QUICK INSTALL (All at Once with Chocolatey)

**Run PowerShell as Administrator and execute:**

```powershell
# Install Chocolatey (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Java 17, Maven, and MySQL
choco install openjdk17 maven mysql -y

# Verify installations
java -version
mvn -version
mysql --version
```

---

## After Installation

### 1. Create MySQL Database

```powershell
# Login to MySQL
mysql -u root -p
```

Enter your MySQL root password, then:

```sql
CREATE DATABASE digital_receipt_db;
EXIT;
```

### 2. Update Application Configuration

Edit: `c:\Users\JAYAN\Downloads\java\src\main\resources\application.properties`

Change:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

### 3. Build and Run the Application

```powershell
cd C:\Users\JAYAN\Downloads\java

# Clean and build
mvn clean install

# Run the application
mvn spring-boot:run
```

### 4. Access the Application

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Endpoint**: http://localhost:8080/api

---

## Troubleshooting

### Issue: "Command not found" after installation
**Solution:** Close and reopen PowerShell (or restart your computer)

### Issue: JAVA_HOME not set
**Solution:**
```powershell
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"
```

### Issue: MySQL service won't start
**Solution:**
```powershell
net start MySQL80
```

### Issue: Port 8080 already in use
**Solution:** Change port in `application.properties`:
```properties
server.port=8081
```

---

## Verification Checklist

After installation, verify everything:

```powershell
# Check Java (should be 17.x)
java -version

# Check Maven (should be 3.6+)
mvn -version

# Check MySQL (should be 8.0+)
mysql --version

# Check MySQL is running
net start | findstr MySQL
```

---

## Alternative: Using Docker (Advanced)

If you prefer Docker instead of local installation:

```powershell
# Run MySQL in Docker
docker run --name mysql-receipt -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=digital_receipt_db -p 3306:3306 -d mysql:8.0

# Still need Java 17 and Maven locally for Spring Boot
```

---

## Ready to Run!

Once all prerequisites are installed:

1. ✅ Java 17+ installed
2. ✅ Maven 3.6+ installed  
3. ✅ MySQL 8.0+ installed and running
4. ✅ Database created
5. ✅ Configuration updated

**Then run:**
```powershell
cd C:\Users\JAYAN\Downloads\java
mvn clean install
mvn spring-boot:run
```

**Access:** http://localhost:8080/swagger-ui.html

---

Need help? Check the error messages and refer to this guide!
