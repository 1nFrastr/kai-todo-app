export const app = {
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
};
