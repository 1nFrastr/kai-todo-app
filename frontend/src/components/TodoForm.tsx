import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SmartInput } from './AIInputAssistant';
import { SmartFormInput } from './SmartFormInput';
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
  const formRef = useRef<HTMLFormElement>(null);

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
      <form ref={formRef} onSubmit={handleSubmit} className="todo-form">
        <h2>{editingTodo ? t('editTodo') : t('addNewTodo')}</h2>
        
        <div className="form-group">
          <label htmlFor="title">{t('titleLabel')}</label>
          <SmartInput
            type="input"
            value={title}
            onChange={setTitle}
            placeholder={t('titlePlaceholder')}
            aiEnabled={true}
            inputProps={{
              id: 'title',
              name: 'title',
              required: true
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">{t('descriptionLabel')}</label>
          <SmartInput
            type="textarea"
            value={description}
            onChange={setDescription}
            placeholder={t('descriptionPlaceholder')}
            aiEnabled={true}
            textareaProps={{
              id: 'description',
              name: 'description',
              rows: 3
            }}
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
          <SmartFormInput 
            formRef={formRef}
            customPrompt={t('smartForm.todoPrompt', { defaultValue: 'This is a todo item creation form. Please generate practical and meaningful content:' })}
            onAfterGenerate={(results) => {
              console.log('SmartForm generated:', results);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
