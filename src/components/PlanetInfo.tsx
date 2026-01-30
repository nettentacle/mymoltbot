'use client';

import { PlanetInfoProps } from '@/components/PlanetInfo';

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  if (!planet) return null;

  const moonCount = planet.moons?.length || 0;
  const hasRing = planet.ring ? '有' : '无';

  return (
    <div className="fixed top-4 right-4 w-80 bg-black/90 backdrop-blur-md rounded-xl p-5 text-white border border-white/20 shadow-2xl z-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {planet.nameCN}
          </h2>
          <p className="text-sm text-gray-400">{planet.name}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">轨道距离</span>
          <span className="text-blue-300 font-semibold">
            {planet.orbit.distance.toFixed(1)} AU
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">公转周期</span>
          <span className="text-blue-300 font-semibold">
            {planet.orbit.period === 0 ? '-' : (planet.orbit.period / 365).toFixed(2) + ' 地球年'}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">轨道偏心率</span>
          <span className="text-blue-300 font-semibold">
            {planet.orbit.eccentricity}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">轨道倾角</span>
          <span className="text-blue-300 font-semibold">
            {planet.orbit.inclination}°
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">相对半径</span>
          <span className="text-blue-300 font-semibold">
            {planet.radius.toFixed(2)}x
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-400">卫星数量</span>
          <span className="text-blue-300 font-semibold">{moonCount} 个</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">行星环</span>
          <span className="text-blue-300 font-semibold">{hasRing}</span>
        </div>
      </div>

      {planet.moons && planet.moons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold mb-2 text-gray-300">主要卫星</h3>
          <div className="flex flex-wrap gap-2">
            {planet.moons.map((moon) => (
              <span
                key={moon.name}
                className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300"
              >
                {moon.nameCN}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
