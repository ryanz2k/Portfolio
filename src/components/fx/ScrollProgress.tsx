import { motion, useTransform } from 'framer-motion'
import { usePageProgress } from '../../hooks/useMotionFX'

/**
 * Arcade "power bar" pinned under the navbar. It doubles as a reading indicator
 * and as the one piece of chrome that reacts continuously to scrolling.
 */
const ScrollProgress = () => {
  const progress = usePageProgress()
  const glow = useTransform(progress, [0, 1], [0.4, 1])

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 z-[51] h-[3px]"
      style={{ top: '3.5rem', background: 'rgba(255,34,68,0.08)' }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          opacity: glow,
          background: 'linear-gradient(90deg, #FF2244 0%, #ff7a8a 55%, #FFE000 100%)',
          boxShadow: '0 0 12px rgba(255,34,68,0.8)',
        }}
      />
    </div>
  )
}

export default ScrollProgress
