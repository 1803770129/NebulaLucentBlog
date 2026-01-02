"use client";

import { useState, useEffect, useMemo } from "react";
import CosmicBackground from "@/components/cosmic/CosmicBackground";
import GalaxyShowcase from "@/components/portfolio/GalaxyShowcase";
import { getAllProjects, getAllCategories, type Project } from "@/src/lib/projects";

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = getAllProjects();
  const categories = getAllCategories();

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  const getCategoryName = (category: Project["category"]) => {
    const names: Record<Project["category"], string> = {
      web: "Web 应用",
      mobile: "移动应用",
      desktop: "桌面应用",
      game: "游戏",
      library: "组件库",
      ai: "AI 项目",
      other: "其他",
    };
    return names[category];
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050510]">
      <CosmicBackground variant="hero" starCount={120} showAurora={true} />
      
      {/* 左侧筛选栏 - 固定定位 */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
        <div 
          className={`flex flex-col gap-2 p-3 rounded-2xl transition-all duration-1000
            ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          style={{
            background: "rgba(10,10,25,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
              ${!selectedCategory
                ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30"
                : "text-gray-400 hover:bg-white/10"
              }`}
          >
            全部星球
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${selectedCategory === cat
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30"
                  : "text-gray-400 hover:bg-white/10"
                }`}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* 银河系展示 - 全屏 */}
      <div className="relative z-10">
        {filteredProjects.length === 0 ? (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-6">🌑</div>
              <p className="text-gray-400 text-xl mb-4">这个星系暂时没有星球</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-3 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
              >
                返回全部星球 →
              </button>
            </div>
          </div>
        ) : (
          <GalaxyShowcase projects={filteredProjects} />
        )}
      </div>
    </main>
  );
}
