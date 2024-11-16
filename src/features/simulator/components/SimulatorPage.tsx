// src/features/simulator/components/SimulatorPage.tsx

import { useState } from "react";
import { Ruler } from "lucide-react";
import UnderConstruction from "../../../components/common/UnderConstruction/UnderConstruction";
import CaliperDisplay from "./CaliperDisplay/CaliperDisplay";
import VernierControl from "./VernierControl/VernierControl";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import { CaliperSettings, CaliperPosition } from "../types/simulator.types";

const MOVEMENT_RANGE = 75; // Using percentage (0-100)

const SimulatorPage = () => {
  const [settings, setSettings] = useState<CaliperSettings>({
    mainScaleLength: 100,
    mainScaleDivision: 1,
    vernierDivisions: 10,
    units: "mm",
    zeroError: 0,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [vernierPosition, setVernierPosition] = useState(0);

  const handlePositionChange = (position: CaliperPosition) => {
    console.log("Position changed:", position);
  };

  const handleSettingsChange = (newSettings: CaliperSettings) => {
    setSettings(newSettings);
    setVernierPosition(0);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <UnderConstruction
        title="Vernier Caliper Simulator"
        description="Our interactive simulation tool is coming soon. You'll be able to practice measurements with a virtual vernier caliper."
        icon={<Ruler className="w-12 h-12 text-blue-500" />}
      />

      <div className="mt-8 max-w-4xl mx-auto">
        <CaliperDisplay
          settings={settings}
          vernierPosition={vernierPosition}
          movementRange={MOVEMENT_RANGE}
          onPositionChange={handlePositionChange}
        />
        <VernierControl
          value={vernierPosition}
          settings={settings}
          movementRange={MOVEMENT_RANGE}
          onChange={setVernierPosition}
        />
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          isOpen={isSettingsOpen}
          onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
        />
      </div>
    </div>
  );
};

export default SimulatorPage;
