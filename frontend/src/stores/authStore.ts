import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { authAPI } from '../services/authAPI';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<AuthResponse | null>;
  register: (data: RegisterData) => Promise<AuthResponse | null>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isInitialized: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        console.log('🔑 AuthStore: Starting login process');
        // Don't set global loading state for login operations
        
        try {
          const response = await authAPI.login(credentials);
          console.log('🔑 AuthStore: Login API response received:', response);
          
          // Check if the response follows our new format
          if (response.success && response.data) {
            const authData = response.data;
            
            // Store tokens
            localStorage.setItem('access_token', authData.access);
            localStorage.setItem('refresh_token', authData.refresh);
            
            set({
              user: authData.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              isInitialized: true,
            });
            
            console.log('🔑 AuthStore: Login successful, user authenticated');
            
            // Import flash store dynamically to avoid circular dependency
            const { useFlashStore } = await import('./flashStore');
            useFlashStore.getState().showSuccess(response.message || 'Login successful');
            
            return authData;
          } else {
            // Handle error response
            const errorMessage = response.message || 'Login failed';
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,  // Ensure loading is false after failed login
              error: errorMessage,
              isInitialized: true,
            });
            
            // Show flash error message
            const { useFlashStore } = await import('./flashStore');
            useFlashStore.getState().showError(errorMessage);
            
            return null;
          }
        } catch (error: any) {
          console.error('🔑 AuthStore: Login failed:', error);
          
          let errorMessage = 'Login failed';
          
          if (error.response?.data) {
            const errorData = error.response.data;
            
            if (errorData.success === false) {
              // Our new API response format
              errorMessage = errorData.message || errorMessage;
            } else if (errorData.detail) {
              // Old format fallback
              errorMessage = errorData.detail;
            } else if (typeof errorData === 'string') {
              errorMessage = errorData;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            isInitialized: true,
          });
          
          // Show flash error message
          const { useFlashStore } = await import('./flashStore');
          useFlashStore.getState().showError(errorMessage);
          
          return null;
        }
      },

      register: async (data: RegisterData) => {
        console.log('📝 AuthStore: Starting registration process');
        // Don't set global loading state for register operations
        
        try {
          const response = await authAPI.register(data);
          console.log('📝 AuthStore: Registration API response received:', response);
          
          // Check if the response follows our new format
          if (response.success && response.data) {
            const authData = response.data;
            
            // Store tokens
            localStorage.setItem('access_token', authData.access);
            localStorage.setItem('refresh_token', authData.refresh);
            
            set({
              user: authData.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              isInitialized: true,
            });
            
            console.log('📝 AuthStore: Registration successful, user authenticated');
            
            // Import flash store dynamically to avoid circular dependency
            const { useFlashStore } = await import('./flashStore');
            useFlashStore.getState().showSuccess(response.message || 'Registration successful');
            
            return authData;
          } else {
            // Handle error response
            const errorMessage = response.message || 'Registration failed';
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
              isInitialized: true,
            });
            
            // Show flash error message
            const { useFlashStore } = await import('./flashStore');
            useFlashStore.getState().showError(errorMessage);
            
            return null;
          }
        } catch (error: any) {
          console.error('📝 AuthStore: Registration failed:', error);
          
          let errorMessage = 'Registration failed';
          
          if (error.response?.data) {
            const errorData = error.response.data;
            
            if (errorData.success === false) {
              // Our new API response format
              errorMessage = errorData.message || errorMessage;
            } else if (typeof errorData === 'object') {
              // Old format fallback
              const fieldErrors = Object.entries(errorData)
                .filter(([field, _]) => field !== 'password_confirm')
                .map(([field, messages]) => {
                  const errorList = Array.isArray(messages) ? messages : [messages];
                  const fieldName = field === 'username' ? 'Username' :
                                   field === 'email' ? 'Email' :
                                   field === 'password' ? 'Password' :
                                   field === 'first_name' ? 'First Name' :
                                   field === 'last_name' ? 'Last Name' : field;
                  return `${fieldName}: ${errorList.join(', ')}`;
                })
                .join('; ');
              errorMessage = fieldErrors || errorMessage;
            } else if (typeof errorData === 'string') {
              errorMessage = errorData;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
            isInitialized: true,
          });
          
          // Show flash error message
          const { useFlashStore } = await import('./flashStore');
          useFlashStore.getState().showError(errorMessage);
          
          return null;
        }
      },

      logout: async () => {
        console.log('🚪 AuthStore: Starting logout process');
        set({ isLoading: true });
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            await authAPI.logout(refreshToken);
            console.log('🚪 AuthStore: Logout API call successful');
          }
        } catch (error) {
          // Even if logout fails on server, we still clear local state
          console.error('🚪 AuthStore: Logout API error (continuing anyway):', error);
        } finally {
          // Clear tokens and state
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isInitialized: true,
          });
          console.log('🚪 AuthStore: Logout completed, user unauthenticated');
        }
      },

      loadUser: async () => {
        console.log('👤 AuthStore: Starting loadUser process');
        const token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        
        console.log('👤 AuthStore: Token check - access:', !!token, 'refresh:', !!refreshToken);
        
        if (!token) {
          console.log('👤 AuthStore: No access token found, setting unauthenticated');
          set({ 
            isAuthenticated: false, 
            isLoading: false,
            user: null,
            error: null,
            isInitialized: true
          });
          return;
        }

        set({ isLoading: true });
        try {
          console.log('👤 AuthStore: Fetching user profile');
          const user = await authAPI.getProfile();
          console.log('👤 AuthStore: User profile loaded successfully:', {
            username: user.username,
            is_staff: user.is_staff,
            is_superuser: user.is_superuser,
            email: user.email
          });
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            isInitialized: true,
          });
        } catch (error: any) {
          // Token might be expired or invalid
          console.error('👤 AuthStore: Failed to load user profile:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isInitialized: true,
          });
        }
      },

      clearError: () => {
        console.log('🧹 AuthStore: Clearing error');
        set({ error: null });
      },

      updateUser: (user: User) => {
        console.log('🔄 AuthStore: Updating user data');
        set({ user });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
      }),
    }
  )
);

// Listen for token expiration events from axios interceptor
if (typeof window !== 'undefined') {
  window.addEventListener('auth-token-expired', () => {
    console.log('⚠️ AuthStore: Token expired event received, clearing auth state');
    // Clear state without making API call since tokens are already invalid
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isInitialized: true,
    });
  });
}
