// 行星轨道类型
export interface Orbit {
  distance: number; // 距离太阳的距离（天文单位 AU 的缩放值）
  eccentricity: number; // 轨道偏心率
  inclination: number; // 轨道倾角（度）
  period: number; // 轨道周期（秒）
}

// 行星数据类型
export interface PlanetData {
  name: string;
  nameCN: string;
  radius: number; // 半径（相对值）
  color: string;
  orbit: Orbit;
  rotationSpeed: number; // 自转速度
  texture?: string; // 纹理 URL
  moons?: MoonData[]; // 卫星
  ring?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
  };
}

// 卫星数据类型
export interface MoonData {
  name: string;
  nameCN: string;
  radius: number;
  distance: number; // 距离行星的距离
  period: number;
  color: string;
}

// 哈雷彗星数据
export interface CometData {
  name: string;
  nameCN: string;
  orbit: {
    perihelion: number; // 近日点距离
    aphelion: number; // 远日点距离
    eccentricity: number;
    period: number;
    inclination: number;
  };
  tailLength: number;
}

// 柯伊伯带/奥尔特云对象
export interface KuiperBeltObject {
  name: string;
  distance: number;
  radius: number;
  color: string;
}
