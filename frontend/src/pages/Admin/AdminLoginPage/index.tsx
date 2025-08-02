import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../stores/authStore';
import type { LoginCredentials } from '../../../types/auth';
import './AdminLoginPage.scss';

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, error, clearError, isInitialized } = useAuthStore();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: 'admin',
    password: 'admin',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  console.log('🔐 LoginPage: Render - isAuthenticated:', isAuthenticated, 'isInitialized:', isInitialized, 'from:', from);

  useEffect(() => {
    console.log('🔐 LoginPage: Auth state changed - isAuthenticated:', isAuthenticated, 'isInitialized:', isInitialized);
    if (isAuthenticated && isInitialized) {
      console.log('🔐 LoginPage: User is authenticated, navigating to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isInitialized, navigate, from]);

  useEffect(() => {
    console.log('🔐 LoginPage: Component mounted, clearing errors');
    clearError();
  }, []); // Remove clearError from dependencies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      return;
    }

    setIsLocalLoading(true);
    try {
      const result = await login(credentials);
      if (result && rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }
      // If login was successful, navigation will be handled by useEffect
      // If it failed, the error will be displayed via the error state from store
    } finally {
      setIsLocalLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev: LoginCredentials) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      clearError();
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-form-container">
        <div className="login-header">
          <h2>{t('admin.login.title')}</h2>
          <p>{t('admin.login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t('admin.login.username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder={t('admin.login.usernamePlaceholder')}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('admin.login.password')}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder={t('admin.login.passwordPlaceholder')}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {t('admin.login.rememberMe')}
            </label>
          </div>

          <button
            type="submit"
            disabled={isLocalLoading || !credentials.username || !credentials.password}
            className="login-button"
          >
            {isLocalLoading ? t('admin.login.loggingIn') : t('admin.login.loginButton')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {t('admin.login.noAccount')}{' '}
            <Link to="/admin/register">{t('admin.login.registerLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
