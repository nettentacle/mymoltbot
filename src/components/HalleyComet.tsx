'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { CometData } from '@/types/solar-system';

interface HalleyCometProps {
  comet: CometData;
  speed: number;
  showOrbit: boolean;
  showLabel: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function HalleyComet({ 
  comet, 
  speed, 
  showOrbit,
  showLabel,
  isSelected,
  onClick 
}: HalleyCometProps) {
  const cometRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  // 计算彗星位置（椭圆轨道）
  const calculatePosition = (t: number) => {
    const angle = (t / comet.orbit.period) * Math.PI * 2;
    const a = (comet.orbit.perihelion + comet.orbit.aphelion) / 2;
    const e = comet.orbit.eccentricity;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    const inclinationRad = (comet.orbit.inclination * Math.PI) / 180;
    const y = x * Math.sin(inclinationRad);

    return [x, y, z] as [number, number, number];
  };

  useFrame((state, delta) => {
    setTime(time + delta * speed * 5);

    if (cometRef.current) {
      const [x, y, z] = calculatePosition(time);
      cometRef.current.position.set(x, y, z);
    }
  });

  // 轨道路径点
  const orbitPoints: [number, number, number][] = [];
  for (let i = 0; i <= 360; i += 5) {
    const angle = (i / 360) * Math.PI * 2;
    const a = (comet.orbit.perihelion + comet.orbit.aphelion) / 2;
    const e = comet.orbit.eccentricity;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    const inclinationRad = (comet.orbit.inclination * Math.PI) / 180;
    const y = x * Math.sin(inclinationRad);

    orbitPoints.push([x, y, z]);
  }

  return (
    <group ref={cometRef}>
      {showOrbit && (
        <Line
          points={orbitPoints}
          color="cyan"
          opacity={0.2}
          transparent
          lineWidth={1}
        />
      )}

      {/* 选中效果 */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial
            color="cyan"
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* 彗星核心 */}
      <mesh 
        ref={coreRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1.5}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* 彗发 - 增大并增加亮度 */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color="#B0E0E6"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 彗尾 - 更长的锥形，多层效果 */}
      <group position={[0, 0, 0.5]}>
        {/* 内层彗尾 */}
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[0.6, comet.tailLength * 0.6, 16, 1, true]} />
          <meshBasicMaterial
            color="#87CEEB"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* 外层彗尾 */}
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[0.4, comet.tailLength * 0.8, 16, 1, true]} />
          <meshBasicMaterial
            color="#ADD8E6"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {showLabel && (
        <mesh position={[1.2, 0.5, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="cyan" />
        </mesh>
      )}
    </group>
  );
}
