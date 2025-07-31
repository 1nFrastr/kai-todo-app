import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AIPromptPanel from './AIPromptPanel';
import { useSmartInput } from './hooks/useSmartInput';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { generateContent, isGenerating, error } = useSmartInput();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleAIButtonClick = () => {
    setIsPanelOpen(!isPanelOpen);
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
    isGenerating ? 'smart-input__ai-button--generating' : ''
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
            title={t('ai.buttonTitle')}
            aria-label={t('ai.buttonTitle')}
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
    </div>
  );
};

export default SmartInput;
