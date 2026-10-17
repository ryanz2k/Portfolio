import { ReactNode, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useParallaxY } from '../../hooks/useMotionFX'
import RansomText from '../p5/RansomText'

interface SectionShellProps {
  id: string
  /** Two-digit section number, e.g. "03". */
  number: string
  title: string
  /** Small italic line above the title. */
  kicker: string
  /** Red sections alternate with black ones, the way P5 menus flip palettes. */
  tone?: 'black' | 'red'
  children: ReactNode
}

const TONES = {
  black: 'bg-p5-black text-white',
  red:   'bg-p5-red text-white',
}

/**
 * Every content section shares this frame: slanted top and bottom edges, a
 * giant outlined section number drifting behind the content, and a
 * ransom-note title with a slash that swipes in under it.
 */
const SectionShell = ({ id, number, title, kicker, tone = 'black', children }: SectionShellProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const ghostY = useParallaxY(sectionRef, 160)

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden py-28 md:py-36 ${TONES[tone]}`}
      style={{ clipPath: 'polygon(0 3vw, 100% 0, 100% calc(100% - 3vw), 0 100%)' }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${tone === 'red' ? 'halftone' : 'halftone-light'}`}
      />

      {/* Giant outlined number drifting behind the content */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-10 select-none font-display leading-none"
        style={{
          y: ghostY,
          rotate: -8,
          fontSize: 'clamp(9rem, 30vw, 26rem)',
          color: 'transparent',
          WebkitTextStroke: tone === 'red' ? '3px rgba(0,0,0,0.35)' : '3px rgba(230,0,18,0.35)',
        }}
      >
        {number}
      </motion.span>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14 md:mb-20">
          <motion.p
            className={`p5-label mb-3 ${tone === 'red' ? 'text-p5-ink' : 'text-p5-red'}`}
            initial={reduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            {number} // {kicker}
          </motion.p>

          <div className="relative inline-block -rotate-2">
            <RansomText as="h2" text={title} seed={Number(number) + 2} className="text-5xl md:text-7xl" />

            {/* The slash under the title */}
            <motion.span
              aria-hidden
              className={`absolute -bottom-4 -left-4 h-4 origin-left ${tone === 'red' ? 'bg-p5-ink' : 'bg-p5-red'}`}
              style={{ width: 'calc(100% + 3rem)', clipPath: 'polygon(0 30%, 100% 0, 96% 100%, 2% 80%)' }}
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </header>

        {children}
      </div>
    </section>
  )
}

export default SectionShell
