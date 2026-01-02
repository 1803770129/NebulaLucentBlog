# 作品集使用指南

## 如何添加新作品

### 1. 编辑作品数据文件

打开 `src/lib/projects.ts` 文件，在 `projects` 数组中添加新作品：

```typescript
{
  id: "your-project-id",           // 唯一标识符，用于 URL
  title: "项目名称",
  description: "简短描述",
  longDescription: "详细的项目介绍，支持多行文本",
  image: "/path/to/image.jpg",      // 主图片路径（可选）
  images: [                         // 多张图片（可选）
    "/path/to/image1.jpg",
    "/path/to/image2.jpg"
  ],
  tags: ["标签1", "标签2"],         // 标签数组
  technologies: ["技术1", "技术2"],  // 技术栈数组
  category: "web",                  // 分类: "web" | "mobile" | "desktop" | "game" | "other"
  status: "completed",               // 状态: "completed" | "in-progress" | "archived"
  date: "2025-01-01",               // 日期，ISO 格式
  links: {                          // 相关链接（可选）
    website: "https://example.com",
    github: "https://github.com/username/repo",
    demo: "https://demo.example.com",
    download: "https://download.example.com"
  },
  featured: true,                   // 是否在首页展示（可选）
}
```

### 2. 示例

```typescript
{
  id: "my-web-app",
  title: "我的 Web 应用",
  description: "一个功能强大的 Web 应用程序",
  longDescription: `这是一个使用 React 和 Node.js 构建的现代化 Web 应用。

主要特性：
- 用户认证系统
- 实时数据同步
- 响应式设计

技术栈包括 React、TypeScript、Tailwind CSS 等。`,
  image: "/projects/my-web-app.png",
  images: [
    "/projects/my-web-app-1.png",
    "/projects/my-web-app-2.png"
  ],
  tags: ["Web", "React", "全栈"],
  technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  category: "web",
  status: "completed",
  date: "2025-01-15",
  links: {
    website: "https://mywebapp.com",
    github: "https://github.com/username/my-web-app",
    demo: "https://demo.mywebapp.com"
  },
  featured: true
}
```

### 3. 图片放置

将项目图片放在 `public` 目录下，例如：
- `public/projects/my-project.png`
- 然后在 `image` 字段中使用 `/projects/my-project.png`

### 4. 字段说明

#### 必需字段
- `id`: 唯一标识符，用于生成 URL（如 `/program/my-project-id`）
- `title`: 项目标题
- `description`: 简短描述，显示在作品列表中
- `tags`: 标签数组
- `technologies`: 技术栈数组
- `category`: 项目分类
- `status`: 项目状态
- `date`: 项目日期

#### 可选字段
- `longDescription`: 详细描述，显示在详情页
- `image`: 主图片路径
- `images`: 多张图片数组，显示在详情页
- `links`: 相关链接对象
- `featured`: 是否精选（会在列表中显示 ⭐ 标记）

### 5. 分类说明

- `web`: Web 应用
- `mobile`: 移动应用
- `desktop`: 桌面应用
- `game`: 游戏
- `other`: 其他

### 6. 状态说明

- `completed`: 已完成
- `in-progress`: 进行中
- `archived`: 已归档

## 功能特性

### 作品集首页 (`/program`)
- 展示所有作品
- 按分类筛选
- 按标签筛选
- 响应式网格布局
- 精选作品标记

### 作品详情页 (`/program/[id]`)
- 完整的项目信息
- 图片画廊
- 相关链接
- 技术栈展示
- 标签展示

## 扩展建议

1. **添加更多分类**: 在 `getCategoryName` 函数中添加新的分类名称
2. **自定义样式**: 修改 `app/program/page.tsx` 中的样式
3. **添加筛选功能**: 可以添加更多筛选条件（如按状态、日期等）
4. **添加搜索功能**: 可以添加搜索框来搜索作品

