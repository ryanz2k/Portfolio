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
import TiltCard from './fx/TiltCard'
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

/** Small link cluster shared by both card types. */
const ProjectLinks = ({
  github,
  link,
  title,
  size = 18,
}: {
  github?: string
  link?: string
  title: string
  size?: number
}) => (
  <div className="relative z-10 flex flex-shrink-0 items-center gap-3">
    {github && (
      <motion.a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} on GitHub`}
        className="text-gray-500 transition-colors hover:text-primary-400"
        whileHover={{ scale: 1.25, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaGithub size={size} />
      </motion.a>
    )}
    {link && (
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} live site`}
        className="text-gray-500 transition-colors hover:text-primary-400"
        whileHover={{ scale: 1.25, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaExternalLinkAlt size={size - 3} />
      </motion.a>
    )}
  </div>
)

const TechTags = ({ items }: { items: string[] }) => (
  <div className="mt-auto flex flex-wrap gap-2">
    {items.map((tech, i) => (
      <motion.span
        key={tech}
        className="tech-tag"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
        whileHover={{ y: -3, borderColor: 'rgba(255,34,68,0.9)' }}
      >
        {tech}
      </motion.span>
    ))}
  </div>
)

const PreviewHint = () => (
  <div className="mt-4 flex items-center gap-2 opacity-50 transition-opacity group-hover:opacity-0">
    <motion.span
      className="h-1.5 w-1.5 bg-primary-500"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
    <span className="font-mono text-xs text-gray-600">hover to preview</span>
  </div>
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <TiltCard max={8} lift={14} className="h-full" {...handlers}>
          <div ref={cardRef} className="arcade-card group flex h-full flex-col p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span
                  className="mb-1 block font-pixel text-accent-500/70"
                  style={{ fontSize: '8px', letterSpacing: '0.2em' }}
                >
                  {project.category}
                </span>
                <h3 className="font-pixel text-xs tracking-wide text-white transition-colors group-hover:text-primary-400">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-primary-400">{project.subtitle}</p>
              </div>
              <ProjectLinks github={project.github} link={project.link} title={project.title} />
            </div>

            <p className="mb-5 flex-1 font-mono text-xs leading-relaxed text-gray-400">
              {project.description}
            </p>

            <TechTags items={project.technologies} />
            <PreviewHint />
          </div>
        </TiltCard>
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
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <TiltCard max={6} lift={10} className="h-full" {...handlers}>
          <div ref={cardRef} className="arcade-card group relative flex h-full flex-col p-5">
            <div className="mb-3 flex items-start justify-between">
              <motion.div
                className="text-2xl text-primary-500"
                whileHover={{ scale: 1.25, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                {project.icon}
              </motion.div>
              <ProjectLinks
                github={project.github}
                link={project.link}
                title={project.title}
                size={15}
              />
            </div>

            <span className="mb-2 font-pixel text-accent-500/50" style={{ fontSize: '8px' }}>
              {project.category}
            </span>
            <h3 className="mb-2 font-mono text-sm font-bold text-white transition-colors group-hover:text-primary-400">
              {project.title}
            </h3>
            <p className="mb-4 flex-1 font-mono text-xs leading-relaxed text-gray-500">
              {project.description}
            </p>

            <TechTags items={project.technologies} />
            {project.previewImage && <PreviewHint />}
          </div>
        </TiltCard>
      </motion.div>
    </>
  )
}

const GroupLabel = ({ label, muted = false }: { label: string; muted?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-8 flex items-center gap-3"
  >
    <motion.div
      className={`h-2 w-2 ${muted ? 'bg-gray-600' : 'bg-primary-500'}`}
      animate={muted ? undefined : { opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.6, repeat: Infinity }}
    />
    <span
      className={`font-pixel ${muted ? 'text-gray-500' : 'text-primary-500/70'}`}
      style={{ fontSize: '9px', letterSpacing: '0.2em' }}
    >
      {label}
    </span>
    <motion.div
      className={`h-px flex-1 origin-left ${muted ? 'bg-gray-800' : 'bg-primary-500/20'}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    />
  </motion.div>
)

const Projects = () => {
  const featuredRef = useRef<HTMLDivElement>(null)
  const wordpressRef = useRef<HTMLDivElement>(null)

  // Opposing drift between the two featured grids adds depth between blocks.
  const featuredY = useParallaxY(featuredRef, 26)
  const wordpressY = useParallaxY(wordpressRef, -22)

  return (
    <SectionShell id="projects" number="03" title="PROJECTS" tone="dim">
      <GroupLabel label="FEATURED — HOVER TO PREVIEW" />
      <motion.div
        ref={featuredRef}
        style={{ y: featuredY }}
        className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <FeaturedCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>

      <GroupLabel label="WORDPRESS & SHOPIFY — HOVER TO PREVIEW" />
      <motion.div
        ref={wordpressRef}
        style={{ y: wordpressY }}
        className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {WORDPRESS_PROJECTS.map((project, i) => (
          <FeaturedCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>

      <GroupLabel label="OTHER PROJECTS" muted />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OTHER_PROJECTS.map((project, i) => (
          <OtherCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}

export default Projects
