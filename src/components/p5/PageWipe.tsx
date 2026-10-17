import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { WIPE_EVENT } from '../../lib/navigate'
import { NAV_ITEMS } from '../../data/navigation'

type Phase = 'idle' | 'cover' | 'reveal'

const EASE = [0.76, 0, 0.24, 1] as const

/**
 * Full-screen diagonal wipe played on every section jump: a red slab and a
 * black slab slam across, the page jumps underneath, then they clear off the
 * other side. Under reduced motion it is a plain scroll.
 */
const PageWipe = () => {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [targetId, setTargetId] = useState('hero')
  const busy = useRef(false)

  useEffect(() => {
    const onWipe = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (reduced) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        return
      }
      if (busy.current) return
      busy.current = true
      setTargetId(id)
      setPhase('cover')
    }

    window.addEventListener(WIPE_EVENT, onWipe)
    return () => window.removeEventListener(WIPE_EVENT, onWipe)
  }, [reduced])

  const onCovered = () => {
    if (phase !== 'cover') return
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
    // Hold a beat so the label registers before the screen clears.
    setTimeout(() => setPhase('reveal'), 260)
  }

  const onRevealed = () => {
    if (phase !== 'reveal') return
    setPhase('idle')
    busy.current = false
  }

  const label = NAV_ITEMS.find((item) => item.id === targetId)?.label ?? ''
  const x = phase === 'cover' ? '0%' : '130%'

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="wipe"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9500] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          {/* Red slab leads */}
          <motion.div
            className="absolute -inset-y-10 -left-[50%] w-[200%] bg-p5-red"
            style={{ skewX: -18 }}
            initial={{ x: '-130%' }}
            animate={{ x }}
            transition={{ duration: 0.32, ease: EASE }}
          />
          {/* Black slab trails just behind it and carries the label */}
          <motion.div
            className="absolute -inset-y-10 -left-[50%] flex w-[200%] items-center justify-center bg-p5-ink halftone-light"
            style={{ skewX: -18 }}
            initial={{ x: '-130%' }}
            animate={{ x }}
            transition={{ duration: 0.32, ease: EASE, delay: 0.06 }}
            onAnimationComplete={phase === 'cover' ? onCovered : onRevealed}
          >
            <motion.span
              className="font-display text-[18vw] uppercase leading-none text-white md:text-[12vw]"
              style={{ skewX: 18, textShadow: '0.06em 0.06em 0 #E60012' }}
              initial={{ scale: 1.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.2 }}
            >
              {label}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageWipe
