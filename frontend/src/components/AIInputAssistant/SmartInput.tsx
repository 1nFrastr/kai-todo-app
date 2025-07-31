import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AIPromptPanel from './AIPromptPanel';
import { useSmartInput } from './hooks/useSmartInput';
import { useAIConfigStatus } from '../../hooks/useAIConfigStatus';
import { AIConfigModal } from '../AIConfig';
import type { SmartInputProps } from './types';
import './SmartInput.scss';

const SmartInput: React.FC<SmartInputProps> = ({
  type,
  value = '',
  onChange,
  placeholder,
  disabled = false,
  inputProps,
  textareaProps,
  aiEnabled = true,
  aiPromptPlaceholder,
  onAIGenerate,
  className,
  aiButtonClassName
}) => {
  const { t } = useTranslation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const aiConfigured = useAIConfigStatus(); // Use global hook instead of local state
  const containerRef = useRef<HTMLDivElement>(null);
  const { generateContent, isGenerating, error } = useSmartInput();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleAIButtonClick = () => {
    if (!aiConfigured) {
      // Open configuration modal instead of alert
      setIsConfigModalOpen(true);
      return;
    }
    setIsPanelOpen(!isPanelOpen);
  };

  const handleConfigModalClose = () => {
    setIsConfigModalOpen(false);
    // AI configuration status will be automatically updated by the useAIConfigStatus hook
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  const handleGenerate = async (prompt: string) => {
    try {
      let result: string;
      
      if (onAIGenerate) {
        // Use custom AI generate function if provided
        result = await onAIGenerate(prompt);
      } else {
        // Use default mock AI service
        result = await generateContent(prompt, type);
      }
      
      onChange(result);
      setIsPanelOpen(false);
    } catch (err) {
      // Error is handled by the hook, panel will show error message
      console.error('AI generation failed:', err);
    }
  };

  const inputClassNames = [
    'smart-input__field',
    type === 'textarea' ? 'smart-input__field--textarea' : 'smart-input__field--input'
  ].join(' ');

  const containerClassNames = [
    'smart-input',
    className,
    disabled ? 'smart-input--disabled' : '',
    isPanelOpen ? 'smart-input--panel-open' : ''
  ].filter(Boolean).join(' ');

  const aiButtonClassNames = [
    'smart-input__ai-button',
    aiButtonClassName,
    isGenerating ? 'smart-input__ai-button--generating' : '',
    !aiConfigured ? 'smart-input__ai-button--unconfigured' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames} ref={containerRef}>
      <div className="smart-input__wrapper">
        {type === 'input' ? (
          <input
            {...inputProps}
            className={inputClassNames}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <textarea
            {...textareaProps}
            className={inputClassNames}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        
        {aiEnabled && (
          <button
            className={aiButtonClassNames}
            onClick={handleAIButtonClick}
            disabled={disabled || isGenerating}
            title={aiConfigured ? t('ai.buttonTitle') : t('aiConfig.apiKeyRequired')}
            aria-label={aiConfigured ? t('ai.buttonTitle') : t('aiConfig.apiKeyRequired')}
            type="button"
          >
            <span className="smart-input__ai-icon" role="img" aria-hidden="true">
              {isGenerating ? '⏳' : '🪄'}
            </span>
          </button>
        )}
      </div>
      
      {aiEnabled && (
        <AIPromptPanel
          isOpen={isPanelOpen}
          onClose={handlePanelClose}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
          placeholder={aiPromptPlaceholder}
        />
      )}
      
      {/* AI Configuration Modal */}
      <AIConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleConfigModalClose}
      />
    </div>
  );
};

export default SmartInput;
