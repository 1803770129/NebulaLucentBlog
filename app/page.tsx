"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CosmicBackground, CosmicCard } from "@/components/cosmic";

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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const modules: ModuleCard[] = [
    {
      title: "博客",
      description: "记录技术思考、生活感悟与学习心得",
      href: "/posts",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      gradient: "from-[#00d9ff] to-[#7b2cbf]",
      accentColor: "#00d9ff",
      delay: 0,
    },
    {
      title: "技术实验室",
      description: "探索前沿技术，实验创新想法",
      href: "/lab",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      gradient: "from-[#e94560] to-[#f5d042]",
      accentColor: "#e94560",
      delay: 100,
    },
    {
      title: "知识库",
      description: "整理知识体系，构建个人知识库",
      href: "/knowledge",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      gradient: "from-[#7b2cbf] to-[#00d9ff]",
      accentColor: "#7b2cbf",
      delay: 200,
    },
    {
      title: "作品集",
      description: "展示个人项目与创作成果",
      href: "/program",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      gradient: "from-[#f5d042] to-[#e94560]",
      accentColor: "#f5d042",
      delay: 300,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* 宇宙背景 */}
      <CosmicBackground variant="hero" starCount={80} showAurora showOrbs />

      {/* 内容层 */}
      <div className="content-layer">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto px-4">
            <div
              className={`text-center transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* 主标题 */}
              <h1 
                className="text-6xl md:text-8xl font-bold mb-6 glow-text tracking-tight"
                data-text="Nebula Lucent"
              >
                Nebula Lucent
              </h1>
              
              {/* 副标题 */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-3 font-light">
                探索 · 创造 · 分享
              </p>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                一个现代化的个人空间，记录技术探索与创作历程
              </p>

              {/* 装饰性元素 */}
              <div className="mt-8 flex justify-center gap-3">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "#00d9ff" }}
                />
                <span 
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "#7b2cbf", animationDelay: "0.3s" }}
                />
                <span 
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "#e94560", animationDelay: "0.6s" }}
                />
                <span 
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "#f5d042", animationDelay: "0.9s" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 模块卡片网格 */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {modules.map((module) => (
              <Link key={module.href} href={module.href} className="group">
                <CosmicCard delay={module.delay} className="h-full">
                  {/* 图标容器 */}
                  <div className="relative mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${module.gradient} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      style={{
                        boxShadow: `0 10px 30px ${module.accentColor}40`,
                      }}
                    >
                      {module.icon}
                    </div>
                    {/* 光晕效果 */}
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                    />
                  </div>

                  {/* 内容 */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00d9ff] group-hover:to-[#7b2cbf] transition-all duration-300">
                    {module.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                    {module.description}
                  </p>

                  {/* 箭头指示 */}
                  <div className="flex items-center text-gray-400 group-hover:text-[#00d9ff] transition-colors duration-300">
                    <span className="text-sm font-medium mr-2">探索更多</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </CosmicCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center">
          <div 
            className="inline-block px-6 py-3 rounded-full backdrop-blur-xl"
            style={{
              background: "rgba(123, 44, 191, 0.1)",
              border: "1px solid rgba(123, 44, 191, 0.2)",
            }}
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Nebula Lucent · 
              <span className="ml-1 bg-gradient-to-r from-[#00d9ff] to-[#7b2cbf] bg-clip-text text-transparent">
                探索宇宙的边界
              </span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
