import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  filter: 'all' | 'pending' | 'completed';
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, filter }) => {
  const { t } = useTranslation();
  
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'pending':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (filteredTodos.length === 0) {
    let emptyMessage = t('noTodos');
    if (filter === 'pending') emptyMessage = t('noPendingTodos');
    if (filter === 'completed') emptyMessage = t('noCompletedTodos');

    return (
      <div className="todo-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
