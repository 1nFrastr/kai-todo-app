import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../services/authAPI';
import type { AdminUser } from '../../types/auth';
import './UserForm.scss';

interface UserFormProps {
  user: AdminUser | null;
  onSave: (user: AdminUser) => void;
  onCancel: () => void;
}

interface UserFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  password?: string;
  groups: string[];
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    password: '',
    groups: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Save current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: user.is_active,
        is_staff: user.is_staff,
        is_superuser: user.is_superuser,
        groups: user.groups || [],
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let savedUser: AdminUser;
      
      if (user) {
        // Update existing user - exclude password field entirely
        const { password, ...updateData } = formData;
        savedUser = await adminAPI.users.update(user.id, updateData);
      } else {
        // Create new user
        if (!formData.password) {
          setError(t('admin.users.form.passwordRequired'));
          return;
        }
        savedUser = await adminAPI.users.create(formData as UserFormData & { password: string });
      }
      
      onSave(savedUser);
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.users.form.saveError'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: UserFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) {
      setError(null);
    }
  };

  /**
   * Handle backdrop click to close modal
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  /**
   * Handle escape key to close modal
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !loading) {
      onCancel();
    }
  };

  return (
    <div 
      className="user-form-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-form-modal-title"
    >
      <div className="user-form-modal">
        <div className="user-form-header">
          <h2 id="user-form-modal-title">
            {user ? t('admin.users.form.editUser') : t('admin.users.form.addUser')}
          </h2>
          <button 
            onClick={onCancel} 
            className="close-btn"
            disabled={loading}
            aria-label={t('common.close')}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">{t('admin.users.form.username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('admin.users.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">{t('admin.users.form.firstName')}</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">{t('admin.users.form.lastName')}</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </div>
          </div>

          {!user && (
            <div className="form-group">
              <label htmlFor="password">
                {t('admin.users.form.password')} *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          <div className="form-section">
            <h3>{t('admin.users.form.permissions')}</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                {t('admin.users.form.isActive')}
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_staff"
                  checked={formData.is_staff}
                  onChange={handleChange}
                />
                {t('admin.users.form.isStaff')}
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_superuser"
                  checked={formData.is_superuser}
                  onChange={handleChange}
                />
                {t('admin.users.form.isSuperuser')}
              </label>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <div className="right-actions">
              <button
                type="button"
                onClick={onCancel}
                className="cancel-btn"
                disabled={loading}
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="save-btn"
                disabled={loading || !formData.username || !formData.email}
              >
                {loading ? t('common.saving') : t('common.save')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
