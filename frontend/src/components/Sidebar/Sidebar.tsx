import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSidebar } from '../../hooks';
import ThemeLanguageToggle from '../ThemeLanguageToggle';
import { AIConfigModal } from '../AIConfig';
import './Sidebar.scss';

interface SidebarProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ theme, onThemeChange }) => {
  const { t } = useTranslation();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);

  const menuItems = [
    {
      path: '/todo',
      icon: '📝',
      label: t('navigation.todoApp', 'Todo App'),
    },
    {
      path: '/post',
      icon: '📄',
      label: t('navigation.postApp', 'Post App'),
    },
  ];

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-content">
        {/* Menu Section - Vertically Centered */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  title={!isExpanded ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isExpanded && <span className="nav-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Section - Bottom */}
        <div className="sidebar-settings">
          {/* Admin System Link - Only show when expanded */}
          {isExpanded && (
            <div className="admin-link-item">
              <a
                href="/admin/dashboard"
                className="admin-link"
                target="_blank"
                rel="noopener noreferrer"
                title={t('admin.title', 'Admin System')}
              >
                <span className="admin-icon">⚙️</span>
                <span className="admin-label">{t('admin.title', 'Admin System')}</span>
              </a>
            </div>
          )}
          
          {/* Theme and Language Toggle - Only show when expanded */}
          {isExpanded && (
            <div className="settings-item">
              <ThemeLanguageToggle theme={theme} onThemeChange={onThemeChange} />
            </div>
          )}
          
          {/* AI Configuration Toggle - Only show when expanded */}
          {isExpanded && (
            <div className="ai-config-item">
              <button
                className="ai-config-btn"
                onClick={() => setIsAIConfigOpen(true)}
                title={t('aiConfig.buttonTooltip')}
              >
                <span className="ai-config-icon">⚙️</span>
                <span className="ai-config-label">{t('aiConfig.title', 'AI Config')}</span>
              </button>
            </div>
          )}
          
          {/* Sidebar Toggle Button - Always show */}
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            title={isExpanded ? t('sidebar.collapse', 'Collapse') : t('sidebar.expand', 'Expand')}
          >
            <span className="toggle-icon">
              {isExpanded ? '◀' : '▶'}
            </span>
          </button>
        </div>
      </div>

      {/* AI Configuration Modal - Rendered via Portal to document.body */}
      <AIConfigModal
        isOpen={isAIConfigOpen}
        onClose={() => setIsAIConfigOpen(false)}
      />
    </aside>
  );
};

export default Sidebar;
