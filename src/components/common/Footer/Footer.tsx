// src/components/common/Footer/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-300">
              Educational simulation tool for learning Vernier caliper
              measurements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Simulator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              GitHub:{" "}
              <a
                href="https://github.com/Aklinahs/vernier-caliper-sim"
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                vernier-caliper-sim
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Vernier Caliper Simulator. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
