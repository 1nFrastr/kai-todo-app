# App应用页面加入登录注册功能

## 需求概述
为主应用页面（Todo App）增加用户登录注册功能，与Admin系统共享相同的用户体系和API接口，但UI风格适配App应用页面。

## 功能要求

### 1. 主应用页面Header增强
- 在主应用Layout组件的右上角增加用户认证区域
- **未登录状态**：显示"登录"和"注册"按钮
- **已登录状态**：显示当前用户信息（用户名）和"退出登录"按钮
- 用户信息区域样式要与应用主题保持一致（支持暗黑模式）

### 2. 登录/注册模态弹窗
- 参考Admin页面的登录注册表单设计：`AdminLoginPage`和`AdminRegisterPage`
- 创建模态弹窗形式的登录注册组件：
  - `AppLoginModal` - 应用页面登录模态弹窗
  - `AppRegisterModal` - 应用页面注册模态弹窗
- 模态弹窗应包含：
  - 半透明背景遮罩
  - 居中显示的表单面板
  - 关闭按钮（X按钮或ESC键）
  - 点击背景关闭功能

### 3. 表单功能复用
- **复用现有API接口**：使用`authAPI.login()`和`authAPI.register()`
- **复用认证状态管理**：使用现有的`useAuthStore`
- **复用表单验证逻辑**：参考Admin页面的表单验证
- **包含字段**：
  - 登录：用户名、密码、记住我选项
  - 注册：名字、姓氏、用户名、邮箱、密码、确认密码
- **表单功能**：
  - 密码显示/隐藏切换
  - 表单验证和错误提示
  - 提交状态管理（loading状态）
  - 成功/失败消息提示

### 4. 用户体验增强
- **匿名用户提醒**：在Todo应用中为未登录用户显示警告信息（参考现有的`anonymousWarning`翻译）
- **登录后同步**：用户登录后，Todo数据应该与用户账户关联
- **状态持久化**：登录状态在页面刷新后保持
- **模态弹窗间切换**：登录弹窗可直接切换到注册弹窗，反之亦然

### 5. UI/UX要求
- **主题适配**：组件必须支持亮色/暗黑主题切换
- **响应式设计**：适配PC端布局（移动端暂不考虑）
- **动画效果**：模态弹窗打开/关闭要有平滑动画
- **无障碍访问**：支持键盘导航，ESC关闭，焦点管理
- **视觉一致性**：与应用整体风格保持一致，但区别于Admin页面风格

### 6. 多语言支持
需要在国际化文件中添加相关翻译：
- `src/i18n/locales/zh/app.ts`
- `src/i18n/locales/en/app.ts`

翻译内容包括：
```typescript
// 用户认证相关
auth: {
  login: "登录",
  register: "注册", 
  logout: "退出登录",
  loginTitle: "用户登录",
  registerTitle: "用户注册",
  welcomeBack: "欢迎回来",
  createAccount: "创建新账户",
  alreadyHaveAccount: "已有账户？点击登录",
  noAccount: "还没有账户？点击注册",
  // ... 其他表单相关翻译
}
```

## 技术实现要点

### 1. 组件结构
```
src/components/
├── AppHeader/              # 新增：应用页面Header组件
│   ├── index.tsx
│   └── AppHeader.scss
├── AppAuthModals/          # 新增：认证模态弹窗组件
│   ├── AppLoginModal.tsx
│   ├── AppRegisterModal.tsx
│   ├── index.ts
│   └── AppAuthModals.scss
```

### 2. 需要修改的现有文件
- `src/components/Layout/Layout.tsx` - 增加Header区域
- `src/components/Layout/Layout.scss` - 布局样式调整
- `src/i18n/locales/*/app.ts` - 添加认证相关翻译

### 3. 状态管理
- 复用现有的`useAuthStore`进行认证状态管理
- 新增模态弹窗显示状态的本地组件状态管理

### 4. 样式设计原则
- 遵循应用现有的CSS变量系统（`--bg-primary`、`--text-primary`等）
- 模态弹窗层级管理（z-index）
- 与Sidebar和主内容区域的布局协调

## 验收标准
1. 未登录用户可以看到登录/注册按钮
2. 点击按钮能正常打开对应的模态弹窗
3. 表单验证功能正常，能正确显示错误信息
4. 登录/注册功能正常，与Admin系统共享用户数据
5. 登录后显示用户信息和退出登录按钮
6. 支持主题切换，在亮色/暗黑模式下显示正常
7. 支持中英文切换
8. 键盘操作友好（ESC关闭、Tab导航等）
9. 模态弹窗动画效果流畅
10. 与现有布局（Sidebar）协调展示

## 备注
- 此功能不影响现有Admin系统的登录注册功能
- 保持与Admin系统的API兼容性
- 优先实现核心功能，动画和细节优化可后续迭代
