# 侧边栏菜单布局设计方案

## 技术实现要求

### 路由导航
- 使用 React Router (react-router-dom) 实现路由导航
- 安装依赖：`pnpm add react-router-dom @types/react-router-dom`
- 在main.tsx中配置BrowserRouter包装App组件

### 菜单结构
实现2个主要应用菜单：
1. **Todo App** - 任务管理应用（默认首页路由）
2. **Post App** - 内容发布应用（预设简单占位页面，显示"功能开发中"）

## 布局设计规格

### 侧边栏特性
- **位置**：屏幕左侧
- **高度**：不占满屏幕，设置合理高度（如 80vh 或固定高度）
- **交互**：支持展开/收起切换
- **展开宽度**：240px
- **收起宽度**：64px
- **过渡动画**：平滑的宽度变化动画

### 布局分区
1. **菜单区域**：在整个侧边栏区域垂直居中
   - Todo App 菜单项
   - Post App 菜单项（占位）
   
2. **底部设置区域**：全局通用设置
   - 语言切换组件（复用现有ThemeLanguageToggle）
   - 深色/浅色主题切换（复用现有的组件逻辑，UI可按需调整）
   - 侧边栏展开/收起按钮

## 实现方案

### 文件结构
```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx       // 主布局容器
│   │   ├── Layout.scss
│   │   └── index.ts
│   └── Sidebar/
│       ├── Sidebar.tsx      // 侧边栏组件
│       ├── Sidebar.scss
│       └── index.ts
├── pages/
│   ├── TodoApp/
│   │   ├── TodoApp.tsx      // 重构现有App.tsx内容
│   │   └── index.ts
│   └── PostApp/
│       ├── PostApp.tsx      // 简单占位页面
│       └── index.ts
└── hooks/
    └── useSidebar.ts        // 侧边栏状态管理
```

### 路由配置
```typescript
// 路由结构设计
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/todo" replace /> },
      { path: 'todo', element: <TodoApp /> },
      { path: 'post', element: <PostApp /> }
    ]
  }
];
```

### 状态管理
- 使用Zustand创建sidebarStore管理展开/收起状态
- 侧边栏状态持久化到localStorage
- 复用现有的主题和语言状态管理

### 样式设计要点
- 使用CSS Grid或Flexbox实现Layout布局
- 侧边栏使用fixed定位，不影响主内容区域
- 添加CSS变量支持主题切换
- 响应式考虑：小屏幕下可自动收起

### 国际化文本
在现有i18n配置中添加：
```json
{
  "navigation": {
    "todoApp": {
      "en": "Todo App",
      "zh": "任务管理"
    },
    "postApp": {
      "en": "Post App", 
      "zh": "内容发布"
    },
    "comingSoon": {
      "en": "Coming Soon",
      "zh": "功能开发中"
    }
  }
}
```

### 开发步骤
1. 安装React Router依赖
2. 创建Layout和Sidebar基础组件
3. 实现侧边栏展开/收起逻辑
4. 配置路由和页面组件
5. 重构现有TodoApp为页面组件
6. 创建PostApp占位页面
7. 集成主题和语言切换功能
8. 样式优化和动画效果

### 技术规范遵循
- TypeScript严格模式
- 函数式组件 + React Hooks
- SCSS模块化样式
- 英文代码注释
- 支持暗黑模式
- 响应式PC端布局