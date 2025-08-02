import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import AppLoginModal from '../AppAuthModals/AppLoginModal';
import AppRegisterModal from '../AppAuthModals/AppRegisterModal';
import './AppHeader.scss';

const AppHeader: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleOpenLogin = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleOpenRegister = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <header className="app-header">
      <div className="app-header-content">
        <div className="app-header-auth">
          {isAuthenticated && user ? (
            <div className="user-menu">
              <span className="user-info">
                {t('auth.userInfo')}: {user.username}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                {t('auth.logout')}
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleOpenLogin} className="login-btn">
                {t('auth.login')}
              </button>
              <button onClick={handleOpenRegister} className="register-btn">
                {t('auth.register')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <AppLoginModal
          onClose={handleCloseModals}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <AppRegisterModal
          onClose={handleCloseModals}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </header>
  );
};

export default AppHeader;
