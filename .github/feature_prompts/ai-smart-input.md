# SmartInput组件功能需求

## 功能概述

设计一个通用的SmartInput组件，集成AI输入助手功能，支持input和textarea两种原生组件类型。通过AI生成内容来帮助用户快速填充输入框，提升用户体验和输入效率。该组件设计为通用组件，不针对任何特定的业务字段类型。

## 功能特性

### 1. 组件支持的输入类型
- **input**: 支持单行文本输入，适用于标题、名称等短文本场景
- **textarea**: 支持多行文本输入，适用于描述、备注等长文本场景
- **通用性**: 组件不依赖任何特定业务逻辑，可用于任何需要AI辅助输入的场景

### 2. AI触发按钮
- **位置**: 在输入框的右侧或右上角添加一个魔法杖图标按钮
- **样式**: 
  - 使用魔法杖（🪄）或类似的AI图标
  - 支持暗黑模式和浅色模式
  - 鼠标悬停时有视觉反馈效果
  - 按钮大小适中，不影响原有输入框布局
  - 自适应input和textarea两种组件的高度和布局
- **交互**: 点击按钮触发AI输入面板

### 3. AI输入面板
- **显示方式**: 
  - 点击魔法杖按钮后，在输入框旁边（优先右侧，空间不足时显示在下方）弹出输入面板
  - 面板采用浮动窗口或下拉面板的形式
  - 包含关闭按钮，支持ESC键关闭
- **面板内容**:
  - 提示词输入框（多行文本框）
  - 生成按钮
  - 加载状态指示器
  - 错误提示区域

### 4. AI功能集成
- **提示词处理**:
  - 用户在AI面板中输入描述性文本
  - 支持多语言提示词输入（中文/英文）
  - 提供通用的提示词模板或快捷建议
- **内容生成**:
  - 调用AI服务生成相关内容
  - 生成内容长度和格式自适应当前输入组件类型（input或textarea）
  - 支持重新生成功能
- **内容填充**:
  - 生成的内容自动填充到原输入框
  - 支持用户编辑生成的内容
  - 提供"接受"和"重试"选项

## 技术实现要求

### 1. 前端实现
- **框架**: 基于现有的React + TypeScript技术栈
- **样式**: 使用Sass，确保与现有UI风格一致
- **组件结构**:
  ```
  SmartInput/
  ├── SmartInput.tsx            # 主组件，支持input和textarea
  ├── SmartInput.scss           # 样式文件
  ├── AIPromptPanel.tsx         # AI提示面板子组件
  ├── types.ts                  # 类型定义
  └── hooks/
      └── useSmartInput.ts      # 自定义Hook，处理AI逻辑
  ```

### 2. 组件API设计
- **Props接口**:
  ```typescript
  interface SmartInputProps {
    // 基础输入组件属性
    type: 'input' | 'textarea';
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    
    // HTML原生属性透传
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    
    // AI功能配置
    aiEnabled?: boolean;
    aiPromptPlaceholder?: string;
    onAIGenerate?: (prompt: string) => Promise<string>;
    
    // 样式定制
    className?: string;
    aiButtonClassName?: string;
  }
  ```

### 3. 状态管理
- **本地状态**: 
  - AI面板显示/隐藏状态
  - 提示词内容
  - 生成状态（加载中、成功、失败）
  - 生成的内容
  - 输入组件的内部状态
- **组件状态隔离**: 每个SmartInput组件实例维护独立的状态

### 4. AI模拟实现
- **前端模拟**: 
  - 暂不实现真实的后端API，在前端模拟AI请求过程
  - 模拟网络延迟和加载状态
  - 返回基于用户输入的模拟生成内容
- **模拟逻辑**:
  ```typescript
  const mockAIGenerate = async (prompt: string, type: 'short_text' | 'long_text'): Promise<string> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // 生成模拟内容
    const baseResponse = `这是根据您输入的"${prompt}"生成的内容`;
    
    if (type === 'short_text') {
      return `${baseResponse}（简化版）`;
    } else {
      return `${baseResponse}，包含更详细的描述和说明。这里可以是多行文本，展示长文本生成的效果。`;
    }
  };
  ```

### 5. 用户体验优化
- **响应式设计**: 确保在不同屏幕尺寸下正常显示
- **自适应布局**: 根据input/textarea类型自动调整按钮位置和面板布局
- **加载状态**: 生成过程中显示加载动画
- **错误处理**: 网络错误、生成失败等情况的友好提示
- **键盘支持**: 支持Tab、Enter、ESC等快捷键操作

## 使用场景示例

### 1. 短文本生成（input类型）
- **场景**: 任务标题、项目名称、标签等
- **输入示例**: "明天要开会讨论项目进度"
- **模拟生成结果**: "这是根据您输入的"明天要开会讨论项目进度"生成的内容（精简版）"

### 2. 长文本生成（textarea类型）
- **场景**: 任务描述、评论、备注等
- **输入示例**: "准备季度报告"
- **模拟生成结果**: "这是根据您输入的"准备季度报告"生成的内容，包含更详细的描述和说明。这里展示了多行文本生成的效果，可以包含更丰富的内容结构。"

### 3. 英文模拟示例
- **输入示例**: "team collaboration"
- **模拟生成结果**: "This is generated content based on your input "team collaboration" (concise version)"

## 多语言支持

### 1. 界面文本
- 魔法杖按钮提示文本
- AI面板标题和按钮文本
- 错误提示信息
- 占位符文本

### 2. 提示词模板
- 提供中英文通用提示词模板
- 根据用户语言设置显示对应模板
- 模板内容通用化，不针对特定业务场景

### 3. 组件集成示例
```typescript
// 在TODO应用中的使用示例
<SmartInput
  type="input"
  value={title}
  onChange={setTitle}
  placeholder={t('todo.titlePlaceholder')}
  aiEnabled={true}
  aiPromptPlaceholder={t('ai.promptPlaceholder')}
  onAIGenerate={handleAIGenerate}
/>

<SmartInput
  type="textarea"
  value={description}
  onChange={setDescription}
  placeholder={t('todo.descriptionPlaceholder')}
  aiEnabled={true}
  textareaProps={{ rows: 4 }}
/>
```

## AI模拟实现详细说明

### 1. 模拟函数设计
```typescript
// services/mockAI.ts
export const mockAIGenerate = async (
  prompt: string, 
  type: 'short_text' | 'long_text',
  language: string = 'zh-cn'
): Promise<string> => {
  // 模拟网络延迟 1-3秒
  const delay = 1000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // 模拟偶尔的错误情况 (5%概率)
  if (Math.random() < 0.05) {
    throw new Error(language === 'zh-cn' ? 'AI服务暂时不可用' : 'AI service temporarily unavailable');
  }
  
  // 生成模拟内容
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
```

### 2. Hook集成示例
```typescript
// hooks/useSmartInput.ts
import { mockAIGenerate } from '../services/mockAI';

export const useSmartInput = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (prompt: string, type: 'input' | 'textarea') => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const textType = type === 'input' ? 'short_text' : 'long_text';
      const result = await mockAIGenerate(prompt, textType);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { generateContent, isGenerating, error };
};
```

## 可选增强功能（未来版本）

### 1. 真实AI集成
- 集成真实的AI服务（如OpenAI API、ChatGPT等）
- 替换当前的模拟实现
- 实现更智能的内容生成

### 2. 智能建议
- 根据用户历史输入提供智能提示词建议
- 学习用户习惯，优化生成内容

### 3. 内容格式化
- 支持Markdown格式生成（适用于textarea）
- 自动格式化和美化生成的内容

### 4. 更多输入类型支持
- 扩展支持更多HTML输入类型
- 支持富文本编辑器集成

## 实现步骤

1. **设计组件API**: 确定SmartInput组件的接口和属性
2. **创建基础组件**: 实现SmartInput组件框架，支持input和textarea
3. **实现AI面板**: 创建可复用的AI提示面板子组件
4. **集成自定义Hook**: 实现useSmartInput Hook处理AI逻辑和模拟请求
5. **实现模拟AI功能**: 在前端实现模拟的AI内容生成逻辑
6. **完善交互逻辑**: 实现完整的用户交互流程
7. **集成到现有项目**: 在TODO应用中替换原有input组件
8. **测试和优化**: 进行功能测试和用户体验优化
9. **多语言适配**: 完成中英文界面适配
10. **文档编写**: 编写组件使用文档和示例

## 验收标准

- [ ] SmartInput组件支持input和textarea两种类型
- [ ] AI按钮正确显示在输入框旁边，适应不同输入类型
- [ ] 点击按钮能正确打开/关闭AI面板
- [ ] 输入提示词能成功生成相关内容
- [ ] 生成的内容能正确填充到输入框
- [ ] 组件支持所有必要的props和事件回调
- [ ] 支持HTML原生属性透传
- [ ] 支持暗黑模式和浅色模式
- [ ] 支持中英文界面切换
- [ ] 错误情况有友好的提示信息
- [ ] 在不同屏幕尺寸下正常显示
- [ ] 键盘快捷键正常工作
- [ ] 组件具有良好的TypeScript类型支持
- [ ] 无明显性能问题和内存泄漏
- [ ] 组件可在任何React项目中复用
