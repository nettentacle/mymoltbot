'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { KuiperBeltObject } from '@/types/solar-system';

// 单个柯伊伯带天体组件
function KuiperObject({
  obj,
  index,
  speed,
  showOrbit,
  showLabel,
  isSelected,
  onClick
}: {
  obj: KuiperBeltObject;
  index: number;
  speed: number;
  showOrbit: boolean;
  showLabel: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);

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

  const orbitPoints: [number, number, number][] = [];
  for (let i = 0; i <= 360; i += 10) {
    const angle = (i / 360) * Math.PI * 2;
    const x = Math.cos(angle) * obj.distance;
    const z = Math.sin(angle) * obj.distance;
    orbitPoints.push([x, 0, z]);
  }

  return (
    <group ref={orbitRef}>
      {showOrbit && (
        <Line
          points={orbitPoints}
          color="cyan"
          opacity={0.08}
          transparent
          lineWidth={1}
        />
      )}
      <mesh 
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[obj.radius, 32, 32]} />
        <meshStandardMaterial
          color={obj.color}
          emissive={isSelected ? obj.color : 'black'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {isSelected && (
        <mesh>
          <sphereGeometry args={[obj.radius * 1.3, 16, 16]} />
          <meshBasicMaterial
            color={obj.color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {showLabel && (
        <Text
          position={[obj.radius + 1.5, 0, 0]}
          fontSize={0.4}
          color="cyan"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {obj.nameCN}
        </Text>
      )}
    </group>
  );
}

export default function KuiperBelt({ 
  objects, 
  speed, 
  showOrbits, 
  showLabels,
  selectedPlanet,
  onPlanetClick
}: KuiperBeltProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, index) => (
        <KuiperObject
          key={obj.name}
          obj={obj}
          index={index}
          speed={speed}
          showOrbit={showOrbits}
          showLabel={showLabels}
          isSelected={selectedPlanet === obj.name}
          onClick={() => onPlanetClick(obj.name)}
        />
      ))}
    </group>
  );
}
