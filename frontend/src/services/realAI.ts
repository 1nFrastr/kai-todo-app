import type { AIConfig } from '../components/AIConfig';
import { AI_CONFIG_STORAGE_KEY } from '../components/AIConfig';

/**
 * Real AI service using OpenAI API
 */

export interface AIGenerateOptions {
  prompt: string;
  type: 'short_text' | 'long_text';
  language: string;
}

export interface AIGenerateResult {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Load AI configuration from localStorage
 */
const loadAIConfig = (): AIConfig | null => {
  try {
    const stored = localStorage.getItem(AI_CONFIG_STORAGE_KEY);
    if (!stored) return null;
    
    const config = JSON.parse(stored);
    // Decode API key from base64
    if (config.apiKey) {
      config.apiKey = atob(config.apiKey);
    }
    return config;
  } catch (error) {
    console.error('Failed to load AI config:', error);
    return null;
  }
};

/**
 * Check if AI configuration is available and valid
 */
export const isAIConfigured = (): boolean => {
  const config = loadAIConfig();
  return !!(
    config &&
    config.apiKey &&
    config.baseURL &&
    config.model
  );
};

/**
 * Generate content using real AI service
 */
export const realAIGenerate = async (
  prompt: string,
  type: 'short_text' | 'long_text',
  language: string = 'zh-cn'
): Promise<string> => {
  // Check if AI is configured
  const config = loadAIConfig();
  if (!config) {
    throw new Error(
      language === 'zh-cn' 
        ? '请先配置AI服务设置' 
        : 'Please configure AI service settings first'
    );
  }

  // Build system prompt based on type and language
  const systemPrompt = buildSystemPrompt(type, language);
  
  // Build user prompt
  const userPrompt = buildUserPrompt(prompt, type, language);

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: type === 'short_text' ? 30 : 150,
        temperature: 0.7,
        stream: false,
      }),
      signal: AbortSignal.timeout(config.timeout),
    });

    if (!response.ok) {
      let errorMessage = language === 'zh-cn' ? 'AI服务请求失败' : 'AI service request failed';
      
      switch (response.status) {
        case 401:
          errorMessage = language === 'zh-cn' ? 'API密钥无效' : 'Invalid API key';
          break;
        case 403:
          errorMessage = language === 'zh-cn' ? '访问被拒绝' : 'Access forbidden';
          break;
        case 429:
          errorMessage = language === 'zh-cn' ? '请求频率超限' : 'Rate limit exceeded';
          break;
        case 500:
          errorMessage = language === 'zh-cn' ? '服务器内部错误' : 'Internal server error';
          break;
        default:
          errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error(
        language === 'zh-cn' 
          ? '响应格式无效' 
          : 'Invalid response format'
      );
    }

    const generatedContent = data.choices[0].message.content;
    
    if (!generatedContent || generatedContent.trim() === '') {
      throw new Error(
        language === 'zh-cn' 
          ? '生成的内容为空' 
          : 'Generated content is empty'
      );
    }

    return generatedContent.trim();

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(
          language === 'zh-cn' 
            ? '请求超时，请检查网络连接或增加超时时间' 
            : 'Request timeout, please check network connection or increase timeout'
        );
      }
      throw error;
    }
    
    throw new Error(
      language === 'zh-cn' 
        ? '未知错误' 
        : 'Unknown error'
    );
  }
};

/**
 * Build system prompt based on type and language
 */
const buildSystemPrompt = (type: 'short_text' | 'long_text', language: string): string => {
  const isZhCn = language === 'zh-cn';
  
  if (type === 'short_text') {
    return isZhCn
      ? '你是一个专业的待办事项助手。请根据用户的要求生成简洁的待办事项标题。回复必须是一句话，不超过20个字，直接给出标题内容，不需要解释。'
      : 'You are a professional todo assistant. Please generate concise todo item titles based on user requirements. Response must be one sentence, no more than 50 characters, provide the title directly without explanation.';
  } else {
    return isZhCn
      ? '你是一个专业的待办事项助手。请根据用户的要求生成待办事项的详细描述。回复应该简洁明了，不超过100个字，包含必要的步骤或注意事项，直接给出描述内容。'
      : 'You are a professional todo assistant. Please generate detailed descriptions for todo items based on user requirements. Response should be concise, no more than 200 characters, include necessary steps or notes, provide the description directly.';
  }
};

/**
 * Build user prompt based on requirements
 */
const buildUserPrompt = (prompt: string, type: 'short_text' | 'long_text', language: string): string => {
  const isZhCn = language === 'zh-cn';
  
  if (type === 'short_text') {
    return isZhCn
      ? `请为以下待办事项需求生成一个简洁的标题：${prompt}`
      : `Please generate a concise title for the following todo requirement: ${prompt}`;
  } else {
    return isZhCn
      ? `请为以下待办事项需求生成详细的描述内容：${prompt}`
      : `Please generate a detailed description for the following todo requirement: ${prompt}`;
  }
};

/**
 * Get AI configuration status for UI display
 */
export const getAIConfigStatus = () => {
  const config = loadAIConfig();
  return {
    isConfigured: isAIConfigured(),
    hasApiKey: !!(config?.apiKey),
    hasBaseURL: !!(config?.baseURL),
    hasModel: !!(config?.model),
    model: config?.model || '',
    lastUpdated: config?.lastUpdated || 0,
  };
};
