import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../types/todo';
import './TodoItem.scss';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'zh' ? 'zh-CN' : 'en-US');
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <span className="todo-date">
            {t('createdAt')}{formatDate(todo.created_at)}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-edit"
        >
          {t('editButtonText')}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-delete"
        >
          {t('deleteButtonText')}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
