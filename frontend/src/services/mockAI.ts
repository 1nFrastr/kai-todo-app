// Mock AI service for simulating AI content generation

export const mockAIGenerate = async (
  prompt: string, 
  type: 'short_text' | 'long_text',
  language: string = 'zh-cn'
): Promise<string> => {
  // Simulate network delay 1-3 seconds
  const delay = 1000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate occasional error (5% probability)
  if (Math.random() < 0.05) {
    throw new Error(language === 'zh-cn' ? 'AI服务暂时不可用' : 'AI service temporarily unavailable');
  }
  
  // Generate mock content
  const isZhCn = language === 'zh-cn';
  const baseResponse = isZhCn 
    ? `这是根据您输入的"${prompt}"生成的内容`
    : `This is generated content based on your input "${prompt}"`;
  
  if (type === 'short_text') {
    return isZhCn ? `${baseResponse}（精简版）` : `${baseResponse} (concise version)`;
  } else {
    return isZhCn 
      ? `${baseResponse}，包含更详细的描述和说明。这里展示了多行文本生成的效果，可以包含更丰富的内容结构。`
      : `${baseResponse}, with more detailed descriptions and explanations. This demonstrates multi-line text generation with richer content structure.`;
  }
};
