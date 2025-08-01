/**
 * SmartFormInput component type definitions
 */

export interface FormField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  maxLength?: number;
  currentValue: string;
  element: HTMLInputElement | HTMLTextAreaElement;
}

export interface SmartFormInputProps {
  // Form container reference or selector
  formRef?: React.RefObject<HTMLFormElement | null>;
  formSelector?: string; // Default: use parent form
  
  // Button configuration
  buttonContainer?: string; // Button insertion position selector
  buttonText?: string; // Button text
  buttonClassName?: string; // Button style class name
  
  // AI configuration
  customPrompt?: string; // Custom prompt prefix
  preserveExistingValues?: boolean; // Whether to preserve existing values
  aiPromptPlaceholder?: string; // AI prompt panel placeholder text
  onAIGenerate?: (prompt: string) => Promise<string>; // Custom AI generation function
  
  // Callback functions
  onBeforeGenerate?: (fields: FormField[]) => boolean; // Pre-generation callback
  onAfterGenerate?: (results: Record<string, string>) => void; // Post-generation callback
  onError?: (error: Error) => void; // Error handling
}

export interface UseSmartFormInputReturn {
  generateFormContent: (
    formElement: HTMLFormElement,
    options: SmartFormInputOptions
  ) => Promise<void>;
  generateFormContentWithPrompt: (
    formElement: HTMLFormElement,
    userPrompt: string,
    options?: Omit<SmartFormInputOptions, 'customPrompt'>
  ) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export interface SmartFormInputOptions {
  customPrompt?: string;
  preserveExistingValues?: boolean;
  onBeforeGenerate?: (fields: FormField[]) => boolean;
  onAfterGenerate?: (results: Record<string, string>) => void;
  onError?: (error: Error) => void;
}

export interface AIFormGenerateResult {
  [fieldName: string]: string;
}
