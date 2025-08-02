# Todo后台管理功能需求

## 功能概述
在现有的后台管理系统中新增Todo数据管理页面，用于管理和查看用户的待办事项数据。

## 详细需求

### 1. 页面位置和导航
- 在前端Admin页面下新增 `AdminTodos` 目录和相关组件
- 在后台导航菜单中添加"Todo管理"入口
- 路由路径：`/admin/todos`

### 2. 权限控制
- **管理员用户**：可以查看所有用户的Todo数据
- **普通用户**：进入后台后只能查看自己创建的Todo数据（user字段等于当前登录用户）
- 所有用户都**只能查看**，不能进行增删改操作

### 3. 页面功能
#### 3.1 数据展示
- 以表格形式展示Todo数据
- 显示字段：
  - 标题 (title)
  - 描述 (description) - 截断显示，支持展开查看
  - 完成状态 (completed) - 用状态标签显示
  - 创建者 (user.username)
  - 创建时间 (created_at)
  - 更新时间 (updated_at)

#### 3.2 搜索和筛选功能
- 按标题搜索（模糊匹配）
- 按完成状态筛选（全部/已完成/未完成）
- 按创建者筛选（仅管理员可见此选项）
- 按时间范围筛选

#### 3.3 分页和排序
- 支持分页显示，每页10条记录
- 支持按创建时间、更新时间排序
- 默认按创建时间倒序排列

### 4. 技术实现要求

#### 4.1 后端实现
- 在 `backend/todo/urls.py` 中添加管理端API路由
- 在 `backend/todo/views.py` 中添加管理端视图类
- 实现权限控制：根据用户角色返回对应的数据
- API支持搜索、筛选、分页、排序参数

#### 4.2 前端实现
- 创建 `frontend/src/pages/Admin/AdminTodos/` 目录
- 主要组件：
  - `AdminTodosPage.tsx` - 主页面组件
  - `TodosTable.tsx` - 数据表格组件
  - `TodosFilter.tsx` - 搜索筛选组件
- 使用现有的UI组件和样式风格保持一致
- 支持国际化（中英文）

#### 4.3 国际化文本
需要添加的多语言键值：
```
todo.admin.title: Todo管理 / Todo Management
todo.admin.search.placeholder: 搜索标题... / Search title...
todo.admin.filter.status: 状态筛选 / Filter by status
todo.admin.filter.user: 创建者筛选 / Filter by user
todo.admin.status.completed: 已完成 / Completed
todo.admin.status.pending: 未完成 / Pending
todo.admin.table.title: 标题 / Title
todo.admin.table.description: 描述 / Description
todo.admin.table.status: 状态 / Status
todo.admin.table.creator: 创建者 / Creator
todo.admin.table.created: 创建时间 / Created At
todo.admin.table.updated: 更新时间 / Updated At
```

### 5. 实现步骤
1. 先实现后端API接口和权限控制
2. 创建前端组件和页面结构
3. 实现数据展示功能
4. 添加搜索筛选功能
5. 完善分页和排序
6. 添加国际化支持
7. 测试不同用户角色的权限控制

### 6. 验收标准
- 管理员用户可以查看所有用户的Todo数据
- 普通用户只能查看自己的Todo数据
- 搜索和筛选功能正常工作
- 分页和排序功能正常
- 支持中英文切换
- 页面样式与现有后台保持一致
- 所有操作均为只读，无法修改数据