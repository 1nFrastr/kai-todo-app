import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import type { RegisterData } from '../../types/auth';
import './AppAuthModals.scss';

interface AppRegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const AppRegisterModal: React.FC<AppRegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const { register, error, clearError, isAuthenticated } = useAuthStore();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (formData.password !== formData.password_confirm) {
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: RegisterData) => ({
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

  const isPasswordMatch = formData.password === formData.password_confirm;
  const isFormValid = formData.username && formData.email && formData.first_name && 
                     formData.last_name && formData.password && formData.password_confirm &&
                     isPasswordMatch;

  return (
    <div 
      className="app-auth-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
    >
      <div className="app-auth-modal">
        <div className="modal-header">
          <h2 id="register-modal-title">{t('auth.registerTitle')}</h2>
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
          <p className="modal-subtitle">{t('auth.createAccount')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">{t('auth.firstName')}</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder={t('auth.firstNamePlaceholder')}
                  required
                  autoComplete="given-name"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">{t('auth.lastName')}</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder={t('auth.lastNamePlaceholder')}
                  required
                  autoComplete="family-name"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">{t('auth.username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t('auth.usernamePlaceholder')}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('auth.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('auth.emailPlaceholder')}
                required
                autoComplete="email"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('auth.passwordPlaceholder')}
                  required
                  autoComplete="new-password"
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

            <div className="form-group">
              <label htmlFor="password_confirm">{t('auth.confirmPassword')}</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  required
                  autoComplete="new-password"
                  disabled={isLoading}
                  className={formData.password_confirm && !isPasswordMatch ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password_confirm && !isPasswordMatch && (
                <span className="field-error">{t('auth.passwordMismatch')}</span>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="submit-btn"
            >
              {isLoading ? t('auth.registering') : t('auth.registerButton')}
            </button>
          </form>

          <div className="modal-footer">
            <p>
              {t('auth.alreadyHaveAccount')}{' '}
              <button 
                onClick={onSwitchToLogin} 
                className="auth-switch-btn"
                disabled={isLoading}
              >
                {t('auth.login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRegisterModal;
