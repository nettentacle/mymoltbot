'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { planets, halleyComet, kuiperBeltObjects, oortCloud, SUN_RADIUS } from '@/data/planets';
import { PlanetData } from '@/types/solar-system';
import Planet from './Planet';
import Sun from './Sun';
import HalleyComet from './HalleyComet';
import KuiperBelt from './KuiperBelt';
import OortCloud from './OortCloud';

interface SolarSystemProps {
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
  showKuiperBelt: boolean;
  showOortCloud: boolean;
  selectedPlanet: string | null;
  onPlanetClick: (name: string | null) => void;
}

export default function SolarSystem({
  speed,
  showOrbits,
  showLabels,
  showKuiperBelt,
  showOortCloud,
  selectedPlanet,
  onPlanetClick
}: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <Sun onClick={() => onPlanetClick('Sun')} />

      {planets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          speed={speed}
          showOrbit={showOrbits}
          showLabel={showLabels}
          isSelected={selectedPlanet === planet.name}
          onClick={() => onPlanetClick(planet.name)}
        />
      ))}

      <HalleyComet
        comet={halleyComet}
        speed={speed}
        showOrbit={showOrbits}
      />

      {showKuiperBelt && (
        <KuiperBelt
          objects={kuiperBeltObjects}
          speed={speed}
          showOrbits={showOrbits}
        />
      )}

      {showOortCloud && <OortCloud cloud={oortCloud} />}
    </group>
  );
}
