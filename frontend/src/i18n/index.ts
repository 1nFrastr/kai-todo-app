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
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      
      // Language
      language: "Language",
      english: "English",
      chinese: "中文"
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
      lightMode: "浅色模式",
      darkMode: "深色模式",
      
      // Language
      language: "语言",
      english: "English",
      chinese: "中文"
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
