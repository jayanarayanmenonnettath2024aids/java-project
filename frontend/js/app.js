// Date Options (CURRENCY_FORMAT is defined in config.js)
const DATE_OPTIONS = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
};

const CATEGORY_COLORS = {
    FOOD: '#FF6B6B',
    TRANSPORTATION: '#4ECDC4',
    SHOPPING: '#45B7D1',
    ENTERTAINMENT: '#FFA07A',
    HEALTHCARE: '#98D8C8',
    UTILITIES: '#F7DC6F',
    EDUCATION: '#BB8FCE',
    OTHER: '#95A5A6'
};

const PAYMENT_COLORS = {
    CASH: '#52C41A',
    CREDIT_CARD: '#1890FF',
    DEBIT_CARD: '#13C2C2',
    UPI: '#722ED1',
    OTHER: '#95A5A6'
};

// Analytics Manager (for admin analytics page)
class AnalyticsManager {
    constructor() {
        this.analytics = null;
    }

    async loadAnalytics() {
        if (!auth.isAdmin()) {
            ui.showToast('Access denied', 'error');
            return;
        }

        try {
            ui.showLoading();
            await adminManager.loadAnalytics();
            await adminManager.loadUsers();
        } catch (error) {
            ui.showToast('Error loading analytics: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }
}

const analyticsManager = new AnalyticsManager();

// Application Initialization
class App {
    constructor() {
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initApp());
        } else {
            this.initApp();
        }
    }

    initApp() {
        console.log('Initializing app...');
        
        // Check if user is logged in
        const user = auth.getUser();
        
        if (user) {
            // User is logged in - show dashboard
            this.showApp();
            this.loadInitialData();
        } else {
            // Show landing page
            this.showLandingPage();
        }

        // Setup all event listeners
        this.setupEventListeners();
        
        // Check admin features
        this.setupAdminFeatures();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Landing page buttons
        const getStartedBtn = document.getElementById('getStartedBtn');
        const signInBtn = document.getElementById('signInBtn');
        
        if (getStartedBtn) {
            console.log('Get Started button found, attaching listener');
            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Get Started clicked!');
                this.showAuthPage('register');
            });
        } else {
            console.warn('Get Started button not found!');
        }

        if (signInBtn) {
            console.log('Sign In button found, attaching listener');
            signInBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Sign In clicked!');
                this.showAuthPage('login');
            });
        } else {
            console.warn('Sign In button not found!');
        }

        // Setup logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Setup profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                this.handleProfileUpdate(e);
            });
        }
    }

    showLandingPage() {
        document.getElementById('landingPage')?.classList.remove('hidden');
        document.getElementById('loginPage')?.classList.add('hidden');
        document.getElementById('registerPage')?.classList.add('hidden');
        document.getElementById('app')?.classList.add('hidden');
    }

    showAuthPage(type = 'login') {
        document.getElementById('landingPage')?.classList.add('hidden');
        document.getElementById('app')?.classList.add('hidden');
        
        if (type === 'login') {
            document.getElementById('loginPage')?.classList.remove('hidden');
            document.getElementById('registerPage')?.classList.add('hidden');
        } else {
            document.getElementById('loginPage')?.classList.add('hidden');
            document.getElementById('registerPage')?.classList.remove('hidden');
        }
    }

    showApp() {
        document.getElementById('landingPage')?.classList.add('hidden');
        document.getElementById('loginPage')?.classList.add('hidden');
        document.getElementById('registerPage')?.classList.add('hidden');
        document.getElementById('app')?.classList.remove('hidden');
        
        // Show dashboard by default
        ui.showPage('dashboard');
        
        // Update user info
        auth.updateUserInfo();
    }

    async loadInitialData() {
        try {
            console.log('Loading initial data...');
            
            // Ensure receiptsManager is available
            if (!window.receiptsManager) {
                console.error('receiptsManager not available!');
                return;
            }
            
            // Load receipts
            console.log('Calling receiptsManager.loadReceipts()...');
            await window.receiptsManager.loadReceipts();
            
            console.log('Receipts loaded, updating dashboard...');
            // Update dashboard
            await window.receiptsManager.updateDashboard();
            
            console.log('Dashboard updated successfully');
            
            // Load admin data if admin
            if (auth.isAdmin()) {
                // Don't load immediately, will load when user navigates to analytics
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
            ui.showToast('Error loading data: ' + error.message, 'error');
        }
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            auth.logout();
            this.showAuthPage('login');
            ui.showToast('Logged out successfully', 'success');
        }
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        
        const username = document.getElementById('profileUsername').value;
        const email = document.getElementById('profileEmail').value;
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate
        if (newPassword && newPassword !== confirmPassword) {
            ui.showToast('Passwords do not match', 'error');
            return;
        }

        if (newPassword && newPassword.length < 6) {
            ui.showToast('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            ui.showLoading();

            const updateData = {
                username,
                email
            };

            if (newPassword) {
                updateData.currentPassword = currentPassword;
                updateData.newPassword = newPassword;
            }

            await auth.updateUserProfile(updateData);
            ui.showToast('Profile updated successfully', 'success');
            
            // Clear password fields
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        } catch (error) {
            ui.showToast('Error updating profile: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    setupAdminFeatures() {
        const user = auth.getUser();
        const analyticsNav = document.getElementById('analyticsNav');
        
        if (user && user.role === 'ADMIN') {
            // Show analytics menu
            if (analyticsNav) {
                analyticsNav.style.display = 'flex';
            }
        } else {
            // Hide analytics menu
            if (analyticsNav) {
                analyticsNav.style.display = 'none';
            }
        }
    }
}

// Global functions for inline onclick handlers
window.showRegisterPage = function() {
    console.log('Global showRegisterPage called');
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
};

window.showLoginPage = function() {
    console.log('Global showLoginPage called');
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
};

// Initialize app when DOM is ready
window.app = null;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing app');
    window.app = new App();
});

// Add global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (typeof ui !== 'undefined') {
        ui.showToast('An unexpected error occurred', 'error');
    }
});
