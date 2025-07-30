import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from './types/todo';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import ThemeLanguageToggle from './components/ThemeLanguageToggle';
import './App.scss';

function App() {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load todos on component mount
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(t('loadError'));
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [t]);

  // Create new todo
  const handleCreateTodo = async (todoData: { title: string; description?: string }) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(t('createError'));
      console.error('Error creating todo:', err);
    }
  };

  // Update existing todo
  const handleUpdateTodo = async (todoData: { title: string; description?: string }) => {
    if (!editingTodo) return;
    
    try {
      const updatedTodo = await todoAPI.updateTodo(editingTodo.id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === editingTodo.id ? updatedTodo : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError(t('updateError'));
      console.error('Error updating todo:', err);
    }
  };

  // Toggle todo completion status
  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoAPI.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(t('toggleError'));
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: number) => {
    if (window.confirm(t('deleteConfirm'))) {
      try {
        await todoAPI.deleteTodo(id);
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } catch (err) {
        setError(t('deleteError'));
        console.error('Error deleting todo:', err);
      }
    }
  };

  // Set todo for editing
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Calculate counts for filter buttons
  const counts = {
    all: todos.length,
    pending: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">{t('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>{t('appTitle')}</h1>
          <p>{t('appSubtitle')}</p>
        </header>

        <ThemeLanguageToggle
          theme={theme}
          onThemeChange={setTheme}
        />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <TodoForm
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
        />

        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;
