import { motion } from 'framer-motion'
import { usePageProgress } from '../../hooks/useMotionFX'

/** Red reading bar along the very top edge, above the navbar. */
const ScrollProgress = () => {
  const progress = usePageProgress()

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[51] h-[5px] bg-p5-ink">
      <motion.div className="h-full origin-left bg-p5-red" style={{ scaleX: progress }} />
    </div>
  )
}

export default ScrollProgress
