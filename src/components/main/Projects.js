
import projects from '../../data/projects.json';

const Projects = () => {
    return (
      <section id="projects" className="bg-gray-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-sm text-gray-500 mb-4">Tech Stack: {project.techStack}</p>
              <a href={project.link} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  };

export default Projects;