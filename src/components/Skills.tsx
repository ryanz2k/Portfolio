import { FaCode, FaDatabase, FaGamepad, FaTools, FaJava } from 'react-icons/fa'
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiC,
  SiCplusplus,
  SiKotlin,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSqlite,
  SiFirebase,
  SiUnity,
  SiWordpress,
  SiShopify,
  SiTailwindcss,
  SiVite,
  SiGoogleads,
  SiGoogleanalytics
} from 'react-icons/si'

interface SkillCategory {
  title: string
  icon: JSX.Element
  skills: Array<{
    name: string
    icon: JSX.Element
  }>
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: <FaCode />,
      skills: [
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Python', icon: <SiPython /> },
        { name: 'Java', icon: <FaJava /> },
        { name: 'C', icon: <SiC /> },
        { name: 'C++', icon: <SiCplusplus /> },
        { name: 'Kotlin', icon: <SiKotlin /> }
      ]
    },
    {
      title: 'Frameworks & Tools',
      icon: <FaTools />,
      skills: [
        { name: 'React', icon: <SiReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'Vite', icon: <SiVite /> },
        { name: 'Node.js', icon: <SiNodedotjs /> },
        { name: 'Express.js', icon: <SiExpress /> }
      ]
    },
    {
      title: 'Databases',
      icon: <FaDatabase />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'SQLite', icon: <SiSqlite /> },
        { name: 'Firebase', icon: <SiFirebase /> }
      ]
    },
    {
      title: 'Game Development',
      icon: <FaGamepad />,
      skills: [
        { name: 'Unity', icon: <SiUnity /> },
        { name: 'Godot', icon: <FaCode /> }
      ]
    },
    {
      title: 'Platforms & E-Commerce',
      icon: <FaTools />,
      skills: [
        { name: 'WordPress', icon: <SiWordpress /> },
        { name: 'Shopify', icon: <SiShopify /> },
        { name: 'Google Ads', icon: <SiGoogleads /> },
        { name: 'Google Analytics', icon: <SiGoogleanalytics /> }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Skills & Knowledge</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="text-primary-400 text-3xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-100">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    <span className="text-primary-400 mr-3 text-xl flex-shrink-0">
                      {skill.icon}
                    </span>
                    <span className="text-gray-200 font-medium">{skill.name}</span>
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
