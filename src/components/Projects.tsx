import { useState, useCallback, useEffect, useRef } from 'react'
import { FaExternalLinkAlt, FaGithub, FaGamepad, FaMobileAlt, FaMusic, FaGraduationCap } from 'react-icons/fa'

import { motion } from 'framer-motion'
import elGlamImg from '../assets/el-glam-pos.webp'
import elHealthImg from '../assets/el-health.webp'
import smartquestImg from '../assets/smartquest.webp'
import cubetechImg from '../assets/cubetech.webp'
import lenkaImg from '../assets/lenka wordpress.webp'
import petjetImg from '../assets/petjet shopify.webp'
import zonafloorsImg from '../assets/zonafloors wordpress.webp'

const SECTION_NUMBER = '03'

interface HoverableProject {
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

const FEATURED_PROJECTS: HoverableProject[] = [
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

// WordPress & Shopify projects
const WORDPRESS_PROJECTS: HoverableProject[] = [
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

// ── Cursor-following preview — uses fixed positioning so it NEVER clips ──
const HoverableCard = ({
  project,
  index,
  previewSize = { width: 320, height: 200 },
}: {
  project: HoverableProject
  index: number
  previewSize?: { width: number; height: number }
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (!isHovered) return
    const checkScrollBounds = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const inX = cursorPos.x >= rect.left && cursorPos.x <= rect.right
      const inY = cursorPos.y >= rect.top && cursorPos.y <= rect.bottom
      if (!inX || !inY) {
        setIsHovered(false)
      }
    }
    window.addEventListener('scroll', checkScrollBounds, { passive: true })
    return () => window.removeEventListener('scroll', checkScrollBounds)
  }, [isHovered, cursorPos])

  // Offset the preview so it doesn't sit directly on the cursor
  const OFFSET_X = 28
  const OFFSET_Y = -previewSize.height / 2

  // Clamp to viewport edges
  const previewLeft = cursorPos.x + OFFSET_X
  const previewTop = Math.max(
    8,
    Math.min(cursorPos.y + OFFSET_Y, window.innerHeight - previewSize.height - 8)
  )

  return (
    <>
      {/* Portal-like fixed preview — never clipped by parent overflow */}
      {isHovered && (
        <div
          style={{
            position: 'fixed',
            left: previewLeft,
            top: previewTop,
            width: previewSize.width,
            height: previewSize.height,
            zIndex: 9000,
            pointerEvents: 'none',
            border: '2px solid rgba(255,34,68,0.8)',
            boxShadow: '0 0 40px rgba(255,34,68,0.4), 0 16px 48px rgba(0,0,0,0.8)',
            overflow: 'hidden',
            transition: 'opacity 0.15s ease',
            backgroundColor: '#000',
          }}
        >
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
          {/* Scanline overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,34,68,0.05) 3px, rgba(255,34,68,0.05) 4px)',
              pointerEvents: 'none',
            }}
          />
          {/* Title badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.75)',
              borderTop: '1px solid rgba(255,34,68,0.4)',
            }}
          >
            <p className="font-pixel text-white" style={{ fontSize: '8px', letterSpacing: '0.1em' }}>
              {project.title}
            </p>
          </div>
        </div>
      )}

      {/* The actual card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="arcade-card p-6 flex flex-col group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className="font-pixel text-accent-500/70 block mb-1"
              style={{ fontSize: '8px', letterSpacing: '0.2em' }}
            >
              {project.category}
            </span>
            <h3 className="font-pixel text-white text-xs tracking-wide group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-primary-400 text-xs mt-1">{project.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-400 transition-colors"
                aria-label={`${project.title} GitHub`}
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-400 transition-colors"
                aria-label={`${project.title} live link`}
              >
                <FaExternalLinkAlt size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="font-mono text-gray-400 text-xs leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {/* Hover hint pill */}
        <div className="mt-4 flex items-center gap-2 opacity-50 group-hover:opacity-0 transition-opacity">
          <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
          <span className="font-mono text-gray-600 text-xs">hover to preview</span>
        </div>
      </motion.div>
    </>
  )
}

const OtherProjectCard = ({ project, index }: { project: OtherProject; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (!isHovered) return
    const checkScrollBounds = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const inX = cursorPos.x >= rect.left && cursorPos.x <= rect.right
      const inY = cursorPos.y >= rect.top && cursorPos.y <= rect.bottom
      if (!inX || !inY) {
        setIsHovered(false)
      }
    }
    window.addEventListener('scroll', checkScrollBounds, { passive: true })
    return () => window.removeEventListener('scroll', checkScrollBounds)
  }, [isHovered, cursorPos])

  const previewSize = { width: 480, height: 300 }
  const OFFSET_X = 28
  const OFFSET_Y = -previewSize.height / 2

  const previewLeft = cursorPos.x + OFFSET_X
  const previewTop = Math.max(8, Math.min(cursorPos.y + OFFSET_Y, window.innerHeight - previewSize.height - 8))

  return (
    <>
      {isHovered && project.previewImage && (
        <div
          style={{
            position: 'fixed',
            left: previewLeft,
            top: previewTop,
            width: previewSize.width,
            height: previewSize.height,
            zIndex: 9000,
            pointerEvents: 'none',
            border: '2px solid rgba(255,34,68,0.8)',
            boxShadow: '0 0 40px rgba(255,34,68,0.4), 0 16px 48px rgba(0,0,0,0.8)',
            overflow: 'hidden',
            transition: 'opacity 0.15s ease',
            backgroundColor: '#000',
          }}
        >
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,34,68,0.05) 3px, rgba(255,34,68,0.05) 4px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.75)',
              borderTop: '1px solid rgba(255,34,68,0.4)',
            }}
          >
            <p className="font-pixel text-white" style={{ fontSize: '8px', letterSpacing: '0.1em' }}>
              {project.title}
            </p>
          </div>
        </div>
      )}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        className="arcade-card p-5 flex flex-col group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="text-primary-500 text-2xl group-hover:scale-110 transition-transform duration-150">
            {project.icon}
          </div>
          <div className="flex gap-3 relative z-10">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-400 transition-colors">
                <FaGithub size={15} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-400 transition-colors">
                <FaExternalLinkAlt size={13} />
              </a>
            )}
          </div>
        </div>
        <span className="font-pixel text-accent-500/50 mb-2" style={{ fontSize: '8px' }}>
          {project.category}
        </span>
        <h3 className="font-mono text-white text-sm font-bold mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="font-mono text-gray-500 text-xs leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        {project.previewImage && (
          <div className="mt-4 flex items-center gap-2 opacity-50 group-hover:opacity-0 transition-opacity">
            <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
            <span className="font-mono text-gray-600 text-xs">hover to preview</span>
          </div>
        )}
      </motion.div>
    </>
  )
}

const SectionLabel = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-8"
  >
    <div className="w-2 h-2 bg-primary-500 animate-pulse" />
    <span className="font-pixel text-primary-500/70" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
      {label}
    </span>
    <div className="h-px flex-1 bg-primary-500/20" />
  </motion.div>
)

const Projects = () => {
  return (
    <section id="projects" className="py-24" style={{ background: 'rgba(15,15,15,0.85)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="font-pixel text-primary-500/50" style={{ fontSize: '10px' }}>
            {SECTION_NUMBER}.
          </span>
          <h2 className="section-heading">PROJECTS</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        {/* ── Featured ── */}
        <SectionLabel label="FEATURED — HOVER TO PREVIEW" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {FEATURED_PROJECTS.map((project, i) => (
            <HoverableCard
              key={project.title}
              project={project}
              index={i}
              previewSize={{ width: 480, height: 300 }}
            />
          ))}
        </div>

        {/* ── WordPress & Shopify ── */}
        <SectionLabel label="WORDPRESS & SHOPIFY — HOVER TO PREVIEW" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {WORDPRESS_PROJECTS.map((project, i) => (
            <HoverableCard
              key={project.title}
              project={project}
              index={i}
              previewSize={{ width: 480, height: 300 }}
            />
          ))}
        </div>

        {/* ── Others ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-gray-600" />
          <span className="font-pixel text-gray-500" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
            OTHER PROJECTS
          </span>
          <div className="h-px flex-1 bg-gray-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHER_PROJECTS.map((project, i) => (
            <OtherProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects

