# 🚀 Digital Receipt Collector - Quick Start

## ⚡ Fastest Way to Start (Recommended)

Just run this single command:

```powershell
.\start-simple.ps1
```

**That's it!** This will:
- ✅ Start backend server in a separate window
- ✅ Wait for server to be ready
- ✅ Open frontend in your browser automatically

---

## 📋 Three Ways to Run

### 1. Simple Start (Recommended) ⭐
```powershell
.\start-simple.ps1
```
- Backend opens in new window
- Frontend opens in browser
- Close backend window to stop

### 2. Integrated Start
```powershell
.\start-app.ps1
```
- Everything in one terminal
- Live backend logs
- Press Ctrl+C to stop

### 3. Manual Start
```powershell
# Backend
.\build-and-run.ps1

# Frontend (in browser)
start frontend\index.html
```

---

## 📍 URLs

- **Frontend:** Opens automatically
- **Backend API:** http://localhost:8080
- **Swagger Docs:** http://localhost:8080/swagger-ui.html

---

## 💡 First Time?

1. Make sure MySQL is running
2. Run `.\start-simple.ps1`
3. Click "Get Started Free" in browser
4. Register with your email
5. Login and enjoy! 🎉

---

## 🛑 Stopping

- **start-simple.ps1:** Close backend window
- **start-app.ps1:** Press Ctrl+C
- **build-and-run.ps1:** Press Ctrl+C

---

## 🔧 Config

- Port: 8080
- Database: digital_receipt_db (auto-created)
- MySQL: localhost:3306
- Credentials: root/root

Change in `src/main/resources/application.properties`

---

## ❓ Troubleshooting

**"Cannot connect to server"**
- Wait 10-15 seconds for backend to start
- Check http://localhost:8080/swagger-ui.html

**Database errors**
- Ensure MySQL is running
- Check credentials in application.properties

**Port 8080 in use**
- Stop other apps on port 8080
- Or change port in application.properties

---

**Ready to start? Run:**
```powershell
.\start-simple.ps1
```

Enjoy! 🎉
