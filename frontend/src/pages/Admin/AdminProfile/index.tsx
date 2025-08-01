import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../stores/authStore';
import { authAPI } from '../../../services/authAPI';
import type { ChangePasswordData } from '../../../types/auth';
import './AdminProfile.scss';

const AdminProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await authAPI.updateProfile({
        ...profileData,
        profile: {
          phone: '',
          avatar: undefined,
        },
      });
      updateUser(updatedUser);
      setSuccess(t('admin.userProfile.updateSuccess'));
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.userProfile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      setError(t('admin.register.passwordMismatch'));
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authAPI.changePassword(passwordData);
      setSuccess(t('admin.userProfile.updateSuccess'));
      setPasswordData({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });
      setShowPasswordForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.userProfile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>{t('admin.userProfile.title')}</h1>
        <p>{t('admin.userProfile.subtitle')}</p>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>{t('admin.users.form.username')}</h2>
          <form onSubmit={handleProfileSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">{t('admin.register.firstName')}</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={handleProfileChange}
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">{t('admin.register.lastName')}</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleProfileChange}
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
                value={profileData.username}
                onChange={handleProfileChange}
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
                value={profileData.email}
                onChange={handleProfileChange}
                required
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="save-btn"
            >
              {loading ? t('common.saving') : t('common.save')}
            </button>
          </form>
        </div>

        <div className="profile-section">
          <div className="password-section-header">
            <h2>{t('admin.users.form.newPassword')}</h2>
            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="change-password-btn"
              >
                {t('admin.users.form.newPassword')}
              </button>
            )}
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label htmlFor="old_password">{t('admin.login.password')}</label>
                <input
                  type="password"
                  id="old_password"
                  name="old_password"
                  value={passwordData.old_password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_password">{t('admin.users.form.newPassword')}</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password">{t('admin.register.confirmPassword')}</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      old_password: '',
                      new_password: '',
                      confirm_password: '',
                    });
                  }}
                  className="cancel-btn"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="save-btn"
                >
                  {loading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {error && (
        <div className="message error-message">
          {error}
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      {success && (
        <div className="message success-message">
          {success}
          <button onClick={() => setSuccess(null)}>✖</button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
