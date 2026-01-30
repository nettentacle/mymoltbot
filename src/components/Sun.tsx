'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface SunProps {
  onClick: () => void;
  isSelected: boolean;
}

export default function Sun({ onClick, isSelected }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // 加载太阳纹理
  const texture = useLoader(THREE.TextureLoader, 'https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg');

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

      {/* 太阳本体 */}
      <mesh ref={sunRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#FFD700"
          emissiveIntensity={1.0}
          emissiveMap={texture}
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
      <Text
        position={[0, 7, 0]}
        fontSize={0.8}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        太阳
      </Text>

      <pointLight intensity={2.5} distance={800} color="#FFF8DC" />
    </group>
  );
}
