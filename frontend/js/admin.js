// Admin Manager
class AdminManager {
    constructor() {
        this.users = [];
        this.analytics = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Refresh buttons
        document.getElementById('refreshUsers')?.addEventListener('click', () => {
            this.loadUsers();
        });

        document.getElementById('refreshAnalytics')?.addEventListener('click', () => {
            this.loadAnalytics();
        });
    }

    async loadUsers() {
        try {
            ui.showLoading();
            this.users = await api.getAllUsers();
            this.renderUsers();
        } catch (error) {
            ui.showToast('Error loading users: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        if (this.users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-users fa-3x" style="margin-bottom: 1rem; opacity: 0.3;"></i>
                        <p>No users found</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>
                    <div style="font-weight: 600; color: var(--text);">${user.username}</div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span class="status-badge ${user.role === 'ADMIN' ? 'admin' : 'user'}">
                        ${user.role}
                    </span>
                </td>
                <td>${ui.formatDate(user.createdAt)}</td>
                <td>
                    ${user.role !== 'ADMIN' ? `
                        <button class="action-btn" onclick="adminManager.deleteUser(${user.id})" title="Delete User">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : '<span style="color: var(--text-light);">-</span>'}
                </td>
            </tr>
        `).join('');
    }

    async deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user? This will also delete all their receipts.')) {
            return;
        }

        try {
            ui.showLoading();
            await api.deleteUser(id);
            ui.showToast('User deleted successfully', 'success');
            await this.loadUsers();
            await this.loadAnalytics();
        } catch (error) {
            ui.showToast('Error deleting user: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    async loadAnalytics() {
        try {
            ui.showLoading();
            this.analytics = await api.getAnalytics();
            this.renderAnalytics();
        } catch (error) {
            ui.showToast('Error loading analytics: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    renderAnalytics() {
        if (!this.analytics) return;

        // Update analytics cards
        document.getElementById('adminTotalUsers').textContent = this.analytics.totalUsers || '0';
        document.getElementById('adminTotalReceipts').textContent = this.analytics.totalReceipts || '0';
        document.getElementById('adminTotalSpent').textContent = ui.formatCurrency(this.analytics.totalAmount || 0);
        document.getElementById('adminAvgPerUser').textContent = ui.formatCurrency(
            this.analytics.totalUsers > 0 ? (this.analytics.totalAmount / this.analytics.totalUsers) : 0
        );

        // Render charts
        this.renderCategoryBreakdown();
        this.renderMonthlyTrend();
        this.renderTopSpenders();
    }

    renderCategoryBreakdown() {
        const canvas = document.getElementById('adminCategoryChart');
        if (!canvas || !this.analytics?.categoryBreakdown) return;

        const categories = Object.keys(this.analytics.categoryBreakdown);
        const amounts = Object.values(this.analytics.categoryBreakdown);
        const colors = categories.map(cat => ui.getCategoryColor(cat));

        if (window.adminCategoryChartInstance) {
            window.adminCategoryChartInstance.destroy();
        }

        window.adminCategoryChartInstance = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    data: amounts,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: 'var(--card-bg)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--text)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + ui.formatCurrency(context.parsed);
                            }
                        }
                    }
                }
            }
        });
    }

    renderMonthlyTrend() {
        const canvas = document.getElementById('adminMonthlyChart');
        if (!canvas || !this.analytics?.monthlyTrend) return;

        const months = Object.keys(this.analytics.monthlyTrend).sort();
        const amounts = months.map(m => this.analytics.monthlyTrend[m]);

        if (window.adminMonthlyChartInstance) {
            window.adminMonthlyChartInstance.destroy();
        }

        window.adminMonthlyChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: months.map(m => this.formatMonthYear(m)),
                datasets: [{
                    label: 'Total Spent',
                    data: amounts,
                    borderColor: 'var(--primary)',
                    backgroundColor: 'var(--primary-light)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: 'var(--text)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Amount: ' + ui.formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'var(--text-light)',
                            callback: function(value) {
                                return '$' + value.toFixed(0);
                            }
                        },
                        grid: {
                            color: 'var(--border)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'var(--text-light)'
                        },
                        grid: {
                            color: 'var(--border)'
                        }
                    }
                }
            }
        });
    }

    renderTopSpenders() {
        const container = document.getElementById('topSpenders');
        if (!container || !this.analytics?.topSpenders) return;

        if (this.analytics.topSpenders.length === 0) {
            container.innerHTML = ui.createEmptyState('fa-trophy', 'No spending data', 'Users will appear here once they add receipts');
            return;
        }

        container.innerHTML = this.analytics.topSpenders.map((user, index) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--card-bg); border-radius: var(--radius); margin-bottom: 0.75rem; border-left: 3px solid ${this.getRankColor(index)};">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 2rem; height: 2rem; background: ${this.getRankColor(index)}20; color: ${this.getRankColor(index)}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${index + 1}
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--text);">${user.username}</div>
                        <div style="font-size: 0.875rem; color: var(--text-light);">${user.email}</div>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 700; color: var(--primary); text-align: right;">${ui.formatCurrency(user.totalSpent)}</div>
                    <div style="font-size: 0.875rem; color: var(--text-light); text-align: right;">${user.receiptCount} receipts</div>
                </div>
            </div>
        `).join('');
    }

    getRankColor(index) {
        const colors = ['#FFD700', '#C0C0C0', '#CD7F32', 'var(--primary)', 'var(--success)'];
        return colors[index] || 'var(--text-light)';
    }

    formatMonthYear(dateStr) {
        const date = new Date(dateStr);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + date.getFullYear();
    }
}

const adminManager = new AdminManager();
