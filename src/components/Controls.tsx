'use client';

interface ControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  showOrbits: boolean;
  setShowOrbits: (show: boolean) => void;
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  showKuiperBelt: boolean;
  setShowKuiperBelt: (show: boolean) => void;
  showOortCloud: boolean;
  setShowOortCloud: (show: boolean) => void;
  selectedPlanet: string | null;
}

export default function Controls({
  speed,
  setSpeed,
  showOrbits,
  setShowOrbits,
  showLabels,
  setShowLabels,
  showKuiperBelt,
  setShowKuiperBelt,
  showOortCloud,
  setShowOortCloud,
  selectedPlanet
}: ControlsProps) {
  const planetNames: { [key: string]: string } = {
    'Sun': '太阳',
    'Mercury': '水星',
    'Venus': '金星',
    'Earth': '地球',
    'Mars': '火星',
    'Jupiter': '木星',
    'Saturn': '土星',
    'Uranus': '天王星',
    'Neptune': '海王星',
    'Halley': '哈雷彗星',
    'Pluto': '冥王星'
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/80 backdrop-blur-md rounded-xl p-4 text-white border border-white/10">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚙️</span>
        控制面板
      </h2>

      {/* 速度控制 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          运行速度: {speed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <button onClick={() => setSpeed(0)} className="hover:text-white">暂停</button>
          <button onClick={() => setSpeed(1)} className="hover:text-white">正常</button>
          <button onClick={() => setSpeed(5)} className="hover:text-white">快速</button>
        </div>
      </div>

      {/* 显示选项 */}
      <div className="space-y-3 mb-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-300">显示轨道</span>
          <button
            onClick={() => setShowOrbits(!showOrbits)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              showOrbits ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              showOrbits ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-300">显示标签</span>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              showLabels ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              showLabels ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-300">柯伊伯带</span>
          <button
            onClick={() => setShowKuiperBelt(!showKuiperBelt)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              showKuiperBelt ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              showKuiperBelt ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-300">奥尔特云</span>
          <button
            onClick={() => setShowOortCloud(!showOortCloud)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              showOortCloud ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              showOortCloud ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </label>
      </div>

      {/* 选中信息 */}
      {selectedPlanet && (
        <div className="border-t border-white/20 pt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">当前选中</h3>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
            <span className="text-blue-300 font-bold">{planetNames[selectedPlanet] || selectedPlanet}</span>
          </div>
        </div>
      )}

      {/* 操作提示 */}
      <div className="mt-4 pt-4 border-t border-white/20 text-xs text-gray-500">
        <p className="mb-1">🖱️ 拖拽：旋转视角</p>
        <p className="mb-1">🖱️ 滚轮：缩放</p>
        <p>🖱️ 点击行星：选中</p>
      </div>
    </div>
  );
}
