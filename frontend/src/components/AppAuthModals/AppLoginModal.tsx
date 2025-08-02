import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import type { LoginCredentials } from '../../types/auth';
import './AppAuthModals.scss';

interface AppLoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const AppLoginModal: React.FC<AppLoginModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { login, error, clearError, isAuthenticated } = useAuthStore();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(credentials);
      if (result && rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }
    } finally {
      setIsLoading(false);
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose();
    }
  };

  return (
    <div 
      className="app-auth-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="app-auth-modal">
        <div className="modal-header">
          <h2 id="login-modal-title">{t('auth.loginTitle')}</h2>
          <button 
            onClick={onClose} 
            className="close-btn"
            disabled={isLoading}
            aria-label={t('common.close')}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">{t('auth.username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder={t('auth.usernamePlaceholder')}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.password')}</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder={t('auth.passwordPlaceholder')}
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                {t('auth.rememberMe')}
              </label>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !credentials.username || !credentials.password}
              className="submit-btn"
            >
              {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppLoginModal;
