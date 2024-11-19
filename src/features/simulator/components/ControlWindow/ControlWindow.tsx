// src/features/simulator/components/ControlWindow/ControlWindow.tsx

import { useState } from "react";
import { Settings, Sliders } from "lucide-react";
import VernierControl from "../VernierControl/VernierControl";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import { CaliperSettings } from "../../types/simulator.types";

interface ControlWindowProps {
  settings: CaliperSettings;
  onSettingsChange: (settings: CaliperSettings) => void;
  vernierPosition: number;
  onVernierChange: (position: number) => void;
  movementRange: number;
}

const ControlWindow = ({
  settings,
  onSettingsChange,
  vernierPosition,
  onVernierChange,
  movementRange,
}: ControlWindowProps) => {
  const [activeTab, setActiveTab] = useState<"control" | "settings">("control");

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("control")}
          className={`flex items-center px-4 py-2 border-b-2 ${
            activeTab === "control"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Sliders className="w-4 h-4 mr-2" />
          Control
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center px-4 py-2 border-b-2 ${
            activeTab === "settings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === "control" ? (
          <VernierControl
            value={vernierPosition}
            settings={settings}
            movementRange={movementRange}
            onChange={onVernierChange}
          />
        ) : (
          <SettingsPanel
            settings={settings}
            onSettingsChange={onSettingsChange}
            isOpen={true}
            onToggle={() => {}}
            movementRange={movementRange}
          />
        )}
      </div>
    </div>
  );
};

export default ControlWindow;
