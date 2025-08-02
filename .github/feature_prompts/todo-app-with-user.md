# TodoApp新功能：关联用户信息

## 功能概述
为Todo应用添加用户关联功能，支持匿名用户和登录用户两种模式，实现更好的用户体验和数据管理。

## 后端需求

### 1. 数据库模型修改
- **Todo模型**：
  - 添加`user`字段：`ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)`
  - 保持现有字段不变（title, description, completed, created_at, updated_at）
  - 当`user`为null时表示匿名用户创建的todo

### 2. API接口调整
- **TodoViewSet**：
  - 支持无需认证访问（允许匿名用户使用）
  - `GET /api/todos/`：返回所有匿名用户的todo（user为null的记录）
  - `POST /api/todos/`：创建todo时如果用户未登录，user字段设为null
  - 保持现有的CRUD操作和自定义actions不变
- **权限控制**：
  - 匿名用户只能查看和操作匿名todo
  - 登录用户只能查看和操作自己的todo

### 3. 定时清理任务
- 创建Django管理命令：`python manage.py cleanup_anonymous_todos`
- 删除创建时间超过10分钟的匿名todo（user为null且created_at超过10分钟）
- 可以配置为定时任务（cron job或celery）

### 4. 数据迁移
- 创建数据库迁移文件
- 现有的todo数据默认设置为匿名用户（user=null）

## 前端需求

### 1. 用户状态管理
- 添加用户状态管理（未登录/已登录）
- 当前版本默认为未登录状态

### 2. 界面提示
- 在TodoForm组件顶部添加提示文本：
  - 中文：`⚠️ 未登录状态下，您的待办事项将在10分钟后自动删除。请登录以体验完整功能。`
  - 英文：`⚠️ In anonymous mode, your todos will be automatically deleted after 10 minutes. Please login for full features.`
- 提示样式：警告色背景，醒目但不突兀

### 3. 数据获取调整
- 调整API调用，确保只获取匿名用户的todo数据
- 保持现有的增删改查功能不变

### 4. 国际化支持
- 添加新的翻译字符串到i18n文件中
- 支持中英文切换

## 技术实现细节

### 后端技术栈
- Django REST Framework
- SQLite数据库
- Django管理命令

### 前端技术栈
- React + TypeScript
- React i18next国际化
- 现有的组件和状态管理

## 验收标准

### 后端
- [ ] Todo模型成功添加user字段
- [ ] 数据迁移执行成功，现有数据保持完整
- [ ] API接口支持匿名访问
- [ ] 匿名todo只返回user为null的记录
- [ ] 清理命令能正确删除超时的匿名todo

### 前端
- [ ] 界面显示匿名用户提示信息
- [ ] 提示信息支持中英文切换
- [ ] 匿名模式下能正常创建、编辑、删除todo
- [ ] 页面刷新后数据正确显示

## 后续扩展
本版本实现匿名用户功能，为后续版本的登录注册功能做准备：
- 用户注册登录功能
- 登录用户的个人todo管理
- 用户间todo分享功能
- 更丰富的用户权限控制
