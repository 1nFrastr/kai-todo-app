import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { realAIGenerate, isAIConfigured } from '../../../services/realAI';
import type { UseSmartFormInputReturn, SmartFormInputOptions } from '../types';
import { detectFormFields, buildFormPrompt, parseAIResponse, fillFormFields } from '../utils';

export const useSmartFormInput = (): UseSmartFormInputReturn => {
  const { i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFormContent = async (
    formElement: HTMLFormElement,
    options: SmartFormInputOptions = {}
  ): Promise<void> => {
    setIsGenerating(true);
    setError(null);

    const {
      customPrompt,
      preserveExistingValues = false,
      onBeforeGenerate,
      onAfterGenerate,
      onError
    } = options;

    try {
      // Check if AI is configured
      if (!isAIConfigured()) {
        const errorMessage = i18n.language === 'zh' 
          ? '请先配置AI服务设置' 
          : 'Please configure AI service settings first';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Detect form fields
      const fields = detectFormFields(formElement);
      
      if (fields.length === 0) {
        const errorMessage = i18n.language === 'zh'
          ? '未找到可填充的表单字段'
          : 'No fillable form fields found';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Call before generate callback
      if (onBeforeGenerate && !onBeforeGenerate(fields)) {
        // Generation cancelled by callback
        return;
      }

      // Build prompt
      const language = i18n.language === 'zh' ? 'zh' : 'en';
      const prompt = buildFormPrompt(fields, customPrompt, language);

      // Generate content using AI service
      const result = await realAIGenerate(prompt, 'long_text', i18n.language === 'zh' ? 'zh-cn' : 'en');
      
      // Parse AI response
      const fieldValues = parseAIResponse(result);
      
      if (Object.keys(fieldValues).length === 0) {
        const errorMessage = i18n.language === 'zh'
          ? 'AI生成的内容格式不正确'
          : 'AI generated content format is incorrect';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Fill form fields
      fillFormFields(fields, fieldValues, preserveExistingValues);

      // Call after generate callback
      if (onAfterGenerate) {
        onAfterGenerate(fieldValues);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Call error callback
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
      
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateFormContent,
    isGenerating,
    error
  };
};
