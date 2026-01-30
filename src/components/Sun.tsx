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
          <sphereGeometry args={[7, 32, 32]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* 多层光晕效果 */}
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 太阳本体 - 使用纹理，高亮度 */}
      <mesh ref={sunRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#FFD700"
          emissiveIntensity={2.0}  // 增加发光强度
          emissiveMap={texture}  // 纹理也发光
          color="#FFA500"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* 标签 */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.8}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        太阳
      </Text>

      <pointLight intensity={4} distance={1000} color="#FFD700" />
      <pointLight intensity={2} distance={500} color="#FFF8DC" />
    </group>
  );
}

// 临时导入 Text
import { Text } from '@react-three/drei';
