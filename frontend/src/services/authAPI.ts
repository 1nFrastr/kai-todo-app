import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import api from './api'; // Use the shared api instance with language headers
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData, 
  AuthAPIResponse,
  UserUpdateData,
  AdminUser,
  Group,
  DashboardStats,
  PaginatedResponse
} from '../types/auth';

// Create separate auth api instance for auth endpoints (no auth required)
const authApi = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add language header (no auth token for auth endpoints)
authApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get language synchronously from localStorage or default to 'en'
    const language = localStorage.getItem('i18nextLng') || 'en';
    if (config.headers) {
      config.headers['Accept-Language'] = language;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthAPIResponse> => {
    const response: AxiosResponse<AuthAPIResponse> = await authApi.post('/auth/register/', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthAPIResponse> => {
    const response: AxiosResponse<AuthAPIResponse> = await authApi.post('/auth/login/', credentials);
    return response.data;
  },

  // Logout user
  logout: async (refreshToken: string): Promise<void> => {
    await authApi.post('/auth/logout/', { refresh: refreshToken });
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
    const response: AxiosResponse<{ access: string }> = await authApi.post('/auth/refresh/', {
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
