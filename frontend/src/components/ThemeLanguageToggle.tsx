import React from 'react';
import { useTranslation } from 'react-i18next';
import './ThemeLanguageToggle.scss';

interface ThemeLanguageToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const ThemeLanguageToggle: React.FC<ThemeLanguageToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="theme-language-toggle">
      {/* Language Toggle */}
      <div className="language-toggle">
        <span className="toggle-label">{t('language')}:</span>
        <button
          className={`toggle-btn ${i18n.language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          {t('english')}
        </button>
        <button
          className={`toggle-btn ${i18n.language === 'zh' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('zh')}
        >
          {t('chinese')}
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggle">
        <span className="toggle-label">
          {theme === 'light' ? t('lightMode') : t('darkMode')}:
        </span>
        <button
          className="theme-btn"
          onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default ThemeLanguageToggle;
