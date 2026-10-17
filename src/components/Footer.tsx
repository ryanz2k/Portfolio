import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import { useParallaxY } from '../hooks/useMotionFX'
import { navigateTo } from '../lib/navigate'

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const nameY = useParallaxY(footerRef, 40)
  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-p5-ink py-16 text-center">
      {/* Oversized outlined sign-off drifting behind the credit line */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-2 select-none whitespace-nowrap font-display leading-none"
        style={{
          y: nameY,
          rotate: -4,
          fontSize: 'clamp(4rem, 16vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(230,0,18,0.35)',
        }}
      >
        TAKE YOUR TIME
      </motion.span>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.button
          onClick={() => navigateTo('hero')}
          className="cut-b flex h-14 w-14 items-center justify-center bg-p5-red text-white"
          whileHover={{ y: -6, rotate: -10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <FaArrowUp size={18} />
        </motion.button>

        <p className="font-cond text-sm font-bold uppercase italic tracking-[0.25em] text-white/60">
          <span className="text-p5-red">★ </span>
          John Ryan Gomez · {currentYear} · Built with React &amp; TS
          <span className="text-p5-red"> ★</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
