'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '@/types/solar-system';

interface PlanetProps {
  planet: PlanetData;
  speed: number;
  showOrbit: boolean;
  showLabel: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function Planet({
  planet,
  speed,
  showOrbit,
  showLabel,
  isSelected,
  onClick
}: PlanetProps) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  // 加载纹理
  const texture = useLoader(THREE.TextureLoader, planet.texture || '');

  // 计算轨道位置
  const calculatePosition = (t: number) => {
    const angle = (t / planet.orbit.period) * Math.PI * 2;
    const a = planet.orbit.distance;
    const e = planet.orbit.eccentricity;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    const inclinationRad = (planet.orbit.inclination * Math.PI) / 180;
    const y = x * Math.sin(inclinationRad);

    return [x, y, z] as [number, number, number];
  };

  useFrame((state, delta) => {
    setTime(time + delta * speed * 10);

    if (planetRef.current) {
      const [x, y, z] = calculatePosition(time);
      planetRef.current.position.set(x, y, z);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * speed;
    }
  });

  // 轨道路径点
  const orbitPoints: [number, number, number][] = [];
  for (let i = 0; i <= 360; i += 5) {
    const angle = (i / 360) * Math.PI * 2;
    const a = planet.orbit.distance;
    const e = planet.orbit.eccentricity;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    const inclinationRad = (planet.orbit.inclination * Math.PI) / 180;
    const y = x * Math.sin(inclinationRad);

    orbitPoints.push([x, y, z]);
  }

  return (
    <group ref={planetRef}>
      {showOrbit && (
        <Line
          points={orbitPoints}
          color="white"
          opacity={0.2}
          transparent
          lineWidth={1}
        />
      )}

      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color={planet.color}
          emissive={isSelected ? planet.color : 'black'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {showLabel && (
        <Text
          position={[planet.radius + 1, 0, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {planet.nameCN}
        </Text>
      )}

      {planet.moons && planet.moons.map((moon) => (
        <Moon key={moon.name} moon={moon} planetRadius={planet.radius} speed={speed} />
      ))}

      {planet.ring && <Ring ring={planet.ring} />}
    </group>
  );
}

function Moon({ moon, planetRadius, speed }: { moon: any; planetRadius: number; speed: number }) {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTime, setMoonTime] = useState(0);
  
  // 加载月球纹理
  const texture = useLoader(THREE.TextureLoader, moon.texture || '');

  useFrame((state, delta) => {
    setMoonTime(moonTime + delta * speed * 10);

    if (moonRef.current) {
      const angle = (moonTime / moon.period) * Math.PI * 2;
      const x = Math.cos(angle) * moon.distance;
      const z = Math.sin(angle) * moon.distance;
      moonRef.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[moon.radius, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        color={moon.color}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

function Ring({ ring }: { ring: any }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[ring.innerRadius, ring.outerRadius, 64]} />
      <meshBasicMaterial
        color={ring.color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
