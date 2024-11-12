// src/features/simulator/components/SettingsPanel/SettingsPanel.tsx

import React from "react";
import { Settings } from "lucide-react";
import { CaliperSettings } from "../../types/simulator.types";

interface SettingsPanelProps {
  settings: CaliperSettings;
  onSettingsChange: (settings: CaliperSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
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
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Toggle Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Settings Panel */}
      <div
        className={`fixed right-4 top-16 w-64 bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Caliper Settings</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Main Scale Length (mm)
            </label>
            <select
              value={settings.mainScaleLength}
              onChange={handleMainScaleLengthChange}
              className="w-full p-2 border rounded-md"
            >
              <option value={100}>100 mm</option>
              <option value={200}>200 mm</option>
              <option value={300}>300 mm</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vernier Scale Divisions
            </label>
            <select
              value={settings.vernierDivisions}
              onChange={handleVernierDivisionsChange}
              className="w-full p-2 border rounded-md"
            >
              <option value={10}>10 divisions</option>
              <option value={20}>20 divisions</option>
              <option value={25}>25 divisions</option>
              <option value={40}>40 divisions</option>
              <option value={50}>50 divisions</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
