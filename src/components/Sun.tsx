'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface SunProps {
  onClick: () => void;
}

export default function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);

  // 加载太阳纹理
  const texture = useLoader(THREE.TextureLoader, 'https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg');

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef} onClick={onClick}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#FFD700"
        emissiveIntensity={0.8}
        emissiveMap={texture}
      />
      <pointLight intensity={2} distance={500} color="#FFF8DC" />
    </mesh>
  );
}
