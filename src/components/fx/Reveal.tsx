import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

interface RevealProps {
  children: ReactNode
  /** Where the element travels in from. */
  from?: Direction
  delay?: number
  duration?: number
  /** Travel distance in px for directional reveals. */
  distance?: number
  className?: string
  once?: boolean
  /** Fraction of the element that must be visible before it fires. */
  amount?: number
}

const offsetFor = (
  from: Direction,
  distance: number,
): { x?: number; y?: number; scale?: number } => {
  switch (from) {
    case 'up':    return { y: distance }
    case 'down':  return { y: -distance }
    case 'left':  return { x: -distance }
    case 'right': return { x: distance }
    case 'scale': return { scale: 0.9 }
    default:      return {}
  }
}

/**
 * The house scroll-reveal. Everything animates in through this so the timing
 * curve stays consistent across the page.
 */
const Reveal = ({
  children,
  from = 'up',
  delay = 0,
  duration = 0.6,
  distance = 28,
  className,
  once = true,
  amount = 0.25,
}: RevealProps) => {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsetFor(from, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
