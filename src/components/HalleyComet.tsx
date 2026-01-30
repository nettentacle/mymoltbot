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
}

export default function HalleyComet({ comet, speed, showOrbit }: HalleyCometProps) {
  const cometRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
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

      // 计算尾巴方向（背向太阳）
      const distanceToSun = Math.sqrt(x * x + y * y + z * z);
      const tailScale = Math.max(1, comet.tailLength * (10 / distanceToSun));

      if (tailRef.current) {
        tailRef.current.scale.set(tailScale * 0.3, tailScale * 0.3, tailScale);
        tailRef.current.lookAt(0, 0, 0);
      }
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
          opacity={0.3}
          transparent
          lineWidth={1}
        />
      )}

      {/* 彗星核心 */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#E8E8E8"
          emissive="#FFFFFF"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 彗发 */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#B0E0E6"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 彗尾（锥形） */}
      <mesh ref={tailRef} position={[0, 0, -1]}>
        <coneGeometry args={[0.5, comet.tailLength, 8, 1, true]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
