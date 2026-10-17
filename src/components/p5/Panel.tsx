import { ReactNode } from 'react'

type Tone = 'black' | 'white' | 'red'
type Cut = 'a' | 'b' | 'c' | 'd'

interface PanelProps {
  children: ReactNode
  tone?: Tone
  /** Which jagged outline to use; vary it between neighbours. */
  cut?: Cut
  /** Colour of the hard offset shadow. */
  shadow?: 'red' | 'white' | 'black'
  className?: string
  /** Lift and tilt on hover. Off for static containers. */
  interactive?: boolean
}

const TONES: Record<Tone, string> = {
  black: 'bg-p5-ink text-white',
  white: 'bg-p5-paper text-p5-ink',
  red:   'bg-p5-red text-white',
}

const SHADOWS = {
  red:   'drop-shadow(7px 7px 0 #E60012)',
  white: 'drop-shadow(7px 7px 0 #F5F2EA)',
  black: 'drop-shadow(7px 7px 0 #000)',
}

/**
 * The basic P5 slab: a jagged cut-out with a hard offset shadow.
 *
 * The shadow is a `drop-shadow` filter on the outer element because the inner
 * one is clipped, and clip-path would swallow a box-shadow.
 */
const Panel = ({
  children,
  tone = 'black',
  cut = 'a',
  shadow = 'red',
  className = '',
  interactive = true,
}: PanelProps) => (
  <div
    className={`group/panel relative h-full ${
      interactive
        ? 'transition-transform duration-150 ease-[cubic-bezier(0.2,1.6,0.4,1)] hover:-translate-x-1 hover:-translate-y-1 hover:-rotate-[0.6deg]'
        : ''
    }`}
    style={{ filter: SHADOWS[shadow] }}
  >
    <div className={`cut-${cut} relative h-full ${TONES[tone]} ${className}`}>{children}</div>
  </div>
)

export default Panel
