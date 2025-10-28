# 📋 MANUAL INSTALLATION STEPS

Since automated prerequisites need to be installed, follow these steps:

---

## ⚠️ IMPORTANT: You Need to Install Prerequisites First

Your current system status:
- ❌ Java 8 detected (need Java 17+)
- ❌ Maven not found
- ❌ MySQL not found

---

## 🎯 EASIEST METHOD: Automated Installation

### Step 1: Run PowerShell as Administrator
1. Press `Windows + X`
2. Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**

### Step 2: Run the Setup Script
```powershell
cd C:\Users\JAYAN\Downloads\java
.\setup-prerequisites.ps1
```

This will automatically install:
- ✅ Chocolatey (package manager)
- ✅ Java 17
- ✅ Maven
- ✅ MySQL 8.0

**Time required:** ~10-15 minutes (depending on internet speed)

---

## 🔧 MANUAL METHOD: Install Each Component

If the automated script doesn't work, install manually:

### 1. Install Java 17

**Download:** https://adoptium.net/temurin/releases/

1. Select:
   - Version: **17 - LTS**
   - Operating System: **Windows**
   - Architecture: **x64**
   - Package Type: **.msi**

2. Download and run the installer

3. ✅ Check "Set JAVA_HOME variable"
   ✅ Check "Add to PATH"

4. Click Install

5. **Verify:**
   ```powershell
   java -version
   ```
   Should show: `openjdk version "17.x.x"`

---

### 2. Install Maven

**Download:** https://maven.apache.org/download.cgi

1. Download: **apache-maven-3.9.x-bin.zip** (Binary zip archive)

2. Extract to: `C:\Program Files\Apache\Maven`

3. **Add to System Environment Variables:**
   - Press `Windows + R`, type `sysdm.cpl`, press Enter
   - Click **"Environment Variables"**
   - Under **System variables**, click **"New"**
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\Apache\Maven`
   - Select **"Path"** → Click **"Edit"** → Click **"New"**
     - Add: `%MAVEN_HOME%\bin`
   - Click OK on all dialogs

4. **Close and reopen PowerShell**

5. **Verify:**
   ```powershell
   mvn -version
   ```

---

### 3. Install MySQL 8.0

**Download:** https://dev.mysql.com/downloads/installer/

1. Download: **mysql-installer-community-8.0.x.msi**

2. Run the installer

3. Choose: **"Developer Default"**

4. Click **Next** through the installation

5. **Configuration:**
   - Type: Development Computer
   - Port: 3306
   - Root Password: **Set a password (remember this!)**
   - Windows Service: ✅ Start at System Startup

6. Complete the installation

7. **Verify:**
   ```powershell
   mysql --version
   ```

8. **Start MySQL if not running:**
   ```powershell
   net start MySQL80
   ```

---

## 📝 After Installing Prerequisites

### Step 1: Create Database

```powershell
# Login to MySQL (use the password you set during installation)
mysql -u root -p
```

Enter your password, then:

```sql
CREATE DATABASE digital_receipt_db;
SHOW DATABASES;
EXIT;
```

---

### Step 2: Update Configuration

**Edit file:** `C:\Users\JAYAN\Downloads\java\src\main\resources\application.properties`

**Change these lines:**
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

Replace `YOUR_MYSQL_ROOT_PASSWORD` with the password you set during MySQL installation.

---

### Step 3: Build the Project

Open a **NEW** PowerShell window (to load updated environment variables):

```powershell
cd C:\Users\JAYAN\Downloads\java

# Clean and install dependencies
mvn clean install
```

**Expected output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXX s
```

---

### Step 4: Run the Application

```powershell
mvn spring-boot:run
```

**Expected output:**
```
Started DigitalReceiptCollectorApplication in X.XXX seconds
```

---

### Step 5: Test the Application

**Open browser and go to:**
http://localhost:8080/swagger-ui.html

You should see the Swagger UI interface! 🎉

---

## 🐛 Troubleshooting

### "Command not found" errors
**Solution:** Close and reopen PowerShell (or restart computer)

### MySQL connection refused
**Solution:** 
```powershell
net start MySQL80
```

### Port 8080 already in use
**Solution:** Edit `application.properties`:
```properties
server.port=8081
```

### Maven build fails
**Solution:**
```powershell
mvn clean
mvn clean install -U
```

---

## ✅ Quick Verification Checklist

Before running the application, verify:

```powershell
# Should show Java 17.x
java -version

# Should show Maven 3.x
mvn -version

# Should show MySQL 8.x
mysql --version

# Should show MySQL80 in the list
net start | findstr MySQL
```

---

## 🎯 Summary of Commands

```powershell
# 1. Create database
mysql -u root -p
CREATE DATABASE digital_receipt_db;
EXIT;

# 2. Navigate to project
cd C:\Users\JAYAN\Downloads\java

# 3. Update application.properties with MySQL password

# 4. Build project
mvn clean install

# 5. Run application
mvn spring-boot:run

# 6. Open browser
# http://localhost:8080/swagger-ui.html
```

---

## 📞 Need Help?

1. Check the error message carefully
2. Refer to **INSTALLATION_GUIDE.md** for detailed instructions
3. Make sure all prerequisites are installed correctly
4. Try restarting PowerShell or your computer

---

**Once prerequisites are installed, the application will run smoothly!** 🚀
