'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TEXTURES } from '@/data/planets';

interface SunProps {
  onClick: () => void;
  isSelected: boolean;
}

export default function Sun({ onClick, isSelected }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // 加载太阳纹理
  const texture = useLoader(THREE.TextureLoader, TEXTURES.sun);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <group>
      {/* 外层光晕 */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* 太阳本体 - 使用纹理 */}
      <mesh ref={sunRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#FFA500"
          emissiveIntensity={1.0}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* 太阳光晕 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[5.3, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 标签 */}
      <mesh position={[0, 7, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      <pointLight intensity={2.5} distance={800} color="#FFF8DC" />
    </group>
  );
}
