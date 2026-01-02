# Design Document: Homepage 3D Enhancement

## Overview

本设计文档描述如何美化首页样式并添加3D元素。核心方案是使用React Three Fiber (R3F) 创建交互式3D粒子背景，同时优化现有UI组件的视觉效果。

技术选型：
- **@react-three/fiber@9**: React 19兼容的Three.js渲染器
- **@react-three/drei**: R3F辅助组件库，提供常用3D效果
- **CSS**: 毛玻璃效果、3D变换、动画

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Homepage                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              3D Background Layer                      │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         ParticleField Component              │    │   │
│  │  │  - Animated particles/stars                  │    │   │
│  │  │  - Mouse interaction                         │    │   │
│  │  │  - Responsive to viewport                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Content Layer (z-index: 10)             │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         Hero Section                         │    │   │
│  │  │  - Animated title with gradient              │    │   │
│  │  │  - Subtitle with typewriter effect           │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         Module Cards Grid                    │    │   │
│  │  │  - Glassmorphism cards                       │    │   │
│  │  │  - 3D hover transforms                       │    │   │
│  │  │  - Staggered animations                      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Scene3D Component

负责渲染3D场景的容器组件。

```typescript
interface Scene3DProps {
  className?: string;
  children?: React.ReactNode;
}

// 使用 dynamic import 避免 SSR 问题
const Scene3D: React.FC<Scene3DProps>
```

### 2. ParticleField Component

创建交互式粒子场效果。

```typescript
interface ParticleFieldProps {
  count?: number;        // 粒子数量，默认 1000
  size?: number;         // 粒子大小，默认 0.02
  color?: string;        // 粒子颜色
  speed?: number;        // 动画速度
  mouseInfluence?: number; // 鼠标影响范围
}

const ParticleField: React.FC<ParticleFieldProps>
```

### 3. FloatingGeometry Component

创建漂浮的几何体装饰元素。

```typescript
interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color?: string;
  scale?: number;
  rotationSpeed?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps>
```

### 4. GlassCard Component

毛玻璃效果的卡片组件。

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;        // 入场动画延迟
  hoverEffect?: boolean; // 是否启用3D悬停效果
}

const GlassCard: React.FC<GlassCardProps>
```

## Data Models

### Animation Configuration

```typescript
interface AnimationConfig {
  duration: number;      // 动画持续时间 (ms)
  delay: number;         // 延迟时间 (ms)
  easing: string;        // 缓动函数
}

interface ParticleConfig {
  count: number;
  spread: number;
  colors: string[];
  minSize: number;
  maxSize: number;
}
```

### Theme Colors

```typescript
const themeColors = {
  primary: {
    light: '#3b82f6',    // blue-500
    dark: '#60a5fa',     // blue-400
  },
  accent: {
    light: '#8b5cf6',    // violet-500
    dark: '#a78bfa',     // violet-400
  },
  particle: {
    light: ['#3b82f6', '#8b5cf6', '#ec4899'],
    dark: ['#60a5fa', '#a78bfa', '#f472b6'],
  }
};
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

基于需求分析，本功能主要涉及UI视觉效果，大部分需求是主观的视觉设计要求，不适合属性测试。以下是可测试的属性：

### Property 1: Dark Mode Class Consistency

*For any* theme setting (light or dark), the Homepage component SHALL apply the corresponding CSS classes consistently across all child components.

**Validates: Requirements 4.2**

### Property 2: Card Animation Delay Ordering

*For any* set of Module_Cards, the animation delay values SHALL be monotonically increasing based on card index.

**Validates: Requirements 3.3**

## Error Handling

### WebGL Fallback

当WebGL不可用时：
1. 检测WebGL支持：使用 `document.createElement('canvas').getContext('webgl')` 检测
2. 条件渲染：如果不支持，渲染CSS动画背景替代
3. 用户无感知：切换过程对用户透明

```typescript
const useWebGLSupport = () => {
  const [supported, setSupported] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  
  return supported;
};
```

### SSR Handling

React Three Fiber不支持服务端渲染，需要：
1. 使用 `next/dynamic` 动态导入3D组件
2. 设置 `ssr: false` 禁用服务端渲染
3. 提供加载占位符

```typescript
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
});
```

## Testing Strategy

### Unit Tests

由于本功能主要是视觉UI增强，单元测试将聚焦于：

1. **组件渲染测试**: 验证组件正确渲染，无错误抛出
2. **WebGL检测测试**: 验证WebGL支持检测逻辑
3. **动画延迟计算测试**: 验证卡片动画延迟值正确计算

### Property-Based Tests

使用 `fast-check` 进行属性测试：

1. **Property 1**: 测试主题切换时CSS类的一致性
2. **Property 2**: 测试卡片动画延迟的单调递增性

### Visual Testing (Manual)

由于大部分需求是视觉效果，需要手动验证：
- 3D背景动画流畅性
- 鼠标交互响应
- 毛玻璃效果
- 响应式布局

## Implementation Notes

### Dependencies to Install

```bash
npm install three @react-three/fiber@9 @react-three/drei
npm install -D @types/three
```

### Next.js Configuration

需要在 `next.config.ts` 中添加 three.js 转译配置：

```typescript
const nextConfig = {
  transpilePackages: ['three'],
};
```

### File Structure

```
components/
├── home/
│   ├── Scene3D.tsx          # 3D场景容器
│   ├── ParticleField.tsx    # 粒子场效果
│   ├── FloatingGeometry.tsx # 漂浮几何体
│   ├── GlassCard.tsx        # 毛玻璃卡片
│   └── index.ts             # 导出
app/
├── page.tsx                  # 更新首页
├── globals.css               # 添加新样式
```
