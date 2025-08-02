import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TodosTable from './TodosTable';
import TodosFilter from './TodosFilter';
import { todoAdminAPI } from '../../../services/todoAPI';
import type { AdminTodo, TodoFilters } from '../../../types/todo';
import { useDebounce } from '../../../hooks';
import './AdminTodos.scss';

const AdminTodos: React.FC = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<AdminTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    status: 'all',
    ordering: '-created_at'
  });
  
  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(filters.search, 500);
  
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
    page: 1,
    pageSize: 10,
  });

  const fetchTodos = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        page_size: pagination.pageSize,
        search: debouncedSearchTerm,
        status: filters.status !== 'all' ? filters.status : undefined,
        ordering: filters.ordering,
      };
      
      const response = await todoAdminAPI.getTodos(params);
      setTodos(response.results);
      setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
        page,
        pageSize: pagination.pageSize,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos when filters change
  useEffect(() => {
    fetchTodos(1);
  }, [debouncedSearchTerm, filters.status, filters.ordering]);

  const handleFilterChange = (newFilters: Partial<TodoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handlePageChange = (page: number) => {
    fetchTodos(page);
  };

  const handleRefresh = () => {
    fetchTodos(pagination.page);
  };

  return (
    <div className="admin-todos">
      <div className="admin-todos__header">
        <h1 className="admin-todos__title">{t('todo.admin.title')}</h1>
        <button 
          className="admin-todos__refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          {t('common.refresh')}
        </button>
      </div>

      <TodosFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
      />

      {error && (
        <div className="admin-todos__error">
          <p>{error}</p>
          <button onClick={handleRefresh} className="admin-todos__retry-btn">
            {t('common.retry')}
          </button>
        </div>
      )}

      <TodosTable
        todos={todos}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSort={(field: string) => handleFilterChange({ ordering: field })}
        currentSort={filters.ordering}
      />
    </div>
  );
};

export default AdminTodos;
