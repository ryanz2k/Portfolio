import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import profileImg from '../assets/profile.webp'
import MagneticButton from './fx/MagneticButton'
import { usePointerParallax, useRichMotion } from '../hooks/useMotionFX'

const TYPED_ROLES = [
  'Full Stack Developer',
  'Web Developer',
  'E-Commerce Specialist',
  'Software Engineer',
]

const TYPING_SPEED_MS = 80
const ERASE_SPEED_MS = 40
const PAUSE_AFTER_MS = 1800

const TypedRole = () => {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isErasing, setIsErasing] = useState(false)
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

const SOCIALS = [
  { icon: <FaGithub size={24} />,   href: 'https://github.com/ryanz2k',            label: 'GitHub' },
  { icon: <FaLinkedin size={24} />, href: 'https://www.linkedin.com/in/ryanz2k/',  label: 'LinkedIn' },
  { icon: <FaEnvelope size={24} />, href: 'mailto:JohnRyanGomez812@gmail.com',     label: 'Email' },
]

/** Letters drop in one at a time so the name assembles rather than just fading. */
const AssembledWord = ({
  text,
  className,
  startDelay = 0,
}: {
  text: string
  className?: string
  startDelay?: number
}) => {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className} data-text={text}>{text}</span>
  }

  return (
    <span className={className} data-text={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: -28, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: startDelay + i * 0.045,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformPerspective: 400 }}
        >
          {/* A non-breaking space keeps the gap from collapsing between the
              inline-block letters. */}
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const rich = useRichMotion()
  const reduced = useReducedMotion()
  const pointer = usePointerParallax(1)

  // Hero-specific scroll track: 0 at the top, 1 once the section has scrolled by.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Each column leaves at its own rate — that difference is the parallax.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentBlur = useTransform(scrollYProgress, [0, 1], [0, 6])
  const contentFilter = useTransform(contentBlur, (v) => `blur(${v}px)`)
  const stripeY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Pointer-driven depth for the decorative layers.
  const stripeX = useTransform(pointer.x, (v) => v * 40)
  const frameX = useTransform(pointer.x, (v) => v * -24)
  const frameY = useTransform(pointer.y, (v) => v * -18)
  const tiltY = useTransform(pointer.x, (v) => (rich ? v * 14 : 0))
  const tiltX = useTransform(pointer.y, (v) => (rich ? v * -14 : 0))
  const frameXInverse = useTransform(frameX, (v) => -v)
  const frameYInverse = useTransform(frameY, (v) => -v)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-14"
      style={{ background: 'rgba(10,10,10,0.78)' }}
    >
      {/* Diagonal wash, slowest moving layer in the hero */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: stripeY,
          x: stripeX,
          background: 'linear-gradient(135deg, rgba(255,34,68,0.09) 0%, transparent 55%)',
        }}
      />

      {/* Grid that drifts faster than the wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(255,34,68,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,34,68,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity, filter: reduced ? undefined : contentFilter }}
      >
        <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row">

          {/* ── Text column ── */}
          <motion.div className="flex-1 text-center md:text-left" style={{ y: textY }}>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex items-center justify-center gap-3 md:justify-start"
            >
              <motion.div
                className="h-px origin-left bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
              <span className="font-pixel text-xs tracking-widest text-primary-500">
                PORTFOLIO
              </span>
            </motion.div>

            <h1
              className="mb-3 font-pixel text-3xl leading-loose text-white md:text-4xl lg:text-5xl"
              style={{ textShadow: '0 0 30px rgba(255,34,68,0.3)' }}
            >
              <AssembledWord text="JOHN RYAN" className="glitch-text" startDelay={0.25} />
              <br />
              <AssembledWord
                text="GOMEZ"
                className="glitch-text text-primary-500"
                startDelay={0.65}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-10 min-h-[2rem] font-mono text-lg text-gray-400 md:text-xl"
            >
              &gt; <TypedRole />
            </motion.p>

            {/* RPG stat block — lines type in one after another */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="relative mb-10 inline-block overflow-hidden text-left"
              style={{
                border: '1px solid rgba(255,34,68,0.3)',
                background: 'rgba(255,34,68,0.04)',
                padding: '16px 20px',
              }}
            >
              {STATUS_LINES.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.25 + i * 0.09 }}
                  className="mb-1 flex items-center gap-4 last:mb-0"
                >
                  <span
                    className="font-pixel text-gray-500"
                    style={{ fontSize: '9px', minWidth: '72px' }}
                  >
                    {label}
                  </span>
                  <span className="font-mono text-xs text-accent-500">:: {value}</span>
                </motion.div>
              ))}

              {/* Slow scan sweeping down the stat block */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 h-12"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent, rgba(255,224,0,0.07), transparent)',
                  }}
                  animate={{ y: ['-100%', '400%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 2 }}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-wrap items-center justify-center gap-6 md:justify-start"
            >
              <MagneticButton href="#contact" className="arcade-btn">
                CONTACT ME
              </MagneticButton>

              <div className="flex items-center gap-4">
                {SOCIALS.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="text-gray-500 transition-colors hover:text-primary-400"
                    whileHover={{ y: -4, scale: 1.15, filter: 'drop-shadow(0 0 8px rgba(255,34,68,0.8))' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Profile image ──
              Outer element owns the scroll parallax, inner one owns the
              entrance, so neither fights the other over `scale`. */}
          <motion.div className="flex-shrink-0" style={{ y: imageY, scale: imageScale }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              {/* Offset frames drift with the pointer, the image itself does not */}
              <motion.div
                aria-hidden
                className="absolute -left-3 -top-3 h-full w-full border border-primary-500/40"
                style={{ x: frameX, y: frameY, zIndex: 0 }}
              />
              <motion.div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-full w-full border border-accent-500/30"
                style={{ x: frameXInverse, y: frameYInverse, zIndex: 0 }}
              />
  
              {/* Breathing glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,34,68,0.28) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                  zIndex: 0,
                }}
                animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
  
              {/* Portrait, tilted by the pointer */}
              <motion.div
                className="relative overflow-hidden"
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 900,
                  border: '2px solid rgba(255,34,68,0.6)',
                  clipPath:
                    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  zIndex: 1,
                }}
              >
                <img
                  src={profileImg}
                  alt="John Ryan Gomez"
                  className="h-56 w-56 object-cover md:h-72 md:w-72"
                  style={{ filter: 'contrast(1.05) saturate(0.9)' }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,34,68,0.04) 3px, rgba(255,34,68,0.04) 4px)',
                  }}
                />
                {/* Scan bar travelling down the portrait */}
                {!reduced && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-16"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent, rgba(255,34,68,0.16), transparent)',
                    }}
                    animate={{ y: ['-120%', '520%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.div>
  
              {/* Corner pips */}
              <motion.div
                aria-hidden
                className="absolute -right-1 -top-1 h-3 w-3 bg-primary-500"
                style={{ boxShadow: '0 0 8px rgba(255,34,68,0.8)', zIndex: 2 }}
                animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.div
                aria-hidden
                className="absolute -bottom-1 -left-1 h-3 w-3 bg-accent-500"
                style={{ boxShadow: '0 0 8px rgba(255,224,0,0.6)', zIndex: 2 }}
                animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint, pinned to the section rather than the content.
          Scroll fade lives on the outer element, the delayed entrance on the
          inner one — two elements so they don't both drive `opacity`. */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: hintOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span
            className="font-pixel text-gray-600"
            style={{ fontSize: '8px', letterSpacing: '0.2em' }}
          >
            SCROLL DOWN
          </span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-primary-500 to-transparent"
            animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
