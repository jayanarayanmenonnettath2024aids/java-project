# Quick Start Guide - Digital Receipt Collector

## 🚀 5-Minute Setup

### Step 1: Start MySQL
Ensure MySQL is running on your machine.

### Step 2: Create Database
```sql
CREATE DATABASE digital_receipt_db;
```

### Step 3: Update Configuration
Edit `src/main/resources/application.properties` and update:
```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 4: Build & Run
```bash
mvn clean install
mvn spring-boot:run
```

### Step 5: Access Swagger UI
Open your browser: http://localhost:8080/swagger-ui.html

---

## 📝 First API Calls

### 1. Register a User
**POST** http://localhost:8080/api/auth/register

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
**POST** http://localhost:8080/api/auth/login

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Save the JWT token from the response!**

### 3. Upload a Receipt
**POST** http://localhost:8080/api/receipts

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `receipt` (JSON):
  ```json
  {
    "storeName": "Amazon",
    "purchaseDate": "2025-10-27",
    "totalAmount": 1999.99,
    "category": "Electronics",
    "paymentMethod": "Credit Card"
  }
  ```
- `file`: Upload a PDF or image file (optional)

### 4. Get All Receipts
**GET** http://localhost:8080/api/receipts?page=0&size=10

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Creating an Admin User

After registering a user, run this SQL command:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'test@example.com';
```

Now you can access admin endpoints!

---

## 🛠️ Troubleshooting

### Port 8080 Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### MySQL Connection Error
Verify MySQL is running and credentials are correct.

### JWT Token Expired
Tokens expire after 24 hours. Simply login again to get a new token.

---

## 📚 Next Steps

1. ✅ Explore all endpoints in Swagger UI
2. ✅ Create multiple receipts with different categories
3. ✅ Test search and filter functionality
4. ✅ Access admin analytics endpoint
5. ✅ Integrate with a frontend application

**Enjoy using Digital Receipt Collector! 🎉**
