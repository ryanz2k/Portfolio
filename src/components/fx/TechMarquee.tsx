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
}

/**
 * A band of pixel text that both drifts on its own and gets dragged sideways by
 * vertical scrolling. Two of these running opposite directions read as two
 * planes sliding past each other, which is the cheapest depth cue on the page.
 */
const TechMarquee = ({
  items,
  reverse = false,
  travel = 260,
  driftSeconds = 38,
}: TechMarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const direction = reverse ? -1 : 1
  const scrollX = useScrollRange(ref, travel * direction, -travel * direction)

  // Four copies: the drift consumes one, the scroll-driven offset eats into
  // another, and the remainder still has to span a wide viewport.
  const loop = [...items, ...items, ...items, ...items]

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative overflow-hidden border-y border-primary-500/15 py-4"
      style={{ background: 'rgba(255,34,68,0.03)' }}
    >
      {/* Outer layer: scroll-driven parallax */}
      <motion.div style={{ x: scrollX }}>
        {/* Inner layer: constant drift, independent of the scroll position */}
        <motion.div
          className="flex w-max items-center gap-10 whitespace-nowrap"
          animate={reduced ? undefined : { x: reverse ? ['-25%', '0%'] : ['0%', '-25%'] }}
          transition={{ duration: driftSeconds, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span
                className="font-pixel text-primary-500/30"
                style={{ fontSize: '11px', letterSpacing: '0.18em' }}
              >
                {item}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-500/30" />
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade the strip into the page at both ends */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.95), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{ background: 'linear-gradient(270deg, rgba(10,10,10,0.95), transparent)' }}
      />
    </div>
  )
}

export default TechMarquee
