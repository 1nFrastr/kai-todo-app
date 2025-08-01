/**
 * SmartInput component type definitions
 */

export interface SmartInputProps {
  // Basic input component properties
  type: 'input' | 'textarea';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  
  // HTML native properties passthrough
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  
  // AI functionality configuration
  aiEnabled?: boolean;
  aiPromptPlaceholder?: string;
  onAIGenerate?: (prompt: string) => Promise<string>;
  
  // Style customization
  className?: string;
  aiButtonClassName?: string;
}

export interface UseSmartInputReturn {
  generateContent: (prompt: string, type: 'input' | 'textarea') => Promise<string>;
  isGenerating: boolean;
  error: string | null;
}
