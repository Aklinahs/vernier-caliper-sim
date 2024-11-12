// src/features/simulator/types/simulator.types.ts

export interface CaliperSettings {
  mainScaleLength: 100 | 200 | 300; // in mm
  mainScaleDivision: 0.5 | 1 | 2;   // in mm
  vernierDivisions: 10 | 20 | 25 | 40 | 50;
  units: 'mm' | 'cm';
  zeroError: number;
}

export interface CaliperPosition {
  mainScale: number;  // Current position on main scale
  vernierScale: number;  // Current position on vernier scale
}