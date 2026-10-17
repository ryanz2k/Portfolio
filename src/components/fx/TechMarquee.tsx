import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useScrollRange } from '../../hooks/useMotionFX'

interface TechMarqueeProps {
  items: string[]
  /** Reverses both the drift and the scroll-driven travel. */
  reverse?: boolean
  /** Extra horizontal travel in px driven by page scroll. */
  travel?: number
  /** Seconds for one loop of the constant drift. */
  driftSeconds?: number
  /** Tilt of the tape in degrees. */
  tilt?: number
}

/**
 * A strip of tilted "caution tape" between sections, red and black with the
 * tech names in white. It drifts on its own and gets dragged sideways by
 * scrolling, so two strips running opposite ways read as separate planes.
 */
const TechMarquee = ({
  items,
  reverse = false,
  travel = 260,
  driftSeconds = 30,
  tilt = -3,
}: TechMarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const direction = reverse ? -1 : 1
  const scrollX = useScrollRange(ref, travel * direction, -travel * direction)

  // Four copies: the drift consumes one, the scroll offset eats into another,
  // and the rest still has to span a wide viewport.
  const loop = [...items, ...items, ...items, ...items]

  return (
    <div ref={ref} aria-hidden className="relative z-10 -my-6 overflow-hidden py-8">
      <div
        className="-mx-10 border-y-4 border-p5-ink bg-p5-red py-3"
        style={{ transform: `rotate(${tilt}deg)`, boxShadow: '0 6px 0 #000' }}
      >
        <motion.div style={{ x: scrollX }}>
          <motion.div
            className="flex w-max items-center gap-8 whitespace-nowrap"
            animate={reduced ? undefined : { x: reverse ? ['-25%', '0%'] : ['0%', '-25%'] }}
            transition={{ duration: driftSeconds, ease: 'linear', repeat: Infinity }}
          >
            {loop.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-8">
                <span
                  className={`font-display text-3xl tracking-wide ${
                    i % 3 === 1 ? 'text-p5-ink' : 'text-white'
                  }`}
                >
                  {item}
                </span>
                <span
                  className="h-5 w-5 bg-p5-ink"
                  style={{
                    clipPath:
                      'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  }}
                />
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default TechMarquee
