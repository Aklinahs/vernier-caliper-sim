import { useState } from "react";
import { Ruler } from "lucide-react";
import UnderConstruction from "../../../components/common/UnderConstruction/UnderConstruction";
import CaliperDisplay from "./CaliperDisplay/CaliperDisplay";
import VernierControl from "./VernierControl/VernierControl";
import { CaliperSettings, CaliperPosition } from "../types/simulator.types";

const SimulatorPage = () => {
  const [settings] = useState<CaliperSettings>({
    mainScaleLength: 100,
    mainScaleDivision: 1,
    vernierDivisions: 10,
    units: "mm",
    zeroError: 0,
  });

  // Define the pixel movement range for vernier scale
  const VERNIER_MOVEMENT_RANGE = 672; // Adjust this value based on your image size
  const [vernierPosition, setVernierPosition] = useState(0);

  const handlePositionChange = (position: CaliperPosition) => {
    console.log("Position changed:", position);
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
          onPositionChange={handlePositionChange}
        />
        <VernierControl
          value={vernierPosition}
          maxValue={settings.mainScaleLength}
          movementRange={VERNIER_MOVEMENT_RANGE}
          onChange={setVernierPosition}
        />
      </div>
    </div>
  );
};

export default SimulatorPage;
