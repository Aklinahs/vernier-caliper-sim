// src/features/simulator/components/CaliperDisplay/CaliperDisplay.tsx

import { useState, useEffect } from "react";
import { CaliperSettings, CaliperPosition } from "../../types/simulator.types";

interface CaliperDisplayProps {
  settings: CaliperSettings;
  vernierPosition: number;
  movementRange: number; // Add this line
  onPositionChange?: (position: CaliperPosition) => void;
}

const CaliperDisplay = ({
  settings,
  vernierPosition,
  movementRange, // Add this line
  onPositionChange,
}: CaliperDisplayProps) => {
  const [imageStatus, setImageStatus] = useState({
    base: false,
    mainScale: false,
    vernierScale: false,
  });

  const getImagePath = (path: string) => {
    return import.meta.env.DEV
      ? `assets/caliper/${path}`
      : `/vernier-caliper-sim/assets/caliper/${path}`;
  };

  useEffect(() => {
    console.log("Debug Values:", {
      vernierPosition,
      movementRange,
      mainScaleLength: settings.mainScaleLength,
      calculation: (vernierPosition / movementRange) * settings.mainScaleLength,
    });

    const position = {
      mainScale: 0,
      vernierScale:
        (vernierPosition / movementRange) * settings.mainScaleLength,
    };
    onPositionChange?.(position);
  }, [
    vernierPosition,
    movementRange,
    onPositionChange,
    settings.mainScaleLength,
  ]);

  console.log("vernierPosition:", vernierPosition);

  return (
    <div className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Debug information */}
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs z-50">
        <div>Image Loading Status:</div>
        <div>Base: {imageStatus.base ? "✅" : "❌"}</div>
        <div>Main Scale: {imageStatus.mainScale ? "✅" : "❌"}</div>
        <div>Vernier Scale: {imageStatus.vernierScale ? "✅" : "❌"}</div>
        <div>Position: {vernierPosition.toFixed(1)}%</div>
      </div>

      <div className="relative w-full h-full">
        <img
          src={getImagePath("base/jaw-base.png")}
          alt="Caliper base"
          className="absolute top-0 left-0 w-full h-auto"
          onLoad={() => setImageStatus((prev) => ({ ...prev, base: true }))}
          onError={(e) => {
            console.error("Failed to load base image:", e.currentTarget.src);
            setImageStatus((prev) => ({ ...prev, base: false }));
          }}
        />
        <img
          src={getImagePath(`main-scale/ms-${settings.mainScaleLength}.png`)}
          alt="Main scale"
          className="absolute top-0 left-0 w-full h-auto"
          onLoad={() =>
            setImageStatus((prev) => ({ ...prev, mainScale: true }))
          }
          onError={(e) => {
            console.error(
              "Failed to load main scale image:",
              e.currentTarget.src
            );
            setImageStatus((prev) => ({ ...prev, mainScale: false }));
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={getImagePath(
              `vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`
            )}
            alt="Vernier scale"
            className="absolute top-0 h-auto"
            style={{
              width: "100%",
              left: `${vernierPosition}%`,
              transform: "translateX(-${vernierPosition}%)",
              transition: "left 0.1s ease-out",
            }}
            onLoad={() =>
              setImageStatus((prev) => ({ ...prev, vernierScale: true }))
            }
            onError={(e) => {
              console.error(
                "Failed to load vernier scale image:",
                e.currentTarget.src
              );
              setImageStatus((prev) => ({ ...prev, vernierScale: false }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CaliperDisplay;
