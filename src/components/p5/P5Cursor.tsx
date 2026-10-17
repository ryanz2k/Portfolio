import { useEffect, useRef, useState } from 'react'

const LERP = 0.32
const BURST_MS = 420

/**
 * A red arrowhead cursor with a white outline that leans into hovered links
 * and throws a little star burst on click.
 *
 * Only mounts on devices with a real pointer, and the global `cursor: none`
 * rule is scoped to a class this component adds to <html>, so hiding the
 * native cursor can never strand someone without one.
 */
const P5Cursor = () => {
  const [enabled, setEnabled] = useState(false)
  const arrowRef = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const down = useRef(false)

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
      hovering.current = !!target?.closest('a, button, [role="button"]')
    }
    const onDown = (e: MouseEvent) => {
      down.current = true
      const burst = burstRef.current
      if (!burst) return
      burst.style.left = `${e.clientX}px`
      burst.style.top = `${e.clientY}px`
      // Restart the CSS animation by forcing a reflow between class changes.
      burst.classList.remove('is-bursting')
      void burst.offsetWidth
      burst.classList.add('is-bursting')
    }
    const onUp = () => { down.current = false }

    let frame: number
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * LERP
      pos.current.y += (mouse.current.y - pos.current.y) * LERP
      const scale = down.current ? 0.8 : hovering.current ? 1.35 : 1
      const rotate = hovering.current ? -28 : -12
      if (arrowRef.current) {
        arrowRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${rotate}deg) scale(${scale})`
      }
      frame = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    frame = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <style>{`
        .p5-burst { opacity: 0; }
        .p5-burst.is-bursting { animation: p5-burst ${BURST_MS}ms ease-out forwards; }
        @keyframes p5-burst {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(0.2) rotate(0deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4) rotate(40deg); }
        }
      `}</style>

      <div
        ref={burstRef}
        aria-hidden
        className="p5-burst pointer-events-none fixed z-[9998] h-14 w-14 bg-p5-red"
        style={{
          clipPath:
            'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
      />

      <div
        ref={arrowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ transformOrigin: '0 0' }}
      >
        <svg width="30" height="34" viewBox="0 0 30 34" style={{ display: 'block', marginLeft: -2, marginTop: -2 }}>
          <path d="M2 2 L28 14 L15 18 L9 32 Z" fill="#000" transform="translate(3 3)" />
          <path d="M2 2 L28 14 L15 18 L9 32 Z" fill="#E60012" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  )
}

export default P5Cursor
