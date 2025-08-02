// Authentication related types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
  profile?: UserProfile;
  groups?: string[];
}

export interface UserProfile {
  phone: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

// New standardized API response format
export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Type for auth API responses
export type AuthAPIResponse = APIResponse<AuthResponse>;

export interface UserUpdateData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    phone: string;
    avatar?: File;
  };
}

// Admin specific types
export interface AdminUser extends User {
  groups: string[];
}

export interface Group {
  id: number;
  name: string;
  permissions: string[];
}

export interface DashboardStats {
  total_users: number;
  active_users: number;
  staff_users: number;
  superusers: number;
  recent_registrations: number;
  recent_logins: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
