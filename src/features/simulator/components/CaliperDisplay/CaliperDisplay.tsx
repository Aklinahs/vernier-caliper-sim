// src/features/simulator/components/CaliperDisplay/CaliperDisplay.tsx

import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
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
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate least count and step value
  const leastCount = settings.mainScaleDivision / settings.vernierDivisions;

  // Calculate zero error offset using the same scaling as vernier movement
  const zeroErrorOffset =
    (settings.zeroError / settings.mainScaleLength) * movementRange;

  const getImagePath = (path: string) => {
    return import.meta.env.DEV
      ? `assets/caliper/${path}`
      : `/vernier-caliper-sim/assets/caliper/${path}`;
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prevZoom) => {
      const newZoom =
        direction === "in"
          ? Math.min(prevZoom + 0.25, 3)
          : Math.max(prevZoom - 0.25, 1);
      return newZoom;
    });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScroll({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  };

  // Update position calculation in useEffect
  useEffect(() => {
    const position = {
      mainScale: (zeroErrorOffset / movementRange) * settings.mainScaleLength,
      vernierScale:
        (vernierPosition / movementRange) * settings.mainScaleLength,
    };
    onPositionChange?.(position);
  }, [
    vernierPosition,
    zeroErrorOffset,
    movementRange,
    onPositionChange,
    settings.mainScaleLength,
  ]);

  return (
    <div className="relative">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-50 flex gap-2">
        <button
          onClick={() => handleZoom("in")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          disabled={zoom >= 3}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          disabled={zoom <= 1}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Debug information */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 text-xs z-50">
        <div>Image Loading Status:</div>
        <div>Base: {imageStatus.base ? "✅" : "❌"}</div>
        <div>Main Scale: {imageStatus.mainScale ? "✅" : "❌"}</div>
        <div>Vernier Scale: {imageStatus.vernierScale ? "✅" : "❌"}</div>
        <div>Position: {vernierPosition.toFixed(1)}%</div>
        <div>Zero Error: {settings.zeroError.toFixed(3)} mm</div>
        <div>Zoom: {zoom.toFixed(1)}x</div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="relative w-full h-64 bg-white rounded-lg shadow-md overflow-auto"
        onScroll={handleScroll}
      >
        {/* Content Container with Zoom */}
        <div
          className="relative"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            width: `${100 / zoom}%`,
            height: `${100 / zoom}%`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          {/* Fixed Position Base Layer */}
          <div className="absolute top-0 left-0 w-full h-full">
            <img
              src={getImagePath("base/jaw-base.png")}
              alt="Caliper base"
              className="w-full h-auto"
              onLoad={() => setImageStatus((prev) => ({ ...prev, base: true }))}
              onError={(e) => {
                console.error(
                  "Failed to load base image:",
                  e.currentTarget.src
                );
                setImageStatus((prev) => ({ ...prev, base: false }));
              }}
            />
          </div>

          {/* Main Scale Layer with Zero Error Offset */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translateX(${zeroErrorOffset}%)`,
              transition: "transform 0.3s ease-out",
            }}
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
              onError={(e) => {
                console.error(
                  "Failed to load main scale image:",
                  e.currentTarget.src
                );
                setImageStatus((prev) => ({ ...prev, mainScale: false }));
              }}
            />
          </div>

          {/* Vernier Scale Layer */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translateX(${vernierPosition}%)`,
              transition: "transform 0.1s ease-out",
            }}
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

      {/* Horizontal Scroll Bar (only visible when zoomed) */}
      {zoom > 1 && (
        <div className="w-full h-2 bg-gray-200 mt-2 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{
              width: `${100 / zoom}%`,
              transform: `translateX(${
                (scroll.x / (containerRef.current?.scrollWidth || 1)) * 100
              }%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CaliperDisplay;
