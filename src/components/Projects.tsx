import { FaGamepad, FaShoppingCart, FaGraduationCap, FaMusic, FaMobileAlt, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'
import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  icon: JSX.Element
  technologies: string[]
  category: string
  link?: string
  github?: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'EL Health - E-Commerce Website',
      description: 'Comprehensive e-commerce platform with variant pricing and admin features. (Work in Progress)',
      icon: <FaShoppingCart />,
      technologies: ['Next.js', 'React', 'Prisma', 'Tailwind CSS', 'Vercel'],
      category: 'Full Stack',
      link: 'https://el-health-wellness-production.up.railway.app/',
      github: 'https://github.com/ryanz2k/el-health-wellness'
    },
    {
      title: 'CubeTech Agency',
      description: 'Spec Work: A responsive agency website featuring a polaroid-style image collage and custom CSS animations.',
      icon: <FaGamepad />, // You can change this icon if you prefer
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      link: 'https://ryanz2k.github.io/CubeTech/',
      github: 'https://github.com/ryanz2k/CubeTech'
    },
    {
      title: 'Smart Desk Posture',
      description: 'IoT solution monitoring desk posture using an ESP32 microcontroller and Android application.',
      icon: <FaMobileAlt />,
      technologies: ['Kotlin', 'C++', 'Firebase', 'Arduino', 'IoT'],
      category: 'Mobile & IoT',
      github: 'https://github.com/ryanz2k/SmartDeskPosture'
    },
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
      category: 'Web & Game',
      link: 'https://smartquest-uc.web.app/',
      github: 'https://github.com/ryanz2k/SmartQuest'
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl p-6 transition-all duration-300 border border-gray-700 hover:border-primary-500/50 flex flex-col group hover:-translate-y-2"
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

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.link || project.github) && (
                <div className="flex gap-4 mt-auto pt-4 border-t border-gray-600/50">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-400 flex items-center gap-2 text-sm transition-colors"
                    >
                      <FaExternalLinkAlt /> View
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-400 flex items-center gap-2 text-sm transition-colors"
                    >
                      <FaGithub /> Source
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
