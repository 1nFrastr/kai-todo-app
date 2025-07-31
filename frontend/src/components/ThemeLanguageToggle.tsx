import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AIConfigModal } from './AIConfig';
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
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);

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

      {/* AI Configuration Toggle */}
      <div className="ai-config-toggle">
        <button
          className="ai-config-btn"
          onClick={() => setIsAIConfigOpen(true)}
          title={t('aiConfig.buttonTooltip')}
        >
          ⚙️
        </button>
      </div>

      {/* AI Configuration Modal */}
      <AIConfigModal
        isOpen={isAIConfigOpen}
        onClose={() => setIsAIConfigOpen(false)}
      />
    </div>
  );
};

export default ThemeLanguageToggle;
