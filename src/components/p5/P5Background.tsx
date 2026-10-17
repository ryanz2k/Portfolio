import { motion, useScroll, useTransform } from 'framer-motion'
import Starburst from './Starburst'
import { usePointerParallax } from '../../hooks/useMotionFX'

// Shards are placed by hand: random placement kept clumping behind the hero.
const SHARDS = [
  { left: '8%',  top: '18%',  size: 46, depth: 0.6,  rotate: 18,  color: '#E60012' },
  { left: '86%', top: '12%',  size: 28, depth: 1.1,  rotate: -30, color: '#F5F2EA' },
  { left: '72%', top: '64%',  size: 60, depth: 0.4,  rotate: 40,  color: '#E60012' },
  { left: '18%', top: '78%',  size: 22, depth: 1.3,  rotate: -12, color: '#F5F2EA' },
  { left: '48%', top: '40%',  size: 18, depth: 1.6,  rotate: 60,  color: '#E60012' },
  { left: '92%', top: '86%',  size: 36, depth: 0.8,  rotate: -50, color: '#E60012' },
]

/**
 * Fixed backdrop behind the whole page: a slowly turning red sunburst, a field
 * of halftone dots, and a few torn shards that drift with scroll and pointer at
 * different rates.
 */
const P5Background = () => {
  const { scrollYProgress } = useScroll()
  const burstRotate = useTransform(scrollYProgress, [0, 1], [0, 120])
  const burstY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const pointer = usePointerParallax(40)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-p5-black">
      <motion.div
        className="absolute -right-[40vmax] -top-[40vmax] h-[120vmax] w-[120vmax] opacity-[0.13]"
        style={{ rotate: burstRotate, y: burstY }}
      >
        <Starburst rays={36} className="h-full w-full animate-spin-slow" />
      </motion.div>

      <div className="halftone-light absolute inset-0" />

      {/* Big red diagonal band along the bottom-left */}
      <div
        className="absolute -bottom-[30vh] -left-[20vw] h-[60vh] w-[90vw] bg-p5-red opacity-[0.07]"
        style={{ transform: 'rotate(-18deg)' }}
      />

      {SHARDS.map((shard, i) => (
        <Shard key={i} {...shard} progress={scrollYProgress} pointerX={pointer.x} pointerY={pointer.y} />
      ))}
    </div>
  )
}

interface ShardProps {
  left: string
  top: string
  size: number
  depth: number
  rotate: number
  color: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  pointerX: ReturnType<typeof usePointerParallax>['x']
  pointerY: ReturnType<typeof usePointerParallax>['y']
}

const Shard = ({ left, top, size, depth, rotate, color, progress, pointerX, pointerY }: ShardProps) => {
  const y = useTransform(progress, [0, 1], [0, -900 * depth])
  const spin = useTransform(progress, [0, 1], [rotate, rotate + 240 * depth])
  const x = useTransform(pointerX, (v) => v * depth)
  const py = useTransform(pointerY, (v) => v * depth)

  return (
    <motion.div className="absolute" style={{ left, top, x, y: py }}>
      <motion.div
        style={{
          y,
          rotate: spin,
          width: size,
          height: size,
          background: color,
          opacity: 0.18,
          clipPath: 'polygon(50% 0, 100% 80%, 30% 100%, 0 40%)',
        }}
      />
    </motion.div>
  )
}

export default P5Background
