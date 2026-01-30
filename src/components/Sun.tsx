'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SunProps {
  onClick: () => void;
}

export default function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef} onClick={onClick}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        emissive="#FFD700"
        emissiveIntensity={1}
        color="#FFA500"
      />
      <pointLight intensity={2} distance={500} color="#FFF8DC" />
    </mesh>
  );
}
