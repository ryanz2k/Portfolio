import { motion, useReducedMotion } from 'framer-motion'

interface RansomTextProps {
  text: string
  /** Tailwind font-size classes for the letters. */
  className?: string
  /** Changes the letter styles so two headings on screen don't match. */
  seed?: number
  /** Seconds before the first letter lands. */
  delay?: number
  /** Animate on mount (hero, intro) or when scrolled into view (sections). */
  trigger?: 'mount' | 'view'
  as?: 'h1' | 'h2' | 'h3' | 'span'
  /** Set on paper backgrounds, where the unbacked white letters would vanish. */
  onLight?: boolean
}

// Each cut-out letter is one of these looks. The mix of paper, ink and red is
// what makes it read as a calling card rather than just a bold heading.
const UNBACKED = 'bg-transparent text-white font-heavy'
const UNBACKED_ON_LIGHT = 'bg-transparent text-p5-ink font-heavy'

const LOOKS = [
  'bg-white text-p5-ink font-display',
  'bg-p5-ink text-white font-heavy',
  'bg-p5-red text-white font-display',
  UNBACKED,
  'bg-white text-p5-red font-heavy',
  'bg-p5-ink text-p5-red font-display',
]

/** Cheap deterministic hash, so the letters look random but never reshuffle. */
const noise = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Ransom-note lettering: every letter is cut from a different scrap, tilted
 * and nudged off the baseline. Screen readers get the plain text once.
 */
const RansomText = ({
  text,
  className = 'text-5xl',
  seed = 1,
  delay = 0,
  trigger = 'view',
  as = 'span',
  onLight = false,
}: RansomTextProps) => {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(' ')
  let letterIndex = 0

  const play = trigger === 'mount'
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.6 } }

  return (
    <Tag aria-label={text} className="inline-flex flex-wrap items-end justify-center gap-x-3 gap-y-2" {...play}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden className="inline-flex items-end">
          {word.split('').map((char) => {
            const i = letterIndex++
            const picked = LOOKS[Math.floor(noise(i, seed) * LOOKS.length)]
            const look = onLight && picked === UNBACKED ? UNBACKED_ON_LIGHT : picked
            const rotate = (noise(i + 7, seed) - 0.5) * 16
            const lift = (noise(i + 13, seed) - 0.5) * 10
            const scale = 0.9 + noise(i + 21, seed) * 0.25

            return (
              <motion.span
                key={i}
                className={`inline-block px-[0.08em] leading-[1.05] ${look} ${className}`}
                style={{ y: lift }}
                variants={{
                  hidden: reduced
                    ? { opacity: 1, rotate }
                    : { opacity: 0, scale: 2.2, rotate: rotate * 4 },
                  shown: { opacity: 1, scale, rotate },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 520,
                  damping: 18,
                  delay: delay + i * 0.035,
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

export default RansomText
