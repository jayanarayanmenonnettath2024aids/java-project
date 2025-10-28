# Digital Receipt Collector - Modern Frontend

A beautiful, modern JavaScript frontend for the Digital Receipt Collector application with glassmorphism design.

## Features

✨ **Modern UI/UX**
- Glassmorphism design with smooth animations
- Dark/Light theme support
- Responsive layout for all devices
- Beautiful gradient backgrounds

🔐 **Authentication**
- User registration and login
- JWT token-based authentication
- Secure session management
- Profile management

📄 **Receipt Management**
- Upload receipts with images/PDFs
- Drag-and-drop file upload
- Edit and delete receipts
- Search and filter by category, payment method, date
- Grid and list views
- Real-time preview

📊 **Dashboard & Analytics**
- Overview statistics (total receipts, total spent, monthly spending)
- Category breakdown chart
- Recent receipts list
- Average receipt amount

👨‍💼 **Admin Panel** (Admin users only)
- User management (view, delete users)
- System-wide analytics
- Category breakdown chart
- Monthly spending trends
- Top spenders leaderboard

## Prerequisites

Make sure the backend is running:
- Spring Boot application running on `http://localhost:8080`
- MySQL database configured and running
- All API endpoints accessible

## How to Use

### 1. Start the Backend

Make sure your Spring Boot backend is running on port 8080. If not already running:

```powershell
cd C:\Users\JAYAN\Downloads\java
.\build-and-run.ps1
```

### 2. Open the Frontend

Simply open the `index.html` file in your web browser:

**Option 1: Double-click the file**
- Navigate to `C:\Users\JAYAN\Downloads\java\frontend\`
- Double-click `index.html`

**Option 2: Use Live Server (Recommended)**
- Install "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"
- This provides auto-reload on file changes

**Option 3: Command line**
```powershell
cd C:\Users\JAYAN\Downloads\java\frontend
start index.html
```

### 3. Register/Login

**First Time Users:**
1. Click "Create Account" on the login page
2. Fill in username, email, and password
3. Click "Register"
4. You'll be automatically logged in

**Existing Users:**
1. Enter your username and password
2. Click "Login"

### 4. Using the Application

**Dashboard**
- View your spending statistics
- See recent receipts
- Check category breakdown chart

**Receipts**
- Click "Add Receipt" to upload a new receipt
- Fill in store name, date, amount, category, payment method
- Upload receipt image/PDF (drag-and-drop or click to browse)
- Use search and filters to find specific receipts
- Click on a receipt card to view, edit, or delete

**Profile**
- Update your username and email
- Change your password
- View your account information

**Analytics** (Admin only)
- View system-wide statistics
- See all registered users
- Manage users (delete non-admin users)
- View spending trends and analytics
- Check top spenders

## Project Structure

```
frontend/
├── index.html          # Main HTML file (SPA structure)
├── css/
│   └── style.css      # Modern styles with glassmorphism
└── js/
    ├── config.js      # API endpoints and configuration
    ├── api.js         # API service layer
    ├── auth.js        # Authentication management
    ├── ui.js          # UI state and theme management
    ├── receipts.js    # Receipt CRUD operations
    ├── admin.js       # Admin panel features
    └── app.js         # Main application entry point
```

## Technologies Used

- **Vanilla JavaScript** (ES6+)
- **HTML5** & **CSS3**
- **Chart.js** - For analytics charts
- **Font Awesome** - For icons
- **Google Fonts** (Poppins)

## API Integration

The frontend communicates with the backend REST API:

- **Base URL:** `http://localhost:8080/api`
- **Authentication:** JWT tokens (stored in localStorage)
- **File Upload:** FormData with multipart/form-data

### API Endpoints Used:

**Authentication (Public)**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

**Users (Authenticated)**
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `GET /users/receipts` - Get user's receipts
- `POST /users/receipts` - Create new receipt
- `PUT /users/receipts/{id}` - Update receipt
- `DELETE /users/receipts/{id}` - Delete receipt
- `GET /users/receipts/search` - Search receipts

**Admin (Admin only)**
- `GET /admin/users` - Get all users
- `DELETE /admin/users/{id}` - Delete user
- `GET /admin/analytics` - Get system analytics

## Features Breakdown

### 🎨 Theme Switching
- Click the moon/sun icon in the header to toggle dark/light mode
- Preference is saved in localStorage

### 📁 File Upload
- Supports images (JPG, PNG, GIF) and PDFs
- Max file size: 10MB
- Drag-and-drop or click to browse
- Real-time preview for images

### 🔍 Search & Filter
- Search by store name or category
- Filter by category (Food, Shopping, Entertainment, etc.)
- Filter by payment method (Cash, Credit Card, Debit Card, UPI)
- Filter by date range
- Clear all filters with one click

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layouts and touch-friendly buttons

## Default Admin Account

To access admin features, login with:
- **Username:** `admin`
- **Password:** `admin123`

(This should be created in the backend database)

## Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ❌ IE (Not supported)

## Troubleshooting

**"Failed to fetch" errors:**
- Make sure backend is running on `http://localhost:8080`
- Check browser console for CORS errors
- Verify MySQL database is running

**Receipts not loading:**
- Check if you're logged in
- Verify JWT token in localStorage
- Check network tab in browser DevTools

**File upload not working:**
- Ensure file is under 10MB
- Check file type (images and PDFs only)
- Verify backend has write permissions

**Charts not displaying:**
- Make sure Chart.js is loaded (check browser console)
- Add some receipts first (charts need data)
- Try refreshing the page

## Development

To modify the frontend:

1. Edit the HTML in `index.html`
2. Update styles in `css/style.css`
3. Modify JavaScript in `js/` files
4. Refresh browser to see changes (or use Live Server for auto-reload)

## Future Enhancements

- 📧 Email notifications
- 📤 Export receipts to CSV/PDF
- 🏷️ Tags and custom categories
- 🔔 Spending alerts and budgets
- 📸 Camera integration for mobile
- 🌍 Multi-language support

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend logs
3. Ensure all prerequisites are met

---

**Enjoy using your Digital Receipt Collector! 🎉**
