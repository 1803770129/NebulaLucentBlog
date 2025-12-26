# Nebula Lucent Blog

一个基于 Next.js 16 和 MDX 构建的现代化个人博客系统。

## ✨ 特性

- 📝 **易于写作**: 使用 Markdown/MDX 格式编写文章，支持 Frontmatter 元数据
- 🚀 **性能优化**: 静态生成（SSG），页面加载速度极快
- 🎨 **现代化设计**: 响应式布局，支持深色模式，优雅的排版
- 🔍 **SEO 友好**: 自动生成元数据和静态路由
- 💻 **代码高亮**: 支持语法高亮的代码块
- 📦 **版本控制**: 文章以文件形式存储，便于 Git 版本管理

## 🛠️ 技术栈

- **Next.js 16**: React 全栈框架
- **MDX**: Markdown + JSX，支持在文章中使用 React 组件
- **TypeScript**: 类型安全
- **Tailwind CSS**: 实用优先的 CSS 框架
- **React Markdown**: Markdown 渲染
- **Remark/Rehype**: Markdown 处理和转换插件

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页（文章列表）
│   ├── posts/[slug]/      # 文章详情页
│   └── layout.tsx         # 根布局
├── content/               # 博客内容目录
│   └── posts/            # 文章存储目录
│       ├── welcome.mdx   # 示例文章
│       └── ...
├── src/
│   └── lib/
│       └── posts.ts      # 文章读取和处理工具
└── package.json
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 📝 编写文章

### 创建新文章

在 `content/posts` 目录下创建 `.mdx` 或 `.md` 文件即可。

文件名将成为文章的 URL slug（例如：`my-first-post.mdx` → `/posts/my-first-post`）

### Frontmatter 格式

每篇文章开头需要添加 Frontmatter 元数据：

```markdown
---
title: "文章标题"
date: "2025-01-01"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
author: "作者名称"
---

# 文章内容

从这里开始写文章内容...
```

**支持的 Frontmatter 字段：**

- `title` (必需): 文章标题
- `date` (推荐): 发布日期，ISO 格式（如 "2025-01-01"）
- `excerpt`: 文章摘要，显示在文章列表中
- `tags`: 标签数组
- `author`: 作者名称

### Markdown 语法

支持所有标准 Markdown 语法：

- 标题 (# ## ###)
- **粗体** 和 *斜体*
- `行内代码`
- [链接](https://example.com)
- 列表（有序和无序）
- 代码块（带语法高亮）
- 表格
- 引用块
- 图片

### MDX 功能

MDX 允许你在 Markdown 中使用 React 组件：

```mdx
import { MyComponent } from '@/components/MyComponent';

# 我的文章

这是普通 Markdown 内容。

<MyComponent prop="value" />
```

### 代码高亮

使用代码块时，指定语言即可自动高亮：

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

## 🎨 自定义样式

- 全局样式: `app/globals.css`
- Tailwind 配置: `tailwind.config.ts`
- 文章内容样式: 使用 Tailwind 的 `prose` 类（已在文章中配置）

## 📦 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

构建后，`out` 目录包含静态文件，可以部署到任何静态托管服务。

```bash
npm run build
```

## 🔧 配置

### 修改博客名称

编辑 `app/page.tsx` 中的标题：

```tsx
<h1>你的博客名称</h1>
```

### 添加导航栏

在 `app/layout.tsx` 中添加导航组件。

### 自定义主题

修改 `app/globals.css` 中的颜色变量和 Tailwind 配置。

## 📚 更多资源

- [Next.js 文档](https://nextjs.org/docs)
- [MDX 文档](https://mdxjs.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Markdown 文档](https://github.com/remarkjs/react-markdown)

## 📄 许可证

MIT

---

祝你写作愉快！🎉