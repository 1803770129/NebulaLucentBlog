# Design Document: Portfolio Showcase Cabinet

## Overview

将作品集页面改造成 3D 展示柜样式，使用 CSS 3D 变换和玻璃拟态效果创建类似博物馆展示柜的视觉体验。每个作品都像是陈列在精美玻璃柜中的珍贵展品，配合聚光灯效果和交互动画，提升作品集的独特性和视觉吸引力。

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Portfolio Page                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Header + Filters                    │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 ShowcaseGallery                       │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │    │
│  │  │Showcase  │  │Showcase  │  │Showcase  │           │    │
│  │  │Cabinet   │  │Cabinet   │  │Cabinet   │           │    │
│  │  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │           │    │
│  │  │  │Item│  │  │  │Item│  │  │  │Item│  │           │    │
│  │  │  └────┘  │  │  └────┘  │  │  └────┘  │           │    │
│  │  └──────────┘  └──────────┘  └──────────┘           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### ShowcaseCabinet Component

主要的展示柜组件，负责渲染单个作品的展示柜效果。

```typescript
interface ShowcaseCabinetProps {
  project: Project;
  index: number;
  colorScheme: ColorScheme;
  mounted: boolean;
}

interface ColorScheme {
  bg: string;        // 背景渐变
  border: string;    // 边框颜色
  accent: string;    // 强调色
  glow: string;      // 发光颜色
}
```

### 展示柜结构

```
┌─────────────────────────────────────┐
│         ░░░ Spotlight ░░░           │  ← 顶部聚光灯
├─────────────────────────────────────┤
│  ╔═══════════════════════════════╗  │
│  ║                               ║  │
│  ║      ┌─────────────┐          ║  │  ← 玻璃面板
│  ║      │    Icon     │          ║  │
│  ║      │    📦       │          ║  │  ← 作品图标
│  ║      └─────────────┘          ║  │
│  ║                               ║  │
│  ║   ─────────────────────────   ║  │  ← 展示台
│  ║      Project Title            ║  │  ← 作品名称
│  ║      [Tag] [Tag]              ║  │  ← 技术标签
│  ╚═══════════════════════════════╝  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← 底座
└─────────────────────────────────────┘
```

## Data Models

### 颜色方案配置

```typescript
const showcaseColors: ColorScheme[] = [
  { 
    bg: "from-violet-500/5 to-purple-500/5", 
    border: "border-violet-400/30", 
    accent: "#8b5cf6",
    glow: "shadow-violet-500/20"
  },
  { 
    bg: "from-cyan-500/5 to-blue-500/5", 
    border: "border-cyan-400/30", 
    accent: "#06b6d4",
    glow: "shadow-cyan-500/20"
  },
  { 
    bg: "from-rose-500/5 to-pink-500/5", 
    border: "border-rose-400/30", 
    accent: "#f43f5e",
    glow: "shadow-rose-500/20"
  },
  { 
    bg: "from-amber-500/5 to-orange-500/5", 
    border: "border-amber-400/30", 
    accent: "#f59e0b",
    glow: "shadow-amber-500/20"
  },
  { 
    bg: "from-emerald-500/5 to-teal-500/5", 
    border: "border-emerald-400/30", 
    accent: "#10b981",
    glow: "shadow-emerald-500/20"
  },
];
```

## CSS 3D 展示柜实现

### 展示柜容器样式

```css
.showcase-cabinet {
  /* 3D 透视容器 */
  perspective: 1000px;
  transform-style: preserve-3d;
}

.showcase-inner {
  /* 玻璃效果 */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* 3D 效果 */
  transform: rotateX(2deg);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 -5px 20px rgba(255, 255, 255, 0.05) inset;
}

.showcase-inner:hover {
  transform: rotateX(0deg) translateY(-5px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 30px var(--glow-color);
}
```

### 聚光灯效果

```css
.spotlight {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 100%;
  background: radial-gradient(
    ellipse at top,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.showcase-cabinet:hover .spotlight {
  background: radial-gradient(
    ellipse at top,
    rgba(255, 255, 255, 0.25) 0%,
    transparent 70%
  );
}
```

### 玻璃反光效果

```css
.glass-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 100%
  );
  pointer-events: none;
}
```

### 底座效果

```css
.cabinet-base {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
```

## 响应式布局

```css
/* 大屏幕: 4 列 */
@media (min-width: 1280px) {
  .showcase-gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 中大屏幕: 3 列 */
@media (min-width: 1024px) and (max-width: 1279px) {
  .showcase-gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 中等屏幕: 2 列 */
@media (min-width: 640px) and (max-width: 1023px) {
  .showcase-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 小屏幕: 1 列 */
@media (max-width: 639px) {
  .showcase-gallery {
    grid-template-columns: 1fr;
  }
}
```

## 动画效果

### 入场动画

```css
@keyframes cabinetEnter {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(2deg);
  }
}

.showcase-cabinet {
  animation: cabinetEnter 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 100ms);
}
```

### 悬停动画

```css
.showcase-cabinet {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.showcase-cabinet:hover {
  transform: translateY(-8px) rotateX(0deg);
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: 展示柜内容完整性

*For any* 作品数据，展示柜渲染后应包含作品名称、状态标签，且精选作品应显示精选标识。

**Validates: Requirements 3.2, 3.4, 3.5**

### Property 2: 筛选功能正确性

*For any* 筛选条件，筛选后显示的作品应全部符合该筛选条件，且数量统计应与实际显示数量一致。

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 3: 导航功能正确性

*For any* 展示柜，点击后应导航到对应作品的详情页面（/program/{project.id}）。

**Validates: Requirements 4.2**

## Error Handling

1. **作品数据为空**: 显示友好的空状态提示
2. **图标加载失败**: 使用默认图标 📦 作为后备
3. **筛选无结果**: 显示"没有找到符合条件的作品"提示

## Testing Strategy

### Unit Tests
- 测试 ShowcaseCabinet 组件渲染正确的作品信息
- 测试筛选逻辑返回正确的作品列表
- 测试颜色方案循环分配

### Property-Based Tests
- 使用 fast-check 测试筛选功能的正确性
- 测试所有作品都能正确渲染展示柜

### Visual Tests
- 手动验证 3D 效果和动画
- 验证响应式布局在不同断点的表现
