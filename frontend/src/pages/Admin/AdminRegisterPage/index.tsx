import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../stores/authStore';
import type { RegisterData } from '../../../types/auth';
import './AdminRegisterPage.scss';

const AdminRegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isAuthenticated, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: 'admin',
    password: 'password123',
    password_confirm: 'password123',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirm) {
      return;
    }

    setIsLocalLoading(true);
    try {
      await register(formData);
      // If registration was successful, navigation will be handled by useEffect
      // If it failed, the error will be displayed via the error state from store
    } finally {
      setIsLocalLoading(false);
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

  const isPasswordMatch = formData.password === formData.password_confirm;
  const isFormValid = formData.username && formData.password && formData.password_confirm &&
                     isPasswordMatch;

  return (
    <div className="admin-register-page">
      <div className="register-form-container">
        <div className="register-header">
          <h2>{t('admin.register.title')}</h2>
          <p>{t('admin.register.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">{t('admin.register.username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('admin.register.usernamePlaceholder')}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('admin.register.password')}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('admin.register.passwordPlaceholder')}
                required
                autoComplete="new-password"
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

          <div className="form-group">
            <label htmlFor="password_confirm">{t('admin.register.confirmPassword')}</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="password_confirm"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder={t('admin.register.confirmPasswordPlaceholder')}
                required
                autoComplete="new-password"
                className={formData.password_confirm && !isPasswordMatch ? 'error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.password_confirm && !isPasswordMatch && (
              <span className="field-error">{t('admin.register.passwordMismatch')}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLocalLoading || !isFormValid}
            className="register-button"
          >
            {isLocalLoading ? t('admin.register.registering') : t('admin.register.registerButton')}
          </button>
        </form>

        <div className="register-footer">
          <p>
            {t('admin.register.hasAccount')}{' '}
            <Link to="/admin/login">{t('admin.register.loginLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
