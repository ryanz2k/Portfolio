import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaGamepad, FaTools, FaJava } from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiPython, SiC, SiCplusplus, SiKotlin,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSqlite, SiFirebase,
  SiUnity, SiWordpress, SiShopify, SiTailwindcss, SiVite, SiGoogleads,
  SiGoogleanalytics, SiNextdotjs, SiPrisma, SiBlazor, SiVercel, SiPaypal, SiRailway,
} from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'

const SECTION_NUMBER = '04'

interface SkillItem {
  name: string
  icon: JSX.Element
}

interface SkillCategory {
  title: string
  icon: JSX.Element
  skills: SkillItem[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    icon: <FaCode />,
    skills: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python',     icon: <SiPython /> },
      { name: 'Java',       icon: <FaJava /> },
      { name: 'C',          icon: <SiC /> },
      { name: 'C++',        icon: <SiCplusplus /> },
      { name: 'C#',         icon: <TbBrandCSharp /> },
      { name: 'Kotlin',     icon: <SiKotlin /> },
    ],
  },
  {
    title: 'FRAMEWORKS',
    icon: <FaTools />,
    skills: [
      { name: 'React',        icon: <SiReact /> },
      { name: 'Next.js',      icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Blazor',       icon: <SiBlazor /> },
      { name: 'Vite',         icon: <SiVite /> },
      { name: 'Node.js',      icon: <SiNodedotjs /> },
      { name: 'Express.js',   icon: <SiExpress /> },
    ],
  },
  {
    title: 'DATABASES',
    icon: <FaDatabase />,
    skills: [
      { name: 'MongoDB',  icon: <SiMongodb /> },
      { name: 'SQLite',   icon: <SiSqlite /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Prisma',   icon: <SiPrisma /> },
    ],
  },
  {
    title: 'GAME DEV',
    icon: <FaGamepad />,
    skills: [
      { name: 'Unity', icon: <SiUnity /> },
      { name: 'Godot', icon: <FaCode /> },
    ],
  },
  {
    title: 'PLATFORMS',
    icon: <FaTools />,
    skills: [
      { name: 'WordPress',        icon: <SiWordpress /> },
      { name: 'Shopify',          icon: <SiShopify /> },
      { name: 'Vercel',           icon: <SiVercel /> },
      { name: 'Railway',          icon: <SiRailway /> },
      { name: 'PayPal',           icon: <SiPaypal /> },
      { name: 'Google Ads',       icon: <SiGoogleads /> },
      { name: 'Google Analytics', icon: <SiGoogleanalytics /> },
    ],
  },
]

const SkillCell = ({ skill, delay }: { skill: SkillItem; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.1, y: -3 }}
    className="flex flex-col items-center gap-2 p-3 group"
    style={{
      border: '1px solid rgba(255,34,68,0.15)',
      background: 'rgba(255,34,68,0.03)',
      cursor: 'default',
      willChange: 'transform',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget
      el.style.borderColor = 'rgba(255,34,68,0.7)'
      el.style.background   = 'rgba(255,34,68,0.1)'
      el.style.boxShadow    = '0 0 16px rgba(255,34,68,0.3)'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget
      el.style.borderColor = 'rgba(255,34,68,0.15)'
      el.style.background   = 'rgba(255,34,68,0.03)'
      el.style.boxShadow    = 'none'
    }}
  >
    <span
      className="text-2xl text-primary-400 group-hover:text-primary-300 transition-colors"
      style={{ filter: 'drop-shadow(0 0 4px rgba(255,34,68,0.4))' }}
    >
      {skill.icon}
    </span>
    <span className="font-mono text-gray-400 text-xs text-center leading-tight group-hover:text-gray-200 transition-colors">
      {skill.name}
    </span>
  </motion.div>
)

const Skills = () => {
  return (
    <section id="skills" className="py-24" style={{ background: 'rgba(10,10,10,0.88)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-pixel text-primary-500/50" style={{ fontSize: '10px' }}>
            {SECTION_NUMBER}.
          </span>
          <h2 className="section-heading">SKILLS</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="arcade-card p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-primary-500 text-xl"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                >
                  {category.icon}
                </span>
                <h3 className="font-pixel text-xs text-white tracking-widest">
                  {category.title}
                </h3>
              </div>

              {/* Skill inventory grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCell
                    key={skill.name}
                    skill={skill}
                    delay={catIndex * 0.05 + skillIndex * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

