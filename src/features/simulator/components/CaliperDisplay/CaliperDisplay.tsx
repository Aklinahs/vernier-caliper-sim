import { useState, useEffect, useCallback } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [imageStatus, setImageStatus] = useState({
    base: false,
    mainScale: false,
    vernierScale: false,
  });

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const newMainScale = Math.max(
        0,
        Math.min(position.mainScale + deltaX * 0.1, settings.mainScaleLength)
      );

      const newPosition = {
        mainScale: newMainScale,
        vernierScale: newMainScale % settings.mainScaleDivision,
      };

      setPosition(newPosition);
      setStartX(e.clientX);
      onPositionChange?.(newPosition);
    },
    [isDragging, startX, position, settings, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // Function to get correct image path
  const getImagePath = (path: string) => {
    return import.meta.env.DEV
      ? `assets/caliper/${path}`
      : `/vernier-caliper-sim/assets/caliper/${path}`;
  };

  // Log when component mounts
  useEffect(() => {
    console.log("Environment:", import.meta.env.MODE);
    console.log("Base URL:", import.meta.env.BASE_URL);
    console.log("Image paths:");
    console.log("- Base:", getImagePath("base/jaw-base.png"));
    console.log(
      "- Main Scale:",
      getImagePath(`main-scale/ms-${settings.mainScaleLength}.png`)
    );
    console.log(
      "- Vernier Scale:",
      getImagePath(
        `vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`
      )
    );
  }, [settings]);

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

      <div
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <img
          src={getImagePath("base/jaw-base.png")}
          alt="Caliper base"
          className="absolute top-0 left-0 pointer-events-none"
          onLoad={() => setImageStatus((prev) => ({ ...prev, base: true }))}
          onError={(e) => {
            console.error("Failed to load base image:", e.currentTarget.src);
            setImageStatus((prev) => ({ ...prev, base: false }));
          }}
        />
        <img
          src={getImagePath(`main-scale/ms-${settings.mainScaleLength}.png`)}
          alt="Main scale"
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            transform: `translateX(${position.mainScale}px)`,
          }}
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
          className="absolute top-0 left-0 pointer-events-none"
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
