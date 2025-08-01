import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // App Header
      appTitle: "📝 Todo List",
      appSubtitle: "Manage your daily tasks",
      
      // Form
      addNewTodo: "Add New Todo",
      editTodo: "Edit Todo",
      titleLabel: "Title *",
      titlePlaceholder: "Please enter todo title",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Please enter detailed description (optional)",
      addButton: "Add",
      updateButton: "Update",
      cancelButton: "Cancel",
      
      // Todo Item
      createdAt: "Created at: ",
      editButtonText: "Edit",
      deleteButtonText: "Delete",
      
      // Filter
      allTodos: "All",
      pendingTodos: "Pending",
      completedTodos: "Completed",
      
      // Empty States
      noPendingTodos: "No pending todos",
      noCompletedTodos: "No completed todos",
      noTodos: "No todos yet, create a new one!",
      
      // Messages
      loading: "Loading...",
      loadError: "Failed to load todos, please check if the backend service is running normally",
      createError: "Failed to create todo",
      updateError: "Failed to update todo",
      toggleError: "Failed to update todo status",
      deleteError: "Failed to delete todo",
      deleteConfirm: "Are you sure you want to delete this todo?",
      
      // Theme
      theme: "Theme",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      
      // Language
      language: "Language",
      english: "English",
      chinese: "中文",

      // Navigation
      navigation: {
        todoApp: "Todo App",
        postApp: "Post App",
        comingSoon: "Coming Soon"
      },

      // Sidebar  
      sidebar: {
        collapse: "Collapse",
        expand: "Expand"
      },

      // Post App
      postApp: {
        description: "This feature is under development. It will allow you to create and publish content with AI assistance."
      },
      
      // AI Assistant
      ai: {
        buttonTitle: "AI Assistant",
        panelTitle: "AI Content Generator",
        closePanel: "Close",
        promptPlaceholder: "Describe what you want to generate...",
        generateButton: "Generate",
        generating: "Generating...",
        shortcutHint: "Press Ctrl+Enter to generate"
      },

      // Smart Form Input
      smartForm: {
        buttonTitle: "AI Smart Fill",
        fillForm: "Smart Fill",
        generating: "Generating...",
        formNotFound: "Form element not found",
        noFieldsFound: "No fillable form fields found",
        invalidResponse: "AI generated content format is incorrect"
      },
      
      // AI Configuration
      aiConfig: {
        title: "AI Settings",
        button: "AI Settings",
        buttonTooltip: "Configure AI Service",
        
        // Form fields
        apiKeyLabel: "API Key *",
        apiKeyPlaceholder: "Enter OpenAI API Key",
        baseUrlLabel: "Base URL",
        baseUrlPlaceholder: "https://api.openai.com/v1",
        modelLabel: "Model",
        modelPlaceholder: "Select or enter model name",
        timeoutLabel: "Timeout (seconds)",
        
        // Buttons
        testConnection: "Test Connection",
        save: "Save",
        cancel: "Cancel",
        clear: "Clear Config",
        
        // Test results
        testing: "Testing...",
        testSuccess: "Connection successful",
        testFailed: "Connection failed",
        
        // Validation messages
        apiKeyRequired: "API Key is required",
        invalidUrl: "Please enter a valid URL",
        modelRequired: "Model is required",
        timeoutRange: "Timeout must be between 5-300 seconds",
        
        // Success messages
        saveSuccess: "Configuration saved successfully",
        clearSuccess: "Configuration cleared successfully",
        
        // Error messages
        saveError: "Failed to save configuration",
        clearError: "Failed to clear configuration",
        testError: "Connection test failed",
        networkError: "Network error",
        timeoutError: "Connection timeout",
        invalidApiKey: "Invalid API key",
        accessForbidden: "Access forbidden",
        serviceNotFound: "Service not found. Please check the base URL",
        rateLimitExceeded: "Rate limit exceeded",
        serverError: "Server error",
        invalidResponse: "Invalid response format"
      }
    }
  },
  zh: {
    translation: {
      // App Header
      appTitle: "📝 待办清单",
      appSubtitle: "管理您的日常任务",
      
      // Form
      addNewTodo: "添加新的待办事项",
      editTodo: "编辑待办事项",
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
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
