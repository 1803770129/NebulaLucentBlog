# 技术实验室使用指南

## 如何添加新实验

### 1. 编辑实验数据文件

打开 `src/lib/experiments.ts` 文件，在 `experiments` 数组中添加新实验：

```typescript
{
  id: "your-experiment-id",        // 唯一标识符，用于 URL
  title: "实验名称",
  description: "简短描述",
  longDescription: "详细的实验介绍，支持多行文本",
  thumbnail: "/path/to/thumbnail.jpg",  // 缩略图路径（可选）
  category: "js-effect",           // 分类
  tags: ["标签1", "标签2"],        // 标签数组
  technologies: ["技术1", "技术2"], // 技术栈数组
  status: "completed",             // 状态
  date: "2025-01-01",              // 日期，ISO 格式
  demoUrl: "/lab/your-experiment-id", // 在线演示链接（可选）
  codeUrl: "https://github.com/...",  // 代码链接（可选）
  componentPath: "YourExperiment",     // 组件路径（可选，用于内嵌展示）
  featured: true,                  // 是否精选（可选）
  difficulty: "intermediate",      // 难度级别（可选）
}
```

### 2. 分类说明

- `js-effect`: JS 特效
- `3d`: 3D 特效
- `web-feature`: Web 新特性
- `animation`: 动画
- `interaction`: 交互
- `other`: 其他

### 3. 状态说明

- `completed`: 已完成
- `in-progress`: 进行中
- `experimental`: 实验性

### 4. 难度级别

- `beginner`: 初级
- `intermediate`: 中级
- `advanced`: 高级

### 5. 示例

#### 基础示例（仅展示信息）

```typescript
{
  id: "css-grid-demo",
  title: "CSS Grid 布局实验",
  description: "探索 CSS Grid 的强大布局能力",
  longDescription: `这是一个展示 CSS Grid 布局能力的实验项目。

主要特性：
- 响应式网格布局
- 动态布局切换
- 复杂布局示例`,
  thumbnail: "/lab/thumbnails/css-grid.png",
  tags: ["CSS", "Grid", "布局"],
  technologies: ["CSS Grid", "HTML", "JavaScript"],
  category: "web-feature",
  status: "completed",
  date: "2025-01-15",
  demoUrl: "/lab/css-grid-demo",
  difficulty: "beginner",
}
```

#### 带内嵌组件的示例

```typescript
{
  id: "particle-animation",
  title: "粒子动画效果",
  description: "使用 Canvas API 创建的粒子动画效果",
  longDescription: `这是一个使用 Canvas API 和 JavaScript 创建的粒子动画效果。

主要特性：
- 流畅的粒子运动
- 鼠标交互
- 响应式设计`,
  thumbnail: "/lab/thumbnails/particle.png",
  tags: ["Canvas", "动画", "粒子"],
  technologies: ["JavaScript", "Canvas API", "HTML5"],
  category: "js-effect",
  status: "completed",
  date: "2025-01-20",
  demoUrl: "/lab/particle-animation",
  componentPath: "ParticleAnimation", // 组件名称
  difficulty: "intermediate",
  featured: true,
}
```

### 6. 创建实验组件（可选）

如果你想让实验在详情页内嵌展示，需要创建对应的 React 组件：

1. 在 `components/lab/` 目录下创建组件文件，例如 `ParticleAnimation.tsx`
2. 在实验数据中设置 `componentPath: "ParticleAnimation"`（不需要路径和扩展名）

示例组件：

```tsx
// components/lab/ParticleAnimation.tsx
"use client";

import { useEffect, useRef } from "react";

export default function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布大小
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // 你的动画代码...
    // ...

    return () => {
      // 清理代码
    };
  }, []);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: "400px" }}
      />
    </div>
  );
}
```

### 7. 图片放置

将实验缩略图放在 `public` 目录下，例如：
- `public/lab/thumbnails/my-experiment.png`
- 然后在 `thumbnail` 字段中使用 `/lab/thumbnails/my-experiment.png`

### 8. 字段说明

#### 必需字段
- `id`: 唯一标识符
- `title`: 实验标题
- `description`: 简短描述
- `tags`: 标签数组
- `technologies`: 技术栈数组
- `category`: 实验分类
- `status`: 实验状态
- `date`: 实验日期

#### 可选字段
- `longDescription`: 详细描述
- `thumbnail`: 缩略图路径
- `demoUrl`: 在线演示链接
- `codeUrl`: 代码链接（GitHub Gist、CodePen 等）
- `componentPath`: 组件路径（用于内嵌展示）
- `featured`: 是否精选
- `difficulty`: 难度级别

## 功能特性

### 实验室首页 (`/lab`)
- 展示所有实验
- 按分类筛选（JS 特效、3D 特效、Web 新特性等）
- 按标签筛选
- 响应式网格布局
- 精选实验标记
- 难度级别显示

### 实验详情页 (`/lab/[id]`)
- 完整的实验信息展示
- 内嵌组件展示（如果提供了 componentPath）
- 在线演示链接
- 代码链接
- 技术栈展示
- 标签展示
- 实验信息侧边栏

## 扩展建议

1. **添加更多分类**: 在 `getCategoryName` 函数中添加新的分类名称
2. **自定义样式**: 修改 `app/lab/page.tsx` 中的样式
3. **添加搜索功能**: 可以添加搜索框来搜索实验
4. **添加收藏功能**: 可以添加收藏实验的功能
5. **添加实验统计**: 可以显示实验的访问量、点赞数等

## 目录结构建议

```
components/
  lab/
    ParticleAnimation.tsx      # 粒子动画组件
    ThreeJSScene.tsx            # Three.js 场景组件
    CSSGridDemo.tsx             # CSS Grid 演示组件
    ...

public/
  lab/
    thumbnails/
      particle-animation.png
      threejs-scene.png
      ...
```

## 最佳实践

1. **组件命名**: 使用 PascalCase，与 `componentPath` 保持一致
2. **组件位置**: 所有实验组件放在 `components/lab/` 目录下
3. **缩略图**: 建议使用 16:9 或 4:3 的比例
4. **代码链接**: 可以使用 GitHub Gist、CodePen、CodeSandbox 等平台
5. **性能优化**: 对于复杂的实验，考虑使用 `dynamic` 导入和懒加载

