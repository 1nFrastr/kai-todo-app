// SmartFormInput component exports
export { default as SmartFormInput } from './SmartFormInput';
export { useSmartFormInput } from './hooks/useSmartFormInput';
export type { 
  SmartFormInputProps, 
  FormField, 
  UseSmartFormInputReturn,
  SmartFormInputOptions,
  AIFormGenerateResult 
} from './types';
export { 
  detectFormFields, 
  buildFormPrompt, 
  parseAIResponse, 
  fillFormFields,
  findAssociatedLabel,
  inferFormType
} from './utils';
