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

// Add these new types to your existing types file
export interface CalculationSteps {
  mainScaleReading: number;
  vernierCoincidence: number;
  leastCount: number;
  zeroError: number;
  finalMeasurement: number;
}

export interface CalculationsDisplayProps {
  position: CaliperPosition;
  settings: CaliperSettings;
  isDetailedView: boolean;              // Required prop
  onViewToggle: () => void;            // Add this to handle toggle from parent
  className?: string;
}