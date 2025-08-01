import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData, 
  AuthResponse,
  UserUpdateData,
  AdminUser,
  Group,
  DashboardStats,
  PaginatedResponse
} from '../types/auth';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
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

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    
    console.log('🔄 AuthAPI: Response interceptor - status:', error.response?.status, 'url:', original?.url);
    
    if (error.response?.status === 401 && !original._retry) {
      console.log('🔄 AuthAPI: 401 error detected, attempting token refresh');
      original._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          console.log('🔄 AuthAPI: Attempting to refresh token');
          const response = await axios.post('http://localhost:8000/api/auth/refresh/', {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          console.log('🔄 AuthAPI: Token refreshed successfully, retrying original request');
          
          // Retry original request
          original.headers.Authorization = `Bearer ${access}`;
          return api(original);
        } catch (refreshError) {
          console.error('🔄 AuthAPI: Token refresh failed:', refreshError);
          // Refresh failed, clear tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          // Clear auth store state by dispatching a custom event
          // This way we avoid circular dependencies
          console.log('🔄 AuthAPI: Dispatching auth-token-expired event');
          window.dispatchEvent(new CustomEvent('auth-token-expired'));
          
          return Promise.reject(refreshError);
        }
      } else {
        console.log('🔄 AuthAPI: No refresh token available');
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register/', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login/', credentials);
    return response.data;
  },

  // Logout user
  logout: async (refreshToken: string): Promise<void> => {
    await api.post('/auth/logout/', { refresh: refreshToken });
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/auth/profile/');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UserUpdateData): Promise<User> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('profile.phone', data.profile.phone);
    
    if (data.profile.avatar) {
      formData.append('profile.avatar', data.profile.avatar);
    }

    const response: AxiosResponse<User> = await api.put('/auth/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await api.post('/auth/change-password/', data);
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
    const response: AxiosResponse<{ access: string }> = await api.post('/auth/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response: AxiosResponse<DashboardStats> = await api.get('/admin/dashboard/stats/');
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  // Get dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response: AxiosResponse<DashboardStats> = await api.get('/admin/dashboard/stats/');
    return response.data;
  },

  // User management
  users: {
    // Get all users with pagination
    list: async (queryString?: string): Promise<PaginatedResponse<AdminUser>> => {
      const url = queryString ? `/admin/users/?${queryString}` : '/admin/users/';
      const response: AxiosResponse<PaginatedResponse<AdminUser>> = await api.get(url);
      return response.data;
    },

    // Get user by ID
    get: async (id: number): Promise<AdminUser> => {
      const response: AxiosResponse<AdminUser> = await api.get(`/admin/users/${id}/`);
      return response.data;
    },

    // Create user
    create: async (data: Omit<AdminUser, 'id' | 'date_joined' | 'last_login'> & { password: string }): Promise<AdminUser> => {
      const response: AxiosResponse<AdminUser> = await api.post('/admin/users/', data);
      return response.data;
    },

    // Update user
    update: async (id: number, data: Partial<AdminUser>): Promise<AdminUser> => {
      const response: AxiosResponse<AdminUser> = await api.put(`/admin/users/${id}/`, data);
      return response.data;
    },

    // Delete user
    delete: async (id: number): Promise<void> => {
      await api.delete(`/admin/users/${id}/`);
    },

    // Set user active status
    setActive: async (id: number, isActive: boolean): Promise<AdminUser> => {
      const response: AxiosResponse<{ user: AdminUser }> = await api.post(
        `/admin/users/${id}/set-active/`,
        { is_active: isActive }
      );
      return response.data.user;
    },

    // Set user staff status
    setStaff: async (id: number, isStaff: boolean): Promise<AdminUser> => {
      const response: AxiosResponse<{ user: AdminUser }> = await api.post(
        `/admin/users/${id}/set-staff/`,
        { is_staff: isStaff }
      );
      return response.data.user;
    },

    // Set user superuser status
    setSuperuser: async (id: number, isSuperuser: boolean): Promise<AdminUser> => {
      const response: AxiosResponse<{ user: AdminUser }> = await api.post(
        `/admin/users/${id}/set-superuser/`,
        { is_superuser: isSuperuser }
      );
      return response.data.user;
    },
  },

  // Group management
  groups: {
    // Get all groups
    list: async (): Promise<Group[]> => {
      const response: AxiosResponse<Group[]> = await api.get('/admin/groups/');
      return response.data;
    },

    // Get group by ID
    get: async (id: number): Promise<Group> => {
      const response: AxiosResponse<Group> = await api.get(`/admin/groups/${id}/`);
      return response.data;
    },

    // Create group
    create: async (data: Omit<Group, 'id'>): Promise<Group> => {
      const response: AxiosResponse<Group> = await api.post('/admin/groups/', data);
      return response.data;
    },

    // Update group
    update: async (id: number, data: Partial<Group>): Promise<Group> => {
      const response: AxiosResponse<Group> = await api.put(`/admin/groups/${id}/`, data);
      return response.data;
    },

    // Delete group
    delete: async (id: number): Promise<void> => {
      await api.delete(`/admin/groups/${id}/`);
    },
  },
};

export default api;
