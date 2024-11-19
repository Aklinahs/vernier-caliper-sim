import { Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">
              Vernier Caliper Simulation
            </h3>
            <p className="mt-1 text-sm">
              Developed by{" "}
              <span className="text-blue-400">Shanilka Ariyarathne</span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="mailto:Shanilka.Ariyarathne@gmail.com"
              className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              title="Email"
            >
              <Mail className="h-5 w-5" />
              <span className="hidden sm:inline">Contact</span>
            </a>
            <a
              href="https://github.com/Aklinahs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/shanilka-ariyarathne"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
