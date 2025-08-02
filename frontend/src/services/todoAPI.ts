import axios from 'axios';
import type { AdminTodo, TodoAdminParams } from '../types/todo';
import type { PaginatedResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:8000/api';

const todoAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add language header and auth token
todoAPI.interceptors.request.use(
  (config) => {
    // Add language header for backend localization
    const language = localStorage.getItem('i18nextLng') || 'en';
    config.headers['Accept-Language'] = language;
    
    // Add auth token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
todoAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const todoAdminAPI = {
  /**
   * Get todos with filtering, searching, and pagination for admin view
   */
  getTodos: async (params: TodoAdminParams = {}): Promise<PaginatedResponse<AdminTodo>> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
    );
    
    const response = await todoAPI.get('/admin/todos/', { params: cleanParams });
    return response.data;
  },
};

export default todoAdminAPI;
