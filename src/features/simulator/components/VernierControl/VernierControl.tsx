// src/features/simulator/components/VernierControl/VernierControl.tsx

import { CaliperSettings } from "../../types/simulator.types";

interface VernierControlProps {
  value: number;
  settings: CaliperSettings;
  onChange: (value: number) => void;
  movementRange: number;
}

const VernierControl = ({
  value,
  settings,
  onChange,
  movementRange,
}: VernierControlProps) => {
  // Calculate least count and step value
  const leastCount = settings.mainScaleDivision / settings.vernierDivisions;
  const stepValue = (leastCount / settings.mainScaleLength) * movementRange;

  // Handle precision movement
  const handleStepMove = (direction: "forward" | "backward") => {
    const newValue =
      direction === "forward"
        ? Math.min(value + stepValue, movementRange)
        : Math.max(value - stepValue, 0);
    onChange(Number(newValue.toFixed(3)));
  };

  // Calculate actual measurement value
  const measurementValue = (value / movementRange) * settings.mainScaleLength;

  return (
    <div className="w-full max-w-md mx-auto mt-4 space-y-2">
      {/* Control slider and buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleStepMove("backward")}
          className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold"
          title="Move backward by one division"
        >
          ←
        </button>

        <input
          type="range"
          min="0"
          max={movementRange}
          step={stepValue}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />

        <button
          onClick={() => handleStepMove("forward")}
          className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold"
          title="Move forward by one division"
        >
          →
        </button>
      </div>

      {/* Measurement display */}
      <div className="text-center text-sm text-gray-600">
        <div>
          Position: {measurementValue.toFixed(2)} {settings.units}
        </div>
        <div className="text-xs text-gray-500">
          Least Count: {leastCount} {settings.units}
        </div>
      </div>
    </div>
  );
};

export default VernierControl;
