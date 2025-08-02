import React from 'react';
import { useTranslation } from 'react-i18next';
import './AuthLayout.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, theme, onThemeChange }) => {
  const { t } = useTranslation();

  return (
    <div className="auth-layout" data-theme={theme}>
      <header className="auth-header">
        <div className="auth-header-content">
          <h1 className="auth-logo">
            <span className="logo-icon">🔐</span>
            {t('admin.title')}
          </h1>
        </div>
      </header>
      
      <main className="auth-main">
        <div className="auth-container">
          {children}
        </div>
      </main>
      
      <footer className="auth-footer">
        <p>&copy; 2024 Admin System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
