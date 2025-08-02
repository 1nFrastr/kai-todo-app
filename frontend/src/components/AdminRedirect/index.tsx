import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

/**
 * Component to redirect admin users to appropriate pages based on their roles
 * - Staff/Superuser: redirect to dashboard
 * - Regular users: redirect to profile page
 */
const AdminRedirect: React.FC = () => {
  const { user, isAuthenticated, isInitialized } = useAuthStore();

  // Wait for auth initialization
  if (!isInitialized) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If user is staff or superuser, redirect to dashboard
  if (user.is_staff || user.is_superuser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Regular users go to profile page
  return <Navigate to="/admin/profile" replace />;
};

export default AdminRedirect;
