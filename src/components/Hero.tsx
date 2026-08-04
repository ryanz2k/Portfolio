import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpg'

const TYPED_ROLES = [
  'Full Stack Developer',
  'Web Developer',
  'E-Commerce Specialist',
  'Software Engineer',
]

const TYPING_SPEED_MS  = 80
const ERASE_SPEED_MS   = 40
const PAUSE_AFTER_MS   = 1800

const TypedRole = () => {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex,   setRoleIndex]   = useState(0)
  const [isErasing,   setIsErasing]   = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const currentRole = TYPED_ROLES[roleIndex]

    if (!isErasing && displayText === currentRole) {
      timeoutRef.current = setTimeout(() => setIsErasing(true), PAUSE_AFTER_MS)
      return
    }

    if (isErasing && displayText === '') {
      setIsErasing(false)
      setRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length)
      return
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(isErasing
        ? currentRole.slice(0, displayText.length - 1)
        : currentRole.slice(0, displayText.length + 1)
      )
    }, isErasing ? ERASE_SPEED_MS : TYPING_SPEED_MS)

    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isErasing, roleIndex])

  return (
    <span className="text-primary-400">
      {displayText}
      <span className="animate-blink text-accent-500">▌</span>
    </span>
  )
}

const STATUS_LINES = [
  { label: 'STATUS',   value: 'OPEN TO WORK' },
  { label: 'LOCATION', value: 'CEBU, PH' },
  { label: 'DEGREE',   value: 'BSIT · UC BANILAD' },
  { label: 'CLASS',    value: 'FULL STACK DEV' },
]

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
      style={{ background: 'rgba(10,10,10,0.88)' }}
    >
      {/* Red diagonal stripe decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,34,68,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,34,68,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,34,68,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">

          {/* ── Text Column ── */}
          <div className="flex-1 text-center md:text-left">

            {/* Intro label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 justify-center md:justify-start mb-6"
            >
              <div className="h-px w-8 bg-primary-500" />
              <span className="font-pixel text-primary-500 text-xs tracking-widest">
                PORTFOLIO
              </span>
            </motion.div>

            {/* Glitch name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-loose"
              style={{ textShadow: '0 0 30px rgba(255,34,68,0.3)' }}
            >
              <span
                className="glitch-text"
                data-text="JOHN RYAN"
              >
                JOHN RYAN
              </span>
              <br />
              <span
                className="glitch-text text-primary-500"
                data-text="GOMEZ"
                style={{ textShadow: '0 0 20px rgba(255,34,68,0.6)' }}
              >
                GOMEZ
              </span>
            </motion.h1>

            {/* Typed role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-mono text-lg md:text-xl text-gray-400 mb-10 min-h-[2rem]"
            >
              &gt; <TypedRole />
            </motion.p>

            {/* RPG stat block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="inline-block mb-10 text-left"
              style={{
                border: '1px solid rgba(255,34,68,0.3)',
                background: 'rgba(255,34,68,0.04)',
                padding: '16px 20px',
              }}
            >
              {STATUS_LINES.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-4 mb-1 last:mb-0">
                  <span className="font-pixel text-gray-500" style={{ fontSize: '9px', minWidth: '72px' }}>
                    {label}
                  </span>
                  <span className="font-mono text-xs text-accent-500">
                    :: {value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social links + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-6 justify-center md:justify-start flex-wrap"
            >
              <a href="#contact" className="arcade-btn">
                CONTACT ME
              </a>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ryanz2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                  aria-label="GitHub"
                  style={{ transition: 'color 0.15s, text-shadow 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px rgba(255,34,68,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ryanz2k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                  aria-label="LinkedIn"
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px rgba(255,34,68,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="mailto:JohnRyanGomez812@gmail.com"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                  aria-label="Email"
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px rgba(255,34,68,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            {/* Offset decorative border */}
            <div
              className="absolute -top-3 -left-3 w-full h-full border border-primary-500/40"
              style={{ zIndex: 0 }}
            />
            <div
              className="absolute -bottom-3 -right-3 w-full h-full border border-accent-500/30"
              style={{ zIndex: 0 }}
            />

            {/* Glow behind image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,34,68,0.25) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 0,
              }}
            />

            <div
              className="relative overflow-hidden"
              style={{
                border: '2px solid rgba(255,34,68,0.6)',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                zIndex: 1,
              }}
            >
              <img
                src={profileImg}
                alt="John Ryan Gomez"
                className="w-56 h-56 md:w-72 md:h-72 object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.9)' }}
              />
              {/* Red scanline overlay on image */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,34,68,0.04) 3px, rgba(255,34,68,0.04) 4px)',
                }}
              />
            </div>

            {/* Corner accent pip */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500"
              style={{ boxShadow: '0 0 8px rgba(255,34,68,0.8)', zIndex: 2 }}
            />
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-accent-500"
              style={{ boxShadow: '0 0 8px rgba(255,224,0,0.6)', zIndex: 2 }}
            />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-pixel text-gray-600" style={{ fontSize: '8px', letterSpacing: '0.2em' }}>
            SCROLL DOWN
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-primary-500 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

