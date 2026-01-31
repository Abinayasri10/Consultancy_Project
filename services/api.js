import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getLowStock: () => api.get('/products/inventory/low-stock'),
  getExpiryAlerts: () => api.get('/products/inventory/expiry-alerts'),
};

// Sales API
export const salesAPI = {
  getAll: (params) => api.get('/sales', { params }),
  getById: (id) => api.get(`/sales/${id}`),
  create: (data) => api.post('/sales', data),
  getDashboard: () => api.get('/sales/analytics/dashboard'),
};

// Inventory API
export const inventoryAPI = {
  getTransactions: (params) => api.get('/inventory', { params }),
  purchaseEntry: (data) => api.post('/inventory/purchase', data),
  adjustmentEntry: (data) => api.post('/inventory/adjustment', data),
  getLowStockAlerts: () => api.get('/inventory/alerts/low-stock'),
  getExpiryAlerts: () => api.get('/inventory/alerts/expiry'),
};

// Suppliers API
export const suppliersAPI = {
  getAll: () => api.get('/suppliers'),
  getById: (id) => api.get(`/suppliers/${id}`),
  create: (data) => api.post('/suppliers', data),
  update: (id, data) => api.put(`/suppliers/${id}`, data),
  delete: (id) => api.delete(`/suppliers/${id}`),
};

export default api;
