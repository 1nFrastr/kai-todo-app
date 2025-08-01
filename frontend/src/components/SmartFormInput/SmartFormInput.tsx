import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  onBeforeGenerate,
  onAfterGenerate,
  onError
}) => {
  const { t } = useTranslation();
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const aiConfigured = useAIConfigStatus();
  const { generateFormContent, isGenerating, error } = useSmartFormInput();

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

    try {
      await generateFormContent(formElement, {
        customPrompt,
        preserveExistingValues,
        onBeforeGenerate,
        onAfterGenerate,
        onError
      });
    } catch (err) {
      console.error('Smart form generation failed:', err);
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
    !aiConfigured ? 'smart-form-input__button--unconfigured' : ''
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
