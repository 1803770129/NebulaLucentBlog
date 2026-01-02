"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { type Project } from "@/src/lib/projects";

interface GalaxyShowcaseProps {
  projects: Project[];
}

export default function GalaxyShowcase({ projects }: GalaxyShowcaseProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  
  // 使用 ref 存储动画状态，避免频繁 re-render
  const rotationRef = useRef(0);
  const isPausedRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const expandStartTimeRef = useRef<number | null>(null);
  const expandProgressRef = useRef(0); // 使用 ref 存储展开进度

  useEffect(() => {
    setMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 平滑旋转动画 - 直接操作 DOM transform
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let lastTime = performance.now();
    expandStartTimeRef.current = lastTime;
    const EXPAND_DURATION = 600; // 展开动画持续时间 600ms
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // 计算展开进度 (0-1)，存储在 ref 中避免重渲染
      if (expandStartTimeRef.current !== null) {
        const elapsed = currentTime - expandStartTimeRef.current;
        const progress = Math.min(elapsed / EXPAND_DURATION, 1);
        // 使用 easeOutCubic 缓动函数让动画更自然
        expandProgressRef.current = 1 - Math.pow(1 - progress, 3);
      }
      
      if (!isPausedRef.current) {
        // 更快的旋转速度
        rotationRef.current = (rotationRef.current + 0.08 * (deltaTime / 16.67)) % 360;
      }
      
      // 直接更新所有行星位置，避免 React re-render
      updatePlanetPositions();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  // 直接操作 DOM 更新行星位置
  const updatePlanetPositions = useCallback(() => {
    if (!containerRef.current) return;
    
    const planets = containerRef.current.querySelectorAll('[data-planet]');
    const particles = containerRef.current.querySelectorAll('[data-particle]');
    const expandProgress = expandProgressRef.current;
    
    planets.forEach((planet) => {
      const el = planet as HTMLElement;
      const orbitRadius = parseFloat(el.dataset.radius || '0');
      const orbitSpeed = parseFloat(el.dataset.speed || '1');
      const index = parseFloat(el.dataset.index || '0');
      const total = parseFloat(el.dataset.total || '1');
      const isHovered = el.dataset.hovered === 'true';
      
      const adjustedRotation = rotationRef.current * orbitSpeed;
      const angle = (index / total) * 360 + adjustedRotation;
      const radian = (angle * Math.PI) / 180;
      // 应用展开进度到轨道半径
      const currentRadius = orbitRadius * expandProgress;
      const x = Math.cos(radian) * currentRadius;
      const y = Math.sin(radian) * currentRadius;
      
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isHovered ? 1.3 : 1})`;
    });
    
    // 更新轨道粒子
    particles.forEach((particle) => {
      const el = particle as HTMLElement;
      const orbitRadius = parseFloat(el.dataset.radius || '0');
      const orbitSpeed = parseFloat(el.dataset.speed || '1');
      const index = parseFloat(el.dataset.index || '0');
      
      const angle = (index / 20) * 360 + rotationRef.current * orbitSpeed * 2;
      const radian = (angle * Math.PI) / 180;
      const x = Math.cos(radian) * orbitRadius;
      const y = Math.sin(radian) * orbitRadius;
      
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }, []);

  const handleProjectHover = (project: Project | null, e?: React.MouseEvent) => {
    setHoveredProject(project);
    isPausedRef.current = project !== null;
    
    if (e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    
    // 更新悬停状态
    if (containerRef.current) {
      const planets = containerRef.current.querySelectorAll('[data-planet]');
      planets.forEach((planet) => {
        const el = planet as HTMLElement;
        el.dataset.hovered = (project && el.dataset.id === project.id) ? 'true' : 'false';
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredProject) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const getGradientBg = (index: number) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-cyan-400 to-blue-500",
      "from-rose-400 to-pink-500",
      "from-amber-400 to-orange-500",
      "from-emerald-400 to-teal-500",
      "from-indigo-400 to-blue-500",
      "from-fuchsia-400 to-purple-500",
      "from-sky-400 to-cyan-500",
    ];
    return gradients[index % gradients.length];
  };

  const getStatusText = (status: Project["status"]) => {
    return { completed: "已完成", "in-progress": "进行中", archived: "已归档" }[status];
  };

  const getStatusColor = (status: Project["status"]) => {
    return { completed: "bg-green-500", "in-progress": "bg-blue-500", archived: "bg-gray-500" }[status];
  };

  // 将作品分配到不同轨道 - 更大的速度差异
  const orbits = [
    { radius: 160, projects: projects.slice(0, 3), speed: 1.5, color: "rgba(139, 92, 246, 0.4)" },
    { radius: 260, projects: projects.slice(3, 6), speed: 0.9, color: "rgba(6, 182, 212, 0.35)" },
    { radius: 360, projects: projects.slice(6, 9), speed: 0.5, color: "rgba(236, 72, 153, 0.3)" },
    { radius: 460, projects: projects.slice(9), speed: 0.25, color: "rgba(245, 158, 11, 0.25)" },
  ].filter(orbit => orbit.projects.length > 0);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* 银河系背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 中心光晕 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `
              radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 60%)
            `,
            filter: "blur(40px)",
          }}
        />
        {/* 外层光晕 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            background: `
              radial-gradient(circle, transparent 40%, rgba(6, 182, 212, 0.05) 60%, transparent 80%)
            `,
          }}
        />
      </div>

      {/* 银河系主体 */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        style={{ width: "1000px", height: "1000px" }}
      >
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

        {/* 轨道装饰粒子 */}
        {orbits.map((orbit, orbitIndex) => (
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`particle-${orbitIndex}-${i}`}
              data-particle
              data-radius={orbit.radius}
              data-speed={orbit.speed}
              data-index={i}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full pointer-events-none will-change-transform"
              style={{
                background: orbit.color,
                opacity: 0.5,
              }}
            />
          ))
        ))}

        {/* 中心星球 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          {/* 外层能量环 */}
          <div 
            className="absolute -inset-24 rounded-full"
            style={{
              border: "1px solid rgba(139, 92, 246, 0.2)",
              animation: "spinReverse 30s linear infinite",
            }}
          />
          <div 
            className="absolute -inset-20 rounded-full"
            style={{
              border: "1px dashed rgba(6, 182, 212, 0.3)",
              animation: "spin 25s linear infinite",
            }}
          />
          
          {/* 多层光晕 */}
          <div 
            className="absolute -inset-20 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
              filter: "blur(30px)",
              animation: "pulse 6s ease-in-out infinite",
            }}
          />
          <div 
            className="absolute -inset-16 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "pulse 4s ease-in-out infinite 1s",
            }}
          />
          <div 
            className="absolute -inset-12 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 60%)",
              filter: "blur(15px)",
              animation: "pulse 5s ease-in-out infinite 0.5s",
            }}
          />
          
          {/* 星球主体 */}
          <div 
            className="relative w-44 h-44 rounded-full cursor-pointer group pointer-events-auto"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(255,255,255,0.9) 0%, 
                  #e9d5ff 5%,
                  #c4b5fd 15%, 
                  #a78bfa 25%, 
                  #8b5cf6 40%, 
                  #7c3aed 55%, 
                  #6d28d9 70%, 
                  #5b21b6 85%,
                  #4c1d95 100%)
              `,
              boxShadow: `
                0 0 100px rgba(139, 92, 246, 0.6),
                0 0 200px rgba(139, 92, 246, 0.4),
                0 0 300px rgba(139, 92, 246, 0.2),
                inset -35px -35px 70px rgba(0, 0, 0, 0.5),
                inset 20px 20px 40px rgba(255, 255, 255, 0.2)
              `,
              animation: "float 8s ease-in-out infinite",
            }}
          >
            {/* 星球表面云层 */}
            <div 
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: `
                  radial-gradient(ellipse 80% 40% at 50% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 30% at 30% 60%, rgba(255,255,255,0.2) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 25% at 70% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)
                `,
                animation: "spin 120s linear infinite",
              }}
            />
            
            {/* 星球表面纹理 */}
            <div 
              className="absolute inset-0 rounded-full opacity-15"
              style={{
                background: `
                  repeating-conic-gradient(
                    from 0deg,
                    transparent 0deg 8deg,
                    rgba(255,255,255,0.1) 8deg 16deg
                  )
                `,
                animation: "spin 80s linear infinite",
              }}
            />
            
            {/* 星球光带 */}
            <div 
              className="absolute inset-2 rounded-full opacity-20"
              style={{
                background: `
                  linear-gradient(
                    45deg,
                    transparent 30%,
                    rgba(6, 182, 212, 0.5) 45%,
                    rgba(236, 72, 153, 0.5) 55%,
                    transparent 70%
                  )
                `,
                animation: "spin 40s linear infinite reverse",
              }}
            />
            
            {/* 星球大气层 - 多层 */}
            <div 
              className="absolute -inset-3 rounded-full"
              style={{
                border: "2px solid rgba(139, 92, 246, 0.4)",
                boxShadow: "inset 0 0 30px rgba(139, 92, 246, 0.3)",
              }}
            />
            <div 
              className="absolute -inset-5 rounded-full"
              style={{
                border: "1px solid rgba(6, 182, 212, 0.2)",
                boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)",
              }}
            />
            
            {/* 高光点 */}
            <div 
              className="absolute w-8 h-8 rounded-full"
              style={{
                top: "15%",
                left: "20%",
                background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                filter: "blur(3px)",
              }}
            />
            <div 
              className="absolute w-4 h-4 rounded-full"
              style={{
                top: "25%",
                left: "35%",
                background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                filter: "blur(2px)",
              }}
            />
            
            {/* 中心文字 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span 
                className="text-2xl font-bold"
                style={{
                  textShadow: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.5)",
                }}
              >作品集</span>
              <span 
                className="text-sm text-violet-200 mt-1 font-medium"
                style={{
                  textShadow: "0 0 10px rgba(139, 92, 246, 0.6)",
                }}
              >{projects.length} 个项目</span>
            </div>
          </div>
          
          {/* 环绕光点 */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`orbit-dot-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                background: i % 2 === 0 ? "#8b5cf6" : "#06b6d4",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}`,
                transform: `rotate(${i * 60}deg) translateX(100px) translateY(-50%)`,
                animation: `orbitDot ${12 + i * 2}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* 作品行星 */}
        {orbits.map((orbit, orbitIndex) => (
          orbit.projects.map((project, index) => {
            const globalIndex = orbits.slice(0, orbitIndex).reduce((acc, o) => acc + o.projects.length, 0) + index;
            const planetSize = 80 - orbitIndex * 8;
            const isHovered = hoveredProject?.id === project.id;

            return (
              <Link
                key={project.id}
                href={`/program/${project.id}`}
                data-planet
                data-id={project.id}
                data-radius={orbit.radius}
                data-speed={orbit.speed}
                data-index={index}
                data-total={orbit.projects.length}
                data-hovered={isHovered ? 'true' : 'false'}
                className="absolute left-1/2 top-1/2 cursor-pointer z-30 will-change-transform"
                style={{
                  zIndex: isHovered ? 100 : 30,
                }}
                onMouseEnter={(e) => handleProjectHover(project, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => handleProjectHover(null)}
              >
                {/* 行星光晕 */}
                <div 
                  className={`absolute -inset-4 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background: `radial-gradient(circle, ${orbit.color} 0%, transparent 70%)`,
                    filter: "blur(10px)",
                  }}
                />

                {/* 行星主体 */}
                <div 
                  className={`relative rounded-full overflow-hidden transition-all duration-300`}
                  style={{
                    width: planetSize,
                    height: planetSize,
                    boxShadow: isHovered
                      ? `0 0 40px ${orbit.color}, 0 0 80px ${orbit.color}`
                      : `0 0 20px rgba(0, 0, 0, 0.5), inset -8px -8px 20px rgba(0, 0, 0, 0.4), inset 4px 4px 10px rgba(255, 255, 255, 0.1)`,
                    border: isHovered ? `2px solid ${orbit.color}` : "none",
                  }}
                >
                  {project.image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBg(globalIndex)} flex items-center justify-center`}>
                      <span className="text-2xl md:text-3xl drop-shadow-lg">{project.icon || "📦"}</span>
                    </div>
                  )}
                  
                  {/* 行星光泽 */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                    }}
                  />
                </div>

                {/* 作品名称 */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium
                    transition-all duration-300 ${isHovered ? "opacity-100 -bottom-10" : "opacity-0 -bottom-6"}`}
                  style={{
                    background: "rgba(0, 0, 0, 0.9)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {project.title}
                </div>

                {/* 精选标识 */}
                {project.featured && (
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs z-10"
                    style={{
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      boxShadow: "0 0 15px rgba(251, 191, 36, 0.6)",
                    }}
                  >⭐</div>
                )}
              </Link>
            );
          })
        ))}
      </div>

      {/* 悬停详情卡片 - 跟随鼠标 */}
      {hoveredProject && mounted && (
        <div 
          className="fixed w-80 z-50 pointer-events-none"
          style={{ 
            left: mousePosition.x > windowSize.width / 2 
              ? mousePosition.x - 340 
              : mousePosition.x + 20,
            top: Math.min(Math.max(mousePosition.y - 200, 20), windowSize.height - 450),
            animation: "fadeIn 0.2s ease-out",
          }}
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
            <div className="h-1" style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)" }} />
            
            <div className="relative h-44 overflow-hidden">
              {hoveredProject.image ? (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hoveredProject.image})` }} />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBg(projects.indexOf(hoveredProject))} flex items-center justify-center`}>
                  <span className="text-7xl">{hoveredProject.icon || "📦"}</span>
                </div>
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,20,1) 0%, transparent 60%)" }} />
              
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(hoveredProject.status)}`}>
                  {getStatusText(hoveredProject.status)}
                </span>
              </div>
              
              {hoveredProject.featured && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#78350f" }}
                >⭐ 精选</div>
              )}
            </div>

            <div className="flex gap-2 px-4 -mt-5 relative z-10">
              {[0, 1].map((idx) => (
                <div key={idx} className="flex-1 h-14 rounded-lg overflow-hidden"
                  style={{ background: "rgba(30,30,50,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {hoveredProject.images?.[idx] ? (
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${hoveredProject.images[idx]})` }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">细节图 {idx + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 pt-3">
              <h3 className="text-xl font-bold text-white mb-2">{hoveredProject.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{hoveredProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {hoveredProject.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs rounded-lg font-medium"
                    style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}
                  >{tech}</span>
                ))}
              </div>
              
              <div className="text-center py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))", color: "#c4b5fd" }}
              >
                点击进入详情页 →
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 状态提示 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div 
          className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className={`w-2 h-2 rounded-full ${hoveredProject ? "bg-amber-400" : "bg-green-400"} animate-pulse`} />
          <span className="text-gray-300">
            {hoveredProject ? "已暂停 · 移开鼠标继续旋转" : "银河旋转中 · 悬停探索作品"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes orbitDot {
          from { transform: rotate(0deg) translateX(100px) translateY(-50%); }
          to { transform: rotate(360deg) translateX(100px) translateY(-50%); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(30px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
