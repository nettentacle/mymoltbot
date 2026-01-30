'use client';

import { useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface OortCloudProps {
  cloud: {
    distance: number;
    particleCount: number;
  };
}

export default function OortCloud({ cloud }: OortCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // 生成奥尔特云粒子
  const generateOortCloud = () => {
    const positions = new Float32Array(cloud.particleCount * 3);
    const colors = new Float32Array(cloud.particleCount * 3);

    for (let i = 0; i < cloud.particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = cloud.distance + Math.random() * 50; // 100-150 范围

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 淡蓝色
      colors[i * 3] = 0.7;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1.0;
    }

    return { positions, colors };
  };

  const { positions, colors } = generateOortCloud();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        vertexColors
        size={0.3}
        sizeAttenuation={true}
        opacity={0.4}
      />
    </Points>
  );
}
