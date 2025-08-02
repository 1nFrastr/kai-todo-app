export const admin = {
  title: "Admin System",
  backToApp: "Back to App",
  logout: "Logout",
  staff: "Staff",
  superuser: "Superuser",
  user: "User",
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
};
