export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CreateTodo {
  title: string;
  description?: string;
}

export interface UpdateTodo {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface AdminTodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  creator_username: string;
  creator_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface TodoFilters {
  search: string;
  status: 'all' | 'completed' | 'pending';
  ordering: string;
}

export interface TodoAdminParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  ordering?: string;
}
