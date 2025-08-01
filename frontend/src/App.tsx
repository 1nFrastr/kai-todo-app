import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './routes';
import './App.scss';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const router = createAppRouter({ theme, onThemeChange: setTheme });

  return <RouterProvider router={router} />;
}

export default App;
