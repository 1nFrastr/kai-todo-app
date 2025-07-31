import { useAIConfigStore, selectConfig, selectIsLoading, selectIsTesting, selectTestResult, selectIsConfigured } from '../stores/aiConfigStore';

/**
 * Simplified hook for components that need AI configuration data
 * Uses Zustand store for consistent state management
 */
export const useAIConfig = () => {
  const config = useAIConfigStore(selectConfig);
  const isLoading = useAIConfigStore(selectIsLoading);
  const isTesting = useAIConfigStore(selectIsTesting);
  const testResult = useAIConfigStore(selectTestResult);
  const isConfigured = useAIConfigStore(selectIsConfigured);
  
  const { saveConfig, testConnection, clearConfig, setTestResult } = useAIConfigStore();

  // Validate configuration
  const isConfigValid = (configToValidate: Partial<typeof config>): boolean => {
    if (!configToValidate?.apiKey || configToValidate.apiKey.trim() === '') {
      return false;
    }
    
    if (!configToValidate?.baseURL || configToValidate.baseURL.trim() === '') {
      return false;
    }
    
    // Validate URL format
    try {
      new URL(configToValidate.baseURL);
    } catch {
      return false;
    }
    
    if (!configToValidate?.model || configToValidate.model.trim() === '') {
      return false;
    }
    
    if (!configToValidate?.timeout || configToValidate.timeout < 5000 || configToValidate.timeout > 300000) {
      return false;
    }
    
    return true;
  };

  return {
    config,
    isLoading,
    isTesting,
    testResult,
    isConfigured,
    saveConfig,
    testConnection,
    clearConfig,
    setTestResult,
    isConfigValid,
  };
};
