// API Service
class APIService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    getAuthHeader() {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            ...this.getAuthHeader(),
            ...options.headers
        };

        // Don't set Content-Type for FormData
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                timeout: API_CONFIG.TIMEOUT
            });

            if (response.status === 401) {
                this.handleUnauthorized();
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                
                try {
                    const error = await response.json();
                    
                    // Handle validation errors
                    if (error.errors && Array.isArray(error.errors)) {
                        errorMessage = error.errors.join(', ');
                    } else if (error.error) {
                        errorMessage = error.error;
                    } else if (error.message) {
                        errorMessage = error.message;
                    }
                } catch (parseError) {
                    // If response is not JSON, use default error
                    console.error('Error parsing response:', parseError);
                }
                
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return response;
        } catch (error) {
            console.error('API Request Error:', error);
            
            // Better error messages
            if (error.message === 'Failed to fetch') {
                throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:8080');
            }
            
            throw error;
        }
    }

    handleUnauthorized() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.reload();
    }

    // Auth APIs
    async login(email, password) {
        return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async register(name, email, password) {
        return this.request(API_CONFIG.ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role: 'USER' })
        });
    }

    // User APIs
    async getCurrentUser() {
        return this.request(API_CONFIG.ENDPOINTS.ME);
    }

    // Receipt APIs
    async getReceipts(page = 0, size = 100) {
        const response = await this.request(`${API_CONFIG.ENDPOINTS.RECEIPTS}?page=${page}&size=${size}`);
        // Backend returns paginated response, extract content array
        console.log('API getReceipts response:', response);
        return response.content || response;
    }

    async getReceipt(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.RECEIPTS}/${id}`);
    }

    async createReceipt(formData) {
        return this.request(API_CONFIG.ENDPOINTS.RECEIPTS, {
            method: 'POST',
            body: formData
        });
    }

    async updateReceipt(id, formData) {
        return this.request(`${API_CONFIG.ENDPOINTS.RECEIPTS}/${id}`, {
            method: 'PUT',
            body: formData
        });
    }

    async deleteReceipt(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.RECEIPTS}/${id}`, {
            method: 'DELETE'
        });
    }

    async searchReceipts(params) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`${API_CONFIG.ENDPOINTS.RECEIPTS_SEARCH}?${queryString}`);
    }

    // Admin APIs
    async getAllUsers() {
        return this.request(API_CONFIG.ENDPOINTS.ADMIN_USERS);
    }

    async deleteUser(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.ADMIN_USERS}/${id}`, {
            method: 'DELETE'
        });
    }

    async getAnalytics() {
        return this.request(API_CONFIG.ENDPOINTS.ADMIN_ANALYTICS);
    }
}

const api = new APIService();
