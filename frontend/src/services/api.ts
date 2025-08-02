import axios from 'axios';
import type { Todo, CreateTodo, UpdateTodo } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add language header and auth token
api.interceptors.request.use(
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Don't redirect here as it might interfere with login flow
    }
    return Promise.reject(error);
  }
);

export const todoAPI = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/');
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: CreateTodo): Promise<Todo> => {
    const response = await api.post('/todos/', todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: number, todo: UpdateTodo): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/`, todo);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}/`);
  },

  // Toggle completion status
  toggleTodo: async (id: number): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle_completed/`);
    return response.data;
  },

  // Get completed todos
  getCompletedTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/completed/');
    return response.data;
  },

  // Get pending todos
  getPendingTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/pending/');
    return response.data;
  },
};

// Auth API functions
export const authAPI = {
  // Login
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh/', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Register
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  // Logout
  logout: async (refreshToken: string) => {
    const response = await api.post('/auth/logout/', {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};

// Export the configured axios instance as default
export default api;
