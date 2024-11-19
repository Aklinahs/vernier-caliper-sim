// src/features/simulator/components/VernierControl/VernierControl.tsx

import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  MoveDiagonal,
} from "lucide-react";
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
  const handleStepMove = (
    direction: "forward" | "backward",
    multiplier = 1
  ) => {
    const step = stepValue * multiplier;
    const newValue =
      direction === "forward"
        ? Math.min(value + step, movementRange)
        : Math.max(value - step, 0);
    onChange(Number(newValue.toFixed(3)));
  };

  // Calculate actual measurement value
  const measurementValue = (value / movementRange) * settings.mainScaleLength;

  // Calculate progress percentage for custom styling
  const progress = (value / movementRange) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        {/* Fine and Coarse Control Buttons */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleStepMove("backward", 10)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
            title="Move backward by 10 divisions"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleStepMove("backward")}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
            title="Move backward by one division"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Custom Slider Container */}
          <div className="relative flex-grow mx-4 max-w-2xl">
            <div className="relative h-12">
              <input
                type="range"
                min="0"
                max={movementRange}
                step={stepValue}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute w-full h-2 top-5 appearance-none bg-transparent cursor-pointer z-10"
                style={{
                  WebkitAppearance: "none",
                }}
              />
              {/* Custom Track */}
              <div className="absolute top-5 left-0 h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-blue-500 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Scale Markers */}
              <div className="absolute w-full h-full flex justify-between items-center px-2">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <div key={mark} className="h-4 w-0.5 bg-gray-300" />
                ))}
              </div>
            </div>
            {/* Scale Labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
              <span>0</span>
              <span>{(settings.mainScaleLength / 4).toFixed(0)}</span>
              <span>{(settings.mainScaleLength / 2).toFixed(0)}</span>
              <span>{((settings.mainScaleLength * 3) / 4).toFixed(0)}</span>
              <span>{settings.mainScaleLength}</span>
            </div>
          </div>

          <button
            onClick={() => handleStepMove("forward")}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
            title="Move forward by one division"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleStepMove("forward", 10)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
            title="Move forward by 10 divisions"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard Controls Help */}
        <div className="text-center text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            Use arrow keys
            <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 border rounded">
              ←
            </kbd>
            <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 border rounded">
              →
            </kbd>
            for precise control
          </span>
        </div>
      </div>

      {/* Measurement Display */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MoveDiagonal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Current Position</span>
            </div>
            <div className="text-2xl font-medium text-gray-800">
              {measurementValue.toFixed(2)} {settings.units}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm text-gray-500">Least Count</div>
            <div className="text-lg font-medium text-gray-600">
              {leastCount} {settings.units}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VernierControl;
