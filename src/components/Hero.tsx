import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import profileImg from '../assets/profile.webp'
import RansomText from './p5/RansomText'
import Starburst from './p5/Starburst'
import { usePointerParallax } from '../hooks/useMotionFX'
import { navigateTo } from '../lib/navigate'

const ROLES = [
  'Full Stack Developer',
  'Web Developer',
  'E-Commerce Specialist',
  'Software Engineer',
]

const ROLE_HOLD_MS = 2200

const STATUS_LINES = [
  { label: 'STATUS',   value: 'OPEN TO WORK' },
  { label: 'LOCATION', value: 'CEBU, PH' },
  { label: 'DEGREE',   value: 'BSIT · UC BANILAD' },
  { label: 'CLASS',    value: 'FULL STACK DEV' },
]

const SOCIALS = [
  { icon: <FaGithub size={22} />,   href: 'https://github.com/ryanz2k',           label: 'GitHub' },
  { icon: <FaLinkedin size={22} />, href: 'https://www.linkedin.com/in/ryanz2k/', label: 'LinkedIn' },
  { icon: <FaEnvelope size={22} />, href: 'mailto:JohnRyanGomez812@gmail.com',    label: 'Email' },
]

/** Each role slams in over the last one, instead of being typed out. */
const RoleSlam = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), ROLE_HOLD_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-12 md:h-14" aria-live="polite">
      <AnimatePresence initial={false}>
        <motion.span
          key={ROLES[index]}
          className="cut-a absolute left-0 top-0 inline-block whitespace-nowrap bg-white px-4 py-1 font-display text-2xl uppercase tracking-wide text-p5-ink md:text-3xl"
          style={{ filter: 'drop-shadow(5px 5px 0 #E60012)' }}
          initial={{ x: -80, opacity: 0, rotate: -12, scale: 1.4 }}
          animate={{ x: 0, opacity: 1, rotate: -3, scale: 1 }}
          // The old role gets out of the way fast, so the two never stack up.
          exit={{ x: 160, opacity: 0, rotate: 8, transition: { duration: 0.12 } }}
          transition={{ type: 'spring', stiffness: 520, damping: 24, delay: 0.08 }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const pointer = usePointerParallax(1)

  // 0 at the top, 1 once the hero has scrolled past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Each layer leaves at its own rate; that difference is the parallax.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const slabX = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const burstRotate = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const portraitX = useTransform(pointer.x, (v) => v * -18)
  const portraitY = useTransform(pointer.y, (v) => v * -12)
  const shadowX = useTransform(pointer.x, (v) => v * 30)
  const shadowY = useTransform(pointer.y, (v) => v * 20)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-p5-black pt-20"
    >
      {/* Red slab slicing across the right half */}
      <motion.div
        aria-hidden
        className="absolute -right-[20%] top-0 h-full w-[75%] bg-p5-red md:w-[60%]"
        style={{ x: slabX, clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)' }}
        initial={reduced ? false : { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        animate={{ clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <div className="halftone absolute inset-0" />
      </motion.div>

      <div className="halftone-light pointer-events-none absolute inset-0" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        style={{ opacity: fade }}
      >
        <div className="flex flex-col-reverse items-center gap-14 md:flex-row md:justify-between">

          {/* ── Text column ── */}
          <motion.div className="w-full flex-1" style={{ y: textY }}>
            <motion.p
              className="p5-label mb-5 inline-block bg-p5-red px-3 py-1 text-white"
              style={{ rotate: -3 }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.3 }}
            >
              Portfolio // Phantom developer
            </motion.p>

            <h1 className="sr-only">John Ryan Gomez</h1>
            <div aria-hidden className="mb-6 -rotate-3 space-y-2">
              <RansomText text="JOHN RYAN" trigger="mount" delay={0.4} seed={11} className="text-6xl sm:text-7xl lg:text-8xl" />
              <div className="pl-6 sm:pl-12">
                <RansomText text="GOMEZ" trigger="mount" delay={0.75} seed={5} className="text-6xl sm:text-7xl lg:text-8xl" />
              </div>
            </div>

            <div className="mb-10 mt-10 pl-2">
              <RoleSlam />
            </div>

            {/* Status strips, alternating ink and paper */}
            <div className="mb-10 max-w-md space-y-1.5">
              {STATUS_LINES.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className={`cut-${i % 2 ? 'b' : 'd'} flex items-center justify-between gap-4 px-4 py-1.5 ${
                    i % 2 ? 'bg-white text-p5-ink' : 'bg-p5-ink text-white'
                  }`}
                  style={{ marginLeft: i * 10 }}
                  initial={{ x: -120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 1.1 + i * 0.07 }}
                >
                  <span className="font-cond text-sm font-extrabold italic tracking-[0.2em] text-p5-red">{label}</span>
                  <span className="font-display text-lg tracking-wide">{value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <button onClick={() => navigateTo('contact')} className="p5-btn p5-btn-red">
                <span>Send a calling card</span>
              </button>

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className={`cut-${['a', 'b', 'c'][i]} flex h-12 w-12 items-center justify-center bg-white text-p5-ink transition-colors hover:bg-p5-red hover:text-white`}
                    whileHover={{ rotate: -10, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Portrait ── */}
          <motion.div className="relative flex-shrink-0" style={{ y: imageY }}>
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] md:h-[44rem] md:w-[44rem]"
              style={{ x: '-50%', y: '-50%', rotate: burstRotate }}
            >
              <Starburst color="#000" rays={28} className="h-full w-full animate-spin-slow opacity-80" />
            </motion.div>

            <motion.div
              className="relative"
              initial={reduced ? false : { scale: 0.3, rotate: 25, opacity: 0 }}
              animate={{ scale: 1, rotate: 4, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.5 }}
            >
              {/* Black silhouette slab that drifts against the pointer */}
              <motion.div
                aria-hidden
                className="cut-c absolute inset-0 bg-p5-ink"
                style={{ x: shadowX, y: shadowY, top: 18, left: 18, right: -18, bottom: -18 }}
              />

              <motion.div className="cut-a relative bg-white p-3" style={{ x: portraitX, y: portraitY }}>
                <img
                  src={profileImg}
                  alt="John Ryan Gomez"
                  className="cut-b h-64 w-64 object-cover md:h-80 md:w-80"
                  style={{ filter: 'contrast(1.1) saturate(1.05)' }}
                />
                {/* Red duotone wash over the lower corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-3 bg-p5-red mix-blend-multiply"
                  style={{ clipPath: 'polygon(0 78%, 100% 58%, 100% 100%, 0 100%)' }}
                />
              </motion.div>

              {/* Speech bubble */}
              <motion.div
                className="absolute -left-10 -top-8 md:-left-16"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 14, delay: 1.7 }}
              >
                <div
                  className="bg-white px-5 py-3 font-heavy text-lg text-p5-ink"
                  style={{
                    clipPath: 'polygon(0 8%, 100% 0, 94% 78%, 40% 80%, 22% 100%, 26% 80%, 4% 84%)',
                    paddingBottom: '1.6rem',
                    filter: 'drop-shadow(4px 4px 0 #E60012)',
                  }}
                >
                  Hi, I&apos;m Ryan!
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => navigateTo('about')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Scroll to About"
      >
        <span className="p5-label text-white/70">Scroll down</span>
        <motion.span
          className="h-5 w-5 bg-p5-red"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.button>
    </section>
  )
}

export default Hero
