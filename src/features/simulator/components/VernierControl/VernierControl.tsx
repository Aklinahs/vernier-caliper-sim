import React from "react";

interface VernierControlProps {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
  movementRange: number; // New prop for custom movement range
}

const VernierControl = ({
  value,
  maxValue,
  onChange,
  movementRange,
}: VernierControlProps) => {
  // Convert the current value to a display value (in mm)
  const displayValue = (value / movementRange) * maxValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <input
        type="range"
        min="0"
        max={movementRange} // Use movementRange for slider
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="mt-2 text-center text-sm text-gray-600">
        Position: {displayValue.toFixed(1)} mm
      </div>
    </div>
  );
};

export default VernierControl;
