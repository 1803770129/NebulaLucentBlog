"use client";

import { useState } from "react";
import Link from "next/link";
import { type Project } from "@/src/lib/projects";

interface ShowcaseCabinetProps {
  projects: Project[];
  mounted: boolean;
}

/**
 * 展示柜组件 - 所有作品在一个大柜子中展示
 * 默认只显示主图和名称，悬停时弹出详情卡片
 */
export default function ShowcaseCabinet({ projects, mounted }: ShowcaseCabinetProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (projectId: string, e: React.MouseEvent) => {
    setHoveredProject(projectId);
    updateMousePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateMousePosition(e);
  };

  const updateMousePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  // 生成渐变色背景（用于没有图片的作品）
  const getGradientBg = (index: number) => {
    const gradients = [
      "from-violet-600 to-purple-700",
      "from-cyan-500 to-blue-600",
      "from-rose-500 to-pink-600",
      "from-amber-500 to-orange-600",
      "from-emerald-500 to-teal-600",
      "from-indigo-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  const getStatusText = (status: Project["status"]) => {
    const texts: Record<Project["status"], string> = {
      completed: "已完成",
      "in-progress": "进行中",
      archived: "已归档",
    };
    return texts[status];
  };

  const getStatusColor = (status: Project["status"]) => {
    const colors: Record<Project["status"], string> = {
      completed: "bg-green-500",
      "in-progress": "bg-blue-500",
      archived: "bg-gray-500",
    };
    return colors[status];
  };

  const hoveredProjectData = projects.find(p => p.id === hoveredProject);

  return (
    <div className="relative">
      {/* 展示柜主体 */}
      <div 
        className={`
          relative rounded-3xl overflow-hidden
          bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80
          border border-white/10
          backdrop-blur-xl
          p-6 md:p-8
          transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        style={{
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 20px 50px rgba(0,0,0,0.5),
            0 0 100px rgba(139, 92, 246, 0.1)
          `,
        }}
      >
        {/* 展示柜顶部装饰 - 灯光效果 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        
        {/* 展示柜玻璃反光 */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* 作品网格 - 密集排列 */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/program/${project.id}`}
              className={`
                group relative aspect-square rounded-xl overflow-hidden
                cursor-pointer
                transition-all duration-300 ease-out
                hover:scale-110 hover:z-20
                hover:shadow-2xl hover:shadow-violet-500/30
                ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
              style={{
                transitionDelay: `${index * 30}ms`,
              }}
              onMouseEnter={(e) => handleMouseEnter(project.id, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 作品缩略图/图标背景 */}
              {project.image ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBg(index)} flex items-center justify-center`}>
                  <span className="text-3xl md:text-4xl">{project.icon || "📦"}</span>
                </div>
              )}

              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

              {/* 底部名称条 */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white font-medium truncate text-center">
                  {project.title}
                </p>
              </div>

              {/* 精选标识 */}
              {project.featured && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
              )}

              {/* 边框发光效果 */}
              <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-violet-400/50 transition-colors duration-300" />
            </Link>
          ))}
        </div>

        {/* 展示柜底部装饰 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* 悬停详情弹出卡片 - 固定在鼠标附近 */}
      {hoveredProjectData && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: mousePosition.x > window.innerWidth / 2 ? "translateX(-100%) translateX(-40px)" : "none",
          }}
        >
          <div 
            className="w-80 rounded-2xl overflow-hidden bg-gray-900/95 border border-white/20 backdrop-blur-xl shadow-2xl"
            style={{
              boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.2)",
            }}
          >
            {/* 主图 */}
            <div className="relative h-40 overflow-hidden">
              {hoveredProjectData.image ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${hoveredProjectData.image})` }}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBg(projects.indexOf(hoveredProjectData))} flex items-center justify-center`}>
                  <span className="text-6xl">{hoveredProjectData.icon || "📦"}</span>
                </div>
              )}
              
              {/* 状态标签 */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(hoveredProjectData.status)}`}>
                  {getStatusText(hoveredProjectData.status)}
                </span>
              </div>

              {/* 精选标识 */}
              {hoveredProjectData.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                  ⭐ 精选
                </div>
              )}
            </div>

            {/* 细节图片 */}
            {hoveredProjectData.images && hoveredProjectData.images.length > 0 && (
              <div className="flex gap-2 p-3 bg-black/30">
                {hoveredProjectData.images.slice(0, 2).map((img, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 h-16 rounded-lg overflow-hidden bg-gray-800"
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
                {/* 如果没有足够的图片，显示占位 */}
                {(!hoveredProjectData.images || hoveredProjectData.images.length < 2) && (
                  Array.from({ length: 2 - (hoveredProjectData.images?.length || 0) }).map((_, idx) => (
                    <div 
                      key={`placeholder-${idx}`}
                      className="flex-1 h-16 rounded-lg bg-gray-800/50 flex items-center justify-center"
                    >
                      <span className="text-gray-600 text-xs">暂无图片</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 详细信息 */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                {hoveredProjectData.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {hoveredProjectData.description}
              </p>

              {/* 技术标签 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hoveredProjectData.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 提示 */}
              <div className="text-xs text-gray-500 text-center">
                点击查看详情 →
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
