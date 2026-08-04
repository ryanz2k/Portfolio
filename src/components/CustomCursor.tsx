import { useEffect, useRef } from 'react'

const OUTER_LERP = 0.12
const INNER_LERP = 0.35

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const innerPos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isHovering.current = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      )
    }

    let animationFrameId: number

    const animate = () => {
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * OUTER_LERP
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * OUTER_LERP
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) * INNER_LERP
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) * INNER_LERP

      if (outerRef.current) {
        const size = isHovering.current ? 56 : 36
        outerRef.current.style.transform = `translate(${outerPos.current.x - size / 2}px, ${outerPos.current.y - size / 2}px)`
        outerRef.current.style.width  = `${size}px`
        outerRef.current.style.height = `${size}px`
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerPos.current.x - 4}px, ${innerPos.current.y - 4}px)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          border: '2px solid #FF2244',
          boxShadow: '0 0 10px rgba(255,34,68,0.6), inset 0 0 6px rgba(255,34,68,0.2)',
          transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner snap dot */}
      <div
        ref={innerRef}
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

