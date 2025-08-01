# SmartFormInput 组件功能需求

## 功能概述

设计一个通用的 SmartFormInput 组件，提供表单级别的 AI 智能填充功能。该组件能够一次性为整个表单的多个字段生成内容，与现有的 SmartInput 组件形成互补关系：
- **SmartInput**: 针对单个输入字段的 AI 助手
- **SmartFormInput**: 针对整个表单的 AI 智能填充

## 核心特性

### 1. 表单自动检测与分析
- 自动扫描表单容器内的所有 `input` 和 `textarea` 元素
- 提取字段元信息：
  - `name` 属性作为字段标识
  - `placeholder` 作为字段提示信息
  - 关联的 `label` 元素文本
  - `required` 属性判断字段重要性
  - `type` 属性识别输入类型（text, email, url 等）
  - `maxlength` 限制内容长度

### 2. 智能提示词构建
基于表单字段信息自动构建结构化提示词：
```
表单类型：{根据字段推断的表单用途}
需要填充的字段：
- {fieldName}: {label/placeholder} {是否必填} {长度限制}
- ...

请为以下表单生成合适的内容，返回 JSON 格式：
{
  "fieldName1": "生成的内容1",
  "fieldName2": "生成的内容2"
}
```

### 3. 魔法按钮集成
- 在表单按钮组（`.form-actions` 或指定容器）右侧添加魔法按钮
- 支持自定义按钮位置和样式
- 按钮状态管理：正常/加载中/错误状态

### 4. 一键智能填充
- 调用 AI 服务生成所有字段内容
- 解析 JSON 响应并自动填充对应字段
- 支持部分填充（某些字段生成失败时）
- 保留用户已输入的内容（可配置是否覆盖）

## 技术实现方案

### 1. 组件接口设计
```typescript
interface SmartFormInputProps {
  // 表单容器引用或选择器
  formRef?: React.RefObject<HTMLFormElement>;
  formSelector?: string; // 默认使用父级表单
  
  // 按钮配置
  buttonContainer?: string; // 按钮插入位置的选择器
  buttonText?: string; // 按钮文本
  buttonClassName?: string; // 按钮样式类名
  
  // AI 配置
  customPrompt?: string; // 自定义提示词前缀
  preserveExistingValues?: boolean; // 是否保留已有值
  
  // 回调函数
  onBeforeGenerate?: (fields: FormField[]) => boolean; // 生成前回调
  onAfterGenerate?: (results: Record<string, string>) => void; // 生成后回调
  onError?: (error: Error) => void; // 错误处理
}

interface FormField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  maxLength?: number;
  currentValue: string;
}
```

### 2. 自动字段检测算法
```typescript
const detectFormFields = (formElement: HTMLFormElement): FormField[] => {
  const inputs = formElement.querySelectorAll('input, textarea');
  return Array.from(inputs).map(input => ({
    name: input.name || input.id,
    type: input.type || 'text',
    label: findAssociatedLabel(input),
    placeholder: input.placeholder,
    required: input.required,
    maxLength: input.maxLength > 0 ? input.maxLength : undefined,
    currentValue: input.value
  }));
};
```

### 3. React Hook 实现
```typescript
const useSmartFormInput = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateFormContent = async (
    formElement: HTMLFormElement,
    options: SmartFormInputOptions
  ) => {
    // 实现表单智能填充逻辑
  };
  
  return { generateFormContent, isGenerating, error };
};
```

## 使用示例

### 基础用法
```tsx
// 自动检测父级表单
<SmartFormInput />

// 指定表单引用
<SmartFormInput formRef={formRef} />

// 自定义配置
<SmartFormInput
  buttonText="AI 智能填充"
  customPrompt="这是一个待办事项表单，请生成实用的内容："
  preserveExistingValues={true}
  onAfterGenerate={(results) => console.log('Generated:', results)}
/>
```

### 与现有表单集成
```tsx
const TodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  return (
    <form ref={formRef}>
      {/* 现有表单字段 */}
      <input name="title" placeholder="待办事项标题" />
      <textarea name="description" placeholder="详细描述" />
      
      <div className="form-actions">
        <button type="submit">保存</button>
        <SmartFormInput 
          formRef={formRef}
          buttonContainer=".form-actions"
        />
      </div>
    </form>
  );
};
```

## 实现优先级

### Phase 1: 核心功能
- [ ] 表单字段自动检测
- [ ] 基础的 AI 内容生成
- [ ] 简单的填充逻辑

### Phase 2: 增强功能
- [ ] 智能提示词优化
- [ ] 错误处理和重试机制
- [ ] 用户交互优化

### Phase 3: 高级特性
- [ ] 表单类型智能识别
- [ ] 内容生成质量优化
- [ ] 性能优化和缓存

## 技术约束

- 必须使用 TypeScript 和函数式组件
- 遵循现有的 AI 配置和服务架构
- 支持国际化（中英文）
- 兼容现有的 SCSS 样式系统
- 不与 SmartInput 组件产生冲突
