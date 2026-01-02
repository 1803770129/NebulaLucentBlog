// 实验数据结构
export interface Experiment {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  category: "js-effect" | "3d" | "web-feature" | "animation" | "interaction" | "other";
  tags: string[];
  technologies: string[];
  status: "completed" | "in-progress" | "experimental";
  date: string;
  componentPath?: string; // 组件路径，用于内嵌展示
  codeSource?: string; // 代码源代码（可选，如果不提供则自动从组件文件读取）
  featured?: boolean; // 是否精选
  difficulty?: "beginner" | "intermediate" | "advanced"; // 难度级别
}

// 实验数据 - 可以轻松扩展添加新实验
export const experiments: Experiment[] = [
  {
    id: "example-js-effect",
    title: "粒子动画效果",
    description: "使用 Canvas API 创建的粒子动画效果",
    longDescription: `这是一个使用 Canvas API 和 JavaScript 创建的粒子动画效果。

主要特性：
- 流畅的粒子运动
- 鼠标交互
- 响应式设计
- 性能优化

可以用于网站背景或装饰效果。`,
    thumbnail: "/next.svg",
    tags: ["Canvas", "动画", "粒子"],
    technologies: ["JavaScript", "Canvas API", "HTML5"],
    category: "js-effect",
    status: "completed",
    date: "2025-01-01",
    componentPath: "ExampleParticleAnimation", // 内嵌组件
    difficulty: "intermediate",
    featured: true,
  },
  {
    id: "example-3d",
    title: "Three.js 3D 场景",
    description: "使用 Three.js 创建的交互式 3D 场景",
    longDescription: `这是一个使用 Three.js 创建的交互式 3D 场景演示。

主要特性：
- 3D 模型加载
- 光照和阴影
- 相机控制
- 动画效果

展示了 WebGL 在浏览器中的强大能力。`,
    thumbnail: "/next.svg",
    tags: ["Three.js", "WebGL", "3D"],
    technologies: ["Three.js", "WebGL", "JavaScript"],
    category: "3d",
    status: "completed",
    date: "2025-01-02",
    difficulty: "advanced",
    featured: true,
  },
  {
    id: "example-web-feature",
    title: "CSS Grid 布局实验",
    description: "探索 CSS Grid 的强大布局能力",
    longDescription: `这是一个展示 CSS Grid 布局能力的实验项目。

主要特性：
- 响应式网格布局
- 动态布局切换
- 复杂布局示例

展示了现代 CSS 布局的强大功能。`,
    thumbnail: "/next.svg",
    tags: ["CSS", "Grid", "布局"],
    technologies: ["CSS Grid", "HTML", "JavaScript"],
    category: "web-feature",
    status: "completed",
    date: "2025-01-03",
    difficulty: "beginner",
  },
  // 可以在这里继续添加更多实验
];

// 获取所有实验
export function getAllExperiments(): Experiment[] {
  return experiments.sort((a, b) => {
    // 优先展示 featured 实验，然后按日期排序
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 根据 ID 获取实验
export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.id === id);
}

// 根据分类获取实验
export function getExperimentsByCategory(
  category: Experiment["category"]
): Experiment[] {
  return experiments.filter((experiment) => experiment.category === category);
}

// 根据标签获取实验
export function getExperimentsByTag(tag: string): Experiment[] {
  return experiments.filter(
    (experiment) =>
      experiment.tags.includes(tag) || experiment.technologies.includes(tag)
  );
}

// 获取所有分类
export function getAllCategories(): Experiment["category"][] {
  const categories = new Set<Experiment["category"]>();
  experiments.forEach((experiment) => categories.add(experiment.category));
  return Array.from(categories);
}

// 获取所有标签
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  experiments.forEach((experiment) => {
    experiment.tags.forEach((tag) => tagSet.add(tag));
    experiment.technologies.forEach((tech) => tagSet.add(tech));
  });
  return Array.from(tagSet).sort();
}

// 获取分类显示名称
export function getCategoryName(category: Experiment["category"]): string {
  const names: Record<Experiment["category"], string> = {
    "js-effect": "JS 特效",
    "3d": "3D 特效",
    "web-feature": "Web 新特性",
    animation: "动画",
    interaction: "交互",
    other: "其他",
  };
  return names[category];
}

// 获取难度显示名称
export function getDifficultyName(difficulty?: Experiment["difficulty"]): string {
  if (!difficulty) return "未设置";
  const names: Record<NonNullable<Experiment["difficulty"]>, string> = {
    beginner: "初级",
    intermediate: "中级",
    advanced: "高级",
  };
  return names[difficulty];
}

// 获取状态显示名称
export function getStatusName(status: Experiment["status"]): string {
  const names: Record<Experiment["status"], string> = {
    completed: "已完成",
    "in-progress": "进行中",
    experimental: "实验性",
  };
  return names[status];
}

