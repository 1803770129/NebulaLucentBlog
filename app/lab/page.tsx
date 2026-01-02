"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import CosmicBackground from "@/components/cosmic/CosmicBackground";
import {
  getAllExperiments,
  getAllCategories,
  getAllTags,
  getCategoryName,
  getStatusName,
  getDifficultyName,
  type Experiment,
} from "@/src/lib/experiments";

export default function LabPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const experiments = getAllExperiments();
  const categories = getAllCategories();
  const tags = getAllTags();

  // 筛选实验
  const filteredExperiments = useMemo(() => {
    return experiments.filter((experiment) => {
      if (selectedCategory && experiment.category !== selectedCategory)
        return false;
      if (
        selectedTag &&
        !experiment.tags.includes(selectedTag) &&
        !experiment.technologies.includes(selectedTag)
      )
        return false;
      return true;
    });
  }, [experiments, selectedCategory, selectedTag]);

  // 获取状态颜色
  const getStatusColor = (status: Experiment["status"]) => {
    const colors: Record<Experiment["status"], string> = {
      completed:
        "bg-[#00d9ff]/20 text-[#00d9ff] dark:bg-[#00d9ff]/20 dark:text-[#00d9ff]",
      "in-progress":
        "bg-[#7b2cbf]/20 text-[#7b2cbf] dark:bg-[#7b2cbf]/20 dark:text-[#7b2cbf]",
      experimental:
        "bg-[#e94560]/20 text-[#e94560] dark:bg-[#e94560]/20 dark:text-[#e94560]",
    };
    return colors[status];
  };

  // 获取难度颜色
  const getDifficultyColor = (difficulty?: Experiment["difficulty"]) => {
    if (!difficulty) return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    const colors: Record<NonNullable<Experiment["difficulty"]>, string> = {
      beginner: "bg-[#00d9ff]/20 text-[#00d9ff]",
      intermediate: "bg-[#f5d042]/20 text-[#f5d042]",
      advanced: "bg-[#e94560]/20 text-[#e94560]",
    };
    return colors[difficulty];
  };

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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#00d9ff] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              技术实验室
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
              探索前沿技术 · 实验创新想法
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              这里是我进行各种技术实验和特效练习的地方，包括 JS 特效、3D 特效和 Web 新特性探索
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* 分类筛选 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              分类
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-[#7b2cbf] to-[#e94560] text-white shadow-lg scale-105"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-[#7b2cbf]/20"
                }`}
              >
                全部 ({experiments.length})
              </button>
              {categories.map((category) => {
                const count = experiments.filter(
                  (e) => e.category === category
                ).length;
                return (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category ? null : category
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#7b2cbf]/20 text-[#7b2cbf] dark:text-[#00d9ff] shadow-lg scale-105 border border-[#7b2cbf]/30"
                        : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-[#7b2cbf]/20"
                    }`}
                  >
                    {getCategoryName(category)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 标签筛选 */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                技术标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 12).map((tag) => {
                  const count = experiments.filter(
                    (e) => e.tags.includes(tag) || e.technologies.includes(tag)
                  ).length;
                  return (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTag(selectedTag === tag ? null : tag)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedTag === tag
                          ? "bg-[#e94560]/20 text-[#e94560] shadow-md scale-105 border border-[#e94560]/30"
                          : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 border border-[#7b2cbf]/20"
                      }`}
                    >
                      {tag} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        {filteredExperiments.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              没有找到符合条件的实验
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredExperiments.map((experiment, index) => (
              <Link
                key={experiment.id}
                href={`/lab/${experiment.id}`}
                className="group relative"
              >
                <div
                  className={`cosmic-card relative h-full overflow-hidden ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${(index % 6) * 50}ms`,
                  }}
                >
                  {/* 角落装饰 */}
                  <div className="cosmic-card-decoration top-right" />
                  
                  {/* Featured Badge */}
                  {experiment.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#7b2cbf] to-[#e94560] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ⭐ 精选
                    </div>
                  )}

                  {/* Thumbnail */}
                  {experiment.thumbnail && (
                    <div className="relative h-48 bg-gradient-to-br from-[#7b2cbf]/20 to-[#e94560]/20 overflow-hidden">
                      <img
                        src={experiment.thumbnail}
                        alt={experiment.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    {/* Status and Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          experiment.status
                        )}`}
                      >
                        {getStatusName(experiment.status)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getCategoryName(experiment.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7b2cbf] group-hover:to-[#e94560] transition-all duration-500">
                      {experiment.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                      {experiment.description}
                    </p>

                    {/* Difficulty */}
                    {experiment.difficulty && (
                      <div className="mb-3">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            experiment.difficulty
                          )}`}
                        >
                          {getDifficultyName(experiment.difficulty)}
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experiment.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium bg-[#7b2cbf]/10 text-[#7b2cbf] dark:text-[#00d9ff] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {experiment.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{experiment.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Component Indicator */}
                    {experiment.componentPath && (
                      <div className="flex items-center gap-2 text-[#7b2cbf] dark:text-[#00d9ff] group-hover:text-[#e94560] transition-colors duration-300">
                        <span className="text-xs font-medium">查看实验</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredExperiments.length > 0 && (
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              显示 {filteredExperiments.length} / {experiments.length} 个实验
              {selectedCategory &&
                ` · 分类: ${getCategoryName(
                  selectedCategory as Experiment["category"]
                )}`}
              {selectedTag && ` · 标签: ${selectedTag}`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

