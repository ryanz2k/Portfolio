import { useEffect, useRef, useState } from 'react'
import { MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface PreviewSize {
  width: number
  height: number
}

const GAP = 28
const EDGE = 8
const FOLLOW_SPRING = { stiffness: 450, damping: 38, mass: 0.35 }

/**
 * Sets a motion value without animating to it, so a preview opening on a new
 * card doesn't visibly fly across from the previous one.
 */
const snapTo = (value: MotionValue<number>, next: number) => {
  const withJump = value as MotionValue<number> & { jump?: (v: number) => void }
  if (typeof withJump.jump === 'function') withJump.jump(next)
  else value.set(next)
}

/**
 * Tracks the cursor over a card and produces clamped, spring-smoothed
 * coordinates for a floating preview.
 *
 * The pointer position lives in motion values rather than state, so moving the
 * mouse never re-renders the card — only entering and leaving it does.
 */
export function useHoverPreview(size: PreviewSize) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, FOLLOW_SPRING)
  const y = useSpring(rawY, FOLLOW_SPRING)

  // Flip to the left of the cursor when the preview would run off the screen.
  const left = useTransform(x, (v) => {
    const fitsRight = v + GAP + size.width <= window.innerWidth - EDGE
    return fitsRight ? v + GAP : Math.max(EDGE, v - GAP - size.width)
  })

  const top = useTransform(y, (v) =>
    Math.max(EDGE, Math.min(v - size.height / 2, window.innerHeight - size.height - EDGE)),
  )

  const onMouseMove = (e: React.MouseEvent) => {
    cursorRef.current = { x: e.clientX, y: e.clientY }
    rawX.set(e.clientX)
    rawY.set(e.clientY)
  }

  const onMouseEnter = (e: React.MouseEvent) => {
    // Seed the position so the preview doesn't fly in from the last card.
    snapTo(rawX, e.clientX)
    snapTo(rawY, e.clientY)
    snapTo(x, e.clientX)
    snapTo(y, e.clientY)
    cursorRef.current = { x: e.clientX, y: e.clientY }
    setIsHovered(true)
  }

  const onMouseLeave = () => setIsHovered(false)

  // Scrolling moves the card out from under a stationary cursor; drop the
  // preview when that happens rather than leaving it stuck open.
  useEffect(() => {
    if (!isHovered) return

    const checkBounds = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const { x: cx, y: cy } = cursorRef.current
      const inside =
        cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom
      if (!inside) setIsHovered(false)
    }

    window.addEventListener('scroll', checkBounds, { passive: true })
    return () => window.removeEventListener('scroll', checkBounds)
  }, [isHovered])

  return {
    cardRef,
    isHovered,
    left,
    top,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  }
}
