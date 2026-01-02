# Design Document: Site Style Enhancement

## Overview

本设计文档描述如何将网站改造为宇宙主题的高级感视觉风格。核心方案是移除现有的Three.js 3D银河系效果，采用纯CSS/SVG实现的轻量宇宙背景，配合鼠标跟随的星球效果组件，打造独特的交互体验。

技术选型：
- **CSS**: 渐变背景、毛玻璃效果、动画
- **SVG**: 星点装饰、星球图形
- **React Hooks**: 鼠标跟随效果、视差效果
- **Framer Motion** (可选): 高级动画效果

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App Layout                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Planet Cursor Layer (z-50)              │   │
│  │  - 鼠标跟随的星球组件                                  │   │
│  │  - 固定定位，覆盖全页面                                │   │
│  │  - pointer-events: none                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Navigation Bar (z-50)                    │   │
│  │  - 宇宙渐变毛玻璃背景                                  │   │
│  │  - 星光边框效果                                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Cosmic Background Layer (z-0)           │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         CSS Gradient Background              │    │   │
│  │  │  - 多层渐变叠加                               │    │   │
│  │  │  - 噪点纹理                                   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         Star Field (CSS/SVG)                 │    │   │
│  │  │  - 静态星点                                   │    │   │
│  │  │  - 闪烁动画                                   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         Floating Decorations                 │    │   │
│  │  │  - 漂浮星球/星云                              │    │   │
│  │  │  - 极光效果                                   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Content Layer (z-10)                    │   │
│  │  - Hero Section                                       │   │
│  │  - Cards Grid                                         │   │
│  │  - Footer                                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. PlanetCursor Component

鼠标跟随的星球效果组件。

```typescript
interface Planet {
  id: number;
  size: number;           // 星球大小 (px)
  color: string;          // 星球颜色
  orbitRadius: number;    // 轨道半径
  delay: number;          // 跟随延迟 (0-1)
  glowColor: string;      // 光晕颜色
}

interface PlanetCursorProps {
  planets?: Planet[];     // 自定义星球配置
  enabled?: boolean;      // 是否启用
}

const PlanetCursor: React.FC<PlanetCursorProps>
```

### 2. CosmicBackground Component

宇宙主题背景组件，替代原有的3D银河系。

```typescript
interface CosmicBackgroundProps {
  variant?: 'default' | 'hero' | 'subtle';  // 背景变体
  showStars?: boolean;    // 是否显示星点
  showAurora?: boolean;   // 是否显示极光
  showNebula?: boolean;   // 是否显示星云
}

const CosmicBackground: React.FC<CosmicBackgroundProps>
```

### 3. StarField Component

CSS实现的星点背景。

```typescript
interface StarFieldProps {
  density?: 'low' | 'medium' | 'high';  // 星点密度
  animated?: boolean;     // 是否有闪烁动画
}

const StarField: React.FC<StarFieldProps>
```

### 4. CosmicCard Component

宇宙主题的卡片组件，升级现有GlassCard。

```typescript
interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;         // 入场动画延迟
  glowOnHover?: boolean;  // 悬停时是否发光
  cornerDecoration?: boolean;  // 是否显示角落装饰
}

const CosmicCard: React.FC<CosmicCardProps>
```

### 5. GlowText Component

带有星光效果的文字组件。

```typescript
interface GlowTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  gradient?: string;      // 渐变色
  animated?: boolean;     // 是否有动画
}

const GlowText: React.FC<GlowTextProps>
```

## Data Models

### Color System

```typescript
const cosmicColors = {
  // 主色调
  primary: {
    deepPurple: '#1a1a2e',
    spaceBlue: '#16213e',
    nebulaPink: '#e94560',
  },
  // 点缀色
  accent: {
    starGold: '#f5d042',
    auroraGreen: '#00d9ff',
    cosmicViolet: '#7b2cbf',
  },
  // 渐变
  gradients: {
    cosmic: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    aurora: 'linear-gradient(45deg, #00d9ff 0%, #7b2cbf 50%, #e94560 100%)',
    nebula: 'linear-gradient(180deg, #16213e 0%, #1a1a2e 50%, #0d1b2a 100%)',
    glow: 'radial-gradient(circle, rgba(233,69,96,0.3) 0%, transparent 70%)',
  },
  // 浅色模式
  light: {
    background: '#f8f9ff',
    surface: 'rgba(255, 255, 255, 0.8)',
    text: '#1a1a2e',
  },
  // 深色模式
  dark: {
    background: '#0d1117',
    surface: 'rgba(22, 33, 62, 0.6)',
    text: '#e6e6e6',
  }
};
```

### Planet Configuration

```typescript
const defaultPlanets: Planet[] = [
  {
    id: 1,
    size: 12,
    color: '#e94560',
    orbitRadius: 30,
    delay: 0.1,
    glowColor: 'rgba(233, 69, 96, 0.5)',
  },
  {
    id: 2,
    size: 8,
    color: '#00d9ff',
    orbitRadius: 50,
    delay: 0.2,
    glowColor: 'rgba(0, 217, 255, 0.5)',
  },
  {
    id: 3,
    size: 6,
    color: '#f5d042',
    orbitRadius: 70,
    delay: 0.3,
    glowColor: 'rgba(245, 208, 66, 0.5)',
  },
  {
    id: 4,
    size: 4,
    color: '#7b2cbf',
    orbitRadius: 90,
    delay: 0.4,
    glowColor: 'rgba(123, 44, 191, 0.5)',
  },
];
```

### Animation Configuration

```typescript
const animationConfig = {
  // 弹性缓动
  spring: {
    type: 'spring',
    stiffness: 150,
    damping: 15,
  },
  // 入场动画
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  // 星点闪烁
  twinkle: {
    keyframes: [
      { opacity: 0.3 },
      { opacity: 1 },
      { opacity: 0.3 },
    ],
    duration: '3s',
    iterationCount: 'infinite',
  },
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

基于需求分析，本功能主要涉及UI视觉效果和交互体验。大部分需求是主观的视觉设计要求（如"高级感"、"微妙"等），不适合自动化属性测试。以下是可测试的属性：

### Property 1: Planet Cursor Mobile Detection

*For any* viewport width less than 768px or touch-enabled device, the Planet_Cursor component SHALL be disabled and not render any planet elements.

**Validates: Requirements 3.5**

### Property 2: Planet Cursor Follow with Delay

*For any* mouse position change, each planet in the Planet_Cursor SHALL update its position with a delay proportional to its configured delay value, where planets with higher delay values move slower than those with lower delay values.

**Validates: Requirements 3.1, 3.3**

### Property 3: Animation Delay Ordering

*For any* set of cards rendered in sequence, the animation delay values SHALL be monotonically increasing based on card index, ensuring staggered entrance animations.

**Validates: Requirements 6.5**

### Property 4: Color System Consistency

*For any* page in the application, the background gradient and primary UI elements SHALL use colors from the defined cosmicColors palette (deep purple #1a1a2e, space blue #16213e, nebula pink #e94560, star gold #f5d042, aurora green #00d9ff).

**Validates: Requirements 2.1, 2.2, 8.1**

## Error Handling

### Performance Fallback

当检测到低性能设备时：
1. 减少星点数量
2. 禁用复杂动画
3. 简化渐变效果

```typescript
const usePerformanceMode = () => {
  const [isLowPerf, setIsLowPerf] = useState(false);
  
  useEffect(() => {
    // 检测设备性能
    const checkPerformance = () => {
      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      
      if ((memory && memory < 4) || (cores && cores < 4)) {
        setIsLowPerf(true);
      }
    };
    
    checkPerformance();
  }, []);
  
  return isLowPerf;
};
```

### Mobile Detection

移动端自动禁用鼠标跟随效果：

```typescript
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};
```

### SSR Handling

所有涉及window/document的组件需要客户端渲染：

```typescript
// 使用 "use client" 指令
// 使用 useEffect 进行客户端初始化
// 提供服务端渲染的占位符
```

## Testing Strategy

### Unit Tests

由于本功能主要是视觉UI增强，单元测试将聚焦于：

1. **组件渲染测试**: 验证组件正确渲染，无错误抛出
2. **移动端检测测试**: 验证移动端检测逻辑正确
3. **动画延迟计算测试**: 验证卡片动画延迟值正确计算

### Property-Based Tests

使用 `fast-check` 进行属性测试：

1. **Property 1**: 测试移动端检测和星球禁用逻辑
2. **Property 2**: 测试颜色系统一致性
3. **Property 3**: 测试动画延迟的单调递增性

### Visual Testing (Manual)

由于大部分需求是视觉效果，需要手动验证：
- 宇宙渐变背景效果
- 鼠标跟随星球动画
- 卡片悬停光效
- 响应式布局
- 深色/浅色模式切换

## Implementation Notes

### CSS Variables

在 globals.css 中定义宇宙主题变量：

```css
:root {
  /* 宇宙主题色 */
  --cosmic-deep-purple: #1a1a2e;
  --cosmic-space-blue: #16213e;
  --cosmic-nebula-pink: #e94560;
  --cosmic-star-gold: #f5d042;
  --cosmic-aurora-green: #00d9ff;
  --cosmic-violet: #7b2cbf;
  
  /* 渐变 */
  --gradient-cosmic: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  --gradient-aurora: linear-gradient(45deg, #00d9ff 0%, #7b2cbf 50%, #e94560 100%);
  
  /* 光晕 */
  --glow-pink: 0 0 20px rgba(233, 69, 96, 0.5);
  --glow-blue: 0 0 20px rgba(0, 217, 255, 0.5);
  --glow-gold: 0 0 20px rgba(245, 208, 66, 0.5);
}
```

### File Structure

```
components/
├── cosmic/
│   ├── PlanetCursor.tsx      # 鼠标跟随星球
│   ├── CosmicBackground.tsx  # 宇宙背景
│   ├── StarField.tsx         # 星点背景
│   ├── CosmicCard.tsx        # 宇宙卡片
│   ├── GlowText.tsx          # 发光文字
│   └── index.ts              # 导出
app/
├── page.tsx                   # 更新首页
├── globals.css                # 添加宇宙主题样式
├── layout.tsx                 # 添加PlanetCursor
```

### Key Implementation Details

1. **星球跟随效果**: 使用 requestAnimationFrame 和弹性插值实现平滑跟随
2. **星点背景**: 使用 CSS radial-gradient 或 SVG 生成随机星点
3. **极光效果**: 使用 CSS animation 和 filter: blur 实现
4. **噪点纹理**: 使用 SVG filter 或 CSS background-image 实现
5. **光线追踪边框**: 使用 CSS conic-gradient 和 mask 实现
