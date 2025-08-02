import { Outlet } from 'react-router-dom';
import { useSidebar } from '../../hooks';
import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';
import './Layout.scss';

interface LayoutProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const Layout: React.FC<LayoutProps> = ({ theme, onThemeChange }) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="layout">
      <Sidebar theme={theme} onThemeChange={onThemeChange} />
      <main className={`main-content ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <AppHeader />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
