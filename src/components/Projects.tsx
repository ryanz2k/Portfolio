import { FaGamepad, FaShoppingCart, FaGraduationCap, FaMusic } from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'

interface Project {
  title: string
  description: string
  icon: JSX.Element
  technologies: string[]
  category: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Inventory Management & POS System',
      description: 'Point-of-sale system with inventory management for business operations.',
      icon: <FaShoppingCart />,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      category: 'Full Stack'
    },
    {
      title: 'SmartQuest - Gamified Learning Application',
      description: 'Educational platform that gamifies learning experiences.',
      icon: <IoMdSchool />,
      technologies: ['React', 'Firebase', 'Unity'],
      category: 'Web & Game'
    },
    {
      title: 'EverTale - Roguelike Game',
      description: 'Procedurally generated roguelike game with dynamic gameplay.',
      icon: <FaGamepad />,
      technologies: ['Unity', 'C#'],
      category: 'Game Development'
    },
    {
      title: 'Enrollment System',
      description: 'Enrollment management system for educational institutions.',
      icon: <FaGraduationCap />,
      technologies: ['Java', 'SQLite', 'Swing'],
      category: 'Desktop Application'
    },
    {
      title: 'Audio Media Player',
      description: 'Media player application with audio playback features.',
      icon: <FaMusic />,
      technologies: ['Java', 'JavaFX'],
      category: 'Desktop Application'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Projects</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-600"
            >
              <div className="text-primary-400 text-4xl mb-4">
                {project.icon}
              </div>
              
              <div className="mb-2">
                <span className="inline-block bg-primary-500/20 text-primary-300 text-xs font-semibold px-2 py-1 rounded border border-primary-500/30">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-100 mb-3">{project.title}</h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
