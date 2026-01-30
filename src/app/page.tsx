'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import * as THREE from 'three';
import SolarSystem from '@/components/SolarSystem';
import Controls from '@/components/Controls';
import PlanetInfo from '@/components/PlanetInfo';
import { planets, halleyComet, kuiperBeltObjects } from '@/data/planets';

export default function Home() {
  const [speed, setSpeed] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showKuiperBelt, setShowKuiperBelt] = useState(true);
  const [showOortCloud, setShowOortCloud] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const controlsRef = useRef<any>(null);

  // 获取选中的行星数据
  const getSelectedPlanetData = () => {
    if (!selectedPlanet) return null;
    if (selectedPlanet === 'Sun') {
      return {
        name: 'Sun',
        nameCN: '太阳',
        radius: 5,
        orbit: { distance: 0, period: 0, eccentricity: 0, inclination: 0 }
      };
    }
    const planet = planets.find(p => p.name === selectedPlanet);
    if (planet) return planet;
    
    const comet = { 
      name: halleyComet.name, 
      nameCN: halleyComet.nameCN, 
      radius: 0.3, 
      orbit: halleyComet.orbit 
    };
    const kuiperObject = kuiperBeltObjects.find(k => k.name === selectedPlanet);
    if (kuiperObject) {
      return {
        ...kuiperObject,
        orbit: { distance: kuiperObject.distance, period: 60000, eccentricity: 0.1, inclination: 5 }
      };
    }
    
    return selectedPlanet === halleyComet.name ? comet : null;
  };

  // 视角预设
  const focusOnPlanet = (planetName: string) => {
    if (!controlsRef.current) return;
    
    let distance = 100;
    
    if (planetName === 'Sun') {
      distance = 30;
    } else {
      const planet = planets.find(p => p.name === planetName);
      if (planet) {
        distance = Math.max(20, planet.radius * 15);
      }
    }
    
    const angle = Math.PI / 4;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    const camera = controlsRef.current.object as THREE.PerspectiveCamera;
    camera.position.set(x, distance * 0.5, z);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

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
            speed={isPaused ? 0 : speed}
            showOrbits={showOrbits}
            showLabels={showLabels}
            showKuiperBelt={showKuiperBelt}
            showOortCloud={showOortCloud}
            selectedPlanet={selectedPlanet}
            onPlanetClick={setSelectedPlanet}
          />
          <OrbitControls
            ref={controlsRef}
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
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        focusOnPlanet={focusOnPlanet}
      />

      <PlanetInfo 
        planet={getSelectedPlanetData()} 
        onClose={() => setSelectedPlanet(null)} 
      />

      <div className="fixed top-4 left-4 text-white/80 pointer-events-none">
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          太阳系模拟
        </h1>
        <p className="text-sm text-gray-400">3D Solar System Simulation</p>
        <p className="text-xs text-gray-500 mt-2">高清纹理 | 交互式控制 | 实时渲染</p>
      </div>

      {/* 状态指示器 */}
      <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
        {isPaused ? '已暂停' : '实时运行中'}
      </div>
    </main>
  );
}
