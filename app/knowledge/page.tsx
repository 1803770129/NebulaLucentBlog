"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CosmicBackground from "@/components/cosmic/CosmicBackground";

interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  hoverGradient: string;
  color: string;
  delay: number;
}

export default function KnowledgePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const categories: KnowledgeCategory[] = [
    {
      id: "mathematics",
      title: "数学",
      description: "高等数学、线性代数、概率论、离散数学等数学基础知识",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-[#00d9ff] to-[#7b2cbf]",
      hoverGradient: "from-[#00d9ff] to-[#7b2cbf]",
      color: "blue",
      delay: 0,
    },
    {
      id: "computer-graphics",
      title: "计算机图形学",
      description: "渲染管线、着色器、3D变换、光照模型等图形学核心概念",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      gradient: "from-[#7b2cbf] to-[#e94560]",
      hoverGradient: "from-[#7b2cbf] to-[#e94560]",
      color: "purple",
      delay: 100,
    },
    {
      id: "data-structures-algorithms",
      title: "数据结构与算法",
      description: "常用数据结构、算法设计、复杂度分析、LeetCode题解",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      gradient: "from-[#00d9ff] to-[#00b894]",
      hoverGradient: "from-[#00d9ff] to-[#00b894]",
      color: "green",
      delay: 200,
    },
    {
      id: "unreal-engine",
      title: "UE",
      description: "Unreal Engine游戏开发、蓝图系统、材质系统、物理引擎",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-[#f5d042] to-[#e94560]",
      hoverGradient: "from-[#f5d042] to-[#e94560]",
      color: "orange",
      delay: 300,
    },
    {
      id: "web3",
      title: "WEB3",
      description: "区块链、智能合约、DeFi、NFT、Web3开发技术栈",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      gradient: "from-[#7b2cbf] to-[#00d9ff]",
      hoverGradient: "from-[#7b2cbf] to-[#00d9ff]",
      color: "indigo",
      delay: 400,
    },
    {
      id: "artificial-intelligence",
      title: "人工智能",
      description: "机器学习、深度学习、神经网络、自然语言处理、计算机视觉",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      gradient: "from-[#e94560] to-[#ff6b9d]",
      hoverGradient: "from-[#e94560] to-[#ff6b9d]",
      color: "pink",
      delay: 500,
    },
  ];

  return (
    <main className="min-h-screen relative">
      {/* 宇宙背景 */}
      <CosmicBackground variant="default" starCount={40} showAurora={true} showOrbs={true} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] via-[#7b2cbf] to-[#e94560] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              知识库
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
              系统化学习 · 结构化知识
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              整理和分享各个领域的核心知识，构建完整的知识体系
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/knowledge/${category.id}`}
              className="group relative"
            >
              <div
                className={`cosmic-card relative h-full p-8 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${category.delay}ms`,
                }}
              >
                {/* 角落装饰 */}
                <div className="cosmic-card-decoration top-right" />
                <div className="cosmic-card-decoration bottom-left" />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                  >
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7b2cbf] group-hover:to-[#e94560] transition-all duration-500">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                    {category.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center text-[#7b2cbf] dark:text-[#00d9ff] group-hover:text-[#e94560] transition-colors duration-300">
                    <span className="text-sm font-medium mr-2">查看详情</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="cosmic-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#7b2cbf] bg-clip-text text-transparent mb-2">
                  6
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  知识分类
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7b2cbf] to-[#e94560] bg-clip-text text-transparent mb-2">
                  持续更新
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  知识内容
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#e94560] to-[#ff6b9d] bg-clip-text text-transparent mb-2">
                  系统化
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  知识体系
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

