# 银河系作品集展示教程

本教程介绍如何创建一个银河系风格的作品集页面，作品以行星形式围绕中心星球旋转，悬停时暂停并显示详情卡片。

## 目录

1. [设计理念](#设计理念)
2. [效果预览](#效果预览)
3. [组件结构](#组件结构)
4. [核心实现](#核心实现)
5. [轨道系统](#轨道系统)
6. [悬停详情卡片](#悬停详情卡片)
7. [数据结构](#数据结构)
8. [样式定制](#样式定制)
9. [最佳实践](#最佳实践)

---

## 设计理念

### 为什么选择银河系风格？

银河系风格的作品集展示具有以下优势：

- **视觉震撼**：3D 星球效果，宇宙主题沉浸感强
- **动态交互**：持续旋转动画，悬停暂停探索
- **层次分明**：多轨道分布，自然区分作品优先级
- **探索感强**：像探索宇宙一样发现作品

### 视觉结构

```
                    ┌─────────────────────────────────────┐
                    │           筛选栏（固定顶部）          │
                    └─────────────────────────────────────┘

                              ○ 轨道4 (最外层)
                         ○         ○
                    ○                    ○
               ○    ┌─────────────┐         ○  轨道3
              ○     │             │          ○
             ○      │   🌍 中心    │           ○
              ○     │   星球      │          ○  轨道2
               ○    │             │         ○
                    └─────────────┘
                    ○            ○
                         ○  轨道1 (最内层)

                    ┌─────────────────────────────────────┐
                    │         状态提示（固定底部）          │
                    └─────────────────────────────────────┘

        悬停时右侧弹出 ↓

    ┌──────────────────────────┐
    │      [主图/图标]          │
    │  ┌──────┐  ┌──────┐      │  ← 2张细节图
    │  │细节1 │  │细节2 │      │
    │  └──────┘  └──────┘      │
    │  项目名称                 │
    │  项目描述...              │
    │  [标签] [标签] [标签]     │
    │     点击进入详情页 →      │
    └──────────────────────────┘
```

---

## 效果预览

### 默认状态
- 中心有一个发光的 3D 星球，显示"作品集"和项目数量
- 作品以小行星形式分布在 4 条轨道上
- 所有行星持续围绕中心旋转
- 轨道上有装饰粒子增强视觉效果
- 精选作品右上角有金色星星标识

### 悬停状态
- 整个银河系暂停旋转
- 悬停的行星放大 130%，发出光晕
- 行星下方显示作品名称
- 屏幕右侧弹出详情卡片
- 底部状态提示变为"已暂停"

---

## 组件结构

### 文件结构

```
components/
└── portfolio/
    └── GalaxyShowcase.tsx    # 银河系展示组件

app/
└── program/
    └── page.tsx              # 作品集页面
```

### GalaxyShowcase 组件

```typescript
interface GalaxyShowcaseProps {
  projects: Project[];  // 所有作品数据
}
```

---

## 核心实现

### 1. 旋转动画系统

```tsx
const [rotation, setRotation] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const animationRef = useRef<number | null>(null);

useEffect(() => {
  if (!mounted) return;

  let lastTime = performance.now();
  
  const animate = (currentTime: number) => {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    if (!isPaused) {
      // 每帧增加旋转角度，deltaTime 确保帧率无关
      setRotation(prev => (prev + 0.02 * (deltaTime / 16)) % 360);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  animationRef.current = requestAnimationFrame(animate);
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, [mounted, isPaused]);
```

### 2. 中心星球

```tsx
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
  {/* 星球光晕 */}
  <div 
    className="absolute -inset-16 rounded-full"
    style={{
      background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
      filter: "blur(20px)",
      animation: "pulse 4s ease-in-out infinite",
    }}
  />
  
  {/* 星球主体 */}
  <div 
    className="relative w-40 h-40 rounded-full"
    style={{
      background: `
        radial-gradient(circle at 35% 35%, 
          #c4b5fd 0%, #a78bfa 20%, #8b5cf6 40%, 
          #7c3aed 60%, #6d28d9 80%, #5b21b6 100%)
      `,
      boxShadow: `
        0 0 80px rgba(139, 92, 246, 0.5),
        0 0 160px rgba(139, 92, 246, 0.3),
        inset -30px -30px 60px rgba(0, 0, 0, 0.4),
        inset 15px 15px 30px rgba(255, 255, 255, 0.15)
      `,
    }}
  >
    {/* 星球表面纹理 */}
    <div 
      className="absolute inset-0 rounded-full opacity-20"
      style={{
        background: `repeating-conic-gradient(
          from 0deg,
          transparent 0deg 10deg,
          rgba(255,255,255,0.1) 10deg 20deg
        )`,
        animation: "spin 60s linear infinite",
      }}
    />
    
    {/* 星球大气层 */}
    <div 
      className="absolute -inset-2 rounded-full"
      style={{
        border: "2px solid rgba(139, 92, 246, 0.3)",
        boxShadow: "inset 0 0 20px rgba(139, 92, 246, 0.2)",
      }}
    />
    
    {/* 中心文字 */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <span className="text-2xl font-bold drop-shadow-lg">作品集</span>
      <span className="text-xs text-violet-200 mt-1">{projects.length} 个项目</span>
    </div>
  </div>
</div>
```

### 3. 轨道环

```tsx
{/* 轨道环 */}
{orbits.map((orbit, orbitIndex) => (
  <div
    key={orbitIndex}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
    style={{
      width: orbit.radius * 2,
      height: orbit.radius * 2,
      border: `1px solid ${orbit.color}`,
      boxShadow: `
        0 0 30px ${orbit.color},
        inset 0 0 30px ${orbit.color}
      `,
    }}
  />
))}
```

---

## 轨道系统

### 轨道配置

```tsx
const orbits = [
  { radius: 160, projects: projects.slice(0, 3), speed: 1, color: "rgba(139, 92, 246, 0.4)" },
  { radius: 260, projects: projects.slice(3, 6), speed: 0.8, color: "rgba(6, 182, 212, 0.35)" },
  { radius: 360, projects: projects.slice(6, 9), speed: 0.6, color: "rgba(236, 72, 153, 0.3)" },
  { radius: 460, projects: projects.slice(9), speed: 0.4, color: "rgba(245, 158, 11, 0.25)" },
].filter(orbit => orbit.projects.length > 0);
```

- **radius**: 轨道半径（像素）
- **projects**: 该轨道上的作品
- **speed**: 旋转速度倍率（外圈更慢）
- **color**: 轨道颜色

### 位置计算

```tsx
// 计算作品在圆形轨道上的位置
const getProjectPosition = (index: number, total: number, orbitRadius: number) => {
  const angle = (index / total) * 360 + rotation;
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius;
  const y = Math.sin(radian) * orbitRadius;
  return { x, y, angle };
};
```

### 行星渲染

```tsx
{orbits.map((orbit, orbitIndex) => (
  orbit.projects.map((project, index) => {
    const adjustedRotation = rotation * orbit.speed;
    const finalAngle = (index / orbit.projects.length) * 360 + adjustedRotation;
    const finalRadian = (finalAngle * Math.PI) / 180;
    const finalX = Math.cos(finalRadian) * orbit.radius;
    const finalY = Math.sin(finalRadian) * orbit.radius;
    
    const isHovered = hoveredProject?.id === project.id;
    const planetSize = 80 - orbitIndex * 8; // 外圈行星稍小

    return (
      <Link
        key={project.id}
        href={`/program/${project.id}`}
        className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-300 z-10"
        style={{
          transform: `translate(-50%, -50%) translate(${finalX}px, ${finalY}px) scale(${isHovered ? 1.3 : 1})`,
          zIndex: isHovered ? 100 : 10,
        }}
        onMouseEnter={() => handleProjectHover(project)}
        onMouseLeave={() => handleProjectHover(null)}
      >
        {/* 行星内容 */}
      </Link>
    );
  })
))}
```

---

## 悬停详情卡片

### 悬停处理

```tsx
const handleProjectHover = (project: Project | null) => {
  setHoveredProject(project);
  setIsPaused(project !== null);  // 悬停时暂停旋转
};
```

### 详情卡片（固定右侧）

```tsx
{hoveredProject && (
  <div 
    className="fixed right-8 top-1/2 -translate-y-1/2 w-80 z-50"
    style={{ animation: "slideIn 0.3s ease-out" }}
  >
    <div 
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,35,0.95), rgba(10,10,20,0.98))",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.2)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* 顶部彩色条 */}
      <div className="h-1" style={{ 
        background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)" 
      }} />
      
      {/* 主图区域 */}
      <div className="relative h-44 overflow-hidden">
        {/* 图片或渐变背景 */}
        {/* 状态标签 */}
        {/* 精选标识 */}
      </div>

      {/* 细节图片（2张） */}
      <div className="flex gap-2 px-4 -mt-5 relative z-10">
        {[0, 1].map((idx) => (
          <div key={idx} className="flex-1 h-14 rounded-lg overflow-hidden">
            {/* 细节图或占位 */}
          </div>
        ))}
      </div>

      {/* 文字信息 */}
      <div className="p-4 pt-3">
        <h3 className="text-xl font-bold text-white mb-2">{hoveredProject.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{hoveredProject.description}</p>
        
        {/* 技术标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hoveredProject.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-xs rounded-lg font-medium"
              style={{ 
                background: "rgba(139,92,246,0.15)", 
                color: "#a78bfa", 
                border: "1px solid rgba(139,92,246,0.3)" 
              }}
            >{tech}</span>
          ))}
        </div>
        
        {/* 点击提示 */}
        <div className="text-center py-2.5 rounded-xl text-sm font-medium"
          style={{ 
            background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))", 
            color: "#c4b5fd" 
          }}
        >
          点击进入详情页 →
        </div>
      </div>
    </div>
  </div>
)}
```

### 滑入动画

```css
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-50%) translateX(30px); }
  to { opacity: 1; transform: translateY(-50%) translateX(0); }
}
```

---

## 数据结构

### Project 接口

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;        // 主图 URL
  images?: string[];     // 细节图片数组
  icon?: string;         // emoji 图标（无图片时使用）
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "game" | "library" | "ai" | "other";
  status: "completed" | "in-progress" | "archived";
  featured?: boolean;    // 是否精选
  // ...其他字段
}
```

### 添加图片示例

```typescript
{
  id: "my-project",
  title: "我的项目",
  image: "/images/projects/my-project/cover.png",  // 主图
  images: [
    "/images/projects/my-project/detail-1.png",    // 细节图1
    "/images/projects/my-project/detail-2.png",    // 细节图2
  ],
  icon: "🚀",  // 备用图标
  // ...
}
```

---

## 样式定制

### 修改轨道数量和半径

```tsx
const orbits = [
  { radius: 120, projects: projects.slice(0, 2), speed: 1.2, color: "..." },
  { radius: 200, projects: projects.slice(2, 5), speed: 1, color: "..." },
  { radius: 280, projects: projects.slice(5, 9), speed: 0.8, color: "..." },
  { radius: 360, projects: projects.slice(9, 14), speed: 0.6, color: "..." },
  { radius: 440, projects: projects.slice(14), speed: 0.4, color: "..." },
];
```

### 修改旋转速度

```tsx
// 更快的旋转
setRotation(prev => (prev + 0.05 * (deltaTime / 16)) % 360);

// 更慢的旋转
setRotation(prev => (prev + 0.01 * (deltaTime / 16)) % 360);
```

### 修改行星大小

```tsx
// 当前：外圈递减
const planetSize = 80 - orbitIndex * 8;

// 统一大小
const planetSize = 70;

// 更大的行星
const planetSize = 100 - orbitIndex * 10;
```

### 修改中心星球颜色

```tsx
// 紫色系（当前）
background: `radial-gradient(circle at 35% 35%, 
  #c4b5fd 0%, #a78bfa 20%, #8b5cf6 40%, 
  #7c3aed 60%, #6d28d9 80%, #5b21b6 100%)`

// 蓝色系
background: `radial-gradient(circle at 35% 35%, 
  #bfdbfe 0%, #93c5fd 20%, #60a5fa 40%, 
  #3b82f6 60%, #2563eb 80%, #1d4ed8 100%)`

// 绿色系
background: `radial-gradient(circle at 35% 35%, 
  #bbf7d0 0%, #86efac 20%, #4ade80 40%, 
  #22c55e 60%, #16a34a 80%, #15803d 100%)`
```

---

## 最佳实践

### 1. 性能优化

```tsx
// 使用 useMemo 缓存轨道配置
const orbits = useMemo(() => [
  { radius: 160, projects: projects.slice(0, 3), speed: 1, color: "..." },
  // ...
].filter(orbit => orbit.projects.length > 0), [projects]);
```

### 2. 避免 SSR 问题

```tsx
// 使用 mounted 状态避免水合错误
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// 渲染时检查
<div className={`transition-all duration-1000 
  ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
```

### 3. 可访问性

```tsx
// 添加 aria 标签
<Link
  href={`/program/${project.id}`}
  aria-label={`查看项目：${project.title}`}
>

// 状态提示
<div role="status" aria-live="polite">
  {isPaused ? "已暂停" : "银河旋转中"}
</div>
```

### 4. 移动端适配

银河系效果在移动端可能需要调整：

```tsx
// 检测屏幕尺寸
const isMobile = window.innerWidth < 768;

// 移动端使用更小的轨道
const orbits = isMobile ? [
  { radius: 100, projects: projects.slice(0, 3), speed: 1, color: "..." },
  { radius: 160, projects: projects.slice(3, 6), speed: 0.8, color: "..." },
  { radius: 220, projects: projects.slice(6), speed: 0.6, color: "..." },
] : [
  // 桌面端配置
];
```

---

## 扩展功能

### 1. 添加星空背景粒子

```tsx
// 轨道装饰粒子
{orbits.map((orbit, orbitIndex) => (
  Array.from({ length: 20 }).map((_, i) => {
    const angle = (i / 20) * 360 + rotation * orbit.speed * 2;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * orbit.radius;
    const y = Math.sin(radian) * orbit.radius;
    return (
      <div
        key={`particle-${orbitIndex}-${i}`}
        className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          background: orbit.color,
          opacity: 0.5,
        }}
      />
    );
  })
))}
```

### 2. 添加轨道连接线

```tsx
{/* 悬停时显示到中心的连接线 */}
{isHovered && (
  <div 
    className="absolute left-1/2 top-1/2 w-px pointer-events-none"
    style={{
      height: orbit.radius,
      background: `linear-gradient(to bottom, ${orbit.color}, transparent)`,
      transform: `rotate(${finalAngle + 90}deg)`,
      transformOrigin: "top",
    }}
  />
)}
```

### 3. 添加音效

```tsx
const playHoverSound = () => {
  const audio = new Audio('/sounds/hover.mp3');
  audio.volume = 0.2;
  audio.play();
};

<Link
  onMouseEnter={() => {
    handleProjectHover(project);
    playHoverSound();
  }}
>
```

---

## 总结

银河系风格的作品集展示具有以下特点：

1. **中心星球** - 3D 效果的发光星球作为视觉焦点
2. **多轨道系统** - 作品分布在 4 条不同半径的轨道上
3. **持续旋转** - 使用 requestAnimationFrame 实现流畅动画
4. **悬停暂停** - 鼠标悬停时暂停旋转，方便探索
5. **详情卡片** - 固定在右侧的详情面板，包含主图、细节图、描述和标签
6. **视觉效果** - 轨道光晕、装饰粒子、行星光泽等丰富细节

这种设计将作品集变成了一个可探索的宇宙，用户可以像探索银河系一样发现你的作品。

---

*教程作者：Kiro AI Assistant*
*最后更新：2026-01-02*
