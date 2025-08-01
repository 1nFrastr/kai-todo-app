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
      {/* Language Toggle Row */}
      <div className="toggle-row">
        <span className="toggle-label">{t('language')}:</span>
        <div className="switch-container">
          <button
            className={`switch-btn left ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button
            className={`switch-btn right ${i18n.language === 'zh' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('zh')}
          >
            中文
          </button>
        </div>
      </div>

      {/* Theme Toggle Row */}
      <div className="toggle-row">
        <span className="toggle-label">{t('theme')}:</span>
        <div className="switch-container">
          <button
            className={`switch-btn left ${theme === 'light' ? 'active' : ''}`}
            onClick={() => onThemeChange('light')}
          >
            ☀️
          </button>
          <button
            className={`switch-btn right ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => onThemeChange('dark')}
          >
            🌙
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeLanguageToggle;
