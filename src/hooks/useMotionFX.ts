import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import {
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * Shared motion primitives for the arcade portfolio.
 *
 * Everything here degrades to "no movement" when the visitor has asked for
 * reduced motion, and pointer-driven effects switch off entirely on touch
 * devices where there is no hover state to drive them.
 */

const SOFT_SPRING = { stiffness: 120, damping: 28, mass: 0.35 }

/** True when the primary input is a finger rather than a mouse. */
export const useIsCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)')
    const sync = () => setCoarse(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return coarse
}

/** Pointer- and scroll-driven effects should only run when both are welcome. */
export const useRichMotion = () => {
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  return !reduced && !coarse
}

/**
 * Vertical parallax tied to an element's own trip through the viewport.
 * `distance` is the total travel in px: positive values drift the element up
 * as the page scrolls down (it reads as "closer to the viewer").
 */
export function useParallaxY(
  ref: RefObject<HTMLElement>,
  distance = 80,
  { smooth = true }: { smooth?: boolean } = {},
): MotionValue<number> {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const sprung = useSpring(raw, SOFT_SPRING)
  const still = useMotionValue(0)

  if (reduced) return still
  return smooth ? sprung : raw
}

/** Scroll-linked value in an arbitrary range — for rotations, scales, blur, etc. */
export function useScrollRange(
  ref: RefObject<HTMLElement>,
  from: number,
  to: number,
  { offset = ['start end', 'end start'], smooth = false }: {
    offset?: [string, string]
    smooth?: boolean
  } = {},
): MotionValue<number> {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  })

  const raw = useTransform(scrollYProgress, [0, 1], [from, to])
  const sprung = useSpring(raw, SOFT_SPRING)
  const still = useMotionValue(from === to ? from : to)

  if (reduced) return still
  return smooth ? sprung : raw
}

// Several components want the pointer position at once. One window listener
// fans out to all of them rather than each adding its own.
type PointerListener = (x: number, y: number) => void
const pointerListeners = new Set<PointerListener>()
let pointerAttached = false

const broadcastPointer = (e: PointerEvent) => {
  const x = e.clientX / window.innerWidth - 0.5
  const y = e.clientY / window.innerHeight - 0.5
  pointerListeners.forEach((listener) => listener(x, y))
}

const subscribeToPointer = (listener: PointerListener) => {
  pointerListeners.add(listener)
  if (!pointerAttached) {
    window.addEventListener('pointermove', broadcastPointer, { passive: true })
    pointerAttached = true
  }
  return () => {
    pointerListeners.delete(listener)
    if (pointerListeners.size === 0) {
      window.removeEventListener('pointermove', broadcastPointer)
      pointerAttached = false
    }
  }
}

/**
 * Pointer position normalised to -0.5…0.5 across the viewport, spring-smoothed.
 * Used to give fixed decoration a sense of depth as the mouse moves.
 */
export function usePointerParallax(strength = 1) {
  const enabled = useRichMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SOFT_SPRING)
  const sy = useSpring(y, SOFT_SPRING)

  useEffect(() => {
    if (!enabled) {
      x.set(0)
      y.set(0)
      return
    }

    return subscribeToPointer((nx, ny) => {
      x.set(nx * strength)
      y.set(ny * strength)
    })
  }, [enabled, strength, x, y])

  return { x: sx, y: sy }
}

/** Page-wide 0…1 scroll progress, spring-smoothed for progress meters. */
export function usePageProgress() {
  const { scrollYProgress } = useScroll()
  return useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
}
