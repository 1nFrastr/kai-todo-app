import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'staff' | 'superuser';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isInitialized, isLoading } = useAuthStore();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute: Check access for', location.pathname);
  console.log('🛡️ ProtectedRoute: Auth state - isAuthenticated:', isAuthenticated, 'isInitialized:', isInitialized, 'isLoading:', isLoading);

  // Wait for authentication to be initialized
  if (!isInitialized || isLoading) {
    console.log('🛡️ ProtectedRoute: Still loading, showing loading screen');
    return (
      <div className="app-loading">
        <div className="loading-spinner">Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    console.log('🛡️ ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    console.log('🛡️ ProtectedRoute: Checking role requirement:', requiredRole, 'User roles - is_staff:', user.is_staff, 'is_superuser:', user.is_superuser);
    if (requiredRole === 'staff' && !user.is_staff) {
      console.log('🛡️ ProtectedRoute: User lacks staff privileges, redirecting to login');
      return <Navigate to="/admin/login" replace />;
    }
    if (requiredRole === 'superuser' && !user.is_superuser) {
      console.log('🛡️ ProtectedRoute: User lacks superuser privileges, redirecting to dashboard');
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  console.log('🛡️ ProtectedRoute: User authenticated and authorized, allowing access');
  return <>{children}</>;
};

export default ProtectedRoute;
