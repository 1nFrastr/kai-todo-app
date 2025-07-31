import { useAIConfigStore, selectIsConfigured } from '../stores/aiConfigStore';

/**
 * Global hook to track AI configuration status
 * Uses Zustand store for consistent state management
 */
export const useAIConfigStatus = () => {
  return useAIConfigStore(selectIsConfigured);
};
