import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../hooks';
import ThemeLanguageToggle from '../ThemeLanguageToggle';
import './Sidebar.scss';

interface SidebarProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ theme, onThemeChange }) => {
  const { t } = useTranslation();
  const { isExpanded, toggleSidebar } = useSidebar();

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
          {/* Theme and Language Toggle */}
          <div className="settings-item">
            <ThemeLanguageToggle theme={theme} onThemeChange={onThemeChange} />
          </div>
          
          {/* Sidebar Toggle Button */}
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
    </aside>
  );
};

export default Sidebar;
