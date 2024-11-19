// src/features/practice/components/common/LoadingSpinner/LoadingSpinner.tsx

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;