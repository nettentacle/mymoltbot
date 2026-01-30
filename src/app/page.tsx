'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import SolarSystem from '@/components/SolarSystem';
import Controls from '@/components/Controls';

export default function Home() {
  const [speed, setSpeed] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showKuiperBelt, setShowKuiperBelt] = useState(true);
  const [showOortCloud, setShowOortCloud] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={2} distance={500} color="#FFF8DC" />
          <SolarSystem
            speed={speed}
            showOrbits={showOrbits}
            showLabels={showLabels}
            showKuiperBelt={showKuiperBelt}
            showOortCloud={showOortCloud}
            selectedPlanet={selectedPlanet}
            onPlanetClick={setSelectedPlanet}
          />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={300}
          />
        </Suspense>
      </Canvas>

      <Controls
        speed={speed}
        setSpeed={setSpeed}
        showOrbits={showOrbits}
        setShowOrbits={setShowOrbits}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        showKuiperBelt={showKuiperBelt}
        setShowKuiperBelt={setShowKuiperBelt}
        showOortCloud={showOortCloud}
        setShowOortCloud={setShowOortCloud}
        selectedPlanet={selectedPlanet}
      />

      <div className="fixed top-4 left-4 text-white/80 text-xs pointer-events-none">
        <h1 className="text-2xl font-bold mb-1">太阳系模拟</h1>
        <p>3D Solar System Simulation</p>
      </div>
    </main>
  );
}
