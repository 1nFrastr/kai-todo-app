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
      },

      // Admin System
      admin: {
        title: "Admin System",
        backToApp: "Back to App",
        logout: "Logout",
        staff: "Staff",
        superuser: "Superuser",
        dashboard: "Dashboard",
        userManagement: "User Management",
        groupManagement: "Group Management",
        profileMenu: "Profile",
        
        // Login
        login: {
          title: "Admin Login",
          subtitle: "Sign in to access the admin panel",
          username: "Username",
          usernamePlaceholder: "Enter your username",
          password: "Password",
          passwordPlaceholder: "Enter your password",
          rememberMe: "Remember me",
          loginButton: "Sign In",
          loggingIn: "Signing in...",
          noAccount: "Don't have an account?",
          registerLink: "Register here"
        },

        // Register
        register: {
          title: "Admin Register",
          subtitle: "Create a new admin account",
          firstName: "First Name",
          firstNamePlaceholder: "Enter your first name",
          lastName: "Last Name",
          lastNamePlaceholder: "Enter your last name",
          username: "Username",
          usernamePlaceholder: "Enter your username",
          email: "Email",
          emailPlaceholder: "Enter your email",
          password: "Password",
          passwordPlaceholder: "Enter your password",
          confirmPassword: "Confirm Password",
          confirmPasswordPlaceholder: "Confirm your password",
          passwordMismatch: "Passwords do not match",
          registerButton: "Register",
          registering: "Registering...",
          hasAccount: "Already have an account?",
          loginLink: "Sign in here"
        },

        // Dashboard stats
        dashboardStats: {
          title: "Dashboard",
          subtitle: "Admin system overview",
          totalUsers: "Total Users",
          activeUsers: "Active Users",
          staffUsers: "Staff Users",
          superusers: "Superusers",
          recentActivity: "Recent Activity",
          recentRegistrations: "New Registrations (7 days)",
          recentLogins: "Recent Logins (7 days)",
          quickActions: "Quick Actions",
          manageUsers: "Manage Users",
          manageGroups: "Manage Groups",
          editProfile: "Edit Profile",
          loadError: "Failed to load dashboard data"
        },

        // Users
        users: {
          title: "User Management",
          addUser: "Add User",
          searchPlaceholder: "Search users...",
          allUsers: "All Users",
          activeUsers: "Active Users",
          inactiveUsers: "Inactive Users",
          allRoles: "All Roles",
          staffUsers: "Staff Users",
          regularUsers: "Regular Users",
          active: "Active",
          inactive: "Inactive",
          staff: "Staff",
          superuser: "Superuser",
          loadError: "Failed to load users",
          updateError: "Failed to update user",
          deleteError: "Failed to delete user",
          deleteConfirm: "Are you sure you want to delete this user?",
          noUsers: "No users found",
          showing: "Showing {{start}}-{{end}} of {{total}} users",
          page: "Page",
          
          table: {
            id: "ID",
            username: "Username", 
            email: "Email",
            name: "Name",
            status: "Status",
            role: "Role",
            joined: "Joined",
            actions: "Actions"
          },

          form: {
            addUser: "Add User",
            editUser: "Edit User",
            username: "Username",
            email: "Email",
            firstName: "First Name",
            lastName: "Last Name",
            password: "Password",
            newPassword: "New Password (leave blank to keep current)",
            passwordPlaceholder: "Leave blank to keep current password",
            passwordRequired: "Password is required for new users",
            permissions: "Permissions",
            isActive: "Active",
            isStaff: "Staff privileges",
            isSuperuser: "Superuser privileges",
            saveError: "Failed to save user"
          }
        },

        // Groups
        groups: {
          title: "Group Management",
          addGroup: "Add Group",
          loadError: "Failed to load groups",
          updateError: "Failed to update group",
          deleteError: "Failed to delete group",
          deleteConfirm: "Are you sure you want to delete this group?",
          noGroups: "No groups found"
        },

        // User Profile
        userProfile: {
          title: "Profile",
          subtitle: "Manage your account settings",
          loadError: "Failed to load profile",
          updateError: "Failed to update profile",
          updateSuccess: "Profile updated successfully"
        }
      },

      // Common
      common: {
        loading: "Loading...",
        error: "Error",
        retry: "Retry",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
        saving: "Saving...",
        previous: "Previous",
        next: "Next"
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
      },

      // Admin System
      admin: {
        title: "管理系统",
        backToApp: "返回应用",
        logout: "退出登录",
        staff: "员工",
        superuser: "超级用户",
        dashboard: "仪表板",
        userManagement: "用户管理",
        groupManagement: "权限组管理",
        profileMenu: "个人资料",
        
        // Login
        login: {
          title: "管理员登录",
          subtitle: "登录以访问管理面板",
          username: "用户名",
          usernamePlaceholder: "请输入用户名",
          password: "密码",
          passwordPlaceholder: "请输入密码",
          rememberMe: "记住我",
          loginButton: "登录",
          loggingIn: "登录中...",
          noAccount: "还没有账户？",
          registerLink: "点击注册"
        },

        // Register
        register: {
          title: "管理员注册",
          subtitle: "创建新的管理员账户",
          firstName: "名",
          firstNamePlaceholder: "请输入您的名字",
          lastName: "姓",
          lastNamePlaceholder: "请输入您的姓氏",
          username: "用户名",
          usernamePlaceholder: "请输入用户名",
          email: "邮箱",
          emailPlaceholder: "请输入邮箱地址",
          password: "密码",
          passwordPlaceholder: "请输入密码",
          confirmPassword: "确认密码",
          confirmPasswordPlaceholder: "请再次输入密码",
          passwordMismatch: "密码不匹配",
          registerButton: "注册",
          registering: "注册中...",
          hasAccount: "已有账户？",
          loginLink: "点击登录"
        },

        // Dashboard stats
        dashboardStats: {
          title: "仪表板",
          subtitle: "管理系统总览",
          totalUsers: "总用户数",
          activeUsers: "活跃用户",
          staffUsers: "员工用户",
          superusers: "超级用户",
          recentActivity: "最近活动",
          recentRegistrations: "新注册用户（7天）",
          recentLogins: "最近登录（7天）",
          quickActions: "快速操作",
          manageUsers: "管理用户",
          manageGroups: "管理权限组",
          editProfile: "编辑个人资料",
          loadError: "加载仪表板数据失败"
        },

        // Users
        users: {
          title: "用户管理",
          addUser: "添加用户",
          searchPlaceholder: "搜索用户...",
          allUsers: "所有用户",
          activeUsers: "活跃用户",
          inactiveUsers: "非活跃用户",
          allRoles: "所有角色",
          staffUsers: "员工用户",
          regularUsers: "普通用户",
          active: "活跃",
          inactive: "未激活",
          staff: "员工",
          superuser: "超级用户",
          loadError: "加载用户失败",
          updateError: "更新用户失败",
          deleteError: "删除用户失败",
          deleteConfirm: "确定要删除这个用户吗？",
          noUsers: "未找到用户",
          showing: "显示第 {{start}}-{{end}} 项，共 {{total}} 项",
          page: "第",
          
          table: {
            id: "ID",
            username: "用户名",
            email: "邮箱",
            name: "姓名",
            status: "状态",
            role: "角色",
            joined: "加入时间",
            actions: "操作"
          },

          form: {
            addUser: "添加用户",
            editUser: "编辑用户",
            username: "用户名",
            email: "邮箱",
            firstName: "名",
            lastName: "姓",
            password: "密码",
            newPassword: "新密码（留空保持不变）",
            passwordPlaceholder: "留空保持当前密码",
            passwordRequired: "新用户需要设置密码",
            permissions: "权限",
            isActive: "激活状态",
            isStaff: "员工权限",
            isSuperuser: "超级用户权限",
            saveError: "保存用户失败"
          }
        },

        // Groups
        groups: {
          title: "权限组管理",
          addGroup: "添加权限组",
          loadError: "加载权限组失败",
          updateError: "更新权限组失败",
          deleteError: "删除权限组失败",
          deleteConfirm: "确定要删除这个权限组吗？",
          noGroups: "未找到权限组"
        },

        // User Profile
        userProfile: {
          title: "个人资料",
          subtitle: "管理您的账户设置",
          loadError: "加载个人资料失败",
          updateError: "更新个人资料失败",
          updateSuccess: "个人资料更新成功"
        }
      },

      // Common
      common: {
        loading: "加载中...",
        error: "错误",
        retry: "重试",
        edit: "编辑",
        delete: "删除",
        cancel: "取消",
        save: "保存",
        saving: "保存中...",
        previous: "上一页",
        next: "下一页"
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
