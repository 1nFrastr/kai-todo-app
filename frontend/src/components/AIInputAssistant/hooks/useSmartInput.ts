import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockAIGenerate } from '../../../services/mockAI';
import type { UseSmartInputReturn } from '../types';

export const useSmartInput = (): UseSmartInputReturn => {
  const { i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (prompt: string, type: 'input' | 'textarea'): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const textType = type === 'input' ? 'short_text' : 'long_text';
      const language = i18n.language === 'zh' ? 'zh-cn' : 'en';
      const result = await mockAIGenerate(prompt, textType, language);
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
