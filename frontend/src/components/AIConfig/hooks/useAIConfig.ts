import { useState, useEffect, useCallback } from 'react';
import type { AIConfig, TestResult, UseAIConfigReturn } from '../types';
import { AI_CONFIG_STORAGE_KEY } from '../types';

/**
 * Custom hook for managing AI configuration
 */
export const useAIConfig = (): UseAIConfigReturn => {
  const [config, setConfig] = useState<AIConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Load configuration from localStorage on mount
  useEffect(() => {
    loadConfig();
  }, []);

  /**
   * Load configuration from localStorage
   */
  const loadConfig = useCallback(() => {
    try {
      const stored = localStorage.getItem(AI_CONFIG_STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        // Decode API key from base64
        if (parsedConfig.apiKey) {
          parsedConfig.apiKey = atob(parsedConfig.apiKey);
        }
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error('Failed to load AI config:', error);
    }
  }, []);

  /**
   * Save configuration to localStorage
   */
  const saveConfig = useCallback(async (newConfig: AIConfig) => {
    setIsLoading(true);
    try {
      // Encode API key with base64 before storing
      const configToStore = {
        ...newConfig,
        apiKey: btoa(newConfig.apiKey),
        lastUpdated: Date.now(),
      };
      
      localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(configToStore));
      setConfig(newConfig);
      setTestResult(null); // Clear previous test results
      
      // Dispatch custom event to notify other components about config change
      window.dispatchEvent(new CustomEvent('ai-config-changed'));
    } catch (error) {
      console.error('Failed to save AI config:', error);
      throw new Error('Failed to save configuration');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Test connection with AI service
   */
  const testConnection = useCallback(async (testConfig: AIConfig): Promise<TestResult> => {
    setIsTesting(true);
    setTestResult(null);
    
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
        
        setTestResult(result);
        return result;
      }

      const data = await response.json();
      
      // Check if response has expected structure
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const result: TestResult = {
          success: true,
          message: 'Connection successful',
        };
        
        setTestResult(result);
        return result;
      } else {
        const result: TestResult = {
          success: false,
          message: 'Invalid response format',
          error: 'Unexpected response structure',
        };
        
        setTestResult(result);
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
      
      setTestResult(result);
      return result;
    } finally {
      setIsTesting(false);
    }
  }, []);

  /**
   * Clear configuration from localStorage
   */
  const clearConfig = useCallback(() => {
    localStorage.removeItem(AI_CONFIG_STORAGE_KEY);
    setConfig(null);
    setTestResult(null);
    
    // Dispatch custom event to notify other components about config change
    window.dispatchEvent(new CustomEvent('ai-config-changed'));
  }, []);

  /**
   * Validate configuration
   */
  const isConfigValid = useCallback((configToValidate: Partial<AIConfig>): boolean => {
    if (!configToValidate.apiKey || configToValidate.apiKey.trim() === '') {
      return false;
    }
    
    if (!configToValidate.baseURL || configToValidate.baseURL.trim() === '') {
      return false;
    }
    
    // Validate URL format
    try {
      new URL(configToValidate.baseURL);
    } catch {
      return false;
    }
    
    if (!configToValidate.model || configToValidate.model.trim() === '') {
      return false;
    }
    
    if (!configToValidate.timeout || configToValidate.timeout < 5000 || configToValidate.timeout > 300000) {
      return false;
    }
    
    return true;
  }, []);

  return {
    config,
    isLoading,
    isTesting,
    testResult,
    saveConfig,
    testConnection,
    clearConfig,
    isConfigValid,
  };
};
