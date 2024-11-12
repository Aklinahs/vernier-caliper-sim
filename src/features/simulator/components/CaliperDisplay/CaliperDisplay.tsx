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
    const baseUrl = import.meta.env.DEV ? "" : "/vernier-caliper-sim";
    return `${baseUrl}${path}`;
  };

  return (
    <div
      className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        src={getImagePath("assets/caliper/base/jaw-base.png")}
        alt="Caliper base"
        className="absolute top-0 left-0 pointer-events-none"
      />
      <img
        src={getImagePath(
          `assets/caliper/main-scale/ms-${settings.mainScaleLength}.png`
        )}
        alt="Main scale"
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          transform: `translateX(${position.mainScale}px)`,
        }}
      />
      <img
        src={getImagePath(
          `assets/caliper/vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`
        )}
        alt="Vernier scale"
        className="absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
};

export default CaliperDisplay;
