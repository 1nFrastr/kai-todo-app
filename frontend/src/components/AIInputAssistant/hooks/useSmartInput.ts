import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { realAIGenerate, isAIConfigured } from '../../../services/realAI';
import type { UseSmartInputReturn } from '../types';

export const useSmartInput = (): UseSmartInputReturn => {
  const { i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (prompt: string, type: 'input' | 'textarea'): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Check if AI is configured
      if (!isAIConfigured()) {
        const errorMessage = i18n.language === 'zh' 
          ? '请先配置AI服务设置' 
          : 'Please configure AI service settings first';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      const textType = type === 'input' ? 'short_text' : 'long_text';
      const language = i18n.language === 'zh' ? 'zh-cn' : 'en';
      const result = await realAIGenerate(prompt, textType, language);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { generateContent, isGenerating, error };
};
