import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaGamepad, FaTools, FaJava } from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiPython, SiC, SiCplusplus, SiKotlin,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSqlite, SiFirebase,
  SiUnity, SiWordpress, SiShopify, SiTailwindcss, SiVite, SiGoogleads,
  SiGoogleanalytics, SiNextdotjs, SiPrisma, SiBlazor, SiVercel, SiPaypal, SiRailway,
} from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'

import SectionShell from './fx/SectionShell'
import TiltCard from './fx/TiltCard'

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

// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

const cellVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

const SkillCell = ({ skill }: { skill: SkillItem }) => (
  <motion.div
    variants={cellVariants}
    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
    whileHover={{
      scale: 1.14,
      y: -5,
      borderColor: 'rgba(255,34,68,0.7)',
      backgroundColor: 'rgba(255,34,68,0.1)',
      boxShadow: '0 0 18px rgba(255,34,68,0.35)',
    }}
    className="group flex flex-col items-center gap-2 p-3"
    style={{
      border: '1px solid rgba(255,34,68,0.15)',
      backgroundColor: 'rgba(255,34,68,0.03)',
      cursor: 'default',
      willChange: 'transform',
    }}
  >
    <motion.span
      className="text-2xl text-primary-400 transition-colors group-hover:text-primary-300"
      style={{ filter: 'drop-shadow(0 0 4px rgba(255,34,68,0.4))' }}
      whileHover={{ rotate: [0, -12, 12, 0] }}
      transition={{ duration: 0.45 }}
    >
      {skill.icon}
    </motion.span>
    <span className="text-center font-mono text-xs leading-tight text-gray-400 transition-colors group-hover:text-gray-200">
      {skill.name}
    </span>
  </motion.div>
)

const Skills = () => (
  <SectionShell id="skills" number="04" title="SKILLS" tone="base">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: catIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard max={5} className="h-full">
            <div className="arcade-card h-full p-6">
              <div className="mb-6 flex items-center gap-3">
                <motion.span
                  className="text-xl text-primary-500"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  {category.icon}
                </motion.span>
                <h3 className="font-pixel text-xs tracking-widest text-white">
                  {category.title}
                </h3>
                <motion.div
                  className="h-px flex-1 origin-left bg-primary-500/20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
              </div>

              {/* Cells pop in one by one via the parent's stagger */}
              <motion.div
                className="grid grid-cols-3 gap-2 sm:grid-cols-4"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {category.skills.map((skill) => (
                  <SkillCell key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  </SectionShell>
)

export default Skills
