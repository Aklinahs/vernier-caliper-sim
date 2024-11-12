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

  // Handle mouse down event
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  // Handle mouse move event
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
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

      // Notify parent component about position change
      onPositionChange?.(newPosition);
    },
    [isDragging, startX, position, settings, onPositionChange]
  );

  // Handle mouse up event
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove window-level event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        src="src/assets/caliper/base/jaw-base.png"
        alt="Caliper base"
        className="absolute top-0 left-0 pointer-events-none"
      />
      <img
        src={`src/assets/caliper/main-scale/ms-${settings.mainScaleLength}.png`}
        alt="Main scale"
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          transform: `translateX(${position.mainScale}px)`,
        }}
      />
      <img
        src={`src/assets/caliper/vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`}
        alt="Vernier scale"
        className="absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
};

export default CaliperDisplay;
