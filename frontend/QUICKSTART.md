# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Verify Backend is Running
```powershell
# The backend should already be running from previous steps
# If not, run:
cd C:\Users\JAYAN\Downloads\java
.\build-and-run.ps1
```

**Check:** Open http://localhost:8080/swagger-ui.html in your browser

### Step 2: Open the Frontend
```powershell
# Open the frontend in your default browser
cd C:\Users\JAYAN\Downloads\java\frontend
start index.html
```

### Step 3: Login or Register
- **New User?** Click "Create Account" and register
- **Existing User?** Login with your credentials

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

---

## 📋 What You Can Do

### For Regular Users:
1. ✅ **Dashboard** - View your spending overview
2. ✅ **Add Receipts** - Upload receipt images/PDFs
3. ✅ **Manage Receipts** - Edit, delete, search receipts
4. ✅ **Profile** - Update your information

### For Admin Users:
1. ✅ **Analytics** - System-wide statistics
2. ✅ **User Management** - View and manage users
3. ✅ **Charts** - Category breakdown, monthly trends
4. ✅ **Leaderboard** - Top spenders

---

## 🎨 Features to Try

**Upload a Receipt:**
1. Click "Add Receipt" button
2. Drag & drop a receipt image or click to browse
3. Fill in the details
4. Click "Add Receipt"

**Search & Filter:**
1. Go to Receipts page
2. Use search box to find by store name
3. Filter by category, payment method, or date range
4. Click "Clear Filters" to reset

**Switch Theme:**
1. Click the moon/sun icon in the header
2. Toggle between dark and light themes

**View Analytics (Admin):**
1. Login as admin
2. Click "Analytics" in navigation
3. View charts and statistics

---

## 🔧 Troubleshooting

**Issue:** Can't login
- **Solution:** Make sure backend is running on port 8080

**Issue:** Receipts not showing
- **Solution:** Add some receipts first! Click "Add Receipt"

**Issue:** Admin menu not visible
- **Solution:** Login with admin credentials

**Issue:** File upload failed
- **Solution:** Check file size (max 10MB) and format (images/PDFs)

---

## 📱 Browser Access

Open in your browser:
- **Frontend:** `file:///C:/Users/JAYAN/Downloads/java/frontend/index.html`
- **Backend Swagger:** `http://localhost:8080/swagger-ui.html`
- **Backend API:** `http://localhost:8080/api`

---

**Have fun managing your receipts! 🎉**
