# API Testing Collection - Digital Receipt Collector

## Test Sequence

### 1. REGISTER USER
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Jayanarayan",
  "email": "jay@example.com",
  "password": "password123"
}

---

### 2. LOGIN
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "jay@example.com",
  "password": "password123"
}

# Save the token from response!

---

### 3. GET CURRENT USER
GET http://localhost:8080/api/users/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE

---

### 4. CREATE RECEIPT (Without File)
POST http://localhost:8080/api/receipts
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

receipt={
  "storeName": "Amazon",
  "purchaseDate": "2025-10-27",
  "totalAmount": 1999.99,
  "category": "Electronics",
  "paymentMethod": "Credit Card"
}

---

### 5. GET ALL RECEIPTS
GET http://localhost:8080/api/receipts?page=0&size=10&sortBy=createdAt&sortDir=DESC
Authorization: Bearer YOUR_JWT_TOKEN_HERE

---

### 6. SEARCH RECEIPTS
GET http://localhost:8080/api/receipts/search?category=Electronics&startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer YOUR_JWT_TOKEN_HERE

---

### 7. GET RECEIPT BY ID
GET http://localhost:8080/api/receipts/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE

---

### 8. UPDATE RECEIPT
PUT http://localhost:8080/api/receipts/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

receipt={
  "storeName": "Amazon Updated",
  "purchaseDate": "2025-10-28",
  "totalAmount": 2499.99,
  "category": "Electronics",
  "paymentMethod": "Debit Card"
}

---

### 9. DELETE RECEIPT
DELETE http://localhost:8080/api/receipts/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE

---

## ADMIN ENDPOINTS (Requires ADMIN role)

### 10. GET ALL USERS (ADMIN)
GET http://localhost:8080/api/admin/users
Authorization: Bearer ADMIN_JWT_TOKEN_HERE

---

### 11. GET USER BY ID (ADMIN)
GET http://localhost:8080/api/admin/users/1
Authorization: Bearer ADMIN_JWT_TOKEN_HERE

---

### 12. GET ANALYTICS (ADMIN)
GET http://localhost:8080/api/admin/analytics
Authorization: Bearer ADMIN_JWT_TOKEN_HERE

---

### 13. DELETE USER (ADMIN)
DELETE http://localhost:8080/api/admin/users/2
Authorization: Bearer ADMIN_JWT_TOKEN_HERE

---

## Sample Data for Testing

### Multiple Receipts

1. Grocery Receipt:
```json
{
  "storeName": "Walmart",
  "purchaseDate": "2025-10-20",
  "totalAmount": 156.78,
  "category": "Groceries",
  "paymentMethod": "Debit Card"
}
```

2. Travel Receipt:
```json
{
  "storeName": "Delta Airlines",
  "purchaseDate": "2025-09-15",
  "totalAmount": 450.00,
  "category": "Travel",
  "paymentMethod": "Credit Card"
}
```

3. Entertainment Receipt:
```json
{
  "storeName": "Netflix",
  "purchaseDate": "2025-10-01",
  "totalAmount": 15.99,
  "category": "Entertainment",
  "paymentMethod": "Credit Card"
}
```

4. Restaurant Receipt:
```json
{
  "storeName": "Pizza Hut",
  "purchaseDate": "2025-10-25",
  "totalAmount": 45.50,
  "category": "Food",
  "paymentMethod": "Cash"
}
```
