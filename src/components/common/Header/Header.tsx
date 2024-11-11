// src/components/common/Header/Header.tsx
import React from "react";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Vernier Caliper Sim
            </h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Simulator
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Guide
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
