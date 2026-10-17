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
import Panel from './p5/Panel'

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

/// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

const CUTS = ['a', 'b', 'c', 'd'] as const

/**
 * One row of a P5 skill menu: an element-style icon chip and the skill name.
 * Hovering flips the row to paper with ink text and gives it the menu jitter.
 */
const SkillRow = ({ skill }: { skill: SkillItem }) => (
  <motion.li
    variants={rowVariants}
    transition={{ type: 'spring', stiffness: 460, damping: 28 }}
    className="group/row cut-d flex items-center gap-3 bg-p5-coal px-2 py-1.5 transition-colors duration-100 hover:bg-white"
  >
    <span className="cut-b flex h-8 w-8 flex-shrink-0 items-center justify-center bg-p5-red text-lg text-white transition-transform group-hover/row:-rotate-12">
      {skill.icon}
    </span>
    <span className="font-cond text-base font-bold uppercase tracking-wide text-white transition-colors group-hover/row:animate-jitter group-hover/row:text-p5-ink">
      {skill.name}
    </span>
  </motion.li>
)

const Skills = () => (
  <SectionShell id="skills" number="04" title="SKILLS" kicker="Skill inventory" tone="red">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 60, rotate: catIndex % 2 ? 4 : -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: catIndex % 2 ? 0.6 : -0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: (catIndex % 2) * 0.08 }}
        >
          <Panel tone="black" cut={CUTS[catIndex % CUTS.length]} shadow="white" interactive={false} className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="cut-c flex h-10 w-10 items-center justify-center bg-white text-xl text-p5-ink">
                {category.icon}
              </span>
              <h3 className="font-display text-3xl tracking-wide">{category.title}</h3>
              <span className="ml-auto font-cond text-sm font-extrabold italic text-p5-red">
                {category.skills.length} SKILLS
              </span>
            </div>

            {/* Rows slide in one by one via the parent's stagger */}
            <motion.ul
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {category.skills.map((skill) => (
                <SkillRow key={skill.name} skill={skill} />
              ))}
            </motion.ul>
          </Panel>
        </motion.div>
      ))}
    </div>
  </SectionShell>
)

export default Skills
