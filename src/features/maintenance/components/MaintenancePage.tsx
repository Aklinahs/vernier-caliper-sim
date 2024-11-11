import React from "react";
import { Construction } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-blue-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          Vernier Caliper Simulation
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Under Construction
          </h2>
          <p className="text-gray-600 text-lg">
            We're building an interactive Vernier caliper simulation to help you
            learn and practice measurements. Coming soon!
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          🚧 Development in Progress 🚧
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
