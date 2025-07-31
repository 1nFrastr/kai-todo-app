import { useAIConfigStore } from '../stores/aiConfigStore';
import type { AIConfig } from '../components/AIConfig/types';

/**
 * Debug helper to test AI config store functionality
 * Only use this in development
 */
export const debugAIConfigStore = () => {
  if (import.meta.env.PROD) {
    console.warn('debugAIConfigStore should not be used in production');
    return;
  }

  const store = useAIConfigStore.getState();
  
  console.group('🧪 AI Config Store Debug');
  
  // Current state
  console.log('Current config:', store.config);
  console.log('Is configured:', store.isConfigured());
  console.log('Is loading:', store.isLoading);
  console.log('Is testing:', store.isTesting);
  console.log('Test result:', store.testResult);
  
  // Test save config
  const testConfig: AIConfig = {
    apiKey: 'test-api-key-12345',
    baseURL: 'https://api.example.com/v1',
    model: 'gpt-3.5-turbo',
    timeout: 30000,
    lastUpdated: Date.now(),
  };
  
  console.log('Testing save config...');
  store.saveConfig(testConfig).then(() => {
    console.log('✅ Config saved successfully');
    console.log('New config:', useAIConfigStore.getState().config);
    console.log('Is configured:', useAIConfigStore.getState().isConfigured());
    
    // Test clear config
    console.log('Testing clear config...');
    useAIConfigStore.getState().clearConfig();
    console.log('Config after clear:', useAIConfigStore.getState().config);
    console.log('Is configured after clear:', useAIConfigStore.getState().isConfigured());
  }).catch((error) => {
    console.error('❌ Failed to save config:', error);
  });
  
  console.groupEnd();
};

// Export to window for easy access in browser console
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as any).debugAIConfigStore = debugAIConfigStore;
}
