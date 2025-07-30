# Todo List 全栈项目

一个现代化的全栈 Todo List 应用，支持多语言和暗黑模式，使用 Django REST Framework 作为后端，React + TypeScript 作为前端。

## 🚀 功能特性

- ✅ 创建、编辑、删除待办事项
- ✅ 标记待办事项为完成/未完成
- ✅ 按状态筛选待办事项（全部/未完成/已完成）
- ✅ 多语言支持（中文/英文）
- ✅ 暗黑模式/浅色模式切换
- ✅ 实时数据同步
- ✅ 现代化UI设计
- ✅ PC端优化布局

## 🛠️ 技术栈

### 后端
- Python 3.13+
- Django 5.2+
- Django REST Framework 3.16+
- SQLite 数据库
- CORS 支持

### 前端
- React 19+ 
- TypeScript 5.8+
- Vite 7+
- Sass
- Axios
- React-i18next (国际化)

## 📦 项目结构

```
kai-todo-app/
├── backend/                 # Django 后端
│   ├── todo/               # Todo 应用
│   │   ├── models.py       # 数据模型
│   │   ├── views.py        # API 视图
│   │   ├── serializers.py  # 序列化器
│   │   └── urls.py         # URL 路由
│   ├── todolist_project/   # Django 项目配置
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── services/       # API 服务
│   │   ├── types/          # TypeScript 类型
│   │   ├── i18n/          # 国际化配置
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── copilot-instructions.md  # 项目规范
├── .gitignore
└── README.md
```

## 🔧 安装和运行

### 环境要求
- Python 3.13+
- Node.js 18+
- pnpm

### 后端设置

1. 克隆项目：
```bash
git clone https://github.com/1nFrastr/kai-todo-app.git
cd kai-todo-app
```

2. 进入后端目录：
```bash
cd backend
```

3. 创建并激活虚拟环境：
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# 或
source venv/bin/activate     # macOS/Linux
```

4. 安装依赖：
```bash
pip install -r requirements.txt
```

5. 运行迁移：
```bash
python manage.py makemigrations
python manage.py migrate
```

6. 启动开发服务器：
```bash
python manage.py runserver
```

后端将在 `http://localhost:8000` 运行

### 前端设置

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
pnpm run dev
```

前端将在 `http://localhost:5173` 运行

## 🌐 API 接口

### 待办事项 API

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/todos/` | 获取所有待办事项 |
| POST | `/api/todos/` | 创建新的待办事项 |
| GET | `/api/todos/{id}/` | 获取特定待办事项 |
| PUT/PATCH | `/api/todos/{id}/` | 更新待办事项 |
| DELETE | `/api/todos/{id}/` | 删除待办事项 |
| PATCH | `/api/todos/{id}/toggle_completed/` | 切换完成状态 |
| GET | `/api/todos/completed/` | 获取已完成的待办事项 |
| GET | `/api/todos/pending/` | 获取未完成的待办事项 |

## 📝 使用说明

1. 在表单中输入待办事项的标题和描述
2. 点击"添加"按钮创建新的待办事项
3. 点击复选框标记待办事项为完成/未完成
4. 点击"编辑"按钮修改待办事项
5. 点击"删除"按钮删除待办事项
6. 使用顶部的筛选按钮查看不同状态的待办事项
7. 使用右上角的切换按钮改变语言和主题

## 🎨 主题和多语言

### 主题支持
- 浅色模式（默认）
- 暗黑模式
- 主题设置会自动保存到本地存储

### 多语言支持
- 中文（简体）
- 英文
- 语言设置会自动保存到本地存储

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发规范
请查看 `.github/copilot-instructions.md` 了解详细的开发规范和要求。

## 📄 许可证

MIT License

## 🔗 相关链接

- [Django 文档](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [React-i18next](https://react.i18next.com/)
