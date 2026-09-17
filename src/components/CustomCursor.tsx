import { useEffect, useRef, useState } from 'react'

const OUTER_LERP = 0.14
const INNER_LERP = 0.38
const TRAIL_LENGTH = 6
const TRAIL_LERP = 0.22

const SIZE_IDLE = 34
const SIZE_HOVER = 58
const SIZE_DOWN = 26

/**
 * Custom arcade reticle.
 *
 * Only mounts on devices with a real pointer: touch visitors keep their native
 * behaviour, and the global `cursor: none` rule is scoped to a class that this
 * component puts on <html>, so hiding the cursor can never strand someone
 * without one.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const mouse = useRef({ x: 0, y: 0 })
  const outer = useRef({ x: 0, y: 0 })
  const inner = useRef({ x: 0, y: 0 })
  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  )
  const isHovering = useRef(false)
  const isDown = useRef(false)

  // Decide once whether a custom cursor makes sense here.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      isHovering.current = !!target?.closest('a, button, [role="button"]')
    }

    const onDown = () => { isDown.current = true }
    const onUp = () => { isDown.current = false }

    let frameId: number

    const animate = () => {
      const { x: mx, y: my } = mouse.current

      outer.current.x += (mx - outer.current.x) * OUTER_LERP
      outer.current.y += (my - outer.current.y) * OUTER_LERP
      inner.current.x += (mx - inner.current.x) * INNER_LERP
      inner.current.y += (my - inner.current.y) * INNER_LERP

      // Each trail dot chases the one in front of it.
      trail.current.forEach((dot, i) => {
        const target = i === 0 ? inner.current : trail.current[i - 1]
        dot.x += (target.x - dot.x) * TRAIL_LERP
        dot.y += (target.y - dot.y) * TRAIL_LERP

        const node = trailRefs.current[i]
        if (node) {
          const scale = 1 - i / TRAIL_LENGTH
          node.style.transform =
            `translate(${dot.x - 3}px, ${dot.y - 3}px) scale(${scale})`
          node.style.opacity = `${0.35 * scale}`
        }
      })

      if (outerRef.current) {
        const size = isDown.current
          ? SIZE_DOWN
          : isHovering.current
            ? SIZE_HOVER
            : SIZE_IDLE
        const rotation = isHovering.current ? 45 : 0
        outerRef.current.style.width = `${size}px`
        outerRef.current.style.height = `${size}px`
        outerRef.current.style.transform =
          `translate(${outer.current.x - size / 2}px, ${outer.current.y - size / 2}px) rotate(${rotation}deg)`
      }

      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${inner.current.x - 4}px, ${inner.current.y - 4}px)`
      }

      frameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    frameId = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(frameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Fading trail behind the dot */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(node) => { trailRefs.current[i] = node }}
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '6px',
            height: '6px',
            pointerEvents: 'none',
            zIndex: 9998,
            background: '#FF2244',
          }}
        />
      ))}

      {/* Lagging reticle */}
      <div
        ref={outerRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          border: '2px solid #FF2244',
          boxShadow: '0 0 10px rgba(255,34,68,0.6), inset 0 0 6px rgba(255,34,68,0.2)',
          transition: 'width 0.2s ease, height 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />

      {/* Snap dot */}
      <div
        ref={innerRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          pointerEvents: 'none',
          zIndex: 9999,
          background: '#FF2244',
          boxShadow: '0 0 8px rgba(255,34,68,0.9)',
        }}
      />
    </>
  )
}

export default CustomCursor
