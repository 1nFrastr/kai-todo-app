# AI服务配置需求

## 功能概述

前端可以设置OPENAI相关API服务的模型名称，APIKEY，baseURL自定义的服务地址。

用户保存后，缓存在浏览器localstorage

使用AI功能前，必须先配置好以上参数

参数配置是个弹窗窗口，有测试的按钮，测试是否和AI服务的连通性，是否能正常对话。

纯前端实现，不需要后端

## 技术实现要求

### 技术栈
- TypeScript + React (Functional Components + Hooks)
- SCSS for styling
- 国际化支持 (中英文)
- 支持暗黑模式主题

### 组件结构
```
src/components/AIConfig/
├── index.ts
├── AIConfigModal.tsx          # 配置弹窗主组件
├── AIConfigModal.scss         # 样式文件
├── AIConfigForm.tsx           # 配置表单组件
├── AIConfigForm.scss          # 表单样式
├── types.ts                   # TypeScript类型定义
└── hooks/
    └── useAIConfig.ts         # 配置管理Hook
```

## 详细功能规格

### 1. 配置参数

| 字段名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| apiKey | string | 是 | - | OpenAI API密钥 |
| baseURL | string | 否 | 'https://api.openai.com/v1' | API服务地址 |
| model | string | 否 | 'gpt-3.5-turbo' | 模型名称 |
| timeout | number | 否 | 30000 | 请求超时时间(ms) |

### 2. 界面设计

#### 配置弹窗 (AIConfigModal)
- 弹窗标题：支持中英文切换
  - 中文："AI服务配置"
  - 英文："AI Service Configuration"
- 弹窗大小：固定宽度600px，高度自适应
- 遮罩层：半透明背景，点击关闭弹窗
- 关闭按钮：右上角X按钮

#### 配置表单 (AIConfigForm)
- **API Key输入框**
  - 类型：密码框（默认隐藏内容）
  - 占位符：中文"请输入OpenAI API Key" / 英文"Enter OpenAI API Key"
  - 显示/隐藏按钮：眼睛图标切换显示状态
  - 必填验证：为空时显示错误提示

- **Base URL输入框**
  - 类型：文本框
  - 占位符：显示默认值
  - URL格式验证：必须是有效的HTTP/HTTPS URL

- **Model输入框**
  - 类型：下拉选择框 + 自定义输入
  - 预设选项：
    - gpt-3.5-turbo
    - gpt-4
    - gpt-4-turbo
    - 自定义 (允许手动输入)

- **Timeout设置**
  - 类型：数字输入框
  - 单位：秒
  - 范围：5-300秒
  - 步长：5秒

#### 操作按钮
- **测试连接按钮**
  - 位置：表单底部左侧
  - 状态：加载中显示spinner
  - 功能：发送测试请求验证配置是否有效
  
- **保存按钮**
  - 位置：表单底部右侧
  - 状态：只有配置有效时才启用
  
- **取消按钮**
  - 位置：保存按钮左侧
  - 功能：关闭弹窗，不保存更改

### 3. 数据存储

#### LocalStorage结构
```typescript
interface AIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
  timeout: number;
  lastUpdated: number; // 时间戳
}

// 存储键名
const AI_CONFIG_STORAGE_KEY = 'ai-service-config';
```

#### 数据加密
- API Key在localStorage中进行Base64编码存储（基础安全措施）
- 提供清除配置功能

### 4. 连接测试

#### 测试流程
1. 用户点击"测试连接"按钮
2. 使用当前配置参数发送测试请求
3. 测试请求内容：简单的对话测试（如"Hello"）
4. 显示测试结果

#### 测试状态
- **测试中**: 显示loading状态，按钮禁用
- **测试成功**: 显示绿色成功图标和提示文字
- **测试失败**: 显示红色错误图标和具体错误信息

#### 错误处理
- 网络错误：显示连接超时提示
- 认证错误：显示API Key无效提示
- 其他错误：显示具体错误信息

### 5. 用户体验

#### 表单验证
- 实时验证：输入时即时检查格式
- 错误提示：在对应字段下方显示错误信息
- 整体验证：保存前进行完整性检查

#### 国际化文本
需要翻译的文本内容：
- 弹窗标题、字段标签
- 占位符文本、按钮文字
- 错误提示信息、成功提示信息

#### 主题适配
- 支持亮色/暗色主题切换
- 表单元素颜色自适应
- 按钮和图标主题一致性

### 6. Hook设计 (useAIConfig)

```typescript
interface UseAIConfigReturn {
  config: AIConfig | null;
  isLoading: boolean;
  isTesting: boolean;
  testResult: TestResult | null;
  saveConfig: (config: AIConfig) => Promise<void>;
  testConnection: (config: AIConfig) => Promise<TestResult>;
  clearConfig: () => void;
  isConfigValid: (config: Partial<AIConfig>) => boolean;
}
```

### 7. 集成要求

#### 入口触发
- 在现有的ThemeLanguageToggle组件旁边添加AI配置按钮
- 图标：齿轮或设置图标
- 工具提示：显示"AI配置"文字

#### 状态管理
- 配置状态与现有的Todo应用状态独立
- 通过Context或直接的Hook调用方式提供给其他组件使用

#### 依赖关系
- 不影响现有功能的正常使用
- AI功能组件在使用前检查配置是否完整

### 8. 开发任务分解

1. **类型定义** - 创建AIConfig相关的TypeScript接口
2. **Hook开发** - 实现useAIConfig hook
3. **UI组件** - 开发配置弹窗和表单组件
4. **样式开发** - 实现SCSS样式，支持主题切换
5. **国际化** - 添加中英文翻译文本
6. **测试功能** - 实现连接测试逻辑
7. **集成测试** - 与现有应用集成测试
8. **文档更新** - 更新README使用说明