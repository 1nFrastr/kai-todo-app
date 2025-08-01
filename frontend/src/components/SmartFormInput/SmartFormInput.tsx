import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AIPromptPanel } from '../AIPromptPanel';
import { useSmartFormInput } from './hooks/useSmartFormInput';
import { useAIConfigStatus } from '../../hooks/useAIConfigStatus';
import { AIConfigModal } from '../AIConfig';
import type { SmartFormInputProps } from './types';
import './SmartFormInput.scss';

const SmartFormInput: React.FC<SmartFormInputProps> = ({
  formRef,
  formSelector,
  buttonText,
  buttonClassName,
  customPrompt,
  preserveExistingValues = false,
  aiPromptPlaceholder,
  onAIGenerate,
  onBeforeGenerate,
  onAfterGenerate,
  onError
}) => {
  const { t } = useTranslation();
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const aiConfigured = useAIConfigStatus();
  const { generateFormContentWithPrompt, isGenerating, error } = useSmartFormInput();

  // Find the form element
  useEffect(() => {
    let form: HTMLFormElement | null = null;

    if (formRef?.current) {
      form = formRef.current;
    } else if (formSelector) {
      form = document.querySelector<HTMLFormElement>(formSelector);
    } else {
      // Try to find parent form element by traversing up from the button container
      const container = buttonRef.current?.parentElement;
      if (container) {
        form = container.closest('form');
      }
    }

    setFormElement(form);
  }, [formRef, formSelector]);

  const handleGenerateClick = async () => {
    if (!aiConfigured) {
      setIsConfigModalOpen(true);
      return;
    }

    if (!formElement) {
      const errorMessage = t('smartForm.formNotFound');
      console.error('Form element not found');
      onError?.(new Error(errorMessage));
      return;
    }

    // Open AI prompt panel to get user input
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  const handleGenerate = async (prompt: string) => {
    if (!formElement) {
      const errorMessage = t('smartForm.formNotFound');
      console.error('Form element not found');
      onError?.(new Error(errorMessage));
      return;
    }

    try {
      if (onAIGenerate) {
        // Use custom AI generate function if provided
        const result = await onAIGenerate(prompt);
        // For custom AI generate, we need to parse and fill the form manually
        // This is a simplified approach - in a real implementation, you might want
        // to handle this differently based on the result format
        console.log('Custom AI result:', result);
      } else {
        // Combine custom prompt with user prompt if both exist
        const finalPrompt = customPrompt ? `${customPrompt}\n\n${prompt}` : prompt;
        
        // Use the hook with user prompt
        await generateFormContentWithPrompt(formElement, finalPrompt, {
          preserveExistingValues,
          onBeforeGenerate,
          onAfterGenerate,
          onError
        });
      }
      setIsPanelOpen(false);
    } catch (err) {
      console.error('Smart form generation failed:', err);
      // Error is handled by the hook
    }
  };

  const handleConfigModalClose = () => {
    setIsConfigModalOpen(false);
  };

  // Don't render if no form found
  if (!formElement) {
    return null;
  }

  const buttonClassNames = [
    'smart-form-input__button',
    buttonClassName,
    isGenerating ? 'smart-form-input__button--generating' : '',
    !aiConfigured ? 'smart-form-input__button--unconfigured' : '',
    isPanelOpen ? 'smart-form-input__button--panel-open' : ''
  ].filter(Boolean).join(' ');

  const buttonTitle = aiConfigured 
    ? (isGenerating ? t('smartForm.generating') : t('smartForm.buttonTitle'))
    : t('aiConfig.apiKeyRequired');

  const ButtonComponent = (
    <div ref={buttonRef} className="smart-form-input">
      <button
        type="button"
        className={buttonClassNames}
        onClick={handleGenerateClick}
        disabled={isGenerating}
        title={buttonTitle}
        aria-label={buttonTitle}
      >
        <span className="smart-form-input__icon" role="img" aria-hidden="true">
          {isGenerating ? '⏳' : aiConfigured ? '🪄' : '⚙️'}
        </span>
        <span className="smart-form-input__text">
          {buttonText || (isGenerating ? t('smartForm.generating') : t('smartForm.fillForm'))}
        </span>
      </button>

      {error && (
        <div className="smart-form-input__error">
          {error}
        </div>
      )}

      {/* AI Prompt Panel */}
      <AIPromptPanel
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        error={error}
        placeholder={aiPromptPlaceholder}
      />

      {/* AI Configuration Modal */}
      <AIConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleConfigModalClose}
      />
    </div>
  );

  return ButtonComponent;
};

export default SmartFormInput;
