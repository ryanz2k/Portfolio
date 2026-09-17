import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const BOOT_LINES = [
  'INITIALISING RENDER PIPELINE',
  'MOUNTING PROJECT ARCHIVE',
  'LOADING SKILL INVENTORY',
  'READY',
]

const LINE_INTERVAL_MS = 260
const HOLD_AFTER_MS = 420
const SESSION_KEY = 'jrg-booted'

/**
 * Short arcade cold-boot before the page appears. It runs once per browser
 * session and is skipped entirely under reduced-motion, so it never gets in the
 * way of someone who is just coming back to check a link.
 */
const BootScreen = () => {
  const reduced = useReducedMotion()
  const [isBooting, setIsBooting] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  // sessionStorage throws outright in some privacy modes, so a failure to read
  // it just means "show the boot once" rather than breaking the page.
  useEffect(() => {
    if (reduced) return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
    } catch {
      // ignore — fall through and boot
    }
    setIsBooting(true)
  }, [reduced])

  useEffect(() => {
    if (!isBooting) return

    document.body.style.overflow = 'hidden'
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineIndex(i + 1), LINE_INTERVAL_MS * (i + 1)))
    })

    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // ignore — the boot simply replays next time
        }
        setIsBooting(false)
      }, LINE_INTERVAL_MS * BOOT_LINES.length + HOLD_AFTER_MS),
    )

    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [isBooting])

  const totalMs = LINE_INTERVAL_MS * BOOT_LINES.length + HOLD_AFTER_MS

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
          // CRT power-off: collapse to a horizontal line, then blink out.
          exit={{ scaleY: 0.004, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
        >
          <motion.span
            className="font-pixel text-primary-500"
            style={{ fontSize: '28px', textShadow: '0 0 24px rgba(255,34,68,0.8)' }}
            animate={{ opacity: [1, 0.55, 1, 0.8, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            [JRG]
          </motion.span>

          <span
            className="mt-4 font-pixel text-gray-600"
            style={{ fontSize: '9px', letterSpacing: '0.3em' }}
          >
            PORTFOLIO.EXE
          </span>

          {/* Loading bar */}
          <div
            className="mt-10 h-2 w-56 overflow-hidden"
            style={{ border: '1px solid rgba(255,34,68,0.4)' }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ background: 'linear-gradient(90deg, #FF2244, #FFE000)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: totalMs / 1000, ease: 'easeInOut' }}
            />
          </div>

          {/* Boot log */}
          <div className="mt-6 h-20 w-64 text-left">
            {BOOT_LINES.slice(0, lineIndex).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-xs text-gray-500"
              >
                <span className="text-primary-500/70">&gt; </span>
                {line}
              </motion.p>
            ))}
          </div>

          {/* Scanlines over the whole boot screen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,34,68,0.04) 2px, rgba(255,34,68,0.04) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootScreen
