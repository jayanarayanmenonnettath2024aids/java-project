// Receipts Manager
class ReceiptsManager {
    constructor() {
        this.receipts = [];
        this.filteredReceipts = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add receipt button
        document.getElementById('addReceiptBtn')?.addEventListener('click', () => {
            this.showReceiptModal();
        });

        // Modal close buttons
        document.getElementById('closeModal')?.addEventListener('click', () => {
            ui.hideModal('receiptModal');
        });

        document.getElementById('cancelModal')?.addEventListener('click', () => {
            ui.hideModal('receiptModal');
        });

        // Receipt form submit
        document.getElementById('receiptForm')?.addEventListener('submit', (e) => {
            this.handleReceiptSubmit(e);
        });

        // File upload
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('receiptFile');

        fileUploadArea?.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput?.addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        // Drag and drop
        fileUploadArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--primary)';
        });

        fileUploadArea?.addEventListener('dragleave', () => {
            fileUploadArea.style.borderColor = 'var(--border)';
        });

        fileUploadArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--border)';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.handleFileSelect({ target: fileInput });
            }
        });

        // Search and filters
        document.getElementById('searchReceipts')?.addEventListener('input', (e) => {
            this.filterReceipts();
        });

        document.getElementById('filterCategory')?.addEventListener('change', () => {
            this.filterReceipts();
        });

        document.getElementById('filterPayment')?.addEventListener('change', () => {
            this.filterReceipts();
        });

        document.getElementById('filterDateFrom')?.addEventListener('change', () => {
            this.filterReceipts();
        });

        document.getElementById('filterDateTo')?.addEventListener('change', () => {
            this.filterReceipts();
        });

        document.getElementById('clearFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });
    }

    async loadReceipts() {
        try {
            ui.showLoading();
            console.log('Loading receipts...');
            this.receipts = await api.getReceipts();
            console.log('Loaded receipts:', this.receipts);
            this.filteredReceipts = [...this.receipts];
            this.renderReceipts();
        } catch (error) {
            console.error('Error loading receipts:', error);
            ui.showToast('Error loading receipts: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    filterReceipts() {
        const search = document.getElementById('searchReceipts')?.value.toLowerCase() || '';
        const category = document.getElementById('filterCategory')?.value || '';
        const payment = document.getElementById('filterPayment')?.value || '';
        const dateFrom = document.getElementById('filterDateFrom')?.value || '';
        const dateTo = document.getElementById('filterDateTo')?.value || '';

        // Count active filters
        let activeFilters = 0;
        if (search) activeFilters++;
        if (category) activeFilters++;
        if (payment) activeFilters++;
        if (dateFrom) activeFilters++;
        if (dateTo) activeFilters++;

        // Update active filter badge
        const filterBadge = document.getElementById('activeFiltersCount');
        if (filterBadge) {
            if (activeFilters > 0) {
                filterBadge.textContent = `${activeFilters} active`;
                filterBadge.style.display = 'block';
            } else {
                filterBadge.style.display = 'none';
            }
        }

        this.filteredReceipts = this.receipts.filter(receipt => {
            const matchesSearch = !search || 
                receipt.storeName.toLowerCase().includes(search) ||
                receipt.category?.toLowerCase().includes(search);
            
            const matchesCategory = !category || receipt.category === category;
            const matchesPayment = !payment || receipt.paymentMethod === payment;
            
            const matchesDateFrom = !dateFrom || new Date(receipt.purchaseDate) >= new Date(dateFrom);
            const matchesDateTo = !dateTo || new Date(receipt.purchaseDate) <= new Date(dateTo);

            return matchesSearch && matchesCategory && matchesPayment && matchesDateFrom && matchesDateTo;
        });

        this.renderReceipts();
    }

    clearFilters() {
        document.getElementById('searchReceipts').value = '';
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterPayment').value = '';
        document.getElementById('filterDateFrom').value = '';
        document.getElementById('filterDateTo').value = '';
        this.filterReceipts();
    }

    renderReceipts() {
        const grid = document.getElementById('receiptsGrid');
        if (!grid) return;

        if (this.filteredReceipts.length === 0) {
            grid.innerHTML = ui.createEmptyState('fa-receipt', 'No receipts found', 'Add your first receipt to get started');
            return;
        }

        grid.innerHTML = this.filteredReceipts.map(receipt => this.createReceiptCard(receipt)).join('');
    }

    createReceiptCard(receipt) {
        const categoryColor = ui.getCategoryColor(receipt.category);
        const imageUrl = receipt.fileUrl || '';
        const hasImage = imageUrl && !imageUrl.includes('placeholder');

        return `
            <div class="receipt-card">
                <div class="receipt-image-container" onclick="window.receiptsManager.viewReceiptImage('${imageUrl}', '${receipt.storeName}')">
                    ${hasImage ? 
                        `<img src="${imageUrl}" alt="${receipt.storeName}" class="receipt-image" onerror="this.parentElement.innerHTML='<div class=\\'receipt-image-placeholder\\'><i class=\\'fas fa-receipt fa-3x\\'></i><p>No Image</p></div>'">
                        <div class="receipt-image-overlay">
                            <i class="fas fa-search-plus"></i> View
                        </div>` :
                        `<div class="receipt-image-placeholder">
                            <i class="fas fa-receipt fa-3x"></i>
                            <p>No Image Available</p>
                        </div>`
                    }
                </div>
                <div class="receipt-content">
                    <div class="receipt-header">
                        <div class="receipt-store">${receipt.storeName}</div>
                        <div class="receipt-amount">${ui.formatCurrency(receipt.totalAmount)}</div>
                    </div>
                    <div class="receipt-meta">
                        <div class="receipt-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${ui.formatDate(receipt.purchaseDate)}</span>
                        </div>
                        <div class="receipt-meta-item">
                            <i class="fas fa-tag"></i>
                            <span>${receipt.category || 'Uncategorized'}</span>
                        </div>
                        <div class="receipt-meta-item">
                            <i class="fas fa-credit-card"></i>
                            <span>${this.formatPaymentMethod(receipt.paymentMethod)}</span>
                        </div>
                    </div>
                    <div class="receipt-footer">
                        <span class="receipt-badge" style="background: ${categoryColor}20; color: ${categoryColor};">
                            ${receipt.category || 'OTHER'}
                        </span>
                        <div class="receipt-actions">
                            <button class="action-btn" onclick="window.receiptsManager.editReceipt(${receipt.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn" onclick="window.receiptsManager.deleteReceipt(${receipt.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatPaymentMethod(method) {
        if (!method) return 'N/A';
        return method.replace(/_/g, ' ').toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    showReceiptModal(receipt = null) {
        this.currentEditId = receipt?.id || null;
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitReceipt');

        if (receipt) {
            modalTitle.textContent = 'Edit Receipt';
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Receipt';
            this.fillReceiptForm(receipt);
        } else {
            modalTitle.textContent = 'Add Receipt';
            submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Receipt';
            this.resetReceiptForm();
        }

        ui.showModal('receiptModal');
    }

    fillReceiptForm(receipt) {
        document.getElementById('storeName').value = receipt.storeName || '';
        document.getElementById('purchaseDate').value = receipt.purchaseDate || '';
        document.getElementById('totalAmount').value = receipt.totalAmount || '';
        document.getElementById('category').value = receipt.category || 'OTHER';
        document.getElementById('paymentMethod').value = receipt.paymentMethod || 'CASH';
    }

    resetReceiptForm() {
        document.getElementById('receiptForm').reset();
        document.getElementById('filePreview').style.display = 'none';
        document.getElementById('filePreview').innerHTML = '';
        document.getElementById('purchaseDate').valueAsDate = new Date();
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            ui.showToast('File size exceeds 10MB limit', 'error');
            e.target.value = '';
            return;
        }

        const preview = document.getElementById('filePreview');
        preview.style.display = 'block';
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100%; border-radius: var(--radius);">
                    <p style="margin-top: 0.5rem; color: var(--text-light);">${file.name}</p>
                `;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `
                <i class="fas fa-file-pdf" style="font-size: 3rem; color: var(--danger);"></i>
                <p style="margin-top: 0.5rem; color: var(--text-light);">${file.name}</p>
            `;
        }
    }

    async handleReceiptSubmit(e) {
        e.preventDefault();

        const receiptData = {
            storeName: document.getElementById('storeName').value,
            purchaseDate: document.getElementById('purchaseDate').value,
            totalAmount: parseFloat(document.getElementById('totalAmount').value),
            category: document.getElementById('category').value,
            paymentMethod: document.getElementById('paymentMethod').value
        };

        const formData = new FormData();
        // Backend expects JSON as 'receipt' RequestPart
        formData.append('receipt', new Blob([JSON.stringify(receiptData)], { type: 'application/json' }));

        const fileInput = document.getElementById('receiptFile');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        try {
            ui.showLoading();

            if (this.currentEditId) {
                await api.updateReceipt(this.currentEditId, formData);
                ui.showToast('Receipt updated successfully', 'success');
            } else {
                await api.createReceipt(formData);
                ui.showToast('Receipt added successfully', 'success');
            }

            ui.hideModal('receiptModal');
            await this.loadReceipts();
            await this.updateDashboard();
        } catch (error) {
            ui.showToast('Error saving receipt: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    async editReceipt(id) {
        try {
            const receipt = this.receipts.find(r => r.id === id);
            if (receipt) {
                this.showReceiptModal(receipt);
            }
        } catch (error) {
            ui.showToast('Error loading receipt: ' + error.message, 'error');
        }
    }

    async deleteReceipt(id) {
        if (!confirm('Are you sure you want to delete this receipt?')) {
            return;
        }

        try {
            ui.showLoading();
            await api.deleteReceipt(id);
            ui.showToast('Receipt deleted successfully', 'success');
            await this.loadReceipts();
            await this.updateDashboard();
        } catch (error) {
            ui.showToast('Error deleting receipt: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    viewReceipt(receipt) {
        // Could open a detailed view modal
        console.log('View receipt:', receipt);
    }

    async updateDashboard() {
        console.log('updateDashboard called, receipts count:', this.receipts.length);
        console.log('receipts:', this.receipts);
        
        if (this.receipts.length === 0) {
            console.warn('No receipts found, showing zeros');
            document.getElementById('totalReceipts').textContent = '0';
            document.getElementById('totalSpent').textContent = '₹0.00';
            document.getElementById('monthlySpent').textContent = '₹0.00';
            document.getElementById('avgReceipt').textContent = '₹0.00';
            document.getElementById('weeklySpent').textContent = '₹0.00';
            document.getElementById('highestReceipt').textContent = '₹0.00';
            document.getElementById('topCategory').textContent = '-';
            document.getElementById('savedAmount').textContent = '₹0.00';
            return;
        }

        // Calculate stats
        const totalReceipts = this.receipts.length;
        const totalSpent = this.receipts.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
        const avgReceipt = totalSpent / totalReceipts;

        // This month
        const now = new Date();
        const monthlyReceipts = this.receipts.filter(r => {
            const date = new Date(r.purchaseDate);
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        });
        const monthlySpent = monthlyReceipts.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

        // This week
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weeklyReceipts = this.receipts.filter(r => {
            const date = new Date(r.purchaseDate);
            return date >= oneWeekAgo;
        });
        const weeklySpent = weeklyReceipts.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

        // Highest receipt
        const highestReceipt = Math.max(...this.receipts.map(r => r.totalAmount || 0));

        // Top category
        const categoryTotals = {};
        this.receipts.forEach(r => {
            const cat = r.category || 'OTHER';
            categoryTotals[cat] = (categoryTotals[cat] || 0) + (r.totalAmount || 0);
        });
        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

        // Saved amount (example: assuming budget of 50000/month)
        const monthlyBudget = 50000;
        const savedAmount = Math.max(0, monthlyBudget - monthlySpent);

        // Last month for trend
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthReceipts = this.receipts.filter(r => {
            const date = new Date(r.purchaseDate);
            return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
        });
        const lastMonthSpent = lastMonthReceipts.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

        // Update UI
        document.getElementById('totalReceipts').textContent = totalReceipts;
        document.getElementById('totalSpent').textContent = ui.formatCurrency(totalSpent);
        document.getElementById('monthlySpent').textContent = ui.formatCurrency(monthlySpent);
        document.getElementById('avgReceipt').textContent = ui.formatCurrency(avgReceipt);
        document.getElementById('weeklySpent').textContent = ui.formatCurrency(weeklySpent);
        document.getElementById('highestReceipt').textContent = ui.formatCurrency(highestReceipt);
        document.getElementById('topCategory').textContent = topCategory;
        document.getElementById('savedAmount').textContent = ui.formatCurrency(savedAmount);

        // Update trends
        const receiptsTrend = totalReceipts - lastMonthReceipts.length;
        const spentTrend = ((monthlySpent - lastMonthSpent) / (lastMonthSpent || 1) * 100).toFixed(1);
        
        if (document.getElementById('receiptsTrend')) {
            document.getElementById('receiptsTrend').innerHTML = receiptsTrend > 0 
                ? `<span style="color: var(--success);"><i class="fas fa-arrow-up"></i> ${receiptsTrend} from last month</span>`
                : receiptsTrend < 0 
                ? `<span style="color: var(--error);"><i class="fas fa-arrow-down"></i> ${Math.abs(receiptsTrend)} from last month</span>`
                : `<span style="color: var(--text-tertiary);">No change</span>`;
        }

        if (document.getElementById('totalSpentTrend')) {
            document.getElementById('totalSpentTrend').innerHTML = spentTrend > 0 
                ? `<span style="color: var(--error);"><i class="fas fa-arrow-up"></i> ${spentTrend}% from last month</span>`
                : spentTrend < 0 
                ? `<span style="color: var(--success);"><i class="fas fa-arrow-down"></i> ${Math.abs(spentTrend)}% from last month</span>`
                : `<span style="color: var(--text-tertiary);">No change</span>`;
        }

        // Update recent receipts
        this.updateRecentReceipts();

        // Update category chart
        this.updateCategoryChart();
    }

    updateRecentReceipts() {
        const recentContainer = document.getElementById('recentReceipts');
        if (!recentContainer) return;

        const recent = [...this.receipts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        if (recent.length === 0) {
            recentContainer.innerHTML = ui.createEmptyState('fa-receipt', 'No receipts yet', 'Start adding receipts to see them here');
            return;
        }

        recentContainer.innerHTML = recent.map(receipt => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                <div>
                    <div style="font-weight: 600; color: var(--text);">${receipt.storeName}</div>
                    <div style="font-size: 0.875rem; color: var(--text-light);">${ui.formatDate(receipt.purchaseDate)}</div>
                </div>
                <div style="font-weight: 700; color: var(--primary);">${ui.formatCurrency(receipt.totalAmount)}</div>
            </div>
        `).join('');
    }

    updateCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) return;

        // Group by category
        const categoryData = {};
        this.receipts.forEach(receipt => {
            const category = receipt.category || 'OTHER';
            categoryData[category] = (categoryData[category] || 0) + (receipt.totalAmount || 0);
        });

        const categories = Object.keys(categoryData);
        const amounts = Object.values(categoryData);
        const colors = categories.map(cat => ui.getCategoryColor(cat));

        if (window.categoryChartInstance) {
            window.categoryChartInstance.destroy();
        }

        window.categoryChartInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: amounts,
                    backgroundColor: colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    viewReceiptImage(imageUrl, storeName) {
        if (!imageUrl || imageUrl.includes('placeholder')) {
            ui.showToast('No image available for this receipt', 'info');
            return;
        }

        // Create image preview modal
        const modal = document.createElement('div');
        modal.className = 'image-preview-modal';
        modal.innerHTML = `
            <div class="image-preview-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="image-preview-content">
                <div class="image-preview-header">
                    <h3>${storeName}</h3>
                    <button onclick="this.closest('.image-preview-modal').remove()" class="close-preview-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="image-preview-body">
                    <img src="${imageUrl}" alt="${storeName}" onerror="this.src=''; this.alt='Failed to load image'">
                </div>
                <div class="image-preview-footer">
                    <a href="${imageUrl}" download class="btn btn-primary">
                        <i class="fas fa-download"></i> Download
                    </a>
                    <a href="${imageUrl}" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Open in New Tab
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

const receiptsManager = new ReceiptsManager();
window.receiptsManager = receiptsManager;
