import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRichMotion } from '../../hooks/useMotionFX'

interface MagneticButtonProps {
  children: ReactNode
  href: string
  className?: string
  /** How far the button is allowed to chase the cursor, in px. */
  pull?: number
  target?: string
  rel?: string
}

const MAGNET_SPRING = { stiffness: 260, damping: 18, mass: 0.35 }

/** A link that leans toward the cursor while it is hovered. */
const MagneticButton = ({
  children,
  href,
  className = '',
  pull = 14,
  target,
  rel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const enabled = useRichMotion()

  const x = useSpring(useMotionValue(0), MAGNET_SPRING)
  const y = useSpring(useMotionValue(0), MAGNET_SPRING)

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * pull * 2)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * pull * 2)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  )
}

export default MagneticButton
