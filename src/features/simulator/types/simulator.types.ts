// src/features/simulator/types/simulator.types.ts

export interface CaliperSettings {
  mainScaleLength: 100 | 200 | 300;
  mainScaleDivision: 0.5 | 1 | 2;
  vernierDivisions: 10 | 20 | 25 | 40 | 50;
  units: 'mm' | 'cm';
  zeroError: number;
}

export interface CaliperPosition {
  mainScale: number;
  vernierScale: number;
}

// Add this new interface for vernier configuration
export interface VernierConfig {
  movementRange: number;
  pixelRatio: number;
}