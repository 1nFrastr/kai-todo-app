import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo, CreateTodo } from '../types/todo';
import './TodoForm.scss';

interface TodoFormProps {
  onSubmit: (todo: CreateTodo) => void;
  editingTodo?: Todo | null;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, editingTodo, onCancel }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
      });
      if (!editingTodo) {
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <h2>{editingTodo ? t('editTodo') : t('addNewTodo')}</h2>
        
        <div className="form-group">
          <label htmlFor="title">{t('titleLabel')}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('titlePlaceholder')}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">{t('descriptionLabel')}</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('descriptionPlaceholder')}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTodo ? t('updateButton') : t('addButton')}
          </button>
          {editingTodo && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              {t('cancelButton')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
