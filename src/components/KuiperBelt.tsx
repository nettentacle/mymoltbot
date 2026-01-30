'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { KuiperBeltObject } from '@/types/solar-system';

interface KuiperBeltProps {
  objects: KuiperBeltObject[];
  speed: number;
  showOrbits: boolean;
}

export default function KuiperBelt({ objects, speed, showOrbits }: KuiperBeltProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 生成柯伊伯带粒子
  const generateParticles = () => {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 70 + Math.random() * 30; // 70-100 范围

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.2; // 压扁的环
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 冰色
      colors[i * 3] = 0.9;
      colors[i * 3 + 1] = 0.95;
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

        useFrame((state, delta) => {
          setTime(time + delta * speed * 5);

          if (meshRef.current) {
            const angle = (time / 50000) * Math.PI * 2 + index;
            meshRef.current.position.x = Math.cos(angle) * obj.distance;
            meshRef.current.position.z = Math.sin(angle) * obj.distance;
          }
        });

        return (
          <mesh key={obj.name} ref={meshRef}>
            <sphereGeometry args={[obj.radius, 16, 16]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>
        );
      })}

      {/* 柯伊伯带粒子 */}
      <Points positions={positions}>
        <PointMaterial
          transparent
          vertexColors
          size={0.2}
          sizeAttenuation={true}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}
