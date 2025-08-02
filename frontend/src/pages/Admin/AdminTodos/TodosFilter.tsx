import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TodoFilters } from '../../../types/todo';
import './TodosFilter.scss';

interface TodosFilterProps {
  filters: TodoFilters;
  onFilterChange: (filters: Partial<TodoFilters>) => void;
  loading: boolean;
}

const TodosFilter: React.FC<TodosFilterProps> = ({ filters, onFilterChange, loading }) => {
  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value as 'all' | 'completed' | 'pending' });
  };

  const handleOrderingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ordering: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      ordering: '-created_at'
    });
  };

  return (
    <div className="todos-filter">
      <div className="todos-filter__row">
        <div className="todos-filter__group">
          <label className="todos-filter__label">
            {t('todo.admin.search.placeholder')}
          </label>
          <input
            type="text"
            className="todos-filter__input"
            placeholder={t('todo.admin.search.placeholder')}
            value={filters.search}
            onChange={handleSearchChange}
            disabled={loading}
          />
        </div>

        <div className="todos-filter__group">
          <label className="todos-filter__label">
            {t('todo.admin.filter.status')}
          </label>
          <select
            className="todos-filter__select"
            value={filters.status}
            onChange={handleStatusChange}
            disabled={loading}
          >
            <option value="all">{t('common.all')}</option>
            <option value="completed">{t('todo.admin.status.completed')}</option>
            <option value="pending">{t('todo.admin.status.pending')}</option>
          </select>
        </div>

        <div className="todos-filter__group">
          <label className="todos-filter__label">
            {t('common.sort.label')}
          </label>
          <select
            className="todos-filter__select"
            value={filters.ordering}
            onChange={handleOrderingChange}
            disabled={loading}
          >
            <option value="-created_at">{t('common.sort.created_desc')}</option>
            <option value="created_at">{t('common.sort.created_asc')}</option>
            <option value="-updated_at">{t('common.sort.updated_desc')}</option>
            <option value="updated_at">{t('common.sort.updated_asc')}</option>
            <option value="title">{t('common.sort.title_asc')}</option>
            <option value="-title">{t('common.sort.title_desc')}</option>
          </select>
        </div>

        <div className="todos-filter__group">
          <button
            className="todos-filter__clear-btn"
            onClick={clearFilters}
            disabled={loading}
          >
            {t('common.clear')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodosFilter;
