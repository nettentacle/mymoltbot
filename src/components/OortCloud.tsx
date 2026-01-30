'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
    const particleCount = cloud.particleCount;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const minRadius = cloud.distance;
      const maxRadius = cloud.distance * 2.5;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = Math.random();
      colors[i * 3] = 0.6 + t * 0.4;
      colors[i * 3 + 1] = 0.7 + t * 0.3;
      colors[i * 3 + 2] = 0.8 + t * 0.2;
    }

    return { positions, colors };
  };

  const { positions, colors } = generateOortCloud();

  // 创建粒子材质
  const particleMaterial = new THREE.PointsMaterial({
    transparent: true,
    vertexColors: true,
    size: 0.18,
    sizeAttenuation: true,
    opacity: 0.3,
    depthWrite: false
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={particleMaterial} />
    </points>
  );
}
