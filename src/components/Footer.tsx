import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import { useParallaxY } from '../hooks/useMotionFX'

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const nameY = useParallaxY(footerRef, 40)
  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden py-12 text-center"
      style={{
        borderTop: '1px solid rgba(255,34,68,0.2)',
        background: 'rgba(10,10,10,0.88)',
      }}
    >
      {/* Oversized ghost name drifting behind the credit line */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap font-pixel text-white/[0.03]"
        style={{ y: nameY, fontSize: 'clamp(3rem, 12vw, 9rem)', lineHeight: 1 }}
      >
        JRG
      </motion.span>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-10 w-10 items-center justify-center text-primary-500"
          style={{ border: '1px solid rgba(255,34,68,0.4)' }}
          whileHover={{
            y: -4,
            borderColor: '#FF2244',
            boxShadow: '0 0 18px rgba(255,34,68,0.5)',
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaArrowUp size={14} />
          </motion.span>
        </motion.button>

        <p className="font-mono text-xs tracking-widest text-gray-600">
          <span className="text-primary-500/60">// </span>
          JOHN RYAN GOMEZ · {currentYear} · BUILT WITH REACT &amp; TS
        </p>
      </div>
    </footer>
  )
}

export default Footer
