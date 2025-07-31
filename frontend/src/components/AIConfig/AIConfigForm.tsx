import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AIConfigFormProps, AIConfig } from './types';
import { DEFAULT_AI_CONFIG, MODEL_OPTIONS } from './types';
import './AIConfigForm.scss';

export const AIConfigForm: React.FC<AIConfigFormProps> = ({
  config,
  onSave,
  onTest,
  onCancel,
  isLoading = false,
  isTesting = false,
  testResult = null,
}) => {
  const { t } = useTranslation();
  
  // Form state
  const [formData, setFormData] = useState<AIConfig>({
    apiKey: config?.apiKey || '',
    baseURL: config?.baseURL || DEFAULT_AI_CONFIG.baseURL,
    model: config?.model || DEFAULT_AI_CONFIG.model,
    timeout: config?.timeout || DEFAULT_AI_CONFIG.timeout,
    lastUpdated: config?.lastUpdated || 0,
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Show/hide password for API key
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Custom model input
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [customModel, setCustomModel] = useState('');

  // Update form when config prop changes
  useEffect(() => {
    if (config) {
      setFormData(config);
      
      // Check if using custom model
      const isModelInOptions = MODEL_OPTIONS.some(option => option.value === config.model);
      if (!isModelInOptions && config.model) {
        setIsCustomModel(true);
        setCustomModel(config.model);
      }
    }
  }, [config]);

  /**
   * Handle form field change
   */
  const handleChange = (field: keyof AIConfig, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for the field being changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Handle model selection change
   */
  const handleModelChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomModel(true);
      setCustomModel(formData.model);
    } else {
      setIsCustomModel(false);
      setCustomModel('');
      handleChange('model', value);
    }
  };

  /**
   * Handle custom model input
   */
  const handleCustomModelChange = (value: string) => {
    setCustomModel(value);
    handleChange('model', value);
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // API Key validation
    if (!formData.apiKey.trim()) {
      newErrors.apiKey = t('aiConfig.apiKeyRequired');
    }
    
    // Base URL validation
    if (!formData.baseURL.trim()) {
      newErrors.baseURL = t('aiConfig.invalidUrl');
    } else {
      try {
        new URL(formData.baseURL);
      } catch {
        newErrors.baseURL = t('aiConfig.invalidUrl');
      }
    }
    
    // Model validation
    const currentModel = isCustomModel ? customModel : formData.model;
    if (!currentModel.trim()) {
      newErrors.model = t('aiConfig.modelRequired');
    }
    
    // Timeout validation
    const timeoutInSeconds = formData.timeout / 1000;
    if (timeoutInSeconds < 5 || timeoutInSeconds > 300) {
      newErrors.timeout = t('aiConfig.timeoutRange');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) {
      return;
    }
    
    const configToSave: AIConfig = {
      ...formData,
      model: isCustomModel ? customModel : formData.model,
      lastUpdated: Date.now(),
    };
    
    onSave(configToSave);
  };

  /**
   * Handle test connection
   */
  const handleTest = () => {
    if (!validateForm()) {
      return;
    }
    
    const configToTest: AIConfig = {
      ...formData,
      model: isCustomModel ? customModel : formData.model,
      lastUpdated: Date.now(),
    };
    
    onTest(configToTest);
  };

  return (
    <form className="ai-config-form"
      // Form submission is handled by the button click, not form submit event
    >
      {/* API Key Field */}
      <div className="form-group">
        <label htmlFor="apiKey" className="form-label">
          {t('aiConfig.apiKeyLabel')}
        </label>
        <div className="input-with-action">
          <input
            id="apiKey"
            type={showApiKey ? 'text' : 'password'}
            value={formData.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            placeholder={t('aiConfig.apiKeyPlaceholder')}
            className={`form-input ${errors.apiKey ? 'error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            className="input-action-button"
            onClick={() => setShowApiKey(!showApiKey)}
            disabled={isLoading}
          >
            {showApiKey ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.apiKey && <span className="error-message">{errors.apiKey}</span>}
      </div>

      {/* Base URL Field */}
      <div className="form-group">
        <label htmlFor="baseURL" className="form-label">
          {t('aiConfig.baseUrlLabel')}
        </label>
        <input
          id="baseURL"
          type="text"
          value={formData.baseURL}
          onChange={(e) => handleChange('baseURL', e.target.value)}
          placeholder={t('aiConfig.baseUrlPlaceholder')}
          className={`form-input ${errors.baseURL ? 'error' : ''}`}
          disabled={isLoading}
        />
        {errors.baseURL && <span className="error-message">{errors.baseURL}</span>}
      </div>

      {/* Model Field */}
      <div className="form-group">
        <label htmlFor="model" className="form-label">
          {t('aiConfig.modelLabel')}
        </label>
        {!isCustomModel ? (
          <select
            id="model"
            value={formData.model}
            onChange={(e) => handleModelChange(e.target.value)}
            className={`form-select ${errors.model ? 'error' : ''}`}
            disabled={isLoading}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="custom-model-input">
            <input
              type="text"
              value={customModel}
              onChange={(e) => handleCustomModelChange(e.target.value)}
              placeholder={t('aiConfig.modelPlaceholder')}
              className={`form-input ${errors.model ? 'error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              className="secondary-button"
              onClick={() => handleModelChange(DEFAULT_AI_CONFIG.model)}
              disabled={isLoading}
            >
              {t('cancelButton')}
            </button>
          </div>
        )}
        {errors.model && <span className="error-message">{errors.model}</span>}
      </div>

      {/* Timeout Field */}
      <div className="form-group">
        <label htmlFor="timeout" className="form-label">
          {t('aiConfig.timeoutLabel')}
        </label>
        <input
          id="timeout"
          type="number"
          min="5"
          max="300"
          step="5"
          value={formData.timeout / 1000}
          onChange={(e) => handleChange('timeout', parseInt(e.target.value) * 1000)}
          className={`form-input ${errors.timeout ? 'error' : ''}`}
          disabled={isLoading}
        />
        {errors.timeout && <span className="error-message">{errors.timeout}</span>}
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
          <span className="test-icon">
            {testResult.success ? '✅' : '❌'}
          </span>
          <span className="test-message">{testResult.message}</span>
          {testResult.error && (
            <div className="test-error-details">{testResult.error}</div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="form-actions">
        <div className="left-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleTest}
            disabled={isLoading || isTesting}
          >
            {isTesting ? t('aiConfig.testing') : t('aiConfig.testConnection')}
          </button>
        </div>
        
        <div className="right-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={isLoading || isTesting}
          >
            {t('aiConfig.cancel')}
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={handleSubmit}
            disabled={isLoading || isTesting}
          >
            {isLoading ? t('loading') : t('aiConfig.save')}
          </button>
        </div>
      </div>
    </form>
  );
};
