// src/features/simulator/constants/vernier-config.ts

interface VernierConfig {
    movementRange: number;
    pixelRatio: number; // Pixels per mm for accurate measurement
  }
  
  interface VernierConfigMap {
    [key: string]: VernierConfig;
  }
  
  export const VERNIER_CONFIGS: VernierConfigMap = {
    // Format: 'mainScaleLength-vernierDivisions'
    '100-10': { movementRange: 672, pixelRatio: 2.5 },
    '100-20': { movementRange: 672, pixelRatio: 2.6 },
    '100-25': { movementRange: 672, pixelRatio: 2.7 },
    '100-40': { movementRange: 672, pixelRatio: 2.8 },
    '100-50': { movementRange: 672, pixelRatio: 2.9 },
    
    '200-10': { movementRange: 672, pixelRatio: 1.5 },
    '200-20': { movementRange: 672, pixelRatio: 1.55 },
    '200-25': { movementRange: 672, pixelRatio: 1.6 },
    '200-40': { movementRange: 672, pixelRatio: 1.65 },
    '200-50': { movementRange: 672, pixelRatio: 1.7 },
    
    '300-10': { movementRange: 672, pixelRatio: 1.17 },
    '300-20': { movementRange: 672, pixelRatio: 1.2 },
    '300-25': { movementRange: 672, pixelRatio: 1.23 },
    '300-40': { movementRange: 672, pixelRatio: 1.27 },
    '300-50': { movementRange: 672, pixelRatio: 1.3 }
  };
  
  export const getVernierConfig = (mainScaleLength: number, vernierDivisions: number): VernierConfig => {
    const key = `${mainScaleLength}-${vernierDivisions}`;
    return VERNIER_CONFIGS[key] || { movementRange: 300, pixelRatio: 1 }; // Default fallback
  };