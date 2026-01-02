import Link from "next/link";
import type { ReactNode } from "react";

interface CategoryInfo {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  color: string;
}

const categories: Record<string, CategoryInfo> = {
  mathematics: {
    id: "mathematics",
    title: "数学",
    description: "高等数学、线性代数、概率论、离散数学等数学基础知识",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    color: "blue",
  },
  "computer-graphics": {
    id: "computer-graphics",
    title: "计算机图形学",
    description: "渲染管线、着色器、3D变换、光照模型等图形学核心概念",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
  },
  "data-structures-algorithms": {
    id: "data-structures-algorithms",
    title: "数据结构与算法",
    description: "常用数据结构、算法设计、复杂度分析、LeetCode题解",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500",
    color: "green",
  },
  "unreal-engine": {
    id: "unreal-engine",
    title: "UE",
    description: "Unreal Engine游戏开发、蓝图系统、材质系统、物理引擎",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    color: "orange",
  },
  web3: {
    id: "web3",
    title: "WEB3",
    description: "区块链、智能合约、DeFi、NFT、Web3开发技术栈",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-blue-500",
    color: "indigo",
  },
  "artificial-intelligence": {
    id: "artificial-intelligence",
    title: "人工智能",
    description: "机器学习、深度学习、神经网络、自然语言处理、计算机视觉",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-pink-500 to-rose-500",
    color: "pink",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = categories[category];

  if (!categoryInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              分类不存在
            </h1>
            <Link
              href="/knowledge"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              返回知识库首页
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            categoryInfo.color === 'blue' ? 'bg-blue-500/10' :
            categoryInfo.color === 'purple' ? 'bg-purple-500/10' :
            categoryInfo.color === 'green' ? 'bg-green-500/10' :
            categoryInfo.color === 'orange' ? 'bg-orange-500/10' :
            categoryInfo.color === 'indigo' ? 'bg-indigo-500/10' :
            'bg-pink-500/10'
          }`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/knowledge"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回知识库
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryInfo.gradient} text-white shadow-lg`}
            >
              {categoryInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {categoryInfo.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                内容正在整理中
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                该分类的知识内容正在持续更新中，敬请期待...
              </p>
              <Link
                href="/knowledge"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                返回知识库首页
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
