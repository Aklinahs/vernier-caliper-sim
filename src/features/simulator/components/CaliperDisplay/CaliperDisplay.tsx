import { useState, useEffect } from "react";
import { CaliperSettings, CaliperPosition } from "../../types/simulator.types";

interface CaliperDisplayProps {
  settings: CaliperSettings;
  vernierPosition: number; // New prop for vernier position
  onPositionChange?: (position: CaliperPosition) => void;
}

const CaliperDisplay = ({
  settings,
  vernierPosition,
  onPositionChange,
}: CaliperDisplayProps) => {
  const [imageStatus, setImageStatus] = useState({
    base: false,
    mainScale: false,
    vernierScale: false,
  });

  // Function to get correct image path
  const getImagePath = (path: string) => {
    return import.meta.env.DEV
      ? `assets/caliper/${path}`
      : `/vernier-caliper-sim/assets/caliper/${path}`;
  };

  useEffect(() => {
    const position = {
      mainScale: 0, // Main scale is now fixed
      vernierScale: vernierPosition,
    };
    onPositionChange?.(position);
  }, [vernierPosition, onPositionChange]);

  return (
    <div className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Debug information */}
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs z-50">
        <div>Image Loading Status:</div>
        <div>Base: {imageStatus.base ? "✅" : "❌"}</div>
        <div>Main Scale: {imageStatus.mainScale ? "✅" : "❌"}</div>
        <div>Vernier Scale: {imageStatus.vernierScale ? "✅" : "❌"}</div>
        <div className="mt-2">Current Paths:</div>
        <div className="text-[8px]">{getImagePath("base/jaw-base.png")}</div>
      </div>

      <div className="relative w-full h-full">
        <img
          src={getImagePath("base/jaw-base.png")}
          alt="Caliper base"
          className="absolute top-0 left-0"
          onLoad={() => setImageStatus((prev) => ({ ...prev, base: true }))}
          onError={(e) => {
            console.error("Failed to load base image:", e.currentTarget.src);
            setImageStatus((prev) => ({ ...prev, base: false }));
          }}
        />
        <img
          src={getImagePath(`main-scale/ms-${settings.mainScaleLength}.png`)}
          alt="Main scale"
          className="absolute top-0 left-0"
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
        <img
          src={getImagePath(
            `vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`
          )}
          alt="Vernier scale"
          className="absolute top-0 left-0"
          style={{
            transform: `translateX(${vernierPosition}px)`,
            transition: "transform 0.1s ease-out", // Optional: adds smooth movement
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
  );
};

export default CaliperDisplay;
