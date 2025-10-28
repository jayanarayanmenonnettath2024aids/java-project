# ✅ Startup Checklist - Digital Receipt Collector

## Pre-Flight Checks

### 1. System Requirements ✅
- [ ] Java 17 or higher installed
- [ ] Maven 3.6+ installed
- [ ] MySQL 8.0+ installed and running
- [ ] IDE installed (IntelliJ IDEA, Eclipse, or VS Code)
- [ ] Git installed (optional)

**Verify Installations:**
```powershell
java -version        # Should show Java 17+
mvn -version         # Should show Maven 3.6+
mysql --version      # Should show MySQL 8.0+
```

---

## Database Setup

### 2. Create Database ✅
```sql
CREATE DATABASE digital_receipt_db;
```

**Verify:**
```sql
SHOW DATABASES;
```

### 3. Update Configuration ✅
Edit `src/main/resources/application.properties`:

```properties
# Update these lines with your MySQL credentials
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

**Common MySQL defaults:**
- Username: `root`
- Password: `root` or empty string

---

## Build & Run

### 4. Clean Install ✅
```powershell
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXX s
```

### 5. Start Application ✅
```powershell
mvn spring-boot:run
```

**Expected Output:**
```
Started DigitalReceiptCollectorApplication in X.XXX seconds
```

**Application should be running on:** http://localhost:8080

---

## Verification

### 6. Test Endpoints ✅

#### A. Health Check
Open browser: http://localhost:8080/swagger-ui.html

**Expected:** Swagger UI documentation page loads

#### B. Register User (via Swagger)
1. Click on "Authentication" section
2. Click "POST /api/auth/register"
3. Click "Try it out"
4. Enter:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
5. Click "Execute"

**Expected Response:** Status 201 Created

#### C. Login (via Swagger)
1. Click "POST /api/auth/login"
2. Enter:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
3. Click "Execute"

**Expected Response:** JWT token in response body

#### D. Authenticate in Swagger
1. Copy the JWT token from login response
2. Click the "Authorize" button at top of Swagger UI
3. Enter: `Bearer YOUR_TOKEN_HERE`
4. Click "Authorize"

**Expected:** Lock icons turn green (unlocked)

#### E. Test Protected Endpoint
1. Click "GET /api/users/me"
2. Click "Try it out"
3. Click "Execute"

**Expected Response:** Your user profile data

---

## Database Verification

### 7. Check Database Tables ✅
```sql
USE digital_receipt_db;
SHOW TABLES;
```

**Expected Tables:**
- `users`
- `receipts`

### 8. Verify User Data ✅
```sql
SELECT * FROM users;
```

**Expected:** At least one user record from registration

---

## File Upload Test

### 9. Create Receipt Directory ✅
The application auto-creates this, but verify:

**Windows:**
```powershell
ls .\uploads\receipts
```

**Expected:** Directory exists

### 10. Test File Upload (via Swagger) ✅
1. Click "POST /api/receipts"
2. Click "Try it out"
3. Fill in receipt data:
```json
{
  "storeName": "Test Store",
  "purchaseDate": "2025-10-27",
  "totalAmount": 100.00,
  "category": "Test",
  "paymentMethod": "Cash"
}
```
4. (Optional) Choose a file to upload
5. Click "Execute"

**Expected Response:** Status 201 Created with receipt data

---

## Common Issues & Solutions

### ❌ Port 8080 already in use
**Solution:**
```properties
# In application.properties
server.port=8081
```

### ❌ MySQL connection refused
**Solutions:**
1. Verify MySQL is running: `net start MySQL80` (Windows)
2. Check credentials in `application.properties`
3. Check MySQL port (default: 3306)

### ❌ Build failures
**Solution:**
```powershell
mvn clean
mvn clean install -U
```

### ❌ JWT token expired
**Solution:** Simply login again to get a new token

### ❌ File upload permission denied
**Solution:** Run application with appropriate file system permissions

---

## Testing Checklist

### User Management ✅
- [ ] Register new user
- [ ] Login with credentials
- [ ] Get current user profile
- [ ] Token expires after 24 hours

### Receipt Management ✅
- [ ] Create receipt without file
- [ ] Create receipt with file
- [ ] Get all receipts (paginated)
- [ ] Search receipts by category
- [ ] Search receipts by date range
- [ ] Update receipt
- [ ] Delete receipt

### Admin Features ✅
- [ ] Create admin user (SQL: `UPDATE users SET role='ADMIN' WHERE id=1`)
- [ ] Login as admin
- [ ] Get all users
- [ ] Get analytics
- [ ] Delete user

---

## Performance Checks

### 11. Response Time ✅
All endpoints should respond within:
- Login/Register: < 500ms
- Get receipts: < 300ms
- Upload receipt: < 1000ms (with file)

### 12. Concurrent Users ✅
Test with multiple browser tabs or API clients

---

## Production Readiness

### 13. Security Checklist ✅
- [ ] JWT secret is strong (change default in production)
- [ ] Passwords are encrypted (BCrypt)
- [ ] HTTPS enabled (for production)
- [ ] CORS configured properly
- [ ] File upload size limits set

### 14. Configuration Review ✅
- [ ] Database connection pooling configured
- [ ] Logging levels appropriate
- [ ] File upload directory has sufficient space
- [ ] JWT expiration time suitable

---

## 🎉 Success Criteria

✅ Application starts without errors  
✅ Swagger UI accessible  
✅ Can register and login  
✅ Can create and retrieve receipts  
✅ File upload works  
✅ Admin analytics accessible  
✅ All tests pass  

---

## 📞 Getting Help

If you encounter issues:

1. Check console logs for errors
2. Verify database connection
3. Review `application.properties`
4. Check MySQL is running
5. Verify Java version (17+)
6. Clear Maven cache: `mvn clean`

---

## Next Steps After Successful Startup

1. ✅ Create multiple test receipts
2. ✅ Test search and filter functionality
3. ✅ Review analytics dashboard
4. ✅ Test file upload with different formats
5. ✅ Create admin user and test admin endpoints
6. ✅ Integrate with frontend application
7. ✅ Deploy to production server

---

**🚀 Application is ready to use! Start managing your digital receipts!**

---

## Quick Command Reference

```powershell
# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Package for deployment
mvn package

# Skip tests
mvn clean install -DskipTests
```

---

## Environment URLs

- **Local Development:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **API Docs (JSON):** http://localhost:8080/api-docs
- **H2 Console:** Not configured (using MySQL)

---

**Last Updated:** October 28, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
