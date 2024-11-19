// src/features/simulator/components/SettingsPanel/SettingsPanel.tsx

import React from "react";
import { X } from "lucide-react";
import { CaliperSettings } from "../../types/simulator.types";

interface SettingsPanelProps {
  settings: CaliperSettings;
  onSettingsChange: (settings: CaliperSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
  movementRange?: number;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
  const leastCount = settings.mainScaleDivision / settings.vernierDivisions;
  const maxZeroError = 5;

  const handleZeroErrorChange = (direction: "increase" | "decrease") => {
    const currentError = settings.zeroError;
    let newError;

    if (direction === "increase") {
      newError = Math.min(currentError + leastCount, maxZeroError);
    } else {
      newError = Math.max(currentError - leastCount, -maxZeroError);
    }

    onSettingsChange({
      ...settings,
      zeroError: Number(newError.toFixed(3)),
    });
  };

  const handleMainScaleLengthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSettingsChange({
      ...settings,
      mainScaleLength: Number(event.target.value) as 100 | 200 | 300,
    });
  };

  const handleVernierDivisionsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSettingsChange({
      ...settings,
      vernierDivisions: Number(event.target.value) as 10 | 20 | 25 | 40 | 50,
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onToggle}
        />
      )}

      {/* Panel */}
      <div
        className={`
          fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
          {/* Main Scale Length */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Main Scale Length
            </label>
            <select
              value={settings.mainScaleLength}
              onChange={handleMainScaleLengthChange}
              className="w-full p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={100}>100 mm</option>
              <option value={200}>200 mm</option>
              <option value={300}>300 mm</option>
            </select>
          </div>

          {/* Vernier Scale Divisions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vernier Divisions
            </label>
            <select
              value={settings.vernierDivisions}
              onChange={handleVernierDivisionsChange}
              className="w-full p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={10}>10 divisions</option>
              <option value={20}>20 divisions</option>
              <option value={25}>25 divisions</option>
              <option value={40}>40 divisions</option>
              <option value={50}>50 divisions</option>
            </select>
          </div>

          {/* Zero Error Control */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Zero Error ({settings.units})
            </label>
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
              <button
                onClick={() => handleZeroErrorChange("decrease")}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-medium">
                {settings.zeroError.toFixed(3)}
              </div>
              <button
                onClick={() => handleZeroErrorChange("increase")}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
              >
                +
              </button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Step: {leastCount} {settings.units}
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-6 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Current Configuration
            </h4>
            <div className="text-xs text-blue-600 space-y-1">
              <p>Main Scale: {settings.mainScaleLength} mm</p>
              <p>Vernier Divisions: {settings.vernierDivisions}</p>
              <p>Least Count: {leastCount} mm</p>
              <p>Zero Error: {settings.zeroError} mm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
