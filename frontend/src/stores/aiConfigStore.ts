import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AIConfig, TestResult } from '../components/AIConfig/types';
import { AI_CONFIG_STORAGE_KEY } from '../components/AIConfig/types';

interface AIConfigStore {
  // State
  config: AIConfig | null;
  isLoading: boolean;
  isTesting: boolean;
  testResult: TestResult | null;
  
  // Computed values
  isConfigured: () => boolean;
  
  // Actions
  loadConfig: () => void;
  saveConfig: (config: AIConfig) => Promise<void>;
  clearConfig: () => void;
  testConnection: (config: AIConfig) => Promise<TestResult>;
  setTestResult: (result: TestResult | null) => void;
}

export const useAIConfigStore = create<AIConfigStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      config: null,
      isLoading: false,
      isTesting: false,
      testResult: null,

      // Computed values
      isConfigured: () => {
        const { config } = get();
        return config !== null && 
               !!config.apiKey?.trim() &&
               !!config.baseURL?.trim() &&
               !!config.model?.trim();
      },

      // Load configuration from localStorage
      loadConfig: () => {
        try {
          const stored = localStorage.getItem(AI_CONFIG_STORAGE_KEY);
          if (stored) {
            const parsedConfig = JSON.parse(stored);
            // Decode API key from base64
            if (parsedConfig.apiKey) {
              parsedConfig.apiKey = atob(parsedConfig.apiKey);
            }
            set({ config: parsedConfig });
            console.log('AI config loaded from localStorage');
          } else {
            set({ config: null });
            console.log('No AI config found in localStorage');
          }
        } catch (error) {
          console.error('Failed to load AI config:', error);
          set({ config: null });
        }
      },

      // Save configuration to localStorage
      saveConfig: async (newConfig: AIConfig) => {
        console.log('saveConfig called with:', { ...newConfig, apiKey: '[HIDDEN]' });
        set({ isLoading: true });
        
        try {
          // Validate required fields
          if (!newConfig.apiKey || !newConfig.baseURL || !newConfig.model) {
            throw new Error('Missing required configuration fields');
          }

          // Encode API key with base64 before storing
          const configToStore = {
            ...newConfig,
            apiKey: btoa(newConfig.apiKey),
            lastUpdated: Date.now(),
          };
          
          console.log('Storing config to localStorage...');
          localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(configToStore));
          
          console.log('Updating store state...');
          set({ 
            config: newConfig, 
            isLoading: false,
            testResult: null // Clear previous test results
          });
          
          console.log('AI config saved successfully');
        } catch (error) {
          console.error('Failed to save AI config:', error);
          set({ isLoading: false });
          throw new Error(`Failed to save configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      },

      // Clear configuration from localStorage
      clearConfig: () => {
        console.log('Clearing AI config...');
        localStorage.removeItem(AI_CONFIG_STORAGE_KEY);
        set({ 
          config: null, 
          testResult: null 
        });
        console.log('AI config cleared');
      },

      // Test connection with AI service
      testConnection: async (testConfig: AIConfig): Promise<TestResult> => {
        set({ isTesting: true, testResult: null });
        
        try {
          const response = await fetch(`${testConfig.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${testConfig.apiKey}`,
            },
            body: JSON.stringify({
              model: testConfig.model,
              messages: [
                {
                  role: 'user',
                  content: 'Hello, this is a connection test. Please respond with "Connection successful".'
                }
              ],
              max_tokens: 50,
              temperature: 0.1,
            }),
            signal: AbortSignal.timeout(testConfig.timeout),
          });

          if (!response.ok) {
            let errorMessage = 'Connection failed';
            
            switch (response.status) {
              case 401:
                errorMessage = 'Invalid API key';
                break;
              case 403:
                errorMessage = 'Access forbidden';
                break;
              case 404:
                errorMessage = 'Service not found. Please check the base URL';
                break;
              case 429:
                errorMessage = 'Rate limit exceeded';
                break;
              case 500:
                errorMessage = 'Server error';
                break;
              default:
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            
            const result: TestResult = {
              success: false,
              message: errorMessage,
              error: `Status: ${response.status}`,
            };
            
            set({ testResult: result, isTesting: false });
            return result;
          }

          const data = await response.json();
          
          // Check if response has expected structure
          if (data.choices && data.choices[0] && data.choices[0].message) {
            const result: TestResult = {
              success: true,
              message: 'Connection successful',
            };
            
            set({ testResult: result, isTesting: false });
            return result;
          } else {
            const result: TestResult = {
              success: false,
              message: 'Invalid response format',
              error: 'Unexpected response structure',
            };
            
            set({ testResult: result, isTesting: false });
            return result;
          }
          
        } catch (error) {
          let errorMessage = 'Connection failed';
          
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              errorMessage = 'Connection timeout';
            } else if (error.message.includes('fetch')) {
              errorMessage = 'Network error';
            } else {
              errorMessage = error.message;
            }
          }
          
          const result: TestResult = {
            success: false,
            message: errorMessage,
            error: error instanceof Error ? error.message : String(error),
          };
          
          set({ testResult: result, isTesting: false });
          return result;
        }
      },

      // Set test result
      setTestResult: (result: TestResult | null) => {
        set({ testResult: result });
      },
    }),
    { 
      name: 'ai-config-store',
      // Only log in development
      enabled: import.meta.env.DEV
    }
  )
);

// Initialize store on app start (only in browser)
if (typeof window !== 'undefined') {
  // Load initial config
  useAIConfigStore.getState().loadConfig();
  
  // Listen for storage changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === AI_CONFIG_STORAGE_KEY || e.key === null) {
      console.log('Storage change detected from another tab, reloading config...');
      useAIConfigStore.getState().loadConfig();
    }
  });
}

// Export selectors for common use cases
export const selectIsConfigured = (state: AIConfigStore) => state.isConfigured();
export const selectConfig = (state: AIConfigStore) => state.config;
export const selectIsLoading = (state: AIConfigStore) => state.isLoading;
export const selectIsTesting = (state: AIConfigStore) => state.isTesting;
export const selectTestResult = (state: AIConfigStore) => state.testResult;
