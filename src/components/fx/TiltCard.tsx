import { ReactNode, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRichMotion } from '../../hooks/useMotionFX'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees on each axis. */
  max?: number
  /** Adds a moving specular sheen that tracks the pointer. */
  glare?: boolean
  /** How far the card lifts toward the viewer on hover, in px. */
  lift?: number
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  onMouseMove?: (e: React.MouseEvent) => void
}

const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.4 }

/**
 * Wraps a card in a pointer-tracked 3D tilt. The tilt is purely decorative, so
 * it is skipped on touch screens and when reduced motion is requested — the
 * children render identically either way.
 */
const TiltCard = ({
  children,
  className = '',
  max = 7,
  glare = true,
  lift = 10,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useRichMotion()

  const rotateX = useSpring(useMotionValue(0), TILT_SPRING)
  const rotateY = useSpring(useMotionValue(0), TILT_SPRING)
  const translateZ = useSpring(useMotionValue(0), TILT_SPRING)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useSpring(useMotionValue(0), TILT_SPRING)

  const glareBackground = useMotionTemplate`radial-gradient(240px circle at ${glareX}% ${glareY}%, rgba(255,34,68,0.16), transparent 60%)`

  const handleMove = (e: React.MouseEvent) => {
    onMouseMove?.(e)
    if (!enabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    rotateY.set((px - 0.5) * max * 2)
    rotateX.set((0.5 - py) * max * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handleEnter = (e: React.MouseEvent) => {
    onMouseEnter?.(e)
    if (!enabled) return
    translateZ.set(lift)
    glareOpacity.set(1)
  }

  const handleLeave = (e: React.MouseEvent) => {
    onMouseLeave?.(e)
    rotateX.set(0)
    rotateY.set(0)
    translateZ.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        z: translateZ,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {glare && enabled && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  )
}

export default TiltCard
