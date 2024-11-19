// src/features/simulator/components/SimulatorPage.tsx

import { useState } from "react";
import { Settings } from "lucide-react";
import CaliperDisplay from "./CaliperDisplay/CaliperDisplay";
import VernierControl from "./VernierControl/VernierControl";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import CalculationsDisplay from "./CalculationsDisplay/CalculationsDisplay";
import { CaliperSettings, CaliperPosition } from "../types/simulator.types";

const MOVEMENT_RANGE = 75; // percentage of total width

const SimulatorPage = () => {
  // States
  const [settings, setSettings] = useState<CaliperSettings>({
    mainScaleLength: 100,
    mainScaleDivision: 1,
    vernierDivisions: 10,
    units: "mm",
    zeroError: 0,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [vernierPosition, setVernierPosition] = useState(0);
  const [position, setPosition] = useState<CaliperPosition>({
    mainScale: 0,
    vernierScale: 0,
  });

  // Handlers
  const handlePositionChange = (newPosition: CaliperPosition) => {
    setPosition(newPosition);
  };

  const handleSettingsChange = (newSettings: CaliperSettings) => {
    setSettings(newSettings);
    setVernierPosition(0); // Reset position when settings change
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Main Simulation Window */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-gray-600">
              Least Count:{" "}
              {settings.mainScaleDivision / settings.vernierDivisions}mm
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>

          {/* Caliper Display */}
          <CaliperDisplay
            settings={settings}
            vernierPosition={vernierPosition}
            movementRange={MOVEMENT_RANGE}
            onPositionChange={handlePositionChange}
          />
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <VernierControl
            value={vernierPosition}
            settings={settings}
            movementRange={MOVEMENT_RANGE}
            onChange={setVernierPosition}
          />
        </div>

        {/* Calculations Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CalculationsDisplay
            position={position}
            settings={settings}
            isDetailedView={true}
            onViewToggle={() => {}}
          />
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        onSettingsChange={handleSettingsChange}
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
        movementRange={MOVEMENT_RANGE}
      />
    </div>
  );
};

export default SimulatorPage;
