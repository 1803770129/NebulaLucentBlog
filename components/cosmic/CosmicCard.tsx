"use client";

import { useRef, useState, useEffect } from "react";

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowOnHover?: boolean;
  showDecoration?: boolean;
  hoverEffect?: boolean;
}

const CosmicCard: React.FC<CosmicCardProps> = ({
  children,
  className = "",
  delay = 0,
  glowOnHover = true,
  showDecoration = true,
  hoverEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`
        cosmic-card relative p-6 md:p-8
        transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 光线追踪效果 */}
      {glowOnHover && isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              400px circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(0, 217, 255, 0.15),
              rgba(123, 44, 191, 0.1) 40%,
              transparent 60%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* 角落装饰星星 */}
      {showDecoration && (
        <>
          <div className="cosmic-card-decoration top-right" />
          <div className="cosmic-card-decoration bottom-left" />
        </>
      )}

      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CosmicCard;
