import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookingAPI = {
  // Get all bookings with optional filters
  getAll: (filters = {}) => api.get('/bookings', { params: filters }),
  
  // Get single booking by ID
  getById: (id) => api.get(`/bookings/${id}`),
  
  // Create new booking
  create: (bookingData) => api.post('/bookings', bookingData),
  
  // Update booking
  update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  
  // Delete booking
  delete: (id) => api.delete(`/bookings/${id}`),
  
  // Search bookings
  search: (query) => api.get('/bookings/search', { params: { q: query } })
};

export default api;