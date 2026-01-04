import { FaCode, FaDatabase, FaGamepad } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiMongodb, SiFirebase, SiUnity, SiWordpress, SiShopify } from 'react-icons/si'

interface SkillCategory {
  title: string
  icon: JSX.Element
  skills: string[]
  icons?: { [key: string]: JSX.Element }
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: <FaCode />,
      skills: ['C', 'C++', 'Java', 'Kotlin', 'Python', 'Javascript']
    },
    {
      title: 'Frameworks & Databases',
      icon: <FaDatabase />,
      skills: ['ReactJS', 'Express.js', 'Node.js', 'MongoDB', 'SQLite', 'Firebase Realtime Database'],
      icons: {
        'ReactJS': <SiReact />,
        'Express.js': <SiNodedotjs />,
        'Node.js': <SiNodedotjs />,
        'MongoDB': <SiMongodb />,
        'Firebase Realtime Database': <SiFirebase />
      }
    },
    {
      title: 'Game Development',
      icon: <FaGamepad />,
      skills: ['Unity Game Engine', 'Godot Engine'],
      icons: {
        'Unity Game Engine': <SiUnity />
      }
    },
    {
      title: 'Platforms & Tools',
      icon: <FaCode />,
      skills: ['WordPress', 'Shopify', 'Google Ads', 'Google Analytics', 'Google Merchant Center'],
      icons: {
        'WordPress': <SiWordpress />,
        'Shopify': <SiShopify />
      }
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills & Knowledge</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="text-primary-600 text-3xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    {category.icons && category.icons[skill] && (
                      <span className="text-primary-600 mr-3 text-xl">
                        {category.icons[skill]}
                      </span>
                    )}
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

