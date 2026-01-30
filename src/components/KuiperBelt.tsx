'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { KuiperBeltObject } from '@/types/solar-system';

interface KuiperBeltProps {
  objects: KuiperBeltObject[];
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
  selectedPlanet: string | null;
  onPlanetClick: (name: string) => void;
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
  const particlesRef = useRef<THREE.Points>(null);

  // 生成柯伊伯带粒子
  const generateParticles = () => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 68 + Math.random() * 35;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.15;
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = Math.random();
      colors[i * 3] = 0.8 + t * 0.2;
      colors[i * 3 + 1] = 0.9 + t * 0.1;
      colors[i * 3 + 2] = 1.0;
    }

    return { positions, colors };
  };

  const { positions, colors } = generateParticles();

  // 创建粒子材质
  const particleMaterial = useRef(new THREE.PointsMaterial({
    transparent: true,
    vertexColors: true,
    size: 0.12,
    sizeAttenuation: true,
    opacity: 0.4
  }));

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.0005;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 柯伊伯带主要天体 */}
      {objects.map((obj, index) => {
        const [time, setTime] = useState(0);
        const meshRef = useRef<THREE.Mesh>(null);
        const orbitRef = useRef<THREE.Group>(null);

        const texture = useLoader(THREE.TextureLoader, obj.texture || '');
        const isSelected = selectedPlanet === obj.name;

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
          <group key={obj.name} ref={orbitRef}>
            {showOrbits && (
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
                onPlanetClick(obj.name);
              }}
            >
              <sphereGeometry args={[obj.radius, 32, 32]} />
              <meshStandardMaterial
                map={texture}
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

            {showLabels && (
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
      })}

      {/* 柯伊伯带粒子 */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={particleMaterial.current} />
      </points>
    </group>
  );
}
