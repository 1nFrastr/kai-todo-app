import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AIConfigModalProps } from './types';
import { AIConfigForm } from './AIConfigForm';
import { useAIConfig } from './hooks/useAIConfig';
import './AIConfigModal.scss';

export const AIConfigModal: React.FC<AIConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    config,
    isLoading,
    isTesting,
    testResult,
    saveConfig,
    testConnection,
    clearConfig,
  } = useAIConfig();

  /**
   * Handle save configuration
   */
  const handleSave = async (newConfig: Parameters<typeof saveConfig>[0]) => {
    try {
      await saveConfig(newConfig);
      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Failed to save config:', error);
      // Handle error - could show toast or error message
    }
  };

  /**
   * Handle test connection
   */
  const handleTest = async (configToTest: Parameters<typeof testConnection>[0]) => {
    try {
      await testConnection(configToTest);
    } catch (error) {
      console.error('Failed to test connection:', error);
    }
  };

  /**
   * Handle clear configuration
   */
  const handleClear = () => {
    if (window.confirm(t('deleteConfirm'))) {
      clearConfig();
    }
  };

  /**
   * Handle backdrop click to close modal
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Handle escape key to close modal
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="ai-config-modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-config-modal-title"
    >
      <div className="ai-config-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="ai-config-modal-title" className="modal-title">
            {t('aiConfig.title')}
          </h2>
          <div className="header-actions">
            {config && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
                disabled={isLoading || isTesting}
                title={t('aiConfig.clear')}
              >
                🗑️
              </button>
            )}
            <button
              type="button"
              className="close-button"
              onClick={onClose}
              disabled={isLoading || isTesting}
              aria-label={t('ai.closePanel')}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <AIConfigForm
            config={config}
            onSave={handleSave}
            onTest={handleTest}
            onCancel={onClose}
            isLoading={isLoading}
            isTesting={isTesting}
            testResult={testResult}
          />
        </div>
      </div>
    </div>
  );
};
