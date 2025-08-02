export const admin = {
  title: "管理系统",
  backToApp: "返回应用",
  logout: "退出登录",
  staff: "员工",
  superuser: "超级用户",
  user: "普通用户",
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
      passwordHint: "留空保持不变",
      passwordPlaceholder: "留空保持当前密码",
      newPassword: "新密码（留空保持不变）",
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
};
