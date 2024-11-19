import { useState, useEffect, useCallback, useMemo } from "react";
import { ZoomIn, ZoomOut, Move } from "lucide-react";
import { CaliperSettings, CaliperPosition } from "../../types/simulator.types";

interface CaliperDisplayProps {
  settings: CaliperSettings;
  vernierPosition: number;
  movementRange: number;
  onPositionChange?: (position: CaliperPosition) => void;
}

const CaliperDisplay = ({
  settings,
  vernierPosition,
  movementRange,
  onPositionChange,
}: CaliperDisplayProps) => {
  const [imageStatus, setImageStatus] = useState({
    base: false,
    mainScale: false,
    vernierScale: false,
  });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate zero error offset
  const zeroErrorOffset = useMemo(() => {
    return (
      ((-1 * settings.zeroError) / settings.mainScaleLength) * movementRange
    );
  }, [settings.zeroError, settings.mainScaleLength, movementRange]);

  // Get image paths based on environment
  const getImagePath = useCallback((path: string) => {
    return import.meta.env.DEV
      ? `assets/caliper/${path}`
      : `/vernier-caliper-sim/assets/caliper/${path}`;
  }, []);

  // Handle zoom controls
  const handleZoom = useCallback((direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in" && prev < 3) return prev + 0.5;
      if (direction === "out" && prev > 1) return prev - 0.5;
      return prev;
    });
  }, []);

  // Calculate and update position
  useEffect(() => {
    if (onPositionChange) {
      onPositionChange({
        mainScale: (zeroErrorOffset / movementRange) * settings.mainScaleLength,
        vernierScale:
          (vernierPosition / movementRange) * settings.mainScaleLength,
      });
    }
  }, [
    zeroErrorOffset,
    vernierPosition,
    movementRange,
    settings.mainScaleLength,
    onPositionChange,
  ]);

  return (
    <div className="flex flex-col gap-4">
      {/* Control Panel */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">
            {(
              (vernierPosition / movementRange) *
              settings.mainScaleLength
            ).toFixed(2)}{" "}
            mm
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom("out")}
            disabled={zoom <= 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium px-2">{zoom.toFixed(1)}x</span>
          <button
            onClick={() => handleZoom("in")}
            disabled={zoom >= 3}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Caliper Display */}
      <div
        className={`relative w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ height: "240px" }}
      >
        <div className="relative w-full h-full overflow-auto">
          <div
            className="relative transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: `${100 / zoom}%`,
              height: `${100 / zoom}%`,
              minWidth: "100%",
              minHeight: "100%",
            }}
          >
            {/* Base Layer */}
            <div className="absolute inset-0">
              <img
                src={getImagePath("base/jaw-base.png")}
                alt="Caliper base"
                className="w-full h-auto"
                onLoad={() =>
                  setImageStatus((prev) => ({ ...prev, base: true }))
                }
                onError={() =>
                  setImageStatus((prev) => ({ ...prev, base: false }))
                }
              />
            </div>

            {/* Main Scale Layer */}
            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{ transform: `translateX(${zeroErrorOffset}%)` }}
            >
              <img
                src={getImagePath(
                  `main-scale/ms-${settings.mainScaleLength}.png`
                )}
                alt="Main scale"
                className="w-full h-auto"
                onLoad={() =>
                  setImageStatus((prev) => ({ ...prev, mainScale: true }))
                }
                onError={() =>
                  setImageStatus((prev) => ({ ...prev, mainScale: false }))
                }
              />
            </div>

            {/* Vernier Scale Layer */}
            <div
              className="absolute inset-0 transition-transform duration-150"
              style={{ transform: `translateX(${vernierPosition}%)` }}
            >
              <img
                src={getImagePath(
                  `vernier-scale/vs-${settings.mainScaleLength}/vs-${settings.mainScaleLength}-${settings.vernierDivisions}.png`
                )}
                alt="Vernier scale"
                className="w-full h-auto"
                onLoad={() =>
                  setImageStatus((prev) => ({ ...prev, vernierScale: true }))
                }
                onError={() =>
                  setImageStatus((prev) => ({ ...prev, vernierScale: false }))
                }
              />
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {!Object.values(imageStatus).every(Boolean) && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-gray-600">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaliperDisplay;
