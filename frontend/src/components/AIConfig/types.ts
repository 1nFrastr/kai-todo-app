/**
 * AI Configuration Types
 */

export interface AIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
  timeout: number;
  lastUpdated: number;
}

export interface TestResult {
  success: boolean;
  message: string;
  error?: string;
}

export interface UseAIConfigReturn {
  config: AIConfig | null;
  isLoading: boolean;
  isTesting: boolean;
  testResult: TestResult | null;
  saveConfig: (config: AIConfig) => Promise<void>;
  testConnection: (config: AIConfig) => Promise<TestResult>;
  clearConfig: () => void;
  isConfigValid: (config: Partial<AIConfig>) => boolean;
}

export interface AIConfigFormProps {
  config: AIConfig | null;
  onSave: (config: AIConfig) => void;
  onTest: (config: AIConfig) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isTesting?: boolean;
  testResult?: TestResult | null;
}

export interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Default configuration values
export const DEFAULT_AI_CONFIG: Omit<AIConfig, 'apiKey' | 'lastUpdated'> = {
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo',
  timeout: 30000,
};

// Available model options
export const MODEL_OPTIONS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'custom', label: 'Custom' },
];

// Storage key for localStorage
export const AI_CONFIG_STORAGE_KEY = 'ai-service-config';
