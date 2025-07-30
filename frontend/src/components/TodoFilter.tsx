import React from 'react';
import { useTranslation } from 'react-i18next';
import './TodoFilter.scss';

interface TodoFilterProps {
  filter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, counts }) => {
  const { t } = useTranslation();

  return (
    <div className="todo-filter">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        {t('allTodos')} ({counts.all})
      </button>
      <button
        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
      >
        {t('pendingTodos')} ({counts.pending})
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        {t('completedTodos')} ({counts.completed})
      </button>
    </div>
  );
};

export default TodoFilter;
