"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type GeometryType = "sphere" | "torus" | "octahedron" | "icosahedron";

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry?: GeometryType;
  color?: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
  distort?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  position,
  geometry = "sphere",
  color = "#8b5cf6",
  scale = 1,
  rotationSpeed = 0.5,
  floatSpeed = 1,
  floatAmplitude = 0.3,
  distort = 0.3,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // 旋转动画
    meshRef.current.rotation.x = time * rotationSpeed * 0.5;
    meshRef.current.rotation.y = time * rotationSpeed;

    // 漂浮动画
    meshRef.current.position.y =
      initialY + Math.sin(time * floatSpeed) * floatAmplitude;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
      case "sphere":
      default:
        return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {renderGeometry()}
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.6}
        distort={distort}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default FloatingGeometry;
