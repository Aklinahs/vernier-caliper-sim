// src/features/simulator/components/CaliperDisplay/CaliperDisplay.tsx

import { useState } from "react";
import { CaliperSettings, CaliperPosition } from "../../types/simulator.types";

interface CaliperDisplayProps {
  settings: CaliperSettings;
  onPositionChange?: (position: CaliperPosition) => void;
}

const CaliperDisplay = ({
  settings,
  onPositionChange,
}: CaliperDisplayProps) => {
  const [position, setPosition] = useState<CaliperPosition>({
    mainScale: 0,
    vernierScale: 0,
  });

  return (
    <div className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Base image */}
      <img
        src="src/assets/caliper/base/jaw-base.png"
        alt="Caliper base"
        className="absolute top-0 left-0"
      />

      {/* Main scale */}
      <img
        src={`src/assets/caliper/main-scale/ms-${settings.mainScaleLength}.png`}
        alt="Main scale"
        className="absolute top-0 left-0"
      />

      {/* Vernier scale */}
      <img
        src={`src/assets/caliper/vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`}
        alt="Vernier scale"
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default CaliperDisplay;
