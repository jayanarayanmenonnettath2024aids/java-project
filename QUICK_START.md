# 🚀 Quick Start Guide - Digital Receipt Collector

## ✅ Prerequisites Installed

- **Java 17**: `C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot`
- **Maven 3.9.11**: `C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.11`
- **MySQL 9.2.0**: `C:\tools\mysql\current`

---

## 📝 Three Simple Steps to Run

### Step 1: Setup Database (One-time)

```powershell
.\setup-database.ps1
```

**Or manually:**
```sql
mysql -u root -p
CREATE DATABASE digital_receipt_db;
SHOW DATABASES;
exit
```

### Step 2: Configure Database Password

Edit `src\main\resources\application.properties`:

```properties
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

If you don't have a password, use empty string or `root`.

### Step 3: Build & Run

```powershell
.\build-and-run.ps1
```

**Or manually:**
```powershell
mvn clean install
mvn spring-boot:run
```

---

## 🌐 Access the Application

Once running:

- **Swagger UI (API Docs)**: http://localhost:8080/swagger-ui.html
- **API Base URL**: http://localhost:8080/api

---

## 🔐 Test the Application

### 1. Register a User

```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

### 2. Login

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response will contain JWT token - copy it!**

### 3. Create Receipt (with JWT token)

```bash
POST http://localhost:8080/api/receipts
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

storeName: Amazon
purchaseDate: 2024-01-15
totalAmount: 99.99
category: ELECTRONICS
paymentMethod: CREDIT_CARD
file: [select your receipt image/PDF]
```

### 4. Get All Receipts

```bash
GET http://localhost:8080/api/receipts
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 🛠️ Troubleshooting

### Build Fails?

1. **Check Java version:**
   ```powershell
   java -version
   # Should show: openjdk version "17.0.16"
   ```

2. **Set JAVA_HOME manually:**
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot"
   ```

3. **Clean and rebuild:**
   ```powershell
   mvn clean
   mvn install -DskipTests
   ```

### MySQL Connection Issues?

1. **Check MySQL is running:**
   ```powershell
   net start MySQL
   ```

2. **Test MySQL connection:**
   ```powershell
   mysql -u root -p
   ```

3. **Verify database exists:**
   ```sql
   SHOW DATABASES;
   ```

4. **Check `application.properties`:**
   - URL: `jdbc:mysql://localhost:3306/digital_receipt_db`
   - Username: `root`
   - Password: Your MySQL root password

### Port 8080 Already in Use?

Change port in `application.properties`:
```properties
server.port=8081
```

---

## 📚 API Endpoints Summary

### Public Endpoints (No Authentication)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### User Endpoints (Requires JWT)
- `GET /api/users/me` - Get current user profile
- `POST /api/receipts` - Upload new receipt
- `GET /api/receipts` - Get all user's receipts
- `GET /api/receipts/{id}` - Get specific receipt
- `PUT /api/receipts/{id}` - Update receipt
- `DELETE /api/receipts/{id}` - Delete receipt
- `GET /api/receipts/search` - Search receipts

### Admin Endpoints (Requires ADMIN role)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/analytics` - Get analytics dashboard

---

## 📖 Full Documentation

- **Complete API Guide**: See `API_TESTS.md`
- **Project Structure**: See `FILE_STRUCTURE.md`
- **Installation Details**: See `INSTALLATION_GUIDE.md`
- **Manual Setup**: See `MANUAL_SETUP.md`

---

## 🎯 Quick Commands Reference

```powershell
# Database setup
.\setup-database.ps1

# Build and run (recommended)
.\build-and-run.ps1

# Manual build
mvn clean install

# Manual run
mvn spring-boot:run

# Skip tests during build
mvn install -DskipTests

# Check MySQL status
net start MySQL

# Connect to MySQL
mysql -u root -p

# Stop application
# Press Ctrl+C in the terminal
```

---

## 🎉 You're All Set!

The application is now ready to use. Visit Swagger UI for interactive API testing:
**http://localhost:8080/swagger-ui.html**

Happy coding! 🚀
