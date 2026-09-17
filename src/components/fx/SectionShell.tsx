import { ReactNode, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useParallaxY, usePointerParallax, useScrollRange } from '../../hooks/useMotionFX'

interface SectionShellProps {
  id: string
  /** Two-digit stage number, e.g. "03". */
  number: string
  title: string
  /** Alternating background tint so neighbouring sections separate. */
  tone?: 'base' | 'dim'
  children: ReactNode
}

// Deliberately not opaque: the parallax canvas behind the page needs to read
// through, otherwise all that depth is hidden under the sections.
const TONES = {
  base: 'rgba(10,10,10,0.80)',
  dim:  'rgba(16,16,18,0.76)',
}

/**
 * Every content section shares this frame: a parallax stage number ghosted into
 * the background, a drifting glow, and the animated heading rule. Keeping it in
 * one place means the depth cues line up from section to section.
 */
const SectionShell = ({ id, number, title, tone = 'base', children }: SectionShellProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const ghostY = useParallaxY(sectionRef, 140)
  const orbY = useParallaxY(sectionRef, 220)
  const gridY = useParallaxY(sectionRef, 60)
  const ghostOpacity = useScrollRange(sectionRef, 0.02, 0.05, { smooth: true })
  const pointer = usePointerParallax(26)

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: TONES[tone] }}
    >
      {/* Oversized stage number drifting behind the content */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-2 top-16 select-none font-pixel text-white"
        style={{
          y: ghostY,
          x: pointer.x,
          opacity: ghostOpacity,
          fontSize: 'clamp(7rem, 22vw, 18rem)',
          lineHeight: 1,
        }}
      >
        {number}
      </motion.span>

      {/* Slow red bloom, offset from the number so the depth reads */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full"
        style={{
          y: orbY,
          background: 'radial-gradient(circle, rgba(255,34,68,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Fine grid that creeps at its own pace */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(255,34,68,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,34,68,0.25) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 flex items-center gap-4 md:mb-16"
          initial={reduced ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-pixel text-primary-500/50" style={{ fontSize: '10px' }}>
            {number}.
          </span>

          <h2 className="section-heading relative">
            {title}
            {/* Light sweep that runs across the heading once it lands */}
            {!reduced && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                initial={{ x: '-120%' }}
                whileInView={{ x: '120%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: 0.25, ease: 'easeInOut' }}
                style={{
                  background:
                    'linear-gradient(100deg, transparent 0%, rgba(255,224,0,0.35) 45%, transparent 70%)',
                  mixBlendMode: 'screen',
                }}
              />
            )}
          </h2>

          <motion.div
            className="h-px flex-1 origin-left bg-gradient-to-r from-primary-500/50 to-transparent"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {children}
      </div>
    </section>
  )
}

export default SectionShell
