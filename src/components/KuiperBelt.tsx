'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { KuiperBeltObject } from '@/types/solar-system';

interface KuiperBeltProps {
  objects: KuiperBeltObject[];
  speed: number;
  showOrbits: boolean;
}

export default function KuiperBelt({ objects, speed, showOrbits }: KuiperBeltProps) {
  const groupRef = useRef<THREE.Group>(null);

  // 生成柯伊伯带粒子
  const generateParticles = () => {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 68 + Math.random() * 35; // 68-103 范围

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.15; // 压扁的环
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 冰蓝色到白色的渐变
      const t = Math.random();
      colors[i * 3] = 0.8 + t * 0.2;
      colors[i * 3 + 1] = 0.9 + t * 0.1;
      colors[i * 3 + 2] = 1.0;
    }

    return { positions, colors };
  };

  const { positions, colors } = generateParticles();

  return (
    <group ref={groupRef}>
      {/* 柯伊伯带主要天体 */}
      {objects.map((obj, index) => {
        const [time, setTime] = useState(0);
        const meshRef = useRef<THREE.Mesh>(null);
        const orbitRef = useRef<THREE.Group>(null);

        // 加载纹理
        const texture = useLoader(THREE.TextureLoader, obj.texture || '');

        useFrame((state, delta) => {
          setTime(time + delta * speed * 5);

          if (orbitRef.current) {
            const angle = (time / 60000) * Math.PI * 2 + index;
            const x = Math.cos(angle) * obj.distance;
            const z = Math.sin(angle) * obj.distance;
            orbitRef.current.position.set(x, 0, z);
          }

          if (meshRef.current) {
            meshRef.current.rotation.y += delta * speed * 0.5;
          }
        });

        // 轨道路径
        const orbitPoints: [number, number, number][] = [];
        for (let i = 0; i <= 360; i += 10) {
          const angle = (i / 360) * Math.PI * 2;
          const x = Math.cos(angle) * obj.distance;
          const z = Math.sin(angle) * obj.distance;
          orbitPoints.push([x, 0, z]);
        }

        return (
          <group key={obj.name} ref={orbitRef}>
            {showOrbits && (
              <Line
                points={orbitPoints}
                color="cyan"
                opacity={0.1}
                transparent
                lineWidth={1}
              />
            )}
            <mesh ref={meshRef}>
              <sphereGeometry args={[obj.radius, 32, 32]} />
              <meshStandardMaterial
                map={texture}
                color={obj.color}
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* 柯伊伯带粒子 */}
      <Points positions={positions}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}
