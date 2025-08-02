import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../stores/authStore';
import type { RegisterData } from '../../../types/auth';
import './AdminRegisterPage.scss';

const AdminRegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: 'admin',
    email: 'testusername@example.com',
    first_name: 'Test',
    last_name: 'User',
    password: 'password123',
    password_confirm: 'password123',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    await register(formData);
    // If registration was successful, navigation will be handled by useEffect
    // If it failed, the error will be displayed via the error state from store
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
  const isFormValid = formData.username && formData.email && formData.first_name && 
                     formData.last_name && formData.password && formData.password_confirm &&
                     isPasswordMatch;

  return (
    <div className="admin-register-page">
      <div className="register-form-container">
        <div className="register-header">
          <h2>{t('admin.register.title')}</h2>
          <p>{t('admin.register.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">{t('admin.register.firstName')}</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder={t('admin.register.firstNamePlaceholder')}
                required
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">{t('admin.register.lastName')}</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder={t('admin.register.lastNamePlaceholder')}
                required
                autoComplete="family-name"
              />
            </div>
          </div>

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
            <label htmlFor="email">{t('admin.register.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('admin.register.emailPlaceholder')}
              required
              autoComplete="email"
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
            disabled={isLoading || !isFormValid}
            className="register-button"
          >
            {isLoading ? t('admin.register.registering') : t('admin.register.registerButton')}
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
