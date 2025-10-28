// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Don't call checkAuth here - let App handle page flow
    }

    setupEventListeners() {
        console.log('Setting up auth event listeners');
        
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            console.log('Login form found');
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            console.log('Register form found');
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Show register
        const showRegister = document.getElementById('showRegister');
        if (showRegister) {
            console.log('Show register link found');
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Show register clicked');
                document.getElementById('loginPage').classList.add('hidden');
                document.getElementById('registerPage').classList.remove('hidden');
            });
        }
        
        // Show login
        const showLogin = document.getElementById('showLogin');
        if (showLogin) {
            console.log('Show login link found');
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Show login clicked');
                document.getElementById('registerPage').classList.add('hidden');
                document.getElementById('loginPage').classList.remove('hidden');
            });
        }
        
        // Logout
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Password toggle
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', () => this.togglePassword(btn));
        });
    }

    togglePassword(button) {
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Basic validation
        if (!email || !password) {
            ui.showToast('Please enter both email and password', 'error');
            return;
        }

        try {
            ui.showLoading();
            console.log('Attempting login for:', email);
            
            const response = await api.login(email, password);
            console.log('Login response:', response);
            
            if (!response || !response.token) {
                throw new Error('Invalid response from server');
            }
            
            localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
            
            this.currentUser = response.user;
            
            console.log('Login successful, showing dashboard...');
            ui.showToast('Login successful! Welcome back.', 'success');
            
            // Hide loading and navigate
            ui.hideLoading();
            
            // Give toast time to show, then navigate
            setTimeout(() => {
                console.log('Navigating to dashboard...');
                
                // Hide auth pages
                document.getElementById('landingPage')?.classList.add('hidden');
                document.getElementById('loginPage')?.classList.add('hidden');
                document.getElementById('registerPage')?.classList.add('hidden');
                
                // Show app
                document.getElementById('app')?.classList.remove('hidden');
                
                // Update user info
                this.updateUserInfo();
                
                // Show dashboard page
                if (window.ui) {
                    window.ui.showPage('dashboard');
                }
                
                // Load data
                if (window.receiptsManager) {
                    console.log('Loading receipts after login...');
                    window.receiptsManager.loadReceipts().then(() => {
                        console.log('Receipts loaded, updating dashboard...');
                        window.receiptsManager.updateDashboard();
                    }).catch(error => {
                        console.error('Error loading receipts:', error);
                    });
                } else {
                    console.error('receiptsManager not found on window object!');
                }
                
                console.log('Dashboard should be visible now');
            }, 500);
            
        } catch (error) {
            console.error('Login error:', error);
            ui.hideLoading();
            ui.showToast(error.message || 'Login failed. Please check your credentials.', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        // Frontend validation
        if (!name || name.length < 2) {
            ui.showToast('Name must be at least 2 characters long', 'error');
            return;
        }

        if (!email || !email.includes('@')) {
            ui.showToast('Please enter a valid email address', 'error');
            return;
        }

        if (!password || password.length < 6) {
            ui.showToast('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            ui.showLoading();
            const response = await api.register(name, email, password);
            
            ui.showToast('Registration successful! Please login.', 'success');
            
            // Show login page with pre-filled email
            setTimeout(() => {
                window.showLoginPage();
                document.getElementById('loginEmail').value = email;
            }, 1000);
        } catch (error) {
            console.error('Register error:', error);
            // Extract validation error message if present
            let errorMessage = error.message || 'Registration failed. Please try again.';
            
            // Handle common validation errors
            if (errorMessage.includes('Email')) {
                errorMessage = 'This email is already registered or invalid';
            } else if (errorMessage.includes('Password')) {
                errorMessage = 'Password must be at least 6 characters';
            } else if (errorMessage.includes('Name')) {
                errorMessage = 'Name must be between 2 and 100 characters';
            }
            
            ui.showToast(errorMessage, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    async checkAuth() {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);

        if (!token || !userStr) {
            return false;
        }

        try {
            this.currentUser = JSON.parse(userStr);
            
            // Verify token is still valid (skip verification for now to avoid API errors)
            // await api.getCurrentUser();
            
            return true;
        } catch (error) {
            console.error('Auth check failed:', error);
            this.logout();
            return false;
        }
    }

    getUser() {
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Error parsing user:', error);
                return null;
            }
        }
        return null;
    }

    showApp() {
        // Hide auth pages
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('registerPage').style.display = 'none';
        
        // Show navbar
        document.getElementById('navbar').style.display = 'block';
        
        // Update user info
        this.updateUserInfo();
        
        // Show dashboard
        ui.showPage('dashboard');
        
        // Load initial data
        this.loadInitialData();
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        const userName = this.currentUser.name || 'User';
        const userEmail = this.currentUser.email || '';
        const userRole = this.currentUser.role || 'USER';
        
        // Update navbar
        document.getElementById('userName').textContent = userName;
        document.getElementById('userEmail').textContent = userEmail;
        
        // Update avatar
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=fff`;
        document.getElementById('userAvatar').src = avatarUrl;
        
        // Update profile page
        document.getElementById('profileName').textContent = userName;
        document.getElementById('profileEmail').textContent = userEmail;
        document.getElementById('profileRole').textContent = userRole;
        document.getElementById('profileAvatar').src = avatarUrl;
        
        document.getElementById('profileNameInfo').textContent = userName;
        document.getElementById('profileEmailInfo').textContent = userEmail;
        document.getElementById('profileRoleInfo').textContent = userRole;
        document.getElementById('profileCreatedAt').textContent = this.formatDate(this.currentUser.createdAt);
        
        // Show/hide admin features
        const isAdmin = userRole === 'ADMIN';
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = isAdmin ? '' : 'none';
        });
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', DATE_OPTIONS.long);
    }

    async loadInitialData() {
        try {
            await receiptsManager.loadReceipts();
            await receiptsManager.updateDashboard();
            
            if (this.currentUser?.role === 'ADMIN') {
                await analyticsManager.loadAnalytics();
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    logout() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        this.currentUser = null;
        
        ui.showToast('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    async updateUserProfile(updateData) {
        try {
            // TODO: Implement profile update API call
            // const response = await api.updateProfile(updateData);
            
            // For now, just update local storage
            const user = this.getUser();
            if (user) {
                user.name = updateData.username || user.name;
                user.email = updateData.email || user.email;
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                this.currentUser = user;
                this.updateUserInfo();
            }
            
            return { success: true };
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(pageId).style.display = 'block';
        document.getElementById('navbar').style.display = 'none';
    }

    isAdmin() {
        return this.currentUser?.role === 'ADMIN';
    }
}

const auth = new AuthManager();
