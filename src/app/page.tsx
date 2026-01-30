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
    <main className="w-full h-screen bg-black overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Stars 
            radius={300} 
            depth={60} 
            count={8000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          <ambientLight intensity={0.2} />
          <pointLight 
            position={[0, 0, 0]} 
            intensity={2.5} 
            distance={800} 
            color="#FFF8DC"
          />
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
            maxDistance={400}
            dampingFactor={0.05}
            enableDamping={true}
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

      <div className="fixed top-4 left-4 text-white/80 pointer-events-none">
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          太阳系模拟
        </h1>
        <p className="text-sm text-gray-400">3D Solar System Simulation</p>
        <p className="text-xs text-gray-500 mt-2">高清纹理 | 交互式控制</p>
      </div>

      {/* 加载指示器 */}
      <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        实时运行中
      </div>
    </main>
  );
}
