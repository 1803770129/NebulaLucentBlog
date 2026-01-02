"use client";

import { useEffect, useRef, useState } from "react";

interface Planet {
  id: number;
  size: number;
  color: string;
  orbitRadius: number;
  delay: number;
  glowColor: string;
}

interface PlanetCursorProps {
  enabled?: boolean;
}

const defaultPlanets: Planet[] = [
  {
    id: 1,
    size: 14,
    color: "#e94560",
    orbitRadius: 25,
    delay: 0.08,
    glowColor: "rgba(233, 69, 96, 0.6)",
  },
  {
    id: 2,
    size: 10,
    color: "#00d9ff",
    orbitRadius: 45,
    delay: 0.15,
    glowColor: "rgba(0, 217, 255, 0.5)",
  },
  {
    id: 3,
    size: 7,
    color: "#f5d042",
    orbitRadius: 65,
    delay: 0.22,
    glowColor: "rgba(245, 208, 66, 0.5)",
  },
  {
    id: 4,
    size: 5,
    color: "#7b2cbf",
    orbitRadius: 85,
    delay: 0.3,
    glowColor: "rgba(123, 44, 191, 0.4)",
  },
];

const PlanetCursor: React.FC<PlanetCursorProps> = ({ enabled = true }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const planetPositions = useRef(
    defaultPlanets.map(() => ({ x: 0, y: 0 }))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 鼠标跟踪
  useEffect(() => {
    if (isMobile || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.classList.contains("group");
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, enabled]);

  // 动画循环
  useEffect(() => {
    if (isMobile || !enabled) return;

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const planets = container.children;
      
      defaultPlanets.forEach((planet, index) => {
        const currentPos = planetPositions.current[index];
        const targetX = mousePos.current.x;
        const targetY = mousePos.current.y;
        
        // 弹性插值
        const ease = 1 - planet.delay;
        currentPos.x += (targetX - currentPos.x) * ease;
        currentPos.y += (targetY - currentPos.y) * ease;

        // 计算轨道位置
        const time = Date.now() * 0.001;
        const angle = time * (1 + index * 0.3) + index * (Math.PI / 2);
        const orbitX = Math.cos(angle) * planet.orbitRadius * (isHovering ? 0.5 : 1);
        const orbitY = Math.sin(angle) * planet.orbitRadius * (isHovering ? 0.5 : 1);

        const planetEl = planets[index] as HTMLElement;
        if (planetEl) {
          planetEl.style.transform = `translate(${currentPos.x + orbitX - planet.size / 2}px, ${currentPos.y + orbitY - planet.size / 2}px) scale(${isHovering ? 1.2 : 1})`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, enabled, isHovering]);

  // 移动端或禁用时不渲染
  if (isMobile || !enabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: "hidden" }}
    >
      {defaultPlanets.map((planet) => (
        <div
          key={planet.id}
          className="absolute rounded-full transition-transform duration-100"
          style={{
            width: planet.size,
            height: planet.size,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
            boxShadow: `0 0 ${planet.size}px ${planet.glowColor}, inset 0 0 ${planet.size / 3}px rgba(255,255,255,0.3)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

export default PlanetCursor;
