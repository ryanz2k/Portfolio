import { useRef } from 'react'
import {
  FaExternalLinkAlt, FaGithub, FaGamepad, FaMobileAlt, FaMusic, FaGraduationCap,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

import elGlamImg from '../assets/el-glam-pos.webp'
import elHealthImg from '../assets/el-health.webp'
import smartquestImg from '../assets/smartquest.webp'
import cubetechImg from '../assets/cubetech.webp'
import lenkaImg from '../assets/lenka wordpress.webp'
import petjetImg from '../assets/petjet shopify.webp'
import zonafloorsImg from '../assets/zonafloors wordpress.webp'

import SectionShell from './fx/SectionShell'
import Panel from './p5/Panel'
import HoverPreview from './fx/HoverPreview'
import { useHoverPreview } from '../hooks/useHoverPreview'
import type { PreviewSize } from '../hooks/useHoverPreview'
import { useParallaxY } from '../hooks/useMotionFX'

interface FeaturedProject {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  previewImage: string
  link?: string
  github?: string
  category: string
}

interface OtherProject {
  title: string
  description: string
  icon: JSX.Element
  technologies: string[]
  link?: string
  github?: string
  category: string
  previewImage?: string
}

const PREVIEW_SIZE: PreviewSize = { width: 480, height: 300 }

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: 'El Glam POS',
    subtitle: 'Point-of-Sale System',
    description:
      'Full-featured inventory management and point-of-sale system built for El Glam beauty salon. Supports product management, transaction history, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    previewImage: elGlamImg,
    category: 'Full Stack',
  },
  {
    title: 'El Health Website',
    subtitle: 'E-Commerce Platform',
    description:
      'Comprehensive e-commerce platform with variant pricing, product management, PayPal integration, and a full admin dashboard. Deployed on Railway.',
    technologies: ['Next.js', 'React', 'Prisma', 'Tailwind CSS', 'Railway'],
    previewImage: elHealthImg,
    category: 'Full Stack',
    link: 'https://el-health-wellness-production.up.railway.app/',
    github: 'https://github.com/ryanz2k/el-health-wellness',
  },
  {
    title: 'SmartQuest',
    subtitle: 'Gamified Learning App',
    description:
      'Educational platform gamifying learning for UC Banilad students. Features quizzes, XP tracking, leaderboards, and Firebase real-time backend.',
    technologies: ['React', 'Firebase', 'Unity'],
    previewImage: smartquestImg,
    category: 'Web & Game',
    link: 'https://smartquest-uc.web.app/',
    github: 'https://github.com/ryanz2k/SmartQuest',
  },
]

const WORDPRESS_PROJECTS: FeaturedProject[] = [
  {
    title: 'Zona Floors',
    subtitle: 'Flooring Contractor',
    description:
      'Professional website for a flooring contractor featuring service portfolios and lead generation tools.',
    technologies: ['WordPress', 'Elementor', 'PHP', 'SEO', 'GoHighLevel'],
    previewImage: zonafloorsImg,
    category: 'WordPress',
    link: 'https://www.zonafloors.com/',
  },
  {
    title: 'Lenka Charvatová',
    subtitle: 'Natural Health & Therapy',
    description:
      'Wellness platform for natural health and therapy with optimized content delivery and newsletter integration.',
    technologies: ['WordPress', 'Elementor', 'PHP', 'SEO', 'MailerLite'],
    previewImage: lenkaImg,
    category: 'WordPress',
    link: 'https://lenkacharvatova.com/',
  },
  {
    title: 'PetJet',
    subtitle: 'E-Commerce Store',
    description:
      'Fully featured e-commerce store for pet items and house stuff with advanced analytics and merchant integration.',
    technologies: ['Shopify', 'PHP', 'Stripe', 'WordPress', 'Google Merchant', 'Google Analytics'],
    previewImage: petjetImg,
    category: 'Shopify',
    link: 'https://thepetjetco.com/',
  },
]

const OTHER_PROJECTS: OtherProject[] = [
  {
    title: 'CubeTech Agency',
    description: 'Spec work: responsive agency site with polaroid-style collage and custom CSS animations.',
    icon: <FaGamepad />,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Frontend',
    link: 'https://ryanz2k.github.io/CubeTech/',
    github: 'https://github.com/ryanz2k/CubeTech',
    previewImage: cubetechImg,
  },
  {
    title: 'Smart Desk Posture',
    description: 'IoT solution monitoring desk posture using ESP32 microcontroller and an Android app.',
    icon: <FaMobileAlt />,
    technologies: ['Kotlin', 'C++', 'Firebase', 'Arduino'],
    category: 'Mobile & IoT',
    github: 'https://github.com/ryanz2k/SmartDeskPosture',
  },
  {
    title: 'EverTale — Roguelike',
    description: 'Procedurally generated roguelike game with dynamic gameplay mechanics.',
    icon: <FaGamepad />,
    technologies: ['Unity', 'C#'],
    category: 'Game Dev',
  },
  {
    title: 'Enrollment System',
    description: 'Enrollment management system for educational institutions with SQLite backend.',
    icon: <FaGraduationCap />,
    technologies: ['Java', 'SQLite', 'Swing'],
    category: 'Desktop App',
  },
  {
    title: 'Audio Media Player',
    description: 'Media player with audio playback, playlist management, and equalizer.',
    icon: <FaMusic />,
    technologies: ['Java', 'JavaFX'],
    category: 'Desktop App',
  },
]

const CUTS = ['a', 'b', 'c', 'd'] as const

/** Small link cluster shared by both card types. */
const ProjectLinks = ({
  github,
  link,
  title,
  light = false,
}: {
  github?: string
  link?: string
  title: string
  /** True when the card behind is light, so the buttons go dark. */
  light?: boolean
}) => {
  const base = light
    ? 'bg-p5-ink text-white hover:bg-p5-red'
    : 'bg-white text-p5-ink hover:bg-p5-ink hover:text-white'

  return (
    <div className="relative z-10 flex flex-shrink-0 items-center gap-2">
      {github && (
        <motion.a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} on GitHub`}
          className={`cut-b flex h-10 w-10 items-center justify-center transition-colors ${base}`}
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub size={18} />
        </motion.a>
      )}
      {link && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live site`}
          className={`cut-d flex h-10 w-10 items-center justify-center transition-colors ${base}`}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaExternalLinkAlt size={15} />
        </motion.a>
      )}
    </div>
  )
}

const TechTags = ({ items, light = false }: { items: string[]; light?: boolean }) => (
  <div className="mt-auto flex flex-wrap gap-2">
    {items.map((tech, i) => (
      <motion.span
        key={tech}
        className={`p5-tag ${light ? 'p5-tag-light' : ''}`}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.2 + i * 0.04 }}
      >
        {tech}
      </motion.span>
    ))}
  </div>
)

const PreviewHint = ({ light = false }: { light?: boolean }) => (
  <p
    className={`p5-label mt-4 transition-opacity group-hover/panel:opacity-0 ${
      light ? 'text-white/70' : 'text-p5-red'
    }`}
  >
    ▶ Hover to preview
  </p>
)

const FeaturedCard = ({ project, index }: { project: FeaturedProject; index: number }) => {
  const { cardRef, isHovered, left, top, handlers } = useHoverPreview(PREVIEW_SIZE)

  return (
    <>
      <HoverPreview
        image={project.previewImage}
        title={project.title}
        visible={isHovered}
        left={left}
        top={top}
        size={PREVIEW_SIZE}
      />

      <motion.div
        initial={{ opacity: 0, y: 80, rotate: index % 2 ? 6 : -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 0.8 : -0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20, delay: (index % 3) * 0.08 }}
        className="h-full"
      >
        <div ref={cardRef} className="h-full" {...handlers}>
          <Panel tone="white" cut={CUTS[index % CUTS.length]} shadow="red" className="halftone flex flex-col p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <span className="cut-sm mb-2 inline-block bg-p5-red px-2 font-cond text-xs font-extrabold uppercase italic tracking-[0.2em] text-white">
                  Target · {project.category}
                </span>
                <h3 className="font-display text-3xl uppercase leading-tight tracking-wide transition-colors group-hover/panel:text-p5-red">
                  {project.title}
                </h3>
                <p className="font-cond text-base font-bold italic text-p5-ink/70">{project.subtitle}</p>
              </div>
              <ProjectLinks github={project.github} link={project.link} title={project.title} light />
            </div>

            <p className="mb-5 flex-1 font-body text-sm leading-relaxed text-p5-ink/85">
              {project.description}
            </p>

            <TechTags items={project.technologies} />
            <PreviewHint />
          </Panel>
        </div>
      </motion.div>
    </>
  )
}

const OtherCard = ({ project, index }: { project: OtherProject; index: number }) => {
  const { cardRef, isHovered, left, top, handlers } = useHoverPreview(PREVIEW_SIZE)

  return (
    <>
      {project.previewImage && (
        <HoverPreview
          image={project.previewImage}
          title={project.title}
          visible={isHovered}
          left={left}
          top={top}
          size={PREVIEW_SIZE}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20, delay: (index % 3) * 0.06 }}
        className="h-full"
      >
        <div ref={cardRef} className="h-full" {...handlers}>
          <Panel tone="red" cut={CUTS[(index + 1) % CUTS.length]} shadow="white" className="flex flex-col p-5">
            <div className="mb-3 flex items-start justify-between">
              <span className="cut-c flex h-12 w-12 items-center justify-center bg-p5-ink text-2xl text-white transition-transform group-hover/panel:-rotate-12 group-hover/panel:scale-110">
                {project.icon}
              </span>
              <ProjectLinks github={project.github} link={project.link} title={project.title} />
            </div>

            <span className="p5-label mb-1 text-p5-ink">{project.category}</span>
            <h3 className="mb-2 font-display text-2xl uppercase tracking-wide">{project.title}</h3>
            <p className="mb-4 flex-1 font-body text-sm leading-relaxed text-white/90">
              {project.description}
            </p>

            <TechTags items={project.technologies} />
            {project.previewImage && <PreviewHint light />}
          </Panel>
        </div>
      </motion.div>
    </>
  )
}

/** A tilted strip of tape announcing each group of cards. */
const GroupLabel = ({ label, tilt = -2 }: { label: string; tilt?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -200 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 360, damping: 26 }}
    className="mb-10"
  >
    <span
      className="cut-a inline-block bg-white px-5 py-1.5 font-display text-2xl uppercase tracking-wide text-p5-ink md:text-3xl"
      style={{ transform: `rotate(${tilt}deg)`, filter: 'drop-shadow(5px 5px 0 #E60012)' }}
    >
      {label}
    </span>
  </motion.div>
)

const Projects = () => {
  const featuredRef = useRef<HTMLDivElement>(null)
  const wordpressRef = useRef<HTMLDivElement>(null)

  // Opposing drift between the two featured grids adds depth between blocks.
  const featuredY = useParallaxY(featuredRef, 26)
  const wordpressY = useParallaxY(wordpressRef, -22)

  return (
    <SectionShell id="projects" number="03" title="PROJECTS" kicker="Targets acquired" tone="black">
      <GroupLabel label="Featured — hover to preview" />
      <motion.div
        ref={featuredRef}
        style={{ y: featuredY }}
        className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <FeaturedCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>

      <GroupLabel label="WordPress & Shopify" tilt={1.5} />
      <motion.div
        ref={wordpressRef}
        style={{ y: wordpressY }}
        className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {WORDPRESS_PROJECTS.map((project, i) => (
          <FeaturedCard key={project.title} project={project} index={i + 1} />
        ))}
      </motion.div>

      <GroupLabel label="Other projects" tilt={-3} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {OTHER_PROJECTS.map((project, i) => (
          <OtherCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}

export default Projects
