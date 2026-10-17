import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import RansomText from './RansomText'
import Starburst from './Starburst'

const HOLD_MS = 2300
const SESSION_KEY = 'jrg-calling-card'

/**
 * A calling card slams onto the screen before the page appears. It plays once
 * per browser session, can be skipped with a click or a key, and is skipped
 * entirely under reduced motion, so it never stands between someone and a
 * link they came back to check.
 *
 * `onDone` fires once the card has cleared, so the hero can replay its entrance
 * instead of having it play unseen underneath.
 */
const CallingCardIntro = ({ onDone }: { onDone?: () => void }) => {
  const reduced = useReducedMotion()
  const [showing, setShowing] = useState(false)

  // sessionStorage throws outright in some privacy modes; a failure to read it
  // just means the card plays.
  useEffect(() => {
    if (reduced) return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
    } catch {
      // ignore and play
    }
    setShowing(true)
  }, [reduced])

  useEffect(() => {
    if (!showing) return

    document.body.style.overflow = 'hidden'
    const dismiss = () => setShowing(false)
    const timer = setTimeout(dismiss, HOLD_MS)
    window.addEventListener('keydown', dismiss)

    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignore; the card simply replays next time
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', dismiss)
      document.body.style.overflow = ''
    }
  }, [showing])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {showing && (
        <motion.div
          key="calling-card"
          role="dialog"
          aria-label="Intro"
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-p5-ink"
          onClick={() => setShowing(false)}
          exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[220vmax] w-[220vmax]"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ scale: 0.2, rotate: -40 }}
            animate={{ scale: 1, rotate: 30 }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
          >
            <Starburst rays={32} className="h-full w-full" />
          </motion.div>

          {/* The card itself */}
          <motion.div
            className="relative mx-4 w-full max-w-xl"
            initial={{ scale: 3, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            exit={{ x: '-140%', rotate: -24 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 }}
            style={{ filter: 'drop-shadow(12px 12px 0 #000)' }}
          >
            <div className="cut-a halftone bg-p5-paper px-6 py-8 text-center text-p5-ink sm:px-10 sm:py-12">
              <p className="p5-label mb-4 text-p5-red">— A calling card —</p>
              <RansomText
                text="JOHN RYAN GOMEZ"
                trigger="mount"
                delay={0.55}
                seed={3}
                onLight
                className="text-4xl sm:text-6xl"
                as="span"
              />
              <motion.p
                className="mt-6 font-cond text-lg font-bold italic text-p5-ink sm:text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                We will steal your attention.
              </motion.p>
              <motion.p
                className="mt-1 font-cond text-sm uppercase tracking-[0.3em] text-p5-red"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                Full stack developer · Cebu
              </motion.p>
            </div>
          </motion.div>

          <span className="p5-label absolute bottom-6 right-6 text-white/60">Click to skip</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CallingCardIntro
