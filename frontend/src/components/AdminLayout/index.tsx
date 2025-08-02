import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import ThemeLanguageToggle from '../ThemeLanguageToggle';
import './AdminLayout.scss';

interface AdminLayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, theme, onThemeChange }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: t('admin.dashboard'),
      icon: '📊',
      requiredRole: 'staff',
    },
    {
      path: '/admin/users',
      label: t('admin.userManagement'),
      icon: '👥',
      requiredRole: 'staff',
    },
    {
      path: '/admin/groups',
      label: t('admin.groupManagement'),
      icon: '🔐',
      requiredRole: 'superuser',
    },
    {
      path: '/admin/todos',
      label: t('todo.admin.title'),
      icon: '📝',
      requiredRole: null,
    },
    {
      path: '/admin/profile',
      label: t('admin.profileMenu'),
      icon: '👤',
      requiredRole: null,
    },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.requiredRole) return true;
    if (item.requiredRole === 'staff' && user?.is_staff) return true;
    if (item.requiredRole === 'superuser' && user?.is_superuser) return true;
    return false;
  });

  // Determine the logo link based on user permissions
  const logoLink = user?.is_staff || user?.is_superuser ? '/admin/dashboard' : '/admin/profile';

  return (
    <div className="admin-layout" data-theme={theme}>
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <Link to={logoLink}>
              <span className="logo-icon">⚙️</span>
              {t('admin.title')}
            </Link>
          </div>
          
          <div className="admin-header-actions">
            <Link to="/" className="back-to-app">
              {t('admin.backToApp')}
            </Link>
            <div className="user-menu">
              <span className="user-info">
                {user?.username} ({t(user?.is_superuser ? 'admin.superuser' : user?.is_staff ? 'admin.staff' : 'admin.user')})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <ul>
              {filteredMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeLanguageToggle theme={theme} onThemeChange={onThemeChange} />
        </aside>

        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
