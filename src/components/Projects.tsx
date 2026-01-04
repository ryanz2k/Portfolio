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
      description: 'A comprehensive point-of-sale system with inventory management capabilities, designed for efficient business operations.',
      icon: <FaShoppingCart />,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      category: 'Full Stack'
    },
    {
      title: 'SmartQuest - Gamified Learning Application',
      description: 'An innovative educational platform that gamifies learning experiences, making education more engaging and interactive.',
      icon: <IoMdSchool />,
      technologies: ['React', 'Firebase', 'Unity'],
      category: 'Web & Game'
    },
    {
      title: 'EverTale - Roguelike Game',
      description: 'A procedurally generated roguelike game featuring dynamic gameplay and engaging mechanics.',
      icon: <FaGamepad />,
      technologies: ['Unity', 'C#'],
      category: 'Game Development'
    },
    {
      title: 'Enrollment System',
      description: 'A complete enrollment management system for educational institutions with user-friendly interface and robust functionality.',
      icon: <FaGraduationCap />,
      technologies: ['Java', 'SQLite', 'Swing'],
      category: 'Desktop Application'
    },
    {
      title: 'Audio Media Player',
      description: 'A feature-rich media player application with modern UI and comprehensive audio playback capabilities.',
      icon: <FaMusic />,
      technologies: ['Java', 'JavaFX'],
      category: 'Desktop Application'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Projects</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-primary-600 text-4xl mb-4">
                {project.icon}
              </div>
              
              <div className="mb-2">
                <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
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

