import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AIPromptPanelProps } from './types';
import './AIPromptPanel.scss';

const AIPromptPanel: React.FC<AIPromptPanelProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating,
  error,
  placeholder
}) => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close panel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleGenerate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ai-prompt-panel" ref={panelRef}>
      <div className="ai-prompt-panel__header">
        <h4 className="ai-prompt-panel__title">{t('ai.panelTitle')}</h4>
        <button
          className="ai-prompt-panel__close"
          onClick={onClose}
          aria-label={t('ai.closePanel')}
        >
          ×
        </button>
      </div>
      
      <div className="ai-prompt-panel__content">
        <textarea
          ref={textareaRef}
          className="ai-prompt-panel__textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('ai.promptPlaceholder')}
          rows={3}
          disabled={isGenerating}
        />
        
        {error && (
          <div className="ai-prompt-panel__error">
            {error}
          </div>
        )}
        
        <div className="ai-prompt-panel__actions">
          <button
            className="ai-prompt-panel__button ai-prompt-panel__button--secondary"
            onClick={onClose}
            disabled={isGenerating}
          >
            {t('cancelButton')}
          </button>
          <button
            className="ai-prompt-panel__button ai-prompt-panel__button--primary"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? t('ai.generating') : t('ai.generateButton')}
          </button>
        </div>
        
        <div className="ai-prompt-panel__hint">
          {t('ai.shortcutHint')}
        </div>
      </div>
    </div>
  );
};

export default AIPromptPanel;
