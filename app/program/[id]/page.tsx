"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectById, getAllProjects, type Project } from "@/src/lib/projects";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import CosmicBackground from "@/components/cosmic/CosmicBackground";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getProjectById(id);
    setProject(p || null);
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌑</div>
          <p className="text-gray-400">项目不存在</p>
          <Link href="/program" className="mt-4 inline-block text-violet-400 hover:text-violet-300">
            返回作品集 →
          </Link>
        </div>
      </main>
    );
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      web: "Web 应用",
      mobile: "移动应用",
      desktop: "桌面应用",
      game: "游戏",
      library: "组件库",
      ai: "AI 项目",
      other: "其他",
    };
    return names[category] || category;
  };

  const getStatusColor = (status: string) => {
    return {
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getStatusText = (status: string) => {
    return { completed: "已完成", "in-progress": "进行中", archived: "已归档" }[status] || status;
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050510]">
      <CosmicBackground variant="hero" starCount={100} showAurora={true} />
      
      {/* 装饰性光晕 */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* 返回按钮 */}
          <Link
            href="/program"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 mb-8 group ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#a78bfa",
            }}
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回银河系
          </Link>

          {/* 主卡片 */}
          <div 
            className={`rounded-3xl overflow-hidden transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(145deg, rgba(20,20,35,0.9), rgba(10,10,20,0.95))",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 100px rgba(0,0,0,0.5), 0 0 80px rgba(139,92,246,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* 顶部渐变条 */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)" }} />
            
            {/* Hero 区域 */}
            <div className="relative">
              {/* 主图 */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {project.image ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                ) : (
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))",
                    }}
                  >
                    <span className="text-9xl">{project.icon || "📦"}</span>
                  </div>
                )}
                {/* 渐变遮罩 */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(10,10,20,1) 0%, rgba(10,10,20,0.8) 30%, transparent 60%)",
                  }}
                />
                
                {/* 标签 */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.featured && (
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ 
                        background: "linear-gradient(135deg, #fbbf24, #f59e0b)", 
                        color: "#78350f",
                        boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
                      }}
                    >
                      ⭐ 精选项目
                    </span>
                  )}
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
              </div>

              {/* 项目信息 */}
              <div className="px-6 md:px-10 -mt-16 relative z-10">
                {/* 小图预览 */}
                {project.images && project.images.length > 0 && (
                  <div className="flex gap-3 mb-6">
                    {project.images.slice(0, 3).map((img, idx) => (
                      <div 
                        key={idx}
                        className="w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden"
                        style={{
                          background: "rgba(30,30,50,0.8)",
                          border: "2px solid rgba(255,255,255,0.1)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-300"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 标题和描述 */}
                <h1 
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, #a78bfa 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 60px rgba(139,92,246,0.3)",
                  }}
                >
                  {project.title}
                </h1>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                {/* 元信息 */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span 
                    className="px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      color: "#c4b5fd",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    {getCategoryName(project.category)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {format(new Date(project.date), "yyyy年MM月", { locale: zhCN })}
                  </span>
                </div>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="px-6 md:px-10 pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 左侧主内容 */}
                <div className="lg:col-span-2 space-y-8">
                  {/* 项目介绍 */}
                  {project.longDescription && (
                    <div 
                      className="rounded-2xl p-6"
                      style={{
                        background: "rgba(30,30,50,0.5)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <h2 
                        className="text-xl font-bold mb-4 flex items-center gap-2"
                        style={{ color: "#e9d5ff" }}
                      >
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                          style={{ background: "rgba(139,92,246,0.2)" }}>📖</span>
                        项目介绍
                      </h2>
                      <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                  )}

                  {/* 相关链接 */}
                  {project.links && Object.keys(project.links).length > 0 && (
                    <div 
                      className="rounded-2xl p-6"
                      style={{
                        background: "rgba(30,30,50,0.5)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <h2 
                        className="text-xl font-bold mb-4 flex items-center gap-2"
                        style={{ color: "#e9d5ff" }}
                      >
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                          style={{ background: "rgba(6,182,212,0.2)" }}>🔗</span>
                        相关链接
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {project.links.website && (
                          <a
                            href={project.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                              background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))",
                              border: "1px solid rgba(139,92,246,0.4)",
                              color: "#fff",
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            访问网站
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                              background: "rgba(255,255,255,0.1)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              color: "#fff",
                            }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                              background: "rgba(6,182,212,0.2)",
                              border: "1px solid rgba(6,182,212,0.4)",
                              color: "#67e8f9",
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            在线演示
                          </a>
                        )}
                        {project.links.download && (
                          <a
                            href={project.links.download}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                              background: "rgba(34,197,94,0.2)",
                              border: "1px solid rgba(34,197,94,0.4)",
                              color: "#86efac",
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            下载
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 右侧边栏 */}
                <div className="space-y-6">
                  {/* 技术栈 */}
                  <div 
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(30,30,50,0.5)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <h3 
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: "#e9d5ff" }}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                        style={{ background: "rgba(236,72,153,0.2)" }}>⚡</span>
                      技术栈
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg"
                          style={{
                            background: "rgba(139,92,246,0.15)",
                            color: "#c4b5fd",
                            border: "1px solid rgba(139,92,246,0.25)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 标签 */}
                  <div 
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(30,30,50,0.5)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <h3 
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: "#e9d5ff" }}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                        style={{ background: "rgba(6,182,212,0.2)" }}>🏷️</span>
                      标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg"
                          style={{
                            background: "rgba(6,182,212,0.15)",
                            color: "#67e8f9",
                            border: "1px solid rgba(6,182,212,0.25)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 项目信息 */}
                  <div 
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(30,30,50,0.5)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <h3 
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: "#e9d5ff" }}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                        style={{ background: "rgba(245,158,11,0.2)" }}>📋</span>
                      项目信息
                    </h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-xs text-gray-500 mb-1">状态</dt>
                        <dd>
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500 mb-1">分类</dt>
                        <dd className="text-sm text-gray-300">{getCategoryName(project.category)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500 mb-1">创建日期</dt>
                        <dd className="text-sm text-gray-300">
                          {format(new Date(project.date), "yyyy年MM月dd日", { locale: zhCN })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 装饰性星球 */}
          <div 
            className="fixed bottom-10 right-10 w-32 h-32 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.8), rgba(139,92,246,0.2))",
              boxShadow: "0 0 60px rgba(139,92,246,0.4)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </main>
  );
}
