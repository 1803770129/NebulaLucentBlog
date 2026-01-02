// 作品数据结构
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  tags: string[];
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "game" | "other" | "library" | "ai";
  status: "completed" | "in-progress" | "archived";
  date: string;
  links?: {
    demo?: string;
    github?: string;
    website?: string;
    download?: string;
  };
  featured?: boolean;
  icon?: string; // emoji 图标
}

// 作品数据
export const projects: Project[] = [
  {
    id: "nebulalucent-blog",
    title: "Nebula Lucent Blog",
    description: "现代化个人博客系统，基于 Next.js 16 和 MDX 构建，支持宇宙主题视觉效果",
    longDescription: `一个功能完整的个人博客系统，具有以下特性：
- 📝 使用 Markdown/MDX 格式编写文章
- 🚀 静态生成（SSG），性能优异
- 🎨 宇宙主题设计，支持深色模式
- 🔍 SEO 友好
- 💻 代码高亮支持`,
    tags: ["博客", "全栈", "开源"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    category: "web",
    status: "completed",
    date: "2025-01-01",
    links: {
      github: "https://github.com/yourusername/nebulalucent-blog",
      website: "https://yourblog.com",
    },
    featured: true,
    icon: "🌌",
  },
  {
    id: "cosmic-ui",
    title: "Cosmic UI 组件库",
    description: "基于 React 的宇宙主题 UI 组件库，包含 30+ 精美组件，支持主题定制",
    longDescription: `一套完整的 React UI 组件库：
- 🎨 宇宙主题设计语言
- 📦 30+ 高质量组件
- 🌙 深色/浅色模式
- 📱 响应式设计
- ♿ 无障碍支持`,
    tags: ["组件库", "UI", "开源"],
    technologies: ["React", "TypeScript", "Storybook", "Rollup"],
    category: "library",
    status: "completed",
    date: "2024-12-15",
    links: {
      github: "https://github.com/yourusername/cosmic-ui",
      demo: "https://cosmic-ui.dev",
    },
    featured: true,
    icon: "🎨",
  },
  {
    id: "3d-galaxy-explorer",
    title: "3D 银河探索器",
    description: "基于 Three.js 的交互式 3D 银河系可视化项目，支持缩放、旋转和星球信息展示",
    longDescription: `沉浸式 3D 宇宙探索体验：
- 🌟 真实银河系数据可视化
- 🎮 流畅的 3D 交互
- 📊 星球详细信息展示
- 🎵 背景音效`,
    tags: ["3D", "可视化", "WebGL"],
    technologies: ["Three.js", "React Three Fiber", "TypeScript"],
    category: "web",
    status: "completed",
    date: "2024-11-20",
    links: {
      demo: "https://galaxy.yourdomain.com",
      github: "https://github.com/yourusername/3d-galaxy",
    },
    featured: true,
    icon: "🌌",
  },
  {
    id: "practice-nav",
    title: "练习导航",
    description: "前端练习资源导航网站，整合各类学习资源、面试题库和实战项目",
    longDescription: `前端学习资源一站式导航：
- 📚 精选学习资源
- 💡 面试题库
- 🛠️ 实战项目推荐
- 🔖 个人收藏功能`,
    tags: ["导航", "学习", "工具"],
    technologies: ["Vue 3", "Vite", "Pinia"],
    category: "web",
    status: "completed",
    date: "2024-10-15",
    links: {
      website: "https://nav.yourdomain.com",
    },
    icon: "🧭",
  },
  {
    id: "leetcode-mini",
    title: "刷题小程序",
    description: "微信小程序刷题工具，支持 LeetCode 题目练习、进度追踪和错题本功能",
    longDescription: `随时随地刷算法题：
- 📝 1000+ 精选题目
- 📊 学习进度追踪
- 📕 智能错题本
- 🏆 每日打卡`,
    tags: ["小程序", "算法", "学习"],
    technologies: ["微信小程序", "云开发", "TypeScript"],
    category: "mobile",
    status: "completed",
    date: "2024-09-10",
    links: {
      demo: "weixin://dl/business/?appid=wx123456",
    },
    icon: "📝",
  },
  {
    id: "health-tracker",
    title: "健康管理小程序",
    description: "个人健康数据管理小程序，支持运动记录、饮食追踪和健康报告生成",
    longDescription: `全方位健康管理助手：
- 🏃 运动数据记录
- 🍎 饮食热量追踪
- 💤 睡眠质量分析
- 📈 健康趋势报告`,
    tags: ["小程序", "健康", "数据"],
    technologies: ["Taro", "React", "ECharts"],
    category: "mobile",
    status: "in-progress",
    date: "2024-08-20",
    links: {
      demo: "weixin://dl/business/?appid=wx789012",
    },
    icon: "💪",
  },
  {
    id: "perf-monitor",
    title: "性能监控可视化平台",
    description: "前端性能监控与可视化分析平台，实时追踪 Web Vitals 和用户体验指标",
    longDescription: `企业级前端性能监控方案：
- 📊 实时性能数据大屏
- 🔍 Core Web Vitals 追踪
- 🚨 异常告警通知
- 📈 趋势分析报告`,
    tags: ["监控", "可视化", "性能"],
    technologies: ["React", "D3.js", "Node.js", "ClickHouse"],
    category: "web",
    status: "completed",
    date: "2024-07-15",
    links: {
      demo: "https://perf.yourdomain.com",
      github: "https://github.com/yourusername/perf-monitor",
    },
    featured: true,
    icon: "📊",
  },
  {
    id: "ai-components",
    title: "AI 组件库",
    description: "集成 AI 能力的 React 组件库，包含智能表单、AI 对话框、智能搜索等组件",
    longDescription: `AI 驱动的下一代组件库：
- 🤖 AI 对话组件
- 🔍 智能搜索
- 📝 AI 辅助表单
- 🎨 智能主题生成`,
    tags: ["AI", "组件库", "LLM"],
    technologies: ["React", "OpenAI API", "LangChain", "TypeScript"],
    category: "ai",
    status: "in-progress",
    date: "2024-12-01",
    links: {
      github: "https://github.com/yourusername/ai-components",
      demo: "https://ai-ui.yourdomain.com",
    },
    featured: true,
    icon: "🤖",
  },
  {
    id: "cs408-agent",
    title: "408 智能体",
    description: "计算机考研 408 科目 AI 学习助手，支持知识问答、错题分析和学习规划",
    longDescription: `考研 408 AI 学习伴侣：
- 💬 智能知识问答
- 📚 知识点梳理
- 🎯 薄弱点分析
- 📅 个性化学习计划`,
    tags: ["AI", "教育", "考研"],
    technologies: ["Python", "LangChain", "RAG", "FastAPI"],
    category: "ai",
    status: "in-progress",
    date: "2024-11-01",
    links: {
      demo: "https://408.yourdomain.com",
    },
    icon: "🎓",
  },
  // 占位项目 - 后续可直接修改内容
  {
    id: "placeholder-1",
    title: "项目占位 1",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-06-01",
    icon: "🔮",
  },
  {
    id: "placeholder-2",
    title: "项目占位 2",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-05-01",
    icon: "💎",
  },
  {
    id: "placeholder-3",
    title: "项目占位 3",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-04-01",
    icon: "🌟",
  },
  {
    id: "placeholder-4",
    title: "项目占位 4",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-03-01",
    icon: "🚀",
  },
  {
    id: "placeholder-5",
    title: "项目占位 5",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-02-01",
    icon: "⚡",
  },
  {
    id: "placeholder-6",
    title: "项目占位 6",
    description: "这是一个占位项目，后续可以替换为实际项目内容",
    tags: ["占位"],
    technologies: ["待定"],
    category: "other",
    status: "archived",
    date: "2024-01-01",
    icon: "🎯",
  },
];

// 获取所有作品
export function getAllProjects(): Project[] {
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 根据 ID 获取作品
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

// 根据分类获取作品
export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category);
}

// 根据标签获取作品
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(
    (project) => project.tags.includes(tag) || project.technologies.includes(tag)
  );
}

// 获取所有分类
export function getAllCategories(): Project["category"][] {
  const categories = new Set<Project["category"]>();
  projects.forEach((project) => categories.add(project.category));
  return Array.from(categories);
}

// 获取所有标签
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
    project.technologies.forEach((tech) => tagSet.add(tech));
  });
  return Array.from(tagSet).sort();
}
