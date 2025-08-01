import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TodoApp from '../pages/TodoApp';
import PostApp from '../pages/PostApp';

interface AppRouterProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const createAppRouter = ({ theme, onThemeChange }: AppRouterProps) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout theme={theme} onThemeChange={onThemeChange} />,
      children: [
        {
          index: true,
          element: <Navigate to="/todo" replace />,
        },
        {
          path: 'todo',
          element: <TodoApp />,
        },
        {
          path: 'post',
          element: <PostApp />,
        },
      ],
    },
  ]);
};
