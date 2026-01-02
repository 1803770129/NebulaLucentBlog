# 🌌 Nebula Lucent 完整项目教学文档

> 一份详尽的宇宙主题个人网站开发教程，涵盖每个库的使用原因、每个文件的作用、完整的开发流程和代码详解。

---

## 📚 目录

1. [项目概述](#1-项目概述)
2. [技术栈详解](#2-技术栈详解)
3. [项目结构解析](#3-项目结构解析)
4. [核心依赖库详解](#4-核心依赖库详解)
5. [配置文件详解](#5-配置文件详解)
6. [全局样式系统](#6-全局样式系统)
7. [核心组件详解](#7-核心组件详解)
8. [页面开发详解](#8-页面开发详解)
9. [数据层详解](#9-数据层详解)
10. [3D效果实现](#10-3d效果实现)
11. [性能优化策略](#11-性能优化策略)
12. [开发流程指南](#12-开发流程指南)

---

## 1. 项目概述

### 1.1 项目简介

Nebula Lucent 是一个现代化的宇宙主题个人网站，包含以下核心功能模块：

| 模块 | 功能 | 路由 |
|------|------|------|
| 首页 | 宇宙主题展示页，模块导航入口 | `/` |
| 博客 | MDX 格式文章系统 | `/posts` |
| 知识库 | 分类知识管理 | `/knowledge` |
| 作品集 | 银河系风格项目展示 | `/program` |
| 实验室 | 技术实验和 Demo | `/lab` |

### 1.2 核心特性

- 🎨 **宇宙主题设计**：深紫、星云粉、极光青的配色系统
- ✨ **鼠标跟随星球**：弹性动画的行星跟随效果
- 🌟 **CSS 星点动画**：随机闪烁的星空背景
- 💫 **毛玻璃卡片**：光线追踪边框效果
- 🌌 **3D 银河系**：Three.js 粒子系统
- 📱 **响应式设计**：移动端自适应

---

## 2. 技术栈详解

### 2.1 核心框架


```
┌─────────────────────────────────────────────────────────────┐
│                      技术栈架构图                            │
├─────────────────────────────────────────────────────────────┤
│  前端框架层                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Next.js 16 │  │  React 19   │  │ TypeScript  │         │
│  │  App Router │  │  Hooks      │  │  类型安全    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  样式层                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │Tailwind CSS │  │ CSS 变量    │  │ CSS 动画    │         │
│  │  原子化CSS   │  │  主题系统   │  │  @keyframes │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  3D 渲染层                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Three.js  │  │ React Three │  │    Drei     │         │
│  │   WebGL     │  │   Fiber     │  │  3D 组件库  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  内容层                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    MDX      │  │ gray-matter │  │  highlight  │         │
│  │  Markdown   │  │  frontmatter│  │  代码高亮   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 为什么选择这些技术？

#### Next.js 16 (App Router)

**选择原因：**
1. **文件系统路由**：`app/` 目录下的文件自动成为路由
2. **服务端组件**：默认 RSC，减少客户端 JS 体积
3. **流式渲染**：Suspense 支持，提升首屏速度
4. **内置优化**：图片、字体、脚本自动优化

**在项目中的应用：**
```
app/
├── page.tsx          → 首页 (/)
├── posts/
│   ├── page.tsx      → 文章列表 (/posts)
│   └── [slug]/
│       └── page.tsx  → 文章详情 (/posts/xxx)
└── layout.tsx        → 全局布局
```

#### React 19

**选择原因：**
1. **并发特性**：更好的用户体验
2. **Hooks 生态**：useState, useEffect, useRef, useMemo
3. **Server Components**：与 Next.js 完美配合

#### TypeScript

**选择原因：**
1. **类型安全**：编译时捕获错误
2. **IDE 支持**：自动补全、重构
3. **文档作用**：接口定义即文档

**项目中的类型定义示例：**
```typescript
// src/lib/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "game" | "other";
  status: "completed" | "in-progress" | "archived";
  // ...
}
```

#### Tailwind CSS 4

**选择原因：**
1. **原子化 CSS**：快速开发，无需命名
2. **JIT 编译**：按需生成，体积小
3. **响应式**：`md:`, `lg:` 前缀
4. **深色模式**：`dark:` 前缀

**使用示例：**
```tsx
<div className="
  p-4 md:p-6 lg:p-8           // 响应式内边距
  bg-white dark:bg-gray-900   // 深色模式
  hover:scale-105             // 悬停效果
  transition-all duration-300 // 过渡动画
">
```

---

## 3. 项目结构解析

### 3.1 完整目录结构


```
nebula-lucent/
│
├── 📁 app/                          # Next.js App Router 页面目录
│   ├── 📄 layout.tsx                # 根布局（全局导航、Footer）
│   ├── 📄 page.tsx                  # 首页
│   ├── 📄 globals.css               # 全局样式（宇宙主题核心）
│   ├── 📁 posts/                    # 博客模块
│   │   ├── 📄 page.tsx              # 文章列表页
│   │   ├── 📄 PostsClient.tsx       # 客户端交互组件
│   │   └── 📁 [slug]/               # 动态路由
│   │       └── 📄 page.tsx          # 文章详情页
│   ├── 📁 knowledge/                # 知识库模块
│   │   ├── 📄 page.tsx              # 知识库首页
│   │   └── 📁 [category]/           # 分类页面
│   │       └── 📄 page.tsx
│   ├── 📁 program/                  # 作品集模块
│   │   ├── 📄 page.tsx              # 作品集首页（银河系展示）
│   │   └── 📁 [id]/                 # 作品详情
│   │       └── 📄 page.tsx
│   └── 📁 lab/                      # 实验室模块
│       ├── 📄 page.tsx              # 实验列表
│       └── 📁 [id]/
│           └── 📄 page.tsx          # 实验详情
│
├── 📁 components/                   # React 组件目录
│   ├── 📄 Nav.tsx                   # 导航栏组件
│   ├── 📄 ClientProviders.tsx       # 客户端 Provider（动态导入）
│   ├── 📁 cosmic/                   # 宇宙主题组件
│   │   ├── 📄 index.ts              # 统一导出
│   │   ├── 📄 CosmicBackground.tsx  # 宇宙背景（星点、极光）
│   │   ├── 📄 CosmicCard.tsx        # 毛玻璃卡片
│   │   ├── 📄 CosmicFooter.tsx      # 页脚组件
│   │   └── 📄 PlanetCursor.tsx      # 鼠标跟随星球
│   ├── 📁 home/                     # 首页专用组件
│   │   ├── 📄 index.ts              # 统一导出
│   │   ├── 📄 Scene3D.tsx           # Three.js 场景容器
│   │   ├── 📄 ParticleField.tsx     # 3D 粒子银河系
│   │   ├── 📄 FloatingGeometry.tsx  # 漂浮几何体
│   │   └── 📄 GlassCard.tsx         # 3D 玻璃卡片
│   ├── 📁 portfolio/                # 作品集组件
│   │   ├── 📄 GalaxyShowcase.tsx    # 银河系作品展示
│   │   └── 📄 ShowcaseCabinet.tsx   # 展示柜风格展示
│   └── 📁 lab/                      # 实验室组件
│       ├── 📄 CodeDisplay.tsx       # 代码展示
│       └── 📄 ExperimentLoader.tsx  # 实验加载器
│
├── 📁 src/                          # 源代码目录
│   └── 📁 lib/                      # 工具库
│       ├── 📄 posts.ts              # 文章数据处理
│       ├── 📄 projects.ts           # 作品数据
│       ├── 📄 experiments.ts        # 实验数据
│       └── 📄 experimentCode.ts     # 实验代码获取
│
├── 📁 content/                      # 内容目录
│   └── 📁 posts/                    # MDX 文章
│       ├── 📄 welcome.mdx
│       ├── 📄 getting-started.mdx
│       └── 📄 example-code.mdx
│
├── 📁 docs/                         # 文档目录
│   ├── 📄 COSMIC-THEME-TUTORIAL.md  # 宇宙主题教程
│   ├── 📄 PORTFOLIO-SHOWCASE-TUTORIAL.md
│   └── 📄 ...
│
├── 📁 public/                       # 静态资源
│   └── 📄 *.svg                     # 图标文件
│
├── 📄 package.json                  # 依赖配置
├── 📄 tailwind.config.ts            # Tailwind 配置
├── 📄 next.config.ts                # Next.js 配置
└── 📄 tsconfig.json                 # TypeScript 配置
```

### 3.2 各目录职责说明

| 目录 | 职责 | 说明 |
|------|------|------|
| `app/` | 页面路由 | Next.js App Router，文件即路由 |
| `components/` | UI 组件 | 可复用的 React 组件 |
| `src/lib/` | 数据逻辑 | 数据获取、处理函数 |
| `content/` | 内容文件 | MDX 文章、配置等 |
| `public/` | 静态资源 | 图片、字体、图标 |
| `docs/` | 项目文档 | 开发指南、教程 |

---

## 4. 核心依赖库详解

### 4.1 package.json 依赖分析


```json
{
  "dependencies": {
    // ===== 核心框架 =====
    "next": "16.1.1",           // React 全栈框架
    "react": "19.2.3",          // UI 库
    "react-dom": "19.2.3",      // React DOM 渲染

    // ===== 3D 渲染 =====
    "three": "^0.182.0",        // WebGL 3D 库
    "@react-three/fiber": "^9.4.2",  // React Three.js 绑定
    "@react-three/drei": "^10.7.7",  // Three.js 工具组件

    // ===== 内容处理 =====
    "@mdx-js/loader": "^3.0.1",      // MDX 加载器
    "@mdx-js/react": "^3.0.1",       // MDX React 组件
    "@next/mdx": "^16.1.1",          // Next.js MDX 集成
    "gray-matter": "^4.0.3",         // frontmatter 解析
    "react-markdown": "^9.0.1",      // Markdown 渲染

    // ===== Markdown 增强 =====
    "remark-gfm": "^4.0.0",          // GitHub 风格 Markdown
    "rehype-highlight": "^7.0.1",    // 代码高亮
    "rehype-raw": "^7.0.0",          // 原始 HTML 支持
    "highlight.js": "^11.11.1",      // 语法高亮引擎

    // ===== 工具库 =====
    "date-fns": "^4.1.0",            // 日期处理
    "slugify": "^1.6.6"              // URL slug 生成
  },
  "devDependencies": {
    // ===== 样式 =====
    "tailwindcss": "^4",             // CSS 框架
    "@tailwindcss/postcss": "^4",    // PostCSS 插件

    // ===== 类型定义 =====
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.182.0",

    // ===== 开发工具 =====
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "tsx": "^4.21.0"                 // TypeScript 执行器
  }
}
```

### 4.2 各依赖库详细说明

#### 4.2.1 Three.js 生态

**three (Three.js)**
- **作用**：WebGL 3D 渲染库
- **为什么用**：创建 3D 银河系粒子效果
- **核心概念**：
  - `Scene`：场景容器
  - `Camera`：视角相机
  - `Renderer`：渲染器
  - `Geometry`：几何体
  - `Material`：材质
  - `Mesh`：网格（几何体 + 材质）

**@react-three/fiber**
- **作用**：Three.js 的 React 渲染器
- **为什么用**：用 JSX 声明式写 3D 场景
- **优势**：
  - 组件化 3D 开发
  - 自动处理渲染循环
  - 与 React 状态无缝集成

**使用对比：**
```javascript
// 原生 Three.js（命令式）
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
renderer.render(scene, camera);
```

```tsx
// React Three Fiber（声明式）
<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshBasicMaterial color="green" />
  </mesh>
</Canvas>
```

**@react-three/drei**
- **作用**：Three.js 常用组件和工具集
- **为什么用**：提供开箱即用的 3D 组件
- **常用组件**：
  - `MeshDistortMaterial`：变形材质
  - `OrbitControls`：轨道控制器
  - `Text`：3D 文字
  - `Environment`：环境贴图

#### 4.2.2 MDX 生态

**MDX 是什么？**
MDX = Markdown + JSX，可以在 Markdown 中使用 React 组件。

```mdx
# 我的文章

这是普通 Markdown 文本。

<CustomAlert type="warning">
  这是一个 React 组件！
</CustomAlert>

```javascript
console.log('代码块也支持');
```
```

**gray-matter**
- **作用**：解析 Markdown 文件的 frontmatter
- **为什么用**：提取文章元数据（标题、日期、标签）

```markdown
---
title: "我的文章"
date: "2025-01-01"
tags: ["React", "Next.js"]
---

文章正文...
```

```typescript
import matter from 'gray-matter';

const { data, content } = matter(fileContents);
// data = { title: "我的文章", date: "2025-01-01", tags: [...] }
// content = "文章正文..."
```

**remark-gfm**
- **作用**：支持 GitHub 风格 Markdown
- **支持特性**：
  - 表格
  - 任务列表 `- [x]`
  - 删除线 `~~text~~`
  - 自动链接

**rehype-highlight**
- **作用**：代码块语法高亮
- **为什么用**：让代码更易读
- **配合**：`highlight.js` 提供高亮主题

#### 4.2.3 工具库

**date-fns**
- **作用**：日期格式化和处理
- **为什么用**：轻量级，tree-shaking 友好
- **使用示例**：

```typescript
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const date = parseISO('2025-01-01');
format(date, 'yyyy年MM月dd日', { locale: zhCN });
// → "2025年01月01日"
```

**slugify**
- **作用**：生成 URL 友好的 slug
- **为什么用**：文章标题转 URL

```typescript
import slugify from 'slugify';

slugify('我的第一篇文章', { lower: true });
// → "wo-de-di-yi-pian-wen-zhang"
```

---

## 5. 配置文件详解

### 5.1 next.config.ts


```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 页面扩展名配置，支持 MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // 实验性功能
  experimental: {
    // MDX 支持
    mdxRs: true,
  },
  
  // 图片域名白名单
  images: {
    domains: ['example.com'],
  },
};

export default nextConfig;
```

**配置说明：**
- `pageExtensions`：允许 `.mdx` 文件作为页面
- `mdxRs`：使用 Rust 编译的 MDX 解析器（更快）
- `images.domains`：允许的外部图片域名

### 5.2 tailwind.config.ts

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // 扫描这些文件中的类名
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // 容器居中
      container: {
        center: true,
      },
      
      // 自定义颜色（可选，我们用 CSS 变量）
      colors: {
        cosmic: {
          purple: '#7b2cbf',
          pink: '#e94560',
          cyan: '#00d9ff',
          gold: '#f5d042',
        },
      },
      
      // 自定义动画
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  
  plugins: [],
};

export default config;
```

**配置说明：**
- `content`：Tailwind 扫描这些文件提取类名
- `theme.extend`：扩展默认主题
- `animation/keyframes`：自定义动画

### 5.3 tsconfig.json

```json
{
  "compilerOptions": {
    // 目标 ES 版本
    "target": "ES2017",
    
    // 模块系统
    "module": "ESNext",
    "moduleResolution": "bundler",
    
    // 严格模式
    "strict": true,
    "noEmit": true,
    
    // JSX 处理
    "jsx": "preserve",
    
    // 路径别名
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/src/*": ["./src/*"]
    },
    
    // 增量编译
    "incremental": true,
    
    // 插件
    "plugins": [
      { "name": "next" }
    ]
  },
  
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  
  "exclude": ["node_modules"]
}
```

**路径别名使用：**
```typescript
// 不用路径别名
import { CosmicCard } from '../../../components/cosmic/CosmicCard';

// 使用路径别名
import { CosmicCard } from '@/components/cosmic';
```

---

## 6. 全局样式系统

### 6.1 CSS 变量系统 (globals.css)

宇宙主题的核心是 CSS 变量系统，定义在 `:root` 中：

```css
/* ===== 宇宙主题色彩系统 ===== */
:root {
  /* 主色调 - 深邃的宇宙感 */
  --cosmic-deep-purple: #1a1a2e;   /* 深紫 - 主背景 */
  --cosmic-space-blue: #16213e;    /* 星空蓝 - 次背景 */
  --cosmic-nebula-pink: #e94560;   /* 星云粉 - 强调色 */
  --cosmic-dark-blue: #0f3460;     /* 深蓝 - 渐变过渡 */
  
  /* 点缀色 - 星光效果 */
  --cosmic-star-gold: #f5d042;     /* 星光金 */
  --cosmic-aurora-green: #00d9ff;  /* 极光青 */
  --cosmic-violet: #7b2cbf;        /* 宇宙紫 */
  --cosmic-soft-pink: #ff6b9d;     /* 柔粉 */
  
  /* 渐变定义 */
  --gradient-cosmic: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --gradient-aurora: linear-gradient(45deg, #00d9ff 0%, #7b2cbf 50%, #e94560 100%);
  --gradient-nebula: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  
  /* 光晕效果 */
  --glow-pink: 0 0 30px rgba(233, 69, 96, 0.4);
  --glow-blue: 0 0 30px rgba(0, 217, 255, 0.4);
  --glow-violet: 0 0 30px rgba(123, 44, 191, 0.4);
  
  /* 浅色模式表面色 */
  --background: #f8f9ff;
  --foreground: #1a1a2e;
  --surface: rgba(255, 255, 255, 0.9);
}

/* 深色模式覆盖 */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0d0d1a;
    --foreground: #e6e6e6;
    --surface: rgba(22, 33, 62, 0.6);
  }
}
```

**色彩心理学：**

| 颜色 | 变量 | 情感 | 使用场景 |
|------|------|------|----------|
| 深紫 | `--cosmic-deep-purple` | 神秘、深邃 | 背景、大面积区域 |
| 星云粉 | `--cosmic-nebula-pink` | 活力、热情 | CTA 按钮、重要提示 |
| 极光青 | `--cosmic-aurora-green` | 科技、未来 | 链接、交互元素 |
| 星光金 | `--cosmic-star-gold` | 珍贵、高级 | 装饰、徽章 |
| 宇宙紫 | `--cosmic-violet` | 创意、神秘 | 主色调、品牌色 |

### 6.2 核心动画定义


```css
/* ===== 星点闪烁动画 ===== */
@keyframes twinkle {
  0%, 100% { 
    opacity: 0.2; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
}

/* 使用方式 */
.star {
  animation: twinkle var(--twinkle-duration, 3s) ease-in-out infinite;
  animation-delay: var(--twinkle-delay, 0s);
}

/* ===== 极光流动效果 ===== */
@keyframes aurora-flow {
  0%, 100% { 
    transform: translateX(-10%) rotate(-5deg); 
    opacity: 0.5; 
  }
  50% { 
    transform: translateX(10%) rotate(5deg); 
    opacity: 0.8; 
  }
}

.aurora {
  position: absolute;
  width: 150%;
  height: 60%;
  top: -20%;
  left: -25%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 217, 255, 0.1) 20%,
    rgba(123, 44, 191, 0.15) 40%,
    rgba(233, 69, 96, 0.1) 60%,
    rgba(0, 217, 255, 0.1) 80%,
    transparent 100%
  );
  filter: blur(60px);
  animation: aurora-flow 15s ease-in-out infinite;
}

/* ===== 渐变文字动画 ===== */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.glow-text {
  background: var(--gradient-cosmic);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 6s ease infinite;
}

/* ===== 入场动画 ===== */
@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 动画延迟工具类 */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
```

### 6.3 宇宙卡片样式

```css
/* ===== 毛玻璃卡片 ===== */
.cosmic-card {
  /* 毛玻璃背景 */
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* 边框 */
  border: 1px solid rgba(123, 44, 191, 0.1);
  border-radius: 1.5rem;
  
  /* 定位 */
  position: relative;
  overflow: hidden;
  
  /* 过渡 */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 渐变边框效果 - 使用 mask 技巧 */
.cosmic-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(0, 217, 255, 0.3) 0%,
    rgba(123, 44, 191, 0.2) 50%,
    rgba(233, 69, 96, 0.3) 100%
  );
  /* mask 技巧：只显示边框部分 */
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* 悬停时显示渐变边框 */
.cosmic-card:hover::before {
  opacity: 1;
}

/* 悬停效果 */
.cosmic-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 40px rgba(123, 44, 191, 0.1),
    0 0 80px rgba(0, 217, 255, 0.05);
}
```

**mask-composite 技巧解释：**

这是创建渐变边框的关键技巧：

1. `padding: 1px` - 创建 1px 的内边距
2. `background` - 渐变背景填充整个元素
3. `mask: content-box, border-box` - 两个遮罩层
4. `mask-composite: exclude` - 排除重叠部分

结果：只有边框部分（padding 区域）显示渐变。

---

## 7. 核心组件详解

### 7.1 CosmicBackground.tsx - 宇宙背景组件

**文件位置：** `components/cosmic/CosmicBackground.tsx`

**作用：** 创建深邃的宇宙背景，包含星点、极光、漂浮光球

**完整代码解析：**

```tsx
"use client"; // 标记为客户端组件（使用了 useState, useEffect）

import { useEffect, useRef, useState } from "react";

// ===== 类型定义 =====
interface Star {
  id: number;
  x: number;      // 位置百分比 (0-100)
  y: number;
  size: "small" | "medium" | "large";
  delay: number;  // 动画延迟 (秒)
  duration: number; // 动画时长 (秒)
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;   // 像素
  color: string;  // rgba 颜色
  blur: number;   // 模糊程度
  duration: number;
  delay: number;
}

interface CosmicBackgroundProps {
  variant?: "default" | "hero" | "subtle";  // 变体模式
  starCount?: number;   // 星点数量
  showAurora?: boolean; // 是否显示极光
  showOrbs?: boolean;   // 是否显示光球
  className?: string;
}

// ===== 伪随机数生成器 =====
// 使用种子确保服务端和客户端生成相同的随机数，避免 hydration 不匹配
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}
```

**为什么需要 seededRandom？**

Next.js 的服务端渲染（SSR）会在服务器生成 HTML，然后客户端 hydrate。如果使用 `Math.random()`，服务端和客户端会生成不同的随机数，导致 hydration 错误。

`seededRandom` 使用相同的种子生成相同的"随机"数，确保一致性。


```tsx
const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  variant = "default",
  starCount = 50,
  showAurora = true,
  showOrbs = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  // ===== 客户端挂载后生成星点 =====
  useEffect(() => {
    setMounted(true);
    
    // 生成星点数据
    const generatedStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      // 使用 seededRandom 确保 SSR 一致性
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 3 + 2) * 100,
      // 10% 大星，30% 中星，60% 小星
      size: seededRandom(i * 3 + 3) > 0.9 ? "large" : 
            seededRandom(i * 3 + 3) > 0.6 ? "medium" : "small",
      delay: seededRandom(i * 3 + 4) * 5,      // 0-5秒延迟
      duration: 2 + seededRandom(i * 3 + 5) * 3, // 2-5秒时长
    }));
    
    setStars(generatedStars);
  }, [starCount]);

  // ===== 固定的漂浮光球配置 =====
  const orbs: FloatingOrb[] = showOrbs ? [
    { id: 1, x: 15, y: 20, size: 300, color: "rgba(123, 44, 191, 0.15)", blur: 80, duration: 20, delay: 0 },
    { id: 2, x: 75, y: 60, size: 250, color: "rgba(233, 69, 96, 0.12)", blur: 70, duration: 25, delay: 5 },
    { id: 3, x: 50, y: 80, size: 200, color: "rgba(0, 217, 255, 0.1)", blur: 60, duration: 18, delay: 3 },
    { id: 4, x: 85, y: 15, size: 180, color: "rgba(245, 208, 66, 0.08)", blur: 50, duration: 22, delay: 8 },
  ] : [];

  // ===== 视差效果（仅 hero 模式）=====
  useEffect(() => {
    if (variant !== "hero") return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // 计算鼠标位置百分比 (-1 到 1)
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      // 移动光球，不同深度不同位移
      const orbElements = container.querySelectorAll(".floating-orb");
      orbElements.forEach((orb, index) => {
        const depth = (index + 1) * 10; // 深度系数
        const x = xPercent * depth;
        const y = yPercent * depth;
        (orb as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [variant]);

  // ===== 星点大小映射 =====
  const getStarSize = (size: Star["size"]) => {
    switch (size) {
      case "large": return "w-1 h-1";    // 4px
      case "medium": return "w-0.5 h-0.5"; // 2px
      default: return "w-px h-px";        // 1px
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* 基础渐变背景 */}
      <div className="absolute inset-0 cosmic-bg" />

      {/* 噪点纹理 - 增加质感 */}
      <div className="absolute inset-0 noise-texture" />

      {/* 极光效果 */}
      {showAurora && variant !== "subtle" && (
        <div className="aurora" />
      )}

      {/* 漂浮光球 */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="floating-orb absolute rounded-full transition-transform duration-300 ease-out"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animation: `float-slow ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* 星点 - 只在客户端渲染 */}
      {mounted && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full bg-white ${getStarSize(star.size)}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                // 大星添加光晕
                boxShadow: star.size === "large" 
                  ? "0 0 6px 2px rgba(255, 255, 255, 0.4)" 
                  : star.size === "medium"
                  ? "0 0 3px 1px rgba(255, 255, 255, 0.2)"
                  : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Hero 模式额外装饰 */}
      {variant === "hero" && (
        <>
          {/* 星云光晕 */}
          <div
            className="absolute animate-pulse-slow"
            style={{
              right: "5%",
              top: "15%",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(123, 44, 191, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          
          {/* 流星效果 */}
          <div
            className="absolute"
            style={{
              right: "30%",
              top: "20%",
              width: "100px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "rotate(-45deg)",
              animation: "shooting-star 8s ease-in-out infinite",
            }}
          />
        </>
      )}
    </div>
  );
};

export default CosmicBackground;
```

**关键技术点总结：**

1. **`"use client"`**：标记为客户端组件
2. **`seededRandom`**：避免 SSR hydration 不匹配
3. **`mounted` 状态**：星点只在客户端渲染
4. **`pointer-events: none`**：背景不阻挡用户交互
5. **`fixed inset-0`**：固定定位，覆盖整个视口
6. **视差效果**：鼠标移动时光球跟随

### 7.2 PlanetCursor.tsx - 鼠标跟随星球

**文件位置：** `components/cosmic/PlanetCursor.tsx`

**作用：** 创建跟随鼠标的行星效果，带弹性动画

**核心算法：弹性插值**

```tsx
// 弹性插值公式
// current += (target - current) * ease
// ease 越小，跟随越慢，弹性越强

const ease = 1 - planet.delay; // delay 越大，ease 越小
currentPos.x += (targetX - currentPos.x) * ease;
currentPos.y += (targetY - currentPos.y) * ease;
```

**完整代码解析：**


```tsx
"use client";

import { useEffect, useRef, useState } from "react";

// ===== 行星配置 =====
interface Planet {
  id: number;
  size: number;        // 直径（像素）
  color: string;       // 主色
  orbitRadius: number; // 轨道半径
  delay: number;       // 跟随延迟 (0-1)
  glowColor: string;   // 光晕颜色
}

// 默认行星配置 - 4颗不同颜色的行星
const defaultPlanets: Planet[] = [
  { id: 1, size: 14, color: "#e94560", orbitRadius: 25, delay: 0.08, glowColor: "rgba(233, 69, 96, 0.6)" },
  { id: 2, size: 10, color: "#00d9ff", orbitRadius: 45, delay: 0.15, glowColor: "rgba(0, 217, 255, 0.5)" },
  { id: 3, size: 7, color: "#f5d042", orbitRadius: 65, delay: 0.22, glowColor: "rgba(245, 208, 66, 0.5)" },
  { id: 4, size: 5, color: "#7b2cbf", orbitRadius: 85, delay: 0.30, glowColor: "rgba(123, 44, 191, 0.4)" },
];

const PlanetCursor: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const [isMobile, setIsMobile] = useState(true); // 默认假设移动端
  const [isHovering, setIsHovering] = useState(false);
  
  // 使用 ref 存储位置，避免频繁 setState 导致重渲染
  const mousePos = useRef({ x: 0, y: 0 });
  const planetPositions = useRef(
    defaultPlanets.map(() => ({ x: 0, y: 0 }))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // ===== 移动端检测 =====
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ===== 鼠标跟踪 =====
  useEffect(() => {
    if (isMobile || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // 检测是否悬停在交互元素上
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button");
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, enabled]);

  // ===== 动画循环 =====
  useEffect(() => {
    if (isMobile || !enabled) return;

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const planets = container.children;
      
      defaultPlanets.forEach((planet, index) => {
        const currentPos = planetPositions.current[index];
        const targetX = mousePos.current.x;
        const targetY = mousePos.current.y;
        
        // ===== 核心：弹性插值 =====
        const ease = 1 - planet.delay;
        currentPos.x += (targetX - currentPos.x) * ease;
        currentPos.y += (targetY - currentPos.y) * ease;

        // ===== 轨道旋转 =====
        const time = Date.now() * 0.001; // 秒
        const angle = time * (1 + index * 0.3) + index * (Math.PI / 2);
        // 悬停时轨道收缩
        const orbitX = Math.cos(angle) * planet.orbitRadius * (isHovering ? 0.5 : 1);
        const orbitY = Math.sin(angle) * planet.orbitRadius * (isHovering ? 0.5 : 1);

        // 直接操作 DOM，避免 React 重渲染
        const planetEl = planets[index] as HTMLElement;
        if (planetEl) {
          planetEl.style.transform = `translate(
            ${currentPos.x + orbitX - planet.size / 2}px, 
            ${currentPos.y + orbitY - planet.size / 2}px
          ) scale(${isHovering ? 1.2 : 1})`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, enabled, isHovering]);

  // 移动端或禁用时不渲染
  if (isMobile || !enabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: "hidden" }}
    >
      {defaultPlanets.map((planet) => (
        <div
          key={planet.id}
          className="absolute rounded-full"
          style={{
            width: planet.size,
            height: planet.size,
            // 径向渐变创建 3D 球体感
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
            // 光晕 + 内部高光
            boxShadow: `
              0 0 ${planet.size}px ${planet.glowColor}, 
              inset 0 0 ${planet.size / 3}px rgba(255,255,255,0.3)
            `,
            willChange: "transform", // 提示浏览器优化
          }}
        />
      ))}
    </div>
  );
};

export default PlanetCursor;
```

**关键技术点：**

1. **弹性插值算法**：`current += (target - current) * ease`
2. **requestAnimationFrame**：60fps 流畅动画
3. **useRef 存储位置**：避免 setState 导致重渲染
4. **直接操作 DOM**：性能优化
5. **移动端禁用**：触摸设备无鼠标
6. **轨道旋转**：`Math.cos/sin` 计算圆周运动

### 7.3 CosmicCard.tsx - 毛玻璃卡片

**文件位置：** `components/cosmic/CosmicCard.tsx`

**作用：** 创建带光线追踪效果的毛玻璃卡片

```tsx
"use client";

import { useRef, useState, useEffect } from "react";

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;           // 入场动画延迟
  glowOnHover?: boolean;    // 悬停发光
  showDecoration?: boolean; // 角落装饰
  hoverEffect?: boolean;    // 悬停效果
}

const CosmicCard: React.FC<CosmicCardProps> = ({
  children,
  className = "",
  delay = 0,
  glowOnHover = true,
  showDecoration = true,
  hoverEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 入场动画延迟
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // ===== 光线追踪：计算鼠标在卡片内的位置 =====
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    // 转换为百分比 (0-100)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`
        cosmic-card relative p-6 md:p-8
        transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 }); // 重置到中心
      }}
    >
      {/* ===== 光线追踪效果 ===== */}
      {glowOnHover && isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            // 跟随鼠标的径向渐变
            background: `radial-gradient(
              400px circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(0, 217, 255, 0.15),
              rgba(123, 44, 191, 0.1) 40%,
              transparent 60%
            )`,
          }}
        />
      )}

      {/* ===== 角落装饰星星 ===== */}
      {showDecoration && (
        <>
          <div className="cosmic-card-decoration top-right" />
          <div className="cosmic-card-decoration bottom-left" />
        </>
      )}

      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CosmicCard;
```

**光线追踪原理：**

```
鼠标位置 (clientX, clientY)
        ↓
计算相对卡片的位置
        ↓
转换为百分比 (0-100)
        ↓
作为 radial-gradient 的圆心
        ↓
创建跟随鼠标的光晕效果
```

### 7.4 ClientProviders.tsx - 客户端 Provider

**文件位置：** `components/ClientProviders.tsx`

**作用：** 动态导入客户端组件，避免 SSR 问题


```tsx
"use client";

import dynamic from "next/dynamic";

// 动态导入 PlanetCursor，禁用 SSR
const PlanetCursor = dynamic(
  () => import("@/components/cosmic/PlanetCursor"),
  { ssr: false }
);

export default function ClientProviders() {
  return (
    <>
      <PlanetCursor />
    </>
  );
}
```

**为什么需要动态导入？**

`PlanetCursor` 使用了 `window` 对象（鼠标事件、屏幕尺寸），这些在服务端不存在。

- `ssr: false`：组件只在客户端渲染
- 避免 `window is not defined` 错误

### 7.5 Nav.tsx - 导航栏组件

**文件位置：** `components/Nav.tsx`

**作用：** 响应式导航栏，带滚动效果和移动端菜单

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname(); // 当前路由
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ===== 滚动检测 =====
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/knowledge", label: "知识库" },
    { href: "/program", label: "作品集" },
    { href: "/lab", label: "实验室" },
  ];

  return (
    <nav
      className={`nav-cosmic fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? "scrolled" : ""}`}
    >
      {/* 星光边框 - 滚动时显示 */}
      <div className={`nav-starlight-border ${isScrolled ? "active" : ""}`} />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="logo-glow relative">
              <div className="logo-pulse-ring" />
              <div 
                className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7b2cbf 0%, #e94560 100%)",
                }}
              >
                <span className="text-white font-bold text-xl">N</span>
              </div>
            </div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#00d9ff] bg-clip-text text-transparent">
              Nebula Lucent
            </span>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-cosmic relative px-4 py-2 rounded-lg font-medium
                    ${isActive ? "active text-[#7b2cbf]" : "text-gray-700 hover:text-[#7b2cbf]"}`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="nav-link-starlight" />
                </Link>
              );
            })}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* 汉堡菜单动画 */}
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span className={`block h-0.5 w-6 rounded-full transition-all
                ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-[#e94560]" : "bg-gray-700"}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all
                ${isMobileMenuOpen ? "opacity-0" : "bg-gray-700"}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all
                ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#e94560]" : "bg-gray-700"}`} />
            </div>
          </button>
        </div>

        {/* 移动端菜单 */}
        <div className={`md:hidden overflow-hidden transition-all duration-300
          ${isMobileMenuOpen ? "max-h-80 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

---

## 8. 页面开发详解

### 8.1 app/layout.tsx - 根布局

**作用：** 定义全局布局，包含导航、Footer、全局 Provider

```tsx
// app/layout.tsx
import "./globals.css";
import Nav from "@/components/Nav";
import ClientProviders from "@/components/ClientProviders";
import CosmicFooter from "@/components/cosmic/CosmicFooter";

// SEO 元数据
export const metadata = {
  title: "Nebula Lucent - 探索宇宙的边界",
  description: "一个现代化的个人空间，记录技术探索与创作历程",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased">
        {/* 客户端 Provider（鼠标跟随星球） */}
        <ClientProviders />
        
        {/* 导航栏 */}
        <Nav />
        
        {/* 主内容区域，留出导航栏高度 */}
        <div className="pt-16 md:pt-20">
          {children}
        </div>
        
        {/* 页脚 */}
        <CosmicFooter />
      </body>
    </html>
  );
}
```

**布局层级：**

```
<html>
  <body>
    <ClientProviders />     ← 鼠标跟随星球 (z-50)
    <Nav />                 ← 导航栏 (z-50, fixed)
    <div className="pt-16"> ← 内容区域
      {children}            ← 页面内容
    </div>
    <CosmicFooter />        ← 页脚
  </body>
</html>
```

### 8.2 app/page.tsx - 首页

**作用：** 网站首页，展示模块入口卡片

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CosmicBackground, CosmicCard } from "@/components/cosmic";

// 模块卡片数据
interface ModuleCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  delay: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // 入场动画
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const modules: ModuleCard[] = [
    {
      title: "博客",
      description: "记录技术思考、生活感悟与学习心得",
      href: "/posts",
      icon: <svg>...</svg>,
      gradient: "from-[#00d9ff] to-[#7b2cbf]",
      accentColor: "#00d9ff",
      delay: 0,
    },
    // ... 其他模块
  ];

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* 宇宙背景 */}
      <CosmicBackground variant="hero" starCount={80} showAurora showOrbs />

      {/* 内容层 */}
      <div className="content-layer">
        {/* Hero 区域 */}
        <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto px-4">
            <div className={`text-center transition-all duration-1000 
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              
              {/* 主标题 - 渐变动画 */}
              <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
                Nebula Lucent
              </h1>
              
              {/* 副标题 */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                探索 · 创造 · 分享
              </p>
            </div>
          </div>
        </section>

        {/* 模块卡片网格 */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {modules.map((module) => (
              <Link key={module.href} href={module.href} className="group">
                <CosmicCard delay={module.delay} className="h-full">
                  {/* 图标 */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl 
                    bg-gradient-to-br ${module.gradient} text-white`}>
                    {module.icon}
                  </div>
                  
                  {/* 标题和描述 */}
                  <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                  <p className="text-gray-600">{module.description}</p>
                </CosmicCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
```

---

## 9. 数据层详解

### 9.1 src/lib/posts.ts - 文章数据处理

**作用：** 读取 MDX 文件，解析 frontmatter，提供文章数据


```typescript
// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 文章目录
const postsDirectory = path.join(process.cwd(), "content", "posts");

// 文章元数据接口
export interface PostMeta {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
  slug: string;
}

// 完整文章接口
export interface Post extends PostMeta {
  content: string;
}

// ===== 获取所有文章 =====
export function getAllPosts(): PostMeta[] {
  // 检查目录是否存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    // 只处理 .mdx 和 .md 文件
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      // 从文件名生成 slug
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      
      // 读取文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      // 使用 gray-matter 解析 frontmatter
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "未命名文章",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        author: data.author || "",
      };
    });

  // 按日期降序排序
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ===== 根据 slug 获取文章 =====
export function getPostBySlug(slug: string): Post | null {
  try {
    // 尝试 .mdx 扩展名
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      // 尝试 .md 扩展名
      fullPath = path.join(postsDirectory, `${slug}.md`);
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "未命名文章",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      author: data.author || "",
      content, // Markdown 内容
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// ===== 获取所有 slug（用于静态生成）=====
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ""));
}
```

**数据流程：**

```
content/posts/
├── welcome.mdx
├── getting-started.mdx
└── example-code.mdx
        ↓
    fs.readFileSync()
        ↓
    gray-matter() 解析
        ↓
    { data: frontmatter, content: markdown }
        ↓
    返回 Post 对象
```

### 9.2 src/lib/projects.ts - 作品数据

**作用：** 定义作品数据结构和数据

```typescript
// src/lib/projects.ts

// 作品数据结构
export interface Project {
  id: string;           // 唯一标识，用于 URL
  title: string;        // 标题
  description: string;  // 简短描述
  longDescription?: string; // 详细描述
  image?: string;       // 主图
  images?: string[];    // 细节图
  icon?: string;        // emoji 图标
  tags: string[];       // 标签
  technologies: string[]; // 技术栈
  category: "web" | "mobile" | "desktop" | "game" | "library" | "ai" | "other";
  status: "completed" | "in-progress" | "archived";
  date: string;         // ISO 日期
  links?: {
    demo?: string;
    github?: string;
    website?: string;
    download?: string;
  };
  featured?: boolean;   // 是否精选
}

// 作品数据
export const projects: Project[] = [
  {
    id: "nebulalucent-blog",
    title: "Nebula Lucent Blog",
    description: "现代化个人博客系统",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    category: "web",
    status: "completed",
    date: "2025-01-01",
    featured: true,
    icon: "🌌",
  },
  // ... 更多作品
];

// ===== 获取所有作品（精选优先，按日期排序）=====
export function getAllProjects(): Project[] {
  return projects.sort((a, b) => {
    // 精选优先
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // 然后按日期
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ===== 根据 ID 获取作品 =====
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

// ===== 根据分类获取作品 =====
export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category);
}

// ===== 获取所有标签 =====
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
    project.technologies.forEach((tech) => tagSet.add(tech));
  });
  return Array.from(tagSet).sort();
}
```

---

## 10. 3D 效果实现

### 10.1 Scene3D.tsx - Three.js 场景容器

**文件位置：** `components/home/Scene3D.tsx`

**作用：** 创建 Three.js 渲染容器，处理 WebGL 兼容性

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

// ===== WebGL 支持检测 =====
export const useWebGLSupport = () => {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
};

// ===== CSS 降级背景 =====
const FallbackBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
  </div>
);

// ===== 3D 场景组件 =====
const Scene3D: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const webGLSupported = useWebGLSupport();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 未挂载或不支持 WebGL 时显示降级背景
  if (!mounted || !webGLSupported) {
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}  // 设备像素比
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
```

**Canvas 配置说明：**

| 属性 | 值 | 说明 |
|------|-----|------|
| `camera.position` | `[0, 0, 5]` | 相机位置 (x, y, z) |
| `camera.fov` | `75` | 视野角度 |
| `dpr` | `[1, 2]` | 设备像素比范围 |
| `gl.antialias` | `true` | 抗锯齿 |
| `gl.alpha` | `true` | 透明背景 |

### 10.2 ParticleField.tsx - 3D 粒子银河系

**文件位置：** `components/home/ParticleField.tsx`

**作用：** 创建 3D 银河系粒子效果


```tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;   // 粒子数量
  size?: number;    // 粒子大小
  speed?: number;   // 旋转速度
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 12000,
  size = 0.06,
  speed = 0.025,
}) => {
  // 各层粒子的引用
  const galaxyRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Points>(null);
  const brightStarsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  
  // 鼠标位置
  const mouseRef = useRef({ x: 0, y: 0 });

  // ===== 银河系主体 - 旋臂结构 =====
  const galaxy = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const arms = 4;           // 旋臂数量
    const armSpread = 0.4;    // 旋臂扩散度
    const galaxyRadius = 22;  // 银河系半径

    // 颜色调色板
    const colorPalette = [
      new THREE.Color("#fef3c7"), // 暖黄
      new THREE.Color("#c4b5fd"), // 淡紫
      new THREE.Color("#60a5fa"), // 蓝色
      new THREE.Color("#f472b6"), // 粉色
    ];

    for (let i = 0; i < count; i++) {
      // 半径：使用平方根分布，中心更密集
      const radius = Math.pow(Math.random(), 0.5) * galaxyRadius;
      
      // 旋臂角度
      const armAngle = ((i % arms) / arms) * Math.PI * 2;
      const spinAngle = radius * 0.75; // 旋转角度随半径增加
      const randomOffset = (Math.random() - 0.5) * armSpread * radius;
      const angle = armAngle + spinAngle + randomOffset;

      // 计算位置
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * (0.4 - radius * 0.015); // 扁平化

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z - 5; // 向后偏移

      // 根据位置选择颜色
      const t = radius / galaxyRadius;
      const colorIndex = Math.floor(t * colorPalette.length);
      const color = colorPalette[Math.min(colorIndex, colorPalette.length - 1)];
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // 随机大小
      sizes[i] = Math.random() < 0.05 ? size * 2.5 : size * (0.4 + Math.random() * 0.6);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count, size]);

  // ===== 银河核心 - 明亮中心 =====
  const core = useMemo(() => {
    const coreCount = 3500;
    const positions = new Float32Array(coreCount * 3);
    const colors = new Float32Array(coreCount * 3);

    const coreColors = [
      new THREE.Color("#fffbeb"),
      new THREE.Color("#fde68a"),
      new THREE.Color("#fbbf24"),
    ];

    for (let i = 0; i < coreCount; i++) {
      // 球形分布
      const radius = Math.pow(Math.random(), 2) * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.35; // 扁平化
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const color = coreColors[Math.floor(Math.random() * coreColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // ===== 鼠标监听 =====
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // ===== 动画循环 =====
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 鼠标影响旋转角度
    const rotX = 0.7 + mouseRef.current.y * 0.1;
    const rotZ = mouseRef.current.x * 0.05;

    // 银河系旋转
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = time * speed;
      galaxyRef.current.rotation.x = rotX;
      galaxyRef.current.rotation.z = rotZ;
    }

    // 核心旋转
    if (coreRef.current) {
      coreRef.current.rotation.y = time * speed;
      coreRef.current.rotation.x = rotX;
    }
  });

  return (
    <group>
      {/* 银河系旋臂 */}
      <points ref={galaxyRef} geometry={galaxy}>
        <pointsMaterial
          size={size}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 银河核心 */}
      <points ref={coreRef} geometry={core}>
        <pointsMaterial
          size={size * 1.8}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default ParticleField;
```

**Three.js 核心概念：**

| 概念 | 说明 |
|------|------|
| `BufferGeometry` | 高性能几何体，使用 TypedArray |
| `BufferAttribute` | 顶点属性（位置、颜色、大小） |
| `Points` | 点云渲染 |
| `pointsMaterial` | 点材质 |
| `AdditiveBlending` | 加法混合，让亮点更亮 |
| `useFrame` | 每帧调用的 Hook |

**旋臂算法解释：**

```
1. 将粒子分配到 4 条旋臂
2. 每条旋臂有基础角度 (0°, 90°, 180°, 270°)
3. 角度随半径增加而旋转 (spinAngle)
4. 添加随机偏移 (randomOffset) 让旋臂更自然
5. 使用平方根分布让中心更密集
```

### 10.3 FloatingGeometry.tsx - 漂浮几何体

**作用：** 创建漂浮的 3D 几何体装饰

```tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type GeometryType = "sphere" | "torus" | "octahedron" | "icosahedron";

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry?: GeometryType;
  color?: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
  distort?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  position,
  geometry = "sphere",
  color = "#8b5cf6",
  scale = 1,
  rotationSpeed = 0.5,
  floatSpeed = 1,
  floatAmplitude = 0.3,
  distort = 0.3,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  // 动画循环
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // 旋转动画
    meshRef.current.rotation.x = time * rotationSpeed * 0.5;
    meshRef.current.rotation.y = time * rotationSpeed;

    // 漂浮动画（正弦波）
    meshRef.current.position.y = initialY + Math.sin(time * floatSpeed) * floatAmplitude;
  });

  // 根据类型渲染几何体
  const renderGeometry = () => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
      default:
        return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {renderGeometry()}
      {/* MeshDistortMaterial：变形材质，让几何体有弹性感 */}
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.6}
        distort={distort}  // 变形程度
        speed={2}          // 变形速度
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default FloatingGeometry;
```

---

## 11. 性能优化策略

### 11.1 动态导入避免 SSR 问题

```tsx
// 使用 next/dynamic 动态导入
import dynamic from "next/dynamic";

const PlanetCursor = dynamic(
  () => import("@/components/cosmic/PlanetCursor"),
  { ssr: false }  // 禁用服务端渲染
);
```

**适用场景：**
- 使用 `window`、`document` 的组件
- Three.js 组件
- 依赖浏览器 API 的组件

### 11.2 useMemo 缓存计算

```tsx
// 星点数据只在 starCount 变化时重新计算
const stars = useMemo(() => {
  return Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    // ...
  }));
}, [starCount]);
```

### 11.3 useRef 避免重渲染

```tsx
// 使用 ref 存储频繁变化的值
const mousePos = useRef({ x: 0, y: 0 });

// 更新时不触发重渲染
const handleMouseMove = (e: MouseEvent) => {
  mousePos.current = { x: e.clientX, y: e.clientY };
};
```

### 11.4 requestAnimationFrame 优化动画

```tsx
useEffect(() => {
  let animationId: number;
  
  const animate = () => {
    // 动画逻辑
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  // 清理
  return () => cancelAnimationFrame(animationId);
}, []);
```

### 11.5 CSS 硬件加速

```css
.animated-element {
  /* 触发 GPU 加速 */
  transform: translateZ(0);
  will-change: transform, opacity;
}
```

### 11.6 移动端禁用复杂效果

```tsx
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        'ontouchstart' in window
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// 使用
if (isMobile) return null; // 移动端不渲染
```

---

## 12. 开发流程指南

### 12.1 项目初始化

```bash
# 1. 创建 Next.js 项目
npx create-next-app@latest nebula-lucent

# 选择：
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ App Router

# 2. 安装额外依赖
npm install three @react-three/fiber @react-three/drei
npm install @mdx-js/loader @mdx-js/react @next/mdx
npm install gray-matter react-markdown remark-gfm rehype-highlight
npm install date-fns slugify

# 3. 安装类型定义
npm install -D @types/three
```

### 12.2 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 创建新文章
npm run create-post "文章标题"
```

### 12.3 添加新页面

```
1. 在 app/ 目录下创建文件夹
2. 创建 page.tsx 文件
3. 导出默认组件
```

```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <main>
      <h1>新页面</h1>
    </main>
  );
}
```

### 12.4 添加新组件

```
1. 在 components/ 目录下创建文件
2. 使用 "use client" 标记客户端组件
3. 在 index.ts 中导出
```

```tsx
// components/cosmic/NewComponent.tsx
"use client";

export default function NewComponent() {
  return <div>新组件</div>;
}

// components/cosmic/index.ts
export { default as NewComponent } from './NewComponent';
```

### 12.5 添加新文章

```bash
# 方式1：使用脚本
npm run create-post "我的新文章"

# 方式2：手动创建
# 在 content/posts/ 下创建 .mdx 文件
```

```mdx
---
title: "我的新文章"
date: "2025-01-01"
excerpt: "文章摘要"
tags: ["React", "Next.js"]
author: "作者名"
---

# 文章标题

文章内容...
```

### 12.6 添加新作品

编辑 `src/lib/projects.ts`：

```typescript
export const projects: Project[] = [
  // 添加新作品
  {
    id: "new-project",
    title: "新项目",
    description: "项目描述",
    technologies: ["React", "TypeScript"],
    category: "web",
    status: "completed",
    date: "2025-01-01",
    icon: "🚀",
  },
  // ...
];
```

---

## 总结

通过本教程，你学会了：

1. ✅ **技术栈选型**：Next.js + React + TypeScript + Tailwind CSS + Three.js
2. ✅ **项目结构**：App Router 路由、组件组织、数据层设计
3. ✅ **宇宙主题**：CSS 变量系统、渐变、动画
4. ✅ **核心组件**：背景、卡片、导航、鼠标跟随
5. ✅ **3D 效果**：Three.js 粒子系统、银河系
6. ✅ **性能优化**：动态导入、useMemo、useRef、requestAnimationFrame
7. ✅ **开发流程**：初始化、添加页面、组件、文章

现在你可以开始构建自己的宇宙主题网站了！🚀

---

*Made with ♥ and ✨ in the cosmos*
*教程作者：Kiro AI Assistant*
*最后更新：2026-01-02*
