import { useState, useEffect } from 'react';
import { isAIConfigured } from '../services/realAI';

/**
 * Global hook to track AI configuration status
 * Automatically updates when configuration changes
 */
export const useAIConfigStatus = () => {
  const [aiConfigured, setAiConfigured] = useState(false);

  // Check if AI is configured on mount
  useEffect(() => {
    const initialStatus = isAIConfigured();
    console.log('useAIConfigStatus - Initial AI status:', initialStatus);
    setAiConfigured(initialStatus);
  }, []);

  // Listen for localStorage changes to update AI configuration status
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Check if the AI config key was changed
      if (e.key === 'ai-config' || e.key === null) {
        const newStatus = isAIConfigured();
        console.log('useAIConfigStatus - Storage change detected, new status:', newStatus);
        setAiConfigured(newStatus);
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // For changes in the same tab, we need a custom event
    const handleCustomConfigChange = () => {
      const newStatus = isAIConfigured();
      console.log('useAIConfigStatus - Custom config change detected, new status:', newStatus);
      setAiConfigured(newStatus);
    };

    window.addEventListener('ai-config-changed', handleCustomConfigChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ai-config-changed', handleCustomConfigChange);
    };
  }, []);

  return aiConfigured;
};
