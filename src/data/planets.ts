import { PlanetData, CometData, KuiperBeltObject } from '@/types/solar-system';

// 太阳系行星数据（比例已调整以便可视化）
export const SUN_RADIUS = 5;
export const ORBIT_SCALE = 15; // 轨道距离缩放因子
export const PLANET_SCALE = 0.5; // 行星大小缩放因子

// 高清纹理 URL（使用稳定的公共纹理资源）
const TEXTURES = {
  sun: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg',
  mercury: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg',
  venus: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
  earth: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Solarsystemscope_texture_2k_earth_daymap.jpg',
  mars: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  jupiter: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
  saturn: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Saturn_%28planet%29_large.jpg',
  uranus: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
  neptune: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
  moon: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png',
  phobos: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Phobos.jpg',
  deimos: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Deimos.jpg',
  io: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Io_highest_resolution_color.jpg',
  europa: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Europa_Moon_Color.jpg',
  ganymede: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Ganymede_-_Perijove_34_Composite.jpg',
  callisto: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Callisto_-_Perijove_34_Composite.jpg',
  titan: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Titan_in_true_color.jpg',
  triton: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Triton_moon_mosaic_Voyager_2_%28large%29.jpg',
  titania: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Titania%28moon%29.jpg',
  oberon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Oberon_moon.jpg',
  pluto: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High_Res.jpg'
};

export const planets: PlanetData[] = [
  {
    name: 'Mercury',
    nameCN: '水星',
    radius: 0.8 * PLANET_SCALE,
    color: '#B5B5B5',
    texture: TEXTURES.mercury,
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
    texture: TEXTURES.venus,
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
    texture: TEXTURES.earth,
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
        color: '#C4C4C4',
        texture: TEXTURES.moon
      }
    ]
  },
  {
    name: 'Mars',
    nameCN: '火星',
    radius: 1.2 * PLANET_SCALE,
    color: '#C1440E',
    texture: TEXTURES.mars,
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
        color: '#8B7355',
        texture: TEXTURES.phobos
      },
      {
        name: 'Deimos',
        nameCN: '火卫二',
        radius: 0.1 * PLANET_SCALE,
        distance: 2.5,
        period: 1.3,
        color: '#A0A0A0',
        texture: TEXTURES.deimos
      }
    ]
  },
  {
    name: 'Jupiter',
    nameCN: '木星',
    radius: 4 * PLANET_SCALE,
    color: '#D8CA9D',
    texture: TEXTURES.jupiter,
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
        color: '#FFFF66',
        texture: TEXTURES.io
      },
      {
        name: 'Europa',
        nameCN: '木卫二',
        radius: 0.25 * PLANET_SCALE,
        distance: 5,
        period: 3.5,
        color: '#A8D8FF',
        texture: TEXTURES.europa
      },
      {
        name: 'Ganymede',
        nameCN: '木卫三',
        radius: 0.35 * PLANET_SCALE,
        distance: 5.5,
        period: 7.2,
        color: '#B8B8B8',
        texture: TEXTURES.ganymede
      },
      {
        name: 'Callisto',
        nameCN: '木卫四',
        radius: 0.3 * PLANET_SCALE,
        distance: 6,
        period: 16.7,
        color: '#8B7355',
        texture: TEXTURES.callisto
      }
    ]
  },
  {
    name: 'Saturn',
    nameCN: '土星',
    radius: 3.5 * PLANET_SCALE,
    color: '#F4D59E',
    texture: TEXTURES.saturn,
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
        color: '#F5DEB3',
        texture: TEXTURES.titan
      }
    ]
  },
  {
    name: 'Uranus',
    nameCN: '天王星',
    radius: 2.5 * PLANET_SCALE,
    color: '#D1E7E7',
    texture: TEXTURES.uranus,
    orbit: {
      distance: 55 * ORBIT_SCALE / 10,
      eccentricity: 0.046,
      inclination: 0.77,
      period: 30687
    },
    rotationSpeed: 0.03,
    moons: [
      {
        name: 'Titania',
        nameCN: '天卫三',
        radius: 0.15 * PLANET_SCALE,
        distance: 3,
        period: 8.7,
        color: '#C8C8C8',
        texture: TEXTURES.titania
      },
      {
        name: 'Oberon',
        nameCN: '天卫四',
        radius: 0.14 * PLANET_SCALE,
        distance: 3.5,
        period: 13.5,
        color: '#B8B8B8',
        texture: TEXTURES.oberon
      }
    ]
  },
  {
    name: 'Neptune',
    nameCN: '海王星',
    radius: 2.4 * PLANET_SCALE,
    color: '#5B5DDF',
    texture: TEXTURES.neptune,
    orbit: {
      distance: 65 * ORBIT_SCALE / 10,
      eccentricity: 0.011,
      inclination: 1.77,
      period: 60190
    },
    rotationSpeed: 0.032,
    moons: [
      {
        name: 'Triton',
        nameCN: '海卫一',
        radius: 0.2 * PLANET_SCALE,
        distance: 3,
        period: 5.9,
        color: '#E8E8FF',
        texture: TEXTURES.triton
      }
    ]
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
    period: 27500,
    inclination: 162
  },
  tailLength: 10
};

// 柯伊伯带天体
export const kuiperBeltObjects: KuiperBeltObject[] = [
  { 
    name: 'Pluto', 
    nameCN: '冥王星', 
    distance: 75 * ORBIT_SCALE / 10, 
    radius: 0.3 * PLANET_SCALE, 
    color: '#D4A574',
    texture: TEXTURES.pluto
  },
  { 
    name: 'Eris', 
    nameCN: '阋神星', 
    distance: 85 * ORBIT_SCALE / 10, 
    radius: 0.28 * PLANET_SCALE, 
    color: '#FFFFFF' 
  },
  { 
    name: 'Makemake', 
    nameCN: '鸟神星', 
    distance: 80 * ORBIT_SCALE / 10, 
    radius: 0.25 * PLANET_SCALE, 
    color: '#E6E6E6' 
  },
  { 
    name: 'Haumea', 
    nameCN: '妊神星', 
    distance: 78 * ORBIT_SCALE / 10, 
    radius: 0.22 * PLANET_SCALE, 
    color: '#A8A8A8' 
  },
  {
    name: 'Sedna',
    nameCN: '赛德娜',
    distance: 82 * ORBIT_SCALE / 10,
    radius: 0.18 * PLANET_SCALE,
    color: '#FF6B6B'
  },
  {
    name: 'Orcus',
    nameCN: '奥卡斯',
    distance: 77 * ORBIT_SCALE / 10,
    radius: 0.2 * PLANET_SCALE,
    color: '#C4A484'
  }
];

// 奥尔特云
export const oortCloud = {
  distance: 100 * ORBIT_SCALE / 10,
  particleCount: 300
};

// 导出纹理供其他组件使用
export { TEXTURES };
