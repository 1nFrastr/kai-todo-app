import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminTodo } from '../../../types/todo';
import './TodosTable.scss';

interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
  page: number;
  pageSize: number;
}

interface TodosTableProps {
  todos: AdminTodo[];
  loading: boolean;
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onSort: (field: string) => void;
  currentSort: string;
}

const TodosTable: React.FC<TodosTableProps> = ({
  todos,
  loading,
  pagination,
  onPageChange,
  onSort,
  currentSort
}) => {
  const { t } = useTranslation();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field: string) => {
    const newSort = currentSort === field ? `-${field}` : field;
    onSort(newSort);
  };

  const getSortIcon = (field: string) => {
    if (currentSort === field) return '↑';
    if (currentSort === `-${field}`) return '↓';
    return '↕';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const totalPages = Math.ceil(pagination.count / pagination.pageSize);
  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(pagination.page * pagination.pageSize, pagination.count);

  return (
    <div className="todos-table">
      <div className="todos-table__wrapper">
        <table className="todos-table__table">
          <thead>
            <tr>
              <th className="todos-table__header">
                <button
                  className="todos-table__sort-btn"
                  onClick={() => handleSort('title')}
                >
                  {t('todo.admin.table.title')} {getSortIcon('title')}
                </button>
              </th>
              <th className="todos-table__header">
                {t('todo.admin.table.description')}
              </th>
              <th className="todos-table__header">
                {t('todo.admin.table.status')}
              </th>
              <th className="todos-table__header">
                {t('todo.admin.table.creator')}
              </th>
              <th className="todos-table__header">
                <button
                  className="todos-table__sort-btn"
                  onClick={() => handleSort('created_at')}
                >
                  {t('todo.admin.table.created')} {getSortIcon('created_at')}
                </button>
              </th>
              <th className="todos-table__header">
                <button
                  className="todos-table__sort-btn"
                  onClick={() => handleSort('updated_at')}
                >
                  {t('todo.admin.table.updated')} {getSortIcon('updated_at')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="todos-table__loading">
                  {t('common.loading')}...
                </td>
              </tr>
            ) : todos.length === 0 ? (
              <tr>
                <td colSpan={6} className="todos-table__empty">
                  {t('todo.admin.empty')}
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id} className="todos-table__row">
                  <td className="todos-table__cell todos-table__cell--title">
                    {todo.title}
                  </td>
                  <td className="todos-table__cell todos-table__cell--description">
                    <div className="todos-table__description">
                      <span className="todos-table__description-text">
                        {expandedRows.has(todo.id) 
                          ? todo.description 
                          : truncateText(todo.description)
                        }
                      </span>
                      {todo.description.length > 100 && (
                        <button
                          className="todos-table__expand-btn"
                          onClick={() => toggleRowExpansion(todo.id)}
                        >
                          {expandedRows.has(todo.id) 
                            ? t('common.show_less') 
                            : t('common.show_more')
                          }
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="todos-table__cell">
                    <span 
                      className={`todos-table__status ${
                        todo.completed 
                          ? 'todos-table__status--completed' 
                          : 'todos-table__status--pending'
                      }`}
                    >
                      {todo.completed 
                        ? t('todo.admin.status.completed') 
                        : t('todo.admin.status.pending')
                      }
                    </span>
                  </td>
                  <td className="todos-table__cell">
                    {todo.creator_username || t('common.anonymous')}
                  </td>
                  <td className="todos-table__cell todos-table__cell--date">
                    {formatDate(todo.created_at)}
                  </td>
                  <td className="todos-table__cell todos-table__cell--date">
                    {formatDate(todo.updated_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && todos.length > 0 && (
        <div className="todos-table__pagination">
          <div className="todos-table__pagination-info">
            {t('common.pagination.showing', { 
              start: startItem, 
              end: endItem, 
              total: pagination.count 
            })}
          </div>
          
          <div className="todos-table__pagination-controls">
            <button
              className="todos-table__pagination-btn"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={!pagination.previous}
            >
              {t('common.pagination.previous')}
            </button>
            
            <span className="todos-table__pagination-current">
              {t('common.pagination.page', { 
                current: pagination.page, 
                total: totalPages 
              })}
            </span>
            
            <button
              className="todos-table__pagination-btn"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={!pagination.next}
            >
              {t('common.pagination.next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosTable;
