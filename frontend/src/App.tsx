import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './routes';
import { useAuthStore } from './stores/authStore';
import './App.scss';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  
  const { loadUser, isLoading, isInitialized, isAuthenticated } = useAuthStore();

  // Initialize user authentication state on app start
  useEffect(() => {
    console.log('🚀 App: Starting application initialization');
    loadUser();
  }, [loadUser]);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  console.log('🚀 App: Render state - isInitialized:', isInitialized, 'isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  const router = createAppRouter({ theme, onThemeChange: setTheme });

  // Show loading screen while checking authentication status
  if (!isInitialized || isLoading) {
    console.log('🚀 App: Showing loading screen');
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  console.log('🚀 App: Rendering main application');
  return <RouterProvider router={router} />;
}

export default App;
