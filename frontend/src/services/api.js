import axios from 'axios';

// This is used to make the connection between the api and vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response from:', response.config.url, response.data);
    return response;
  },
  error => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const confessionAPI = {
  // Get all confessions
  getAll: () => api.get('/confessions'),
  
  // Get trending confessions
  getTrending: () => api.get('/confessions/trending'),
  
  // Create confession
  create: (text, category = 'General') => 
    api.post('/confessions', { text, category }),
  
  // Like confession
  like: (id) => 
    api.patch(`/confessions/${id}/like`),
  
  // Add reaction
  react: (id, type) => 
    api.patch(`/confessions/${id}/react/${type}`),
};