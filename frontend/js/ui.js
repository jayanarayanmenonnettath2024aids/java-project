// UI Manager
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTheme();
        this.setupUserMenu();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
            });
        });

        document.querySelectorAll('.dropdown-item[data-page]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.showPage(page);
                this.closeUserMenu();
            });
        });
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            if (page.id !== 'loginPage' && page.id !== 'registerPage') {
                page.style.display = 'none';
            }
        });

        // Show selected page
        const pageElement = document.getElementById(`${pageName}Page`);
        if (pageElement) {
            pageElement.style.display = 'block';
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });

        // Load page data
        this.loadPageData(pageName);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadPageData(pageName) {
        switch(pageName) {
            case 'dashboard':
                receiptsManager.updateDashboard();
                break;
            case 'receipts':
                receiptsManager.renderReceipts();
                break;
            case 'analytics':
                if (auth.isAdmin()) {
                    analyticsManager.loadAnalytics();
                }
                break;
            case 'profile':
                auth.updateUserInfo();
                break;
        }
    }

    setupTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        this.setTheme(savedTheme);

        // Setup all theme toggles
        const toggleIds = ['landingThemeToggle', 'loginThemeToggle', 'registerThemeToggle', 'dashboardThemeToggle'];
        
        toggleIds.forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        
        // Update all theme toggle icons
        const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        const toggleIds = ['landingThemeToggle', 'loginThemeToggle', 'registerThemeToggle', 'dashboardThemeToggle'];
        
        toggleIds.forEach(id => {
            const icon = document.querySelector(`#${id} i`);
            if (icon) {
                icon.className = iconClass;
            }
        });
    }

    setupUserMenu() {
        const userMenu = document.getElementById('userMenu');
        const userAvatar = document.getElementById('userAvatar');

        userAvatar?.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userMenu?.contains(e.target)) {
                this.closeUserMenu();
            }
        });
    }

    closeUserMenu() {
        document.getElementById('userMenu')?.classList.remove('active');
    }

    showToast(message, type = 'success') {
        // Create toast element if it doesn't exist
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 
                         'fa-exclamation-triangle';
        
        toast.innerHTML = `
            <i class="fas ${iconClass}" style="margin-right: 10px;"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    showModal(modalId) {
        document.getElementById(modalId)?.classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
    }

    formatCurrency(amount) {
        return CURRENCY_FORMAT.format(amount || 0);
    }

    formatDate(dateString, format = 'short') {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', DATE_OPTIONS[format]);
    }

    getCategoryColor(category) {
        return CATEGORY_COLORS[category] || CATEGORY_COLORS.OTHER;
    }

    getPaymentColor(paymentMethod) {
        return PAYMENT_COLORS[paymentMethod] || PAYMENT_COLORS.OTHER;
    }

    createEmptyState(icon, title, message) {
        return `
            <div class="empty-state" style="text-align: center; padding: 3rem;">
                <i class="fas ${icon}" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text); margin-bottom: 0.5rem;">${title}</h3>
                <p style="color: var(--text-light);">${message}</p>
            </div>
        `;
    }
}

const ui = new UIManager();

// Global theme toggle function for inline onclick handlers
window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    ui.setTheme(newTheme);
};
