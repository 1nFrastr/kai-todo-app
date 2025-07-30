import axios from 'axios';
import type { Todo, CreateTodo, UpdateTodo } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/');
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: CreateTodo): Promise<Todo> => {
    const response = await api.post('/todos/', todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: number, todo: UpdateTodo): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/`, todo);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}/`);
  },

  // Toggle completion status
  toggleTodo: async (id: number): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle_completed/`);
    return response.data;
  },

  // Get completed todos
  getCompletedTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/completed/');
    return response.data;
  },

  // Get pending todos
  getPendingTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/pending/');
    return response.data;
  },
};
