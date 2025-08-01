# Django Admin 前后端分离认证系统

## 项目概述

基于Django Admin和框架自带的鉴权认证系统，结合React前端，实现一个全栈的用户认证管理系统。将Django Admin的核心功能通过REST API的形式暴露，实现前后端完全分离。

## 技术栈要求

### 后端 (Django)
- Django 5.x (最新稳定版)
- Django REST Framework 3.x
- Django内置的User模型和认证系统
- JWT Token认证 (使用 `djangorestframework-simplejwt`)
- Django CORS Headers (处理跨域)
- SQLite数据库

### 前端 (React)
- React 18+ with TypeScript
- Vite作为构建工具
- Sass作为样式预处理器
- Zustand状态管理
- React Router v6路由管理
- Axios HTTP客户端
- 多语言支持 (中文/英文)
- 暗黑模式支持

## 功能需求

### 1. 后端API接口

#### 用户认证相关
- `POST /api/auth/register/` - 用户注册
- `POST /api/auth/login/` - 用户登录
- `POST /api/auth/logout/` - 用户登出
- `POST /api/auth/refresh/` - 刷新Token
- `GET /api/auth/profile/` - 获取用户信息
- `PUT /api/auth/profile/` - 更新用户信息
- `POST /api/auth/change-password/` - 修改密码

#### 用户管理相关 (管理员权限)
- `GET /api/admin/users/` - 获取用户列表
- `GET /api/admin/users/{id}/` - 获取单个用户详情
- `PUT /api/admin/users/{id}/` - 更新用户信息
- `DELETE /api/admin/users/{id}/` - 删除用户
- `POST /api/admin/users/{id}/set-active/` - 激活/禁用用户
- `POST /api/admin/users/{id}/set-staff/` - 设置/取消员工权限
- `POST /api/admin/users/{id}/set-superuser/` - 设置/取消超级用户权限

#### 权限组管理
- `GET /api/admin/groups/` - 获取权限组列表
- `POST /api/admin/groups/` - 创建权限组
- `PUT /api/admin/groups/{id}/` - 更新权限组
- `DELETE /api/admin/groups/{id}/` - 删除权限组

### 2. 前端功能

#### 公共区域
- 在现有应用的顶部导航栏右侧添加"管理后台"入口
- 用户登录状态显示
- 语言切换 (中文/英文)
- 主题切换 (亮色/暗色)

#### 认证页面
- **登录页面** (`/admin/login`)
  - 用户名/邮箱 + 密码登录
  - 记住我功能
  - 登录失败提示
  - 多语言支持
- **注册页面** (`/admin/register`)
  - 用户名、邮箱、密码注册
  - 密码强度验证
  - 邮箱格式验证
  - 注册成功后自动登录

#### 管理后台页面
- **仪表板** (`/admin/dashboard`)
  - 用户统计信息
  - 最近登录用户
  - 系统概览
- **用户管理** (`/admin/users`)
  - 用户列表 (分页、搜索、过滤)
  - 用户详情查看/编辑
  - 用户状态管理 (激活/禁用)
  - 权限管理 (员工/超级用户)
  - 批量操作
- **权限组管理** (`/admin/groups`)
  - 权限组列表
  - 权限组创建/编辑
  - 权限分配
- **个人中心** (`/admin/profile`)
  - 个人信息编辑
  - 密码修改
  - 登录历史

### 3. 权限控制

#### 角色定义
- **匿名用户**: 只能访问登录/注册页面
- **普通用户**: 可以访问个人中心，修改个人信息
- **员工用户** (`is_staff=True`): 可以访问管理后台基础功能
- **超级用户** (`is_superuser=True`): 可以访问所有管理功能

#### 路由守卫
- 未登录用户访问管理后台自动跳转到登录页面
- 普通用户访问管理功能返回403错误
- 基于角色的页面访问控制

## 实现细节

### 1. 后端实现

#### 模型扩展
```python
# 扩展User模型，添加额外字段
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### 认证配置
- 使用JWT Token进行身份验证
- Token自动刷新机制
- CORS配置允许前端跨域访问

#### 权限装饰器
- 自定义权限装饰器检查用户角色
- API接口级别的权限控制

### 2. 前端实现

#### 状态管理
```typescript
// 用户认证状态
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

#### 路由结构
```
/admin
  /login          - 登录页面
  /register       - 注册页面
  /dashboard      - 仪表板 (需要员工权限)
  /users          - 用户管理 (需要员工权限)
  /groups         - 权限组管理 (需要超级用户权限)
  /profile        - 个人中心
```

#### 组件设计
- `AuthLayout` - 认证页面布局组件
- `AdminLayout` - 管理后台布局组件
- `ProtectedRoute` - 路由守卫组件
- `UserTable` - 用户列表组件
- `UserForm` - 用户编辑表单组件

## 开发步骤

### Phase 1: 后端API开发
1. 设置Django项目和DRF配置
2. 配置JWT认证
3. 创建用户认证相关API
4. 创建用户管理相关API
5. 添加权限控制和测试

### Phase 2: 前端基础框架
1. 创建认证相关页面和组件
2. 实现状态管理和路由
3. 添加HTTP客户端和API集成
4. 实现主题和多语言支持

### Phase 3: 管理后台功能
1. 开发管理后台布局和导航
2. 实现用户管理功能
3. 实现权限组管理
4. 添加仪表板和统计功能

### Phase 4: 集成和优化
1. 前后端联调和测试
2. 权限控制测试
3. UI/UX优化
4. 性能优化和错误处理

## 测试要求

### 后端测试
- API接口单元测试
- 权限控制测试
- 认证流程测试

### 前端测试
- 组件单元测试
- 路由守卫测试
- 用户交互测试

## 部署要求

### 开发环境
- 后端: `python manage.py runserver`
- 前端: `pnpm dev`
- 支持热重载和调试

### 生产环境
- 后端: Gunicorn + Nginx
- 前端: 静态文件部署
- 环境变量配置
- 日志记录和监控





