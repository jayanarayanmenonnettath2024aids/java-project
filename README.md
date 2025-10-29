# Digital Receipt Collector 📱💳

A comprehensive **Digital Receipt Collector** web application built with **Spring Boot 3.x**, **Spring Security (JWT)**, **MySQL**, and **Modern Vanilla JavaScript**. This application allows users to securely upload, manage, categorize, and analyze digital receipts from online and offline purchases with a beautiful, responsive UI.

---

## 🚀 Features

### Modern UI/UX
- 🎨 **Beautiful Dashboard** with glassmorphism design and smooth animations
- 📊 **8 KPI Cards** showing Total Receipts, Total Spent, Monthly spending, Average, Weekly spending, Highest receipt, Top category, and Savings
- 📈 **Trend Indicators** with up/down arrows and percentage changes
- 💰 **INR Currency Format** (₹) throughout the application
- 🌓 **Dark/Light Theme Toggle** for comfortable viewing
- 📱 **Fully Responsive** design for mobile, tablet, and desktop
- 🖼️ **Image Preview** with full-screen modal for receipt images
- 🎯 **Enhanced Filters** with active count badges and emoji icons
- 🔍 **Real-time Search** by store name, category, payment method, and date range
- 📊 **Category Chart** with beautiful donut visualization

### User Management
- ✅ User registration and login with JWT-based authentication
- ✅ Role-based access control (USER and ADMIN roles)
- ✅ Secure password encryption using BCrypt
- ✅ User profile management
- 🔐 Persistent login with localStorage

### Receipt Management
- 📤 Upload digital receipts (PDF, images)
- 🏪 Store receipt metadata (store name, date, amount, category, payment method)
- 🔍 Advanced search and filter receipts by store name, category, and date range
- ✏️ Update and delete receipts with confirmation dialogs
- 📄 Paginated receipt listing with sorting options
- 💾 File storage with automatic file management
- 🖼️ Receipt image display with full-screen preview

### Admin Features
- 👥 View and manage all users
- 🗑️ Delete users and their receipts
- 📊 Comprehensive analytics dashboard:
  - Total users and receipts
  - Total spending
  - Spending by category
  - Receipts by payment method
  - Monthly receipt count and spending trends

### API Documentation
- 📚 RESTful API with comprehensive endpoints
- 🔐 JWT Bearer token authentication
- 📖 Swagger UI available at `/swagger-ui.html` (optional)

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17+ | Programming Language |
| **Spring Boot** | 3.2.0 | Application Framework |
| **Spring Data JPA** | - | Database ORM |
| **Spring Security** | - | Authentication & Authorization |
| **JWT (JJWT)** | 0.12.3 | Token-based Authentication |
| **MySQL** | 8.0+ | Database |
| **Lombok** | - | Reduce Boilerplate Code |
| **Swagger/OpenAPI** | 2.3.0 | API Documentation |
| **Maven** | 3.6+ | Build Tool |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vanilla JavaScript** | ES6+ | Pure JavaScript (No frameworks) |
| **HTML5** | - | Semantic Markup |
| **CSS3** | - | Modern Styling with Glassmorphism |
| **Chart.js** | 4.4.0 | Category Spending Visualization |
| **Font Awesome** | - | Icons |
| **Google Fonts** | - | Poppins Font Family |

---

## 📦 Project Structure

### Backend (Spring Boot)
```
com.digitalreceiptcollector
├── controller          # REST API Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── ReceiptController.java
│   └── AdminController.java
├── service            # Business Logic Layer
│   ├── AuthService.java
│   ├── UserService.java
│   ├── ReceiptService.java
│   ├── FileStorageService.java
│   └── AdminService.java
├── repository         # Data Access Layer
│   ├── UserRepository.java
│   └── ReceiptRepository.java
├── model              # JPA Entities
│   ├── User.java
│   └── Receipt.java
├── dto                # Data Transfer Objects
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   ├── JwtResponse.java
│   ├── UserResponse.java
│   ├── ReceiptRequest.java
│   ├── ReceiptResponse.java
│   └── AnalyticsResponse.java
├── security           # Security Components
│   ├── JwtUtils.java
│   ├── UserDetailsImpl.java
│   ├── UserDetailsServiceImpl.java
│   ├── AuthTokenFilter.java
│   └── AuthEntryPointJwt.java
├── config             # Configuration Classes
│   ├── SecurityConfig.java
│   ├── OpenApiConfig.java
│   └── WebConfig.java
└── exception          # Exception Handling
    ├── GlobalExceptionHandler.java
    ├── ResourceNotFoundException.java
    ├── BadRequestException.java
    ├── FileStorageException.java
    └── ErrorResponse.java
```

### Frontend (Vanilla JavaScript)
```
frontend/
├── index.html              # Main SPA HTML
├── css/
│   └── style.css          # 1134+ lines of modern CSS with glassmorphism
├── js/
│   ├── config.js          # API configuration
│   ├── api.js             # API client with JWT handling
│   ├── auth.js            # Authentication logic
│   ├── ui.js              # UI utilities and helpers
│   ├── receipts.js        # Receipt management (570+ lines)
│   ├── admin.js           # Admin panel functionality
│   └── app.js             # Application initialization
└── README.md              # Frontend documentation
```

---

## 🔧 Prerequisites

Before running the application, ensure you have:

1. **Java 17 or higher** installed
2. **Maven 3.6+** installed
3. **MySQL 8.0+** installed and running
4. Git (optional, for cloning)

---

## ⚙️ Installation & Setup

### Quick Start (Recommended)

Use the automated PowerShell script to build and run both backend and frontend:

```powershell
.\build-and-run.ps1
```

This will:
1. ✅ Set JAVA_HOME and MAVEN_HOME
2. ✅ Build the Spring Boot application
3. ✅ Start the backend server on port 8080
4. ✅ Open the frontend UI in your default browser

### Manual Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/jayanarayanmenonnettath2024aids/java-project.git
cd java-project
```

#### 2. Configure MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE digital_receipt_db;
```

Run the schema and sample data:

```bash
mysql -u root -p digital_receipt_db < database-schema.sql
mysql -u root -p digital_receipt_db < add-sample-receipts.sql
```

#### 3. Update Database Credentials (if needed)

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/digital_receipt_db
spring.datasource.username=root
spring.datasource.password=root
```

#### 4. Build and Run Backend

```bash
mvn clean install
mvn spring-boot:run
```

The backend API will start on **http://localhost:8080**

#### 5. Open Frontend

Open `frontend/index.html` in your browser or use:

```bash
start frontend/index.html
```

The UI will be available and will connect to the backend API.

### Default Login Credentials

```
Email: jaya@gmail.com
Password: (use the password you set during registration)
```

Or create a new account using the registration page.

---

## 📡 API Endpoints

### 🔓 Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### 🔒 Protected Endpoints (Requires JWT Token)

#### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |

#### Receipt Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/receipts` | Upload a new receipt |
| GET | `/api/receipts` | Get all receipts (paginated) |
| GET | `/api/receipts/{id}` | Get receipt by ID |
| PUT | `/api/receipts/{id}` | Update a receipt |
| DELETE | `/api/receipts/{id}` | Delete a receipt |
| GET | `/api/receipts/search` | Search receipts with filters |

#### Admin Endpoints (ADMIN Role Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/{id}` | Get user by ID |
| DELETE | `/api/admin/users/{id}` | Delete user |
| GET | `/api/admin/analytics` | Get analytics dashboard |

---

## 📝 API Usage Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jayanarayan",
    "email": "jay@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jay@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "Jayanarayan",
  "email": "jay@example.com",
  "role": "USER"
}
```

### 3. Upload a Receipt

```bash
curl -X POST http://localhost:8080/api/receipts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'receipt={
    "storeName": "Amazon",
    "purchaseDate": "2025-10-27",
    "totalAmount": 1999.99,
    "category": "Electronics",
    "paymentMethod": "Credit Card"
  };type=application/json' \
  -F 'file=@/path/to/receipt.pdf'
```

### 4. Get All Receipts

```bash
curl -X GET "http://localhost:8080/api/receipts?page=0&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Search Receipts

```bash
curl -X GET "http://localhost:8080/api/receipts/search?category=Electronics&startDate=2025-01-01&endDate=2025-12-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Get Analytics (Admin Only)

```bash
curl -X GET http://localhost:8080/api/admin/analytics \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

---

## 🎨 UI Features

### Modern Design
- **Glassmorphism Effect**: Frosted glass cards with blur effects
- **Smooth Animations**: Fade-in, slide-in, and hover transitions
- **Color Scheme**: Purple gradient theme with proper contrast
- **Responsive Layout**: Mobile-first design that works on all devices

### Dashboard
- **8 KPI Cards**: Comprehensive financial overview at a glance
- **Trend Indicators**: Visual up/down arrows with percentage changes
- **Category Chart**: Interactive donut chart for spending by category
- **Recent Receipts**: Card-based layout with image thumbnails

### Interactive Elements
- **Theme Toggle**: Switch between dark and light modes
- **Filter Panel**: Advanced filters with active count badges
- **Image Preview**: Full-screen modal with zoom capability
- **Form Modals**: Smooth modal dialogs for add/edit operations
- **Confirmation Dialogs**: User-friendly delete confirmations

### User Experience
- **Real-time Updates**: Instant dashboard refresh after operations
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation with helpful hints
- **Persistent Sessions**: Auto-login with localStorage

---

## 🔐 Creating an Admin User

By default, users are registered with the `USER` role. To create an admin user, you need to manually update the database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

Alternatively, you can modify the registration logic to accept a role parameter.

---

## 📚 API Documentation & Testing

### Using the Web UI (Recommended)

1. Start the backend server
2. Open `frontend/index.html` in your browser
3. Register/Login with your credentials
4. Use the intuitive UI to manage receipts

### Using Swagger UI (For Developers)

Access the interactive API documentation at:

**http://localhost:8080/swagger-ui.html**

Features:
- 🔍 Explore all API endpoints
- 🧪 Test endpoints directly from the browser
- 🔐 Authenticate with JWT token (click "Authorize" button)
- 📖 View request/response schemas

### Using cURL (For Testing)

See the [API Usage Examples](#📝-api-usage-examples) section below for cURL commands.

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  role ENUM('USER', 'ADMIN'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Receipts Table
```sql
CREATE TABLE receipts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  store_name VARCHAR(255),
  purchase_date DATE,
  total_amount DECIMAL(10,2),
  category VARCHAR(100),
  payment_method VARCHAR(50),
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📂 File Upload

Uploaded receipt files are stored in the `./uploads/receipts` directory. The directory is created automatically on application startup.

**Supported Formats:**
- PDF documents
- Image files (JPG, PNG, etc.)

**Configuration:**
```properties
app.file.upload-dir=./uploads/receipts
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

---

## 🧪 Testing

### Test the Web UI

1. Start the application using `.\build-and-run.ps1`
2. The frontend will open automatically in your browser
3. Register a new account or login with existing credentials
4. Test features:
   - ✅ Add receipts with file upload
   - ✅ View dashboard with 8 KPIs
   - ✅ Filter receipts by category, payment method, date
   - ✅ Edit and delete receipts
   - ✅ Toggle dark/light theme
   - ✅ View receipt images in full screen

### Test with Swagger UI

1. Start the backend: `mvn spring-boot:run`
2. Navigate to http://localhost:8080/swagger-ui.html
3. Click "Authorize" and enter your JWT token
4. Test endpoints directly from the UI

### Run Unit Tests

```bash
mvn test
```

---

## 🔍 Example Analytics Response

```json
{
  "totalUsers": 15,
  "totalReceipts": 127,
  "totalSpending": 45678.90,
  "receiptsByCategory": {
    "Electronics": 23,
    "Groceries": 45,
    "Travel": 12,
    "Entertainment": 18
  },
  "spendingByCategory": {
    "Electronics": 12340.50,
    "Groceries": 5678.30,
    "Travel": 15670.00,
    "Entertainment": 3450.10
  },
  "receiptsByPaymentMethod": {
    "Credit Card": 78,
    "Debit Card": 32,
    "Cash": 17
  },
  "monthlyReceiptCount": {
    "2025-01": 12,
    "2025-02": 15,
    "2025-10": 25
  },
  "monthlySpending": {
    "2025-01": 3456.78,
    "2025-02": 4567.89,
    "2025-10": 8765.43
  }
}
```

---

## 🚀 Deployment

### Deploy to Production

1. Update `application.properties` with production database credentials
2. Generate a strong JWT secret
3. Build the JAR file:
   ```bash
   mvn clean package -DskipTests
   ```
4. Run the JAR:
   ```bash
   java -jar target/digital-receipt-collector-1.0.0.jar
   ```

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/digital-receipt-collector-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t digital-receipt-collector .
docker run -p 8080:8080 digital-receipt-collector
```

---

## 🔒 Security Features

- ✅ Password encryption with BCrypt
- ✅ JWT-based stateless authentication
- ✅ CORS configuration for cross-origin requests
- ✅ Role-based access control (RBAC)
- ✅ Custom authentication entry point
- ✅ Request validation
- ✅ Global exception handling

---

## 🌟 Future Enhancements

- [ ] OCR integration for automatic receipt text extraction (Tesseract)
- [ ] Cloud storage integration (AWS S3, Azure Blob Storage)
- [ ] Email notifications for new uploads
- [ ] Export receipts as PDF/CSV reports
- [ ] Mobile app integration
- [ ] Receipt sharing between users
- [ ] Budget tracking and alerts
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

---

## � UI Screenshots

### Login Page
- Clean, modern login interface with glassmorphism design
- Registration form with validation
- Responsive layout for all devices

### Dashboard
- 8 KPI cards showing financial metrics with trend indicators
- Category spending chart (donut visualization)
- Recent receipts grid with image thumbnails
- Quick actions (Add Receipt, Filters, Theme Toggle)

### Receipt Management
- Advanced filter panel with search and category filters
- Receipt cards with store name, amount, date, and image preview
- Edit and delete actions with confirmation dialogs
- Full-screen image viewer modal

### Add/Edit Receipt
- Form modal with all receipt details
- File upload with drag-and-drop support
- Category and payment method dropdowns
- Date picker for purchase date
- Real-time validation

### Theme Support
- Dark mode with purple gradient theme
- Light mode with clean white interface
- Smooth theme transitions
- User preference persistence

---

## �👨‍💻 Author

**Jayanarayan Menon Nettath**
- Email: jayanarayanmenonnettath2024aids@example.com
- GitHub: [@jayanarayanmenonnettath2024aids](https://github.com/jayanarayanmenonnettath2024aids)
- Repository: [java-project](https://github.com/jayanarayanmenonnettath2024aids/java-project)

---

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- JWT.io for JWT implementation guidance
- MySQL for the robust database system
- Chart.js for beautiful data visualization
- Font Awesome for comprehensive icon library
- The open-source community for inspiration

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact jay@example.com.

---

**Happy Receipt Collecting! 📱💰**
