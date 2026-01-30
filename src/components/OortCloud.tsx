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

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  // 简化：暂时不生成粒子，只返回空组件以避免错误
  return null;
}
