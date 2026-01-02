"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  size?: number;
  speed?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 12000,
  size = 0.06,
  speed = 0.025,
}) => {
  const galaxyRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Points>(null);
  const brightStarsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 银河系主体 - 旋臂结构（多彩版）
  const galaxy = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const arms = 4;
    const armSpread = 0.4;
    const galaxyRadius = 22;

    // 丰富的颜色调色板
    const colorPalette = [
      new THREE.Color("#fef3c7"), // 暖黄
      new THREE.Color("#fde68a"), // 金黄
      new THREE.Color("#c4b5fd"), // 淡紫
      new THREE.Color("#a78bfa"), // 紫色
      new THREE.Color("#818cf8"), // 靛蓝
      new THREE.Color("#60a5fa"), // 蓝色
      new THREE.Color("#38bdf8"), // 天蓝
      new THREE.Color("#22d3ee"), // 青色
      new THREE.Color("#f472b6"), // 粉色
      new THREE.Color("#fb7185"), // 玫红
    ];

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), 0.5) * galaxyRadius;
      const armAngle = ((i % arms) / arms) * Math.PI * 2;
      const spinAngle = radius * 0.75;
      const randomOffset = (Math.random() - 0.5) * armSpread * radius;
      const angle = armAngle + spinAngle + randomOffset;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * (0.4 - radius * 0.015);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z - 5;

      // 根据位置选择颜色，增加随机性
      const t = radius / galaxyRadius;
      let colorIndex: number;
      if (t < 0.2) {
        colorIndex = Math.floor(Math.random() * 2); // 黄色系
      } else if (t < 0.5) {
        colorIndex = 2 + Math.floor(Math.random() * 3); // 紫色系
      } else if (t < 0.8) {
        colorIndex = 5 + Math.floor(Math.random() * 3); // 蓝色系
      } else {
        colorIndex = Math.floor(Math.random() * colorPalette.length); // 外围随机
      }
      
      const color = colorPalette[colorIndex];
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;

      // 随机大小，少数特别大
      sizes[i] = Math.random() < 0.05 ? size * 2.5 : size * (0.4 + Math.random() * 0.6);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count, size]);

  // 银河核心 - 明亮多彩中心
  const core = useMemo(() => {
    const coreCount = 3500;
    const positions = new Float32Array(coreCount * 3);
    const colors = new Float32Array(coreCount * 3);

    const coreColors = [
      new THREE.Color("#fffbeb"),
      new THREE.Color("#fef3c7"),
      new THREE.Color("#fde68a"),
      new THREE.Color("#fcd34d"),
      new THREE.Color("#fbbf24"),
    ];

    for (let i = 0; i < coreCount; i++) {
      const radius = Math.pow(Math.random(), 2) * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.35;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const color = coreColors[Math.floor(Math.random() * coreColors.length)];
      const brightness = 0.8 + (1 - radius / 3.5) * 0.2;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // 亮星 - 散布的大颗粒星星
  const brightStars = useMemo(() => {
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const starColors = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#fef08a"),
      new THREE.Color("#bfdbfe"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#fbcfe8"),
    ];

    for (let i = 0; i < starCount; i++) {
      // 随机分布在银河系周围
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 8 + Math.random() * 20;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // 星云 - 柔和的彩色云雾
  const nebula = useMemo(() => {
    const nebulaCount = 800;
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);

    const nebulaColors = [
      new THREE.Color("#7c3aed").multiplyScalar(0.4),
      new THREE.Color("#ec4899").multiplyScalar(0.3),
      new THREE.Color("#3b82f6").multiplyScalar(0.4),
      new THREE.Color("#06b6d4").multiplyScalar(0.3),
      new THREE.Color("#f97316").multiplyScalar(0.25),
    ];

    // 几个星云团
    const clusters = [
      { x: -8, y: 2, z: -12, color: 0 },
      { x: 10, y: -1, z: -15, color: 1 },
      { x: 5, y: 4, z: -18, color: 2 },
      { x: -6, y: -3, z: -10, color: 3 },
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const cluster = clusters[i % clusters.length];
      const spread = 4 + Math.random() * 3;

      positions[i * 3] = cluster.x + (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = cluster.y + (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = cluster.z + (Math.random() - 0.5) * spread;

      const color = nebulaColors[cluster.color];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // 鼠标监听
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // 动画
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotX = 0.7 + mouseRef.current.y * 0.1;
    const rotZ = mouseRef.current.x * 0.05;

    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = time * speed;
      galaxyRef.current.rotation.x = rotX;
      galaxyRef.current.rotation.z = rotZ;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = time * speed;
      coreRef.current.rotation.x = rotX;
      coreRef.current.rotation.z = rotZ;
    }

    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.y = time * speed * 0.3;
      brightStarsRef.current.rotation.x = rotX * 0.5;
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = time * speed * 0.15;
      nebulaRef.current.position.x = mouseRef.current.x * 0.3;
      nebulaRef.current.position.y = mouseRef.current.y * 0.2;
    }
  });

  return (
    <group>
      {/* 星云背景层 */}
      <points ref={nebulaRef} geometry={nebula}>
        <pointsMaterial
          size={size * 6}
          vertexColors
          transparent
          opacity={0.25}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 银河系旋臂 */}
      <points ref={galaxyRef} geometry={galaxy}>
        <pointsMaterial
          size={size}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 银河核心 */}
      <points ref={coreRef} geometry={core}>
        <pointsMaterial
          size={size * 1.8}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 亮星点缀 */}
      <points ref={brightStarsRef} geometry={brightStars}>
        <pointsMaterial
          size={size * 3}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default ParticleField;
