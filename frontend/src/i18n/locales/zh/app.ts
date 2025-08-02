export const app = {
  // App Header
  appTitle: "📝 待办清单",
  appSubtitle: "管理您的日常任务",
  
  // Form
  addNewTodo: "添加新的待办事项",
  editTodo: "编辑待办事项",
  anonymousWarning: "⚠️ 未登录状态下，您的待办事项将在10分钟后自动删除。请登录以体验完整功能。",
  titleLabel: "标题 *",
  titlePlaceholder: "请输入待办事项标题",
  descriptionLabel: "描述",
  descriptionPlaceholder: "请输入详细描述（可选）",
  addButton: "添加",
  updateButton: "更新",
  cancelButton: "取消",
  
  // Todo Item
  createdAt: "创建于: ",
  editButtonText: "编辑",
  deleteButtonText: "删除",
  
  // Filter
  allTodos: "全部",
  pendingTodos: "未完成",
  completedTodos: "已完成",
  
  // Empty States
  noPendingTodos: "暂无未完成的待办事项",
  noCompletedTodos: "暂无已完成的待办事项",
  noTodos: "暂无待办事项，创建一个新的吧！",
  
  // Messages
  loading: "加载中...",
  loadError: "加载待办事项失败，请检查后端服务是否正常运行",
  createError: "创建待办事项失败",
  updateError: "更新待办事项失败",
  toggleError: "更新待办事项状态失败",
  deleteError: "删除待办事项失败",
  deleteConfirm: "确定要删除这个待办事项吗？",
  
  // Theme
  theme: "主题",
  lightMode: "浅色模式",
  darkMode: "深色模式",
  
  // Language
  language: "语言",
  english: "English",
  chinese: "中文",

  // Navigation
  navigation: {
    todoApp: "任务管理",
    postApp: "内容发布",
    comingSoon: "功能开发中"
  },

  // Sidebar
  sidebar: {
    collapse: "收起",
    expand: "展开"
  },

  // Post App
  postApp: {
    description: "此功能正在开发中，将支持使用AI辅助创建和发布内容。"
  },
  
  // AI Assistant
  ai: {
    buttonTitle: "AI助手",
    panelTitle: "AI内容生成器",
    closePanel: "关闭",
    promptPlaceholder: "描述您想要生成的内容...",
    generateButton: "生成",
    generating: "生成中...",
    shortcutHint: "按 Ctrl+Enter 生成"
  },

  // Smart Form Input
  smartForm: {
    buttonTitle: "AI智能填充",
    fillForm: "智能填写",
    generating: "生成中...",
    formNotFound: "未找到表单元素",
    noFieldsFound: "未找到可填充的表单字段",
    invalidResponse: "AI生成的内容格式不正确"
  },
  
  // AI Configuration
  aiConfig: {
    title: "AI 设置",
    button: "AI设置",
    buttonTooltip: "配置AI服务",
    
    // Form fields
    apiKeyLabel: "API密钥 *",
    apiKeyPlaceholder: "请输入OpenAI API密钥",
    baseUrlLabel: "服务地址",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    modelLabel: "模型",
    modelPlaceholder: "选择或输入模型名称",
    timeoutLabel: "超时时间（秒）",
    
    // Buttons
    testConnection: "测试连接",
    save: "保存",
    cancel: "取消",
    clear: "清除配置",
    
    // Test results
    testing: "测试中...",
    testSuccess: "连接成功",
    testFailed: "连接失败",
    
    // Validation messages
    apiKeyRequired: "API密钥不能为空",
    invalidUrl: "请输入有效的URL地址",
    modelRequired: "模型不能为空",
    timeoutRange: "超时时间必须在5-300秒之间",
    
    // Success messages
    saveSuccess: "配置保存成功",
    clearSuccess: "配置清除成功",
    
    // Error messages
    saveError: "保存配置失败",
    clearError: "清除配置失败",
    testError: "连接测试失败",
    networkError: "网络错误",
    timeoutError: "连接超时",
    invalidApiKey: "API密钥无效",
    accessForbidden: "访问被拒绝",
    serviceNotFound: "服务未找到，请检查服务地址",
    rateLimitExceeded: "请求频率超限",
    serverError: "服务器错误",
    invalidResponse: "响应格式无效"
  }
};
