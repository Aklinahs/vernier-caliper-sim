import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Vernier Caliper Sim
          </Link>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link
                to="/simulator"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Simulator
              </Link>
              <Link
                to="/practice"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Practice
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
