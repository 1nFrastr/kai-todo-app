import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TodoApp from '../pages/TodoApp';
import PostApp from '../pages/PostApp';
import AdminLoginPage from '../pages/Admin/AdminLoginPage';
import AdminRegisterPage from '../pages/Admin/AdminRegisterPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminGroups from '../pages/Admin/AdminGroups';
import AdminProfile from '../pages/Admin/AdminProfile';
import AdminLayout from '../components/AdminLayout';
import AuthLayout from '../components/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute';

interface AppRouterProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const createAppRouter = ({ theme, onThemeChange }: AppRouterProps) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout theme={theme} onThemeChange={onThemeChange} />,
      children: [
        {
          index: true,
          element: <Navigate to="/todo" replace />,
        },
        {
          path: 'todo',
          element: <TodoApp />,
        },
        {
          path: 'post',
          element: <PostApp />,
        },
      ],
    },
    {
      path: '/admin',
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: 'login',
          element: (
            <AuthLayout theme={theme} onThemeChange={onThemeChange}>
              <AdminLoginPage />
            </AuthLayout>
          ),
        },
        {
          path: 'register',
          element: (
            <AuthLayout theme={theme} onThemeChange={onThemeChange}>
              <AdminRegisterPage />
            </AuthLayout>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <AdminLayout theme={theme} onThemeChange={onThemeChange}>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          ),
        },
        {
          path: 'users',
          element: (
            <ProtectedRoute requiredRole="staff">
              <AdminLayout theme={theme} onThemeChange={onThemeChange}>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          ),
        },
        {
          path: 'groups',
          element: (
            <ProtectedRoute requiredRole="superuser">
              <AdminLayout theme={theme} onThemeChange={onThemeChange}>
                <AdminGroups />
              </AdminLayout>
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <AdminLayout theme={theme} onThemeChange={onThemeChange}>
                <AdminProfile />
              </AdminLayout>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
};
