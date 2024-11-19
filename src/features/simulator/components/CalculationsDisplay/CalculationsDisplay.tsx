// src/features/simulator/components/CalculationsDisplay/CalculationsDisplay.tsx

import React from "react";
import { Info, Calculator } from "lucide-react";
import { CalculationsDisplayProps } from "../../types/simulator.types";

interface StepBoxProps {
  title: string;
  children: React.ReactNode;
  isHighlighted?: boolean;
}

const StepBox: React.FC<StepBoxProps> = ({
  title,
  children,
  isHighlighted = false,
}) => (
  <div
    className={`border rounded-lg p-3 ${
      isHighlighted
        ? "bg-blue-50/50 border-blue-200"
        : "bg-gray-50/50 border-gray-200"
    }`}
  >
    <h4 className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
      {title}
      {isHighlighted && <Info size={14} className="text-blue-500" />}
    </h4>
    {children}
  </div>
);

const CalculationsDisplay: React.FC<CalculationsDisplayProps> = ({
  position,
  settings,
  isDetailedView,
  className = "",
}) => {
  const leastCount = settings.mainScaleDivision / settings.vernierDivisions;
  const mainScaleOffset = settings.zeroError;
  const totalOffset = position.vernierScale + mainScaleOffset;
  const mainScaleReading = Math.floor(totalOffset);
  const vernierDecimal = totalOffset - mainScaleReading;
  const vernierDivisionCoinciding = Math.round(
    vernierDecimal * settings.vernierDivisions
  );
  const vernierReading = vernierDivisionCoinciding * leastCount;
  const observedValue = mainScaleReading + vernierReading;
  const actualValue = observedValue - settings.zeroError;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mt-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-gray-500" />
          <h3 className="text-base font-medium text-gray-700">
            Measurement Calculations
          </h3>
        </div>
      </div>

      {/* Calculations Grid */}
      <div className="grid gap-3">
        {/* Step 1: Least Count */}
        {isDetailedView && (
          <StepBox title="Step 1: Calculate Least Count">
            <div className="space-y-1.5">
              <p className="text-xs text-gray-600">
                Formula: Main Scale Division ÷ Number of Vernier Divisions
              </p>
              <div className="bg-white p-2 rounded border border-gray-200">
                <p className="text-xs">
                  = {settings.mainScaleDivision} mm ÷{" "}
                  {settings.vernierDivisions}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  = {leastCount.toFixed(3)} mm
                </p>
              </div>
              <p className="text-xs text-gray-500 italic">
                Smallest measurable value
              </p>
            </div>
          </StepBox>
        )}

        {/* Step 2: Observed Readings */}
        <StepBox title="Step 2: Observed Readings">
          <div className="space-y-1.5">
            <div className="bg-white p-2 rounded border border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Main Scale</p>
                  <p className="text-sm">{Math.floor(observedValue)} mm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vernier Division</p>
                  <p className="text-sm">{vernierDivisionCoinciding}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vernier Reading</p>
                  <p className="text-sm">{vernierReading.toFixed(3)} mm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Observed Value</p>
                  <p className="text-sm font-medium text-blue-600">
                    {observedValue.toFixed(3)} mm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </StepBox>

        {/* Step 3: Zero Error Correction */}
        <StepBox
          title="Step 3: Zero Error Correction"
          isHighlighted={settings.zeroError !== 0}
        >
          <div className="space-y-1.5">
            {settings.zeroError === 0 ? (
              <p className="text-xs text-gray-600">
                No zero error correction needed
              </p>
            ) : (
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Zero Error:</span>
                    <span className="text-sm">{settings.zeroError} mm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Observed Value:
                    </span>
                    <span className="text-sm">
                      {observedValue.toFixed(3)} mm
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-1"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Actual Value:</span>
                    <span className="text-sm font-medium text-blue-600">
                      {actualValue.toFixed(3)} mm
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </StepBox>

        {/* Step 4: Final Result */}
        <StepBox title="Final Measurement" isHighlighted={true}>
          <div className="bg-white p-2 rounded border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600">Final Reading:</span>
              <span className="text-base font-medium text-blue-700">
                {actualValue.toFixed(3)} mm
              </span>
            </div>
          </div>
          {settings.zeroError !== 0 && (
            <p className="text-xs text-gray-500 italic mt-1.5">
              Includes correction for{" "}
              {settings.zeroError > 0 ? "positive" : "negative"} zero error
            </p>
          )}
        </StepBox>
      </div>
    </div>
  );
};

export default CalculationsDisplay;
