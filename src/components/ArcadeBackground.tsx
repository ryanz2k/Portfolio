import { useEffect, useRef } from 'react'

// ─── Parallax Layers ────────────────────────────────────────────────────────
// Each layer has a scrollFactor: how many px it moves per 1px of page scroll.
// Higher factor = closer to viewer = moves faster = stronger parallax depth.

interface FloatingShape {
  x: number
  y: number        // base y position (0-1 normalized to canvas height)
  size: number
  opacity: number
  color: string
  type: 'diamond' | 'square' | 'cross' | 'triangle'
  rotation: number
  rotationSpeed: number
}

const COLORS_RED    = 'rgba(255,34,68,'
const COLORS_YELLOW = 'rgba(255,224,0,'
const COLORS_WHITE  = 'rgba(255,255,255,'

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function createShape(W: number): FloatingShape {
  const rng = Math.random()
  const color = rng < 0.65 ? COLORS_RED : rng < 0.85 ? COLORS_YELLOW : COLORS_WHITE
  const types: FloatingShape['type'][] = ['diamond', 'square', 'cross', 'triangle']
  return {
    x:             randomBetween(0, W),
    y:             Math.random(),   // 0–1 of total canvas height
    size:          randomBetween(6, 28),
    opacity:       randomBetween(0.08, 0.35),
    color,
    type:          types[Math.floor(Math.random() * types.length)],
    rotation:      Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.006,
  }
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: FloatingShape,
  screenX: number,
  screenY: number,
  alpha: number,
) {
  const { size, type, rotation, color } = shape
  ctx.save()
  ctx.translate(screenX, screenY)
  ctx.rotate(rotation)
  ctx.globalAlpha = alpha

  if (type === 'diamond') {
    ctx.fillStyle = color + '1)'
    ctx.strokeStyle = color + '0.9)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size, 0)
    ctx.lineTo(0, size)
    ctx.lineTo(-size, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.globalAlpha = alpha * 0.25
    ctx.fill()
  } else if (type === 'square') {
    ctx.strokeStyle = color + '0.9)'
    ctx.lineWidth = 1
    ctx.strokeRect(-size / 2, -size / 2, size, size)
  } else if (type === 'cross') {
    ctx.strokeStyle = color + '0.9)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(-size, 0); ctx.lineTo(size, 0)
    ctx.moveTo(0, -size); ctx.lineTo(0, size)
    ctx.stroke()
  } else {
    ctx.strokeStyle = color + '0.9)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size, size * 0.6)
    ctx.lineTo(-size, size * 0.6)
    ctx.closePath()
    ctx.stroke()
  }

  ctx.restore()
  ctx.globalAlpha = 1
}

const SHAPE_COUNT = 60

const ArcadeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)
  const shapesRef = useRef<FloatingShape[]>([])
  const rafId    = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    resize()

    // Initialise shapes spread across the full visual range
    shapesRef.current = Array.from({ length: SHAPE_COUNT }, () => createShape(W))

    const onScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    // ─── Main draw loop ───────────────────────────────────────────────────
    const draw = () => {
      const scroll = scrollRef.current
      ctx.clearRect(0, 0, W, H)

      // ── Layer 0: Very slow large hex-grid (factor 0.05) ──────────────
      // Moves 1px for every 20px of scroll — barely drifts, feels "far away"
      const l0y = -(scroll * 0.05) % 100
      ctx.strokeStyle = 'rgba(255,34,68,0.055)'
      ctx.lineWidth   = 1
      for (let x = 0; x < W + 100; x += 100) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = l0y - 100; y < H + 100; y += 100) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Layer 1: Medium grid (factor 0.15) ───────────────────────────
      const l1y = -(scroll * 0.15) % 60
      ctx.strokeStyle = 'rgba(255,34,68,0.04)'
      for (let x = 0; x < W + 60; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = l1y - 60; y < H + 60; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Layer 2: Fine grid (factor 0.30) ─────────────────────────────
      const l2y = -(scroll * 0.30) % 30
      ctx.strokeStyle = 'rgba(255,34,68,0.025)'
      for (let x = 0; x < W + 30; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = l2y - 30; y < H + 30; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Layer 3: Diagonal speed lines (factor 0.45) ──────────────────
      // These scroll faster than the grids — very visible "motion" feel
      const l3offset = (scroll * 0.45) % 140
      ctx.strokeStyle = 'rgba(255,34,68,0.06)'
      ctx.lineWidth   = 1
      for (let i = -H; i < W + H; i += 140) {
        ctx.beginPath()
        ctx.moveTo(i + l3offset,     0)
        ctx.lineTo(i + l3offset - H, H)
        ctx.stroke()
      }

      // ── Layer 4: Shapes (factor 0.60) ────────────────────────────────
      // Shapes drift up/down based on their normalized y and scroll speed
      shapesRef.current.forEach((shape) => {
        shape.rotation += shape.rotationSpeed

        // Map the shape's 0-1 y to a screen position, offset by scroll parallax
        const baseY   = shape.y * H * 4            // spread across 4 screens of content
        const screenY = baseY - scroll * 0.60        // moves at 60% scroll speed
        const wrappedY = ((screenY % (H * 4)) + H * 4) % (H * 4)
        const finalY  = wrappedY - H * 1.5           // center the wrap window

        if (finalY < -50 || finalY > H + 50) return

        // Fade at top/bottom edges
        const edgeFade = Math.min(
          Math.min(finalY + 80, H - finalY + 80) / 80,
          1
        )

        drawShape(ctx, shape, shape.x, finalY, shape.opacity * edgeFade)
      })

      // ── Layer 5: Scan-line overlay (constant, no parallax) ────────────
      // Subtle horizontal lines that add a CRT feel on top of everything
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth   = 1
      for (let y = 0; y < H; y += 4) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Vignette ──────────────────────────────────────────────────────
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId.current!)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top:    0,
        left:   0,
        width:  '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default ArcadeBackground
