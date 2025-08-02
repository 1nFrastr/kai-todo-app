import { create } from 'zustand';

export interface FlashMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface FlashStore {
  messages: FlashMessage[];
  addMessage: (message: Omit<FlashMessage, 'id'>) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
  // Convenience methods
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

export const useFlashStore = create<FlashStore>((set, get) => ({
  messages: [],

  addMessage: (message) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newMessage: FlashMessage = {
      id,
      ...message,
      duration: message.duration || 5000,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    // Auto remove message after duration
    setTimeout(() => {
      get().removeMessage(id);
    }, newMessage.duration);
  },

  removeMessage: (id: string) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  // Convenience methods
  showSuccess: (message: string, duration?: number) => {
    get().addMessage({ message, type: 'success', duration });
  },

  showError: (message: string, duration?: number) => {
    get().addMessage({ message, type: 'error', duration });
  },

  showWarning: (message: string, duration?: number) => {
    get().addMessage({ message, type: 'warning', duration });
  },

  showInfo: (message: string, duration?: number) => {
    get().addMessage({ message, type: 'info', duration });
  },
}));
