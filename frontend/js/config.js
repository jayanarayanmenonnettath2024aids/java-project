// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    ENDPOINTS: {
        // Auth
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        
        // Users
        ME: '/users/me',
        
        // Receipts
        RECEIPTS: '/receipts',
        RECEIPTS_SEARCH: '/receipts/search',
        
        // Admin
        ADMIN_USERS: '/admin/users',
        ADMIN_ANALYTICS: '/admin/analytics'
    },
    TIMEOUT: 30000
};

// Storage Keys
const STORAGE_KEYS = {
    TOKEN: 'jwt_token',
    USER: 'current_user',
    THEME: 'theme'
};

// Chart Colors
const CHART_COLORS = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    purple: '#a855f7',
    orange: '#f59e0b'
};

// Category Colors
const CATEGORY_COLORS = {
    GROCERIES: '#10b981',
    ELECTRONICS: '#3b82f6',
    CLOTHING: '#a855f7',
    DINING: '#f59e0b',
    TRANSPORTATION: '#667eea',
    UTILITIES: '#06b6d4',
    HEALTHCARE: '#ef4444',
    ENTERTAINMENT: '#ec4899',
    OTHER: '#6b7280'
};

// Payment Method Colors
const PAYMENT_COLORS = {
    CASH: '#10b981',
    CREDIT_CARD: '#667eea',
    DEBIT_CARD: '#3b82f6',
    DIGITAL_WALLET: '#a855f7',
    OTHER: '#6b7280'
};

// Date Format Options
const DATE_OPTIONS = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
};

// Currency Format - Indian Rupees
const CURRENCY_FORMAT = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
});
