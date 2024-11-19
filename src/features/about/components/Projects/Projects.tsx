// src/features/about/components/Projects/Projects.tsx

import { Project } from "../../types/about.types";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects: Project[] = []; // Empty array for future projects

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800"
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Projects coming soon!</p>
          <p className="text-sm">Check back later for updates</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
