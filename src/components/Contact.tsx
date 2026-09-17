import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'
import SectionShell from './fx/SectionShell'
import MagneticButton from './fx/MagneticButton'
import { useRichMotion } from '../hooks/useMotionFX'

const CONTACT_ITEMS = [
  {
    icon: <FaEnvelope />,
    label: 'EMAIL',
    value: 'JohnRyanGomez812@gmail.com',
    href: 'mailto:JohnRyanGomez812@gmail.com',
  },
  {
    icon: <FaPhone />,
    label: 'PHONE',
    value: '0976 065 6704',
    href: 'tel:09760656704',
  },
  {
    icon: <FaGithub />,
    label: 'GITHUB',
    value: 'github.com/ryanz2k',
    href: 'https://github.com/ryanz2k',
    external: true,
  },
  {
    icon: <FaLinkedin />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/ryanz2k',
    href: 'https://www.linkedin.com/in/ryanz2k/',
    external: true,
  },
]

const GLOW_SPRING = { stiffness: 140, damping: 26, mass: 0.4 }

// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const Contact = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const rich = useRichMotion()

  // A soft light that trails the cursor across the contact grid.
  const glowX = useSpring(useMotionValue(50), GLOW_SPRING)
  const glowY = useSpring(useMotionValue(50), GLOW_SPRING)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(255,34,68,0.13), transparent 70%)`

  const trackGlow = (e: React.MouseEvent) => {
    if (!rich || !gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <SectionShell id="contact" number="06" title="CONTACT" tone="base">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 font-mono text-sm leading-relaxed text-gray-400"
        >
          Open to new opportunities, freelance work, and interesting projects.
          <br />
          <span className="text-primary-400">Ping me anytime.</span>
        </motion.p>

        <div ref={gridRef} className="relative mb-12" onMouseMove={trackGlow}>
          {rich && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-8"
              style={{ background: glow }}
            />
          )}

          <motion.div
            className="relative grid grid-cols-1 gap-4 sm:grid-cols-2"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {CONTACT_ITEMS.map(({ icon, label, value, href, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                variants={cardVariants}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="arcade-card group flex items-center gap-4 p-5 text-left"
              >
                <motion.span
                  className="flex-shrink-0 text-xl text-primary-500"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                  whileHover={{ scale: 1.25, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  {icon}
                </motion.span>
                <div className="min-w-0">
                  <p
                    className="mb-1 font-pixel text-gray-500"
                    style={{ fontSize: '8px', letterSpacing: '0.2em' }}
                  >
                    {label}
                  </p>
                  <p className="truncate font-mono text-xs text-gray-200 transition-colors group-hover:text-primary-400">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.25 }}
        >
          <MagneticButton
            href="mailto:JohnRyanGomez812@gmail.com"
            className="arcade-btn text-sm"
            pull={18}
          >
            SEND MESSAGE
          </MagneticButton>
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Contact
