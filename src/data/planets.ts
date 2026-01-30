import { PlanetData, CometData, KuiperBeltObject } from '@/types/solar-system';

// 太阳系行星数据（比例已调整以便可视化）
export const SUN_RADIUS = 5;
export const ORBIT_SCALE = 15; // 轨道距离缩放因子
export const PLANET_SCALE = 0.5; // 行星大小缩放因子

// 纹理 URL（使用免费的行星纹理）
const TEXTURE_BASE = 'https://upload.wikimedia.org/wikipedia/commons';

export const planets: PlanetData[] = [
  {
    name: 'Mercury',
    nameCN: '水星',
    radius: 0.8 * PLANET_SCALE,
    color: '#B5B5B5',
    orbit: {
      distance: 10 * ORBIT_SCALE / 10,
      eccentricity: 0.205,
      inclination: 7,
      period: 88
    },
    rotationSpeed: 0.01
  },
  {
    name: 'Venus',
    nameCN: '金星',
    radius: 1.5 * PLANET_SCALE,
    color: '#E6C87A',
    orbit: {
      distance: 15 * ORBIT_SCALE / 10,
      eccentricity: 0.007,
      inclination: 3.4,
      period: 225
    },
    rotationSpeed: 0.005
  },
  {
    name: 'Earth',
    nameCN: '地球',
    radius: 1.6 * PLANET_SCALE,
    color: '#6B93D6',
    orbit: {
      distance: 20 * ORBIT_SCALE / 10,
      eccentricity: 0.017,
      inclination: 0,
      period: 365
    },
    rotationSpeed: 0.02,
    moons: [
      {
        name: 'Moon',
        nameCN: '月球',
        radius: 0.4 * PLANET_SCALE,
        distance: 3,
        period: 27,
        color: '#C4C4C4'
      }
    ]
  },
  {
    name: 'Mars',
    nameCN: '火星',
    radius: 1.2 * PLANET_SCALE,
    color: '#C1440E',
    orbit: {
      distance: 25 * ORBIT_SCALE / 10,
      eccentricity: 0.094,
      inclination: 1.85,
      period: 687
    },
    rotationSpeed: 0.018,
    moons: [
      {
        name: 'Phobos',
        nameCN: '火卫一',
        radius: 0.15 * PLANET_SCALE,
        distance: 2,
        period: 0.3,
        color: '#8B7355'
      },
      {
        name: 'Deimos',
        nameCN: '火卫二',
        radius: 0.1 * PLANET_SCALE,
        distance: 2.5,
        period: 1.3,
        color: '#A0A0A0'
      }
    ]
  },
  {
    name: 'Jupiter',
    nameCN: '木星',
    radius: 4 * PLANET_SCALE,
    color: '#D8CA9D',
    orbit: {
      distance: 35 * ORBIT_SCALE / 10,
      eccentricity: 0.049,
      inclination: 1.3,
      period: 4333
    },
    rotationSpeed: 0.04,
    moons: [
      {
        name: 'Io',
        nameCN: '木卫一',
        radius: 0.3 * PLANET_SCALE,
        distance: 4.5,
        period: 1.8,
        color: '#FFFF66'
      },
      {
        name: 'Europa',
        nameCN: '木卫二',
        radius: 0.25 * PLANET_SCALE,
        distance: 5,
        period: 3.5,
        color: '#A8D8FF'
      },
      {
        name: 'Ganymede',
        nameCN: '木卫三',
        radius: 0.35 * PLANET_SCALE,
        distance: 5.5,
        period: 7.2,
        color: '#B8B8B8'
      },
      {
        name: 'Callisto',
        nameCN: '木卫四',
        radius: 0.3 * PLANET_SCALE,
        distance: 6,
        period: 16.7,
        color: '#8B7355'
      }
    ]
  },
  {
    name: 'Saturn',
    nameCN: '土星',
    radius: 3.5 * PLANET_SCALE,
    color: '#F4D59E',
    orbit: {
      distance: 45 * ORBIT_SCALE / 10,
      eccentricity: 0.057,
      inclination: 2.49,
      period: 10759
    },
    rotationSpeed: 0.038,
    ring: {
      innerRadius: 4 * PLANET_SCALE,
      outerRadius: 6 * PLANET_SCALE,
      color: '#C9B896'
    },
    moons: [
      {
        name: 'Titan',
        nameCN: '土卫六',
        radius: 0.35 * PLANET_SCALE,
        distance: 5,
        period: 16,
        color: '#F5DEB3'
      }
    ]
  },
  {
    name: 'Uranus',
    nameCN: '天王星',
    radius: 2.5 * PLANET_SCALE,
    color: '#D1E7E7',
    orbit: {
      distance: 55 * ORBIT_SCALE / 10,
      eccentricity: 0.046,
      inclination: 0.77,
      period: 30687
    },
    rotationSpeed: 0.03
  },
  {
    name: 'Neptune',
    nameCN: '海王星',
    radius: 2.4 * PLANET_SCALE,
    color: '#5B5DDF',
    orbit: {
      distance: 65 * ORBIT_SCALE / 10,
      eccentricity: 0.011,
      inclination: 1.77,
      period: 60190
    },
    rotationSpeed: 0.032
  }
];

// 哈雷彗星
export const halleyComet: CometData = {
  name: 'Halley',
  nameCN: '哈雷彗星',
  orbit: {
    perihelion: 8 * ORBIT_SCALE / 10,
    aphelion: 90 * ORBIT_SCALE / 10,
    eccentricity: 0.967,
    period: 27500, // 约 76 年（缩放后）
    inclination: 162
  },
  tailLength: 10
};

// 柯伊伯带天体（冥王星等）
export const kuiperBeltObjects: KuiperBeltObject[] = [
  { name: 'Pluto', nameCN: '冥王星', distance: 75 * ORBIT_SCALE / 10, radius: 0.3 * PLANET_SCALE, color: '#D4A574' },
  { name: 'Eris', nameCN: '阋神星', distance: 85 * ORBIT_SCALE / 10, radius: 0.28 * PLANET_SCALE, color: '#FFFFFF' },
  { name: 'Makemake', nameCN: '鸟神星', distance: 80 * ORBIT_SCALE / 10, radius: 0.25 * PLANET_SCALE, color: '#E6E6E6' },
  { name: 'Haumea', nameCN: '妊神星', distance: 78 * ORBIT_SCALE / 10, radius: 0.22 * PLANET_SCALE, color: '#A8A8A8' }
];

// 奥尔特云（可视化表示）
export const oortCloud = {
  distance: 100 * ORBIT_SCALE / 10,
  particleCount: 200
};
