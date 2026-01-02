"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
  delay: number;
  duration: number;
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  blur: number;
  duration: number;
  delay: number;
}

interface CosmicBackgroundProps {
  variant?: "default" | "hero" | "subtle";
  starCount?: number;
  showAurora?: boolean;
  showOrbs?: boolean;
  className?: string;
}

// 使用种子生成伪随机数，确保服务端和客户端一致
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  variant = "default",
  starCount = 50,
  showAurora = true,
  showOrbs = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后生成星点，避免 hydration 不匹配
  useEffect(() => {
    setMounted(true);
    const generatedStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 3 + 2) * 100,
      size: seededRandom(i * 3 + 3) > 0.9 ? "large" : seededRandom(i * 3 + 3) > 0.6 ? "medium" : "small",
      delay: seededRandom(i * 3 + 4) * 5,
      duration: 2 + seededRandom(i * 3 + 5) * 3,
    }));
    setStars(generatedStars);
  }, [starCount]);

  // 固定的漂浮光球配置
  const orbs: FloatingOrb[] = showOrbs ? [
    { id: 1, x: 15, y: 20, size: 300, color: "rgba(123, 44, 191, 0.15)", blur: 80, duration: 20, delay: 0 },
    { id: 2, x: 75, y: 60, size: 250, color: "rgba(233, 69, 96, 0.12)", blur: 70, duration: 25, delay: 5 },
    { id: 3, x: 50, y: 80, size: 200, color: "rgba(0, 217, 255, 0.1)", blur: 60, duration: 18, delay: 3 },
    { id: 4, x: 85, y: 15, size: 180, color: "rgba(245, 208, 66, 0.08)", blur: 50, duration: 22, delay: 8 },
  ] : [];

  // 视差效果
  useEffect(() => {
    if (variant !== "hero") return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      const orbElements = container.querySelectorAll(".floating-orb");
      orbElements.forEach((orb, index) => {
        const depth = (index + 1) * 10;
        const x = xPercent * depth;
        const y = yPercent * depth;
        (orb as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [variant]);

  const getStarSize = (size: Star["size"]) => {
    switch (size) {
      case "large": return "w-1 h-1";
      case "medium": return "w-0.5 h-0.5";
      default: return "w-px h-px";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* 基础渐变背景 */}
      <div className="absolute inset-0 cosmic-bg" />

      {/* 噪点纹理 */}
      <div className="absolute inset-0 noise-texture" />

      {/* 极光效果 */}
      {showAurora && variant !== "subtle" && (
        <div className="aurora" />
      )}

      {/* 漂浮光球 */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="floating-orb absolute rounded-full transition-transform duration-300 ease-out"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animation: `float-slow ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* 星点 - 只在客户端渲染 */}
      {mounted && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full bg-white ${getStarSize(star.size)}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                boxShadow: star.size === "large" 
                  ? "0 0 6px 2px rgba(255, 255, 255, 0.4)" 
                  : star.size === "medium"
                  ? "0 0 3px 1px rgba(255, 255, 255, 0.2)"
                  : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* 装饰性星云光点 - 仅在hero模式 */}
      {variant === "hero" && (
        <>
          {/* 主星云 - 大型模糊光晕 */}
          <div
            className="absolute animate-pulse-slow"
            style={{
              right: "5%",
              top: "15%",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(123, 44, 191, 0.15) 0%, rgba(123, 44, 191, 0.05) 40%, transparent 70%)",
              filter: "blur(40px)",
              animation: "nebula-drift 25s ease-in-out infinite",
            }}
          />
          
          {/* 次星云 */}
          <div
            className="absolute"
            style={{
              left: "10%",
              bottom: "25%",
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle, rgba(233, 69, 96, 0.12) 0%, rgba(233, 69, 96, 0.04) 50%, transparent 70%)",
              filter: "blur(35px)",
              animation: "nebula-drift 20s ease-in-out infinite reverse",
              animationDelay: "3s",
            }}
          />
          
          {/* 小型光点群 */}
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              right: "20%",
              top: "30%",
              background: "radial-gradient(circle, #7b2cbf 0%, transparent 70%)",
              boxShadow: "0 0 20px 8px rgba(123, 44, 191, 0.3)",
              animation: "twinkle-bright 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              right: "15%",
              top: "25%",
              background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
              boxShadow: "0 0 15px 6px rgba(0, 217, 255, 0.25)",
              animation: "twinkle-bright 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: "20%",
              top: "40%",
              background: "radial-gradient(circle, #e94560 0%, transparent 70%)",
              boxShadow: "0 0 12px 5px rgba(233, 69, 96, 0.2)",
              animation: "twinkle-bright 5s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
          
          {/* 流星轨迹效果 */}
          <div
            className="absolute"
            style={{
              right: "30%",
              top: "20%",
              width: "100px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "rotate(-45deg)",
              animation: "shooting-star 8s ease-in-out infinite",
              animationDelay: "2s",
              opacity: 0,
            }}
          />
          <div
            className="absolute"
            style={{
              left: "25%",
              top: "35%",
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.5), transparent)",
              transform: "rotate(-35deg)",
              animation: "shooting-star 12s ease-in-out infinite",
              animationDelay: "6s",
              opacity: 0,
            }}
          />
          
          {/* 环形光晕 */}
          <div
            className="absolute"
            style={{
              right: "8%",
              bottom: "30%",
              width: "60px",
              height: "60px",
              border: "1px solid rgba(123, 44, 191, 0.2)",
              borderRadius: "50%",
              animation: "ring-pulse 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              right: "8%",
              bottom: "30%",
              width: "80px",
              height: "80px",
              border: "1px solid rgba(123, 44, 191, 0.1)",
              borderRadius: "50%",
              animation: "ring-pulse 6s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />
        </>
      )}
    </div>
  );
};

export default CosmicBackground;
