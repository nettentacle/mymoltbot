'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData, CometData, KuiperBeltObject } from '@/types/solar-system';
import Planet from './Planet';
import Sun from './Sun';
import HalleyComet from './HalleyComet';
import KuiperBelt from './KuiperBelt';
import OortCloud from './OortCloud';
import { planets, halleyComet, kuiperBeltObjects, oortCloud } from '@/data/planets';

interface SolarSystemProps {
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
  showKuiperBelt: boolean;
  showOortCloud: boolean;
  selectedPlanet: string | null;
  onPlanetClick: (name: string) => void;
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
      <Sun 
        onClick={() => onPlanetClick('Sun')} 
        isSelected={selectedPlanet === 'Sun'}
      />

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
        showLabel={showLabels}
        isSelected={selectedPlanet === halleyComet.name}
        onClick={() => onPlanetClick(halleyComet.name)}
      />

      {showKuiperBelt && (
        <KuiperBelt
          objects={kuiperBeltObjects}
          speed={speed}
          showOrbits={showOrbits}
          showLabels={showLabels}
          selectedPlanet={selectedPlanet}
          onPlanetClick={onPlanetClick}
        />
      )}

      {showOortCloud && <OortCloud cloud={oortCloud} />}
    </group>
  );
}
