import { useEffect, useRef } from 'react'

/**
 * The canvas that sits behind the whole page.
 *
 * Nine layers are drawn every frame, each moving at its own fraction of the
 * scroll position (its "factor") and its own fraction of the pointer offset.
 * The bigger the factor, the closer the layer reads. Scroll velocity feeds back
 * into the speed lines and the motion streaks, so fast flicks feel fast.
 */

// ─── Tunables ───────────────────────────────────────────────────────────────
const SHAPE_COUNT = 54
const DUST_FAR_COUNT = 90
const DUST_NEAR_COUNT = 34
const POINTER_EASE = 0.06
const VELOCITY_EASE = 0.12
const MAX_DPR = 2
const SPAN_SCREENS = 5

const RED = 'rgba(255,34,68,'
const YELLOW = 'rgba(255,224,0,'
const WHITE = 'rgba(255,255,255,'

type ShapeKind = 'diamond' | 'square' | 'cross' | 'triangle' | 'chevron'

interface FloatingShape {
  x: number          // 0–1 across the canvas width
  y: number          // 0–1 across the virtual scroll span
  size: number
  opacity: number
  color: string
  kind: ShapeKind
  rotation: number
  rotationSpeed: number
  /** Per-shape depth multiplier so they do not all move as one sheet. */
  depth: number
}

interface Dust {
  x: number
  y: number
  size: number
  opacity: number
  twinkle: number
}

const randomBetween = (a: number, b: number) => a + Math.random() * (b - a)

const createShape = (): FloatingShape => {
  const roll = Math.random()
  const kinds: ShapeKind[] = ['diamond', 'square', 'cross', 'triangle', 'chevron']
  return {
    x: Math.random(),
    y: Math.random(),
    size: randomBetween(6, 30),
    opacity: randomBetween(0.08, 0.34),
    color: roll < 0.62 ? RED : roll < 0.86 ? YELLOW : WHITE,
    kind: kinds[Math.floor(Math.random() * kinds.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.007,
    depth: randomBetween(0.45, 0.95),
  }
}

const createDust = (): Dust => ({
  x: Math.random(),
  y: Math.random(),
  size: randomBetween(1, 2.6),
  opacity: randomBetween(0.1, 0.5),
  twinkle: Math.random() * Math.PI * 2,
})

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: FloatingShape,
  x: number,
  y: number,
  alpha: number,
  streak: number,
) {
  const { size, kind, rotation, color } = shape

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  // Squash along Y when scrolling fast — a cheap stand-in for motion blur.
  ctx.scale(1, 1 + streak)
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color + '0.9)'
  ctx.lineWidth = 1

  if (kind === 'diamond') {
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size, 0)
    ctx.lineTo(0, size)
    ctx.lineTo(-size, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.globalAlpha = alpha * 0.25
    ctx.fillStyle = color + '1)'
    ctx.fill()
  } else if (kind === 'square') {
    ctx.strokeRect(-size / 2, -size / 2, size, size)
  } else if (kind === 'cross') {
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(-size, 0); ctx.lineTo(size, 0)
    ctx.moveTo(0, -size); ctx.lineTo(0, size)
    ctx.stroke()
  } else if (kind === 'chevron') {
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(-size, size * 0.4)
    ctx.lineTo(0, -size * 0.4)
    ctx.lineTo(size, size * 0.4)
    ctx.stroke()
  } else {
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

/** Draws a whole grid as one path — far cheaper than stroking each line. */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  step: number,
  offsetX: number,
  offsetY: number,
  stroke: string,
) {
  ctx.strokeStyle = stroke
  ctx.lineWidth = 1
  ctx.beginPath()

  const startX = (offsetX % step) - step
  for (let x = startX; x < W + step; x += step) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
  }

  const startY = (offsetY % step) - step
  for (let y = startY; y < H + step; y += step) {
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
  }

  ctx.stroke()
}

/** Receding floor grid anchored to the bottom of the viewport. */
function drawHorizon(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  flow: number,
  pointerShift: number,
) {
  const horizonY = H * 0.66
  const vanishX = W / 2 + pointerShift
  const depth = H - horizonY

  ctx.save()
  ctx.strokeStyle = RED + '0.10)'
  ctx.lineWidth = 1

  // Rails converging on the vanishing point
  ctx.beginPath()
  for (let i = -14; i <= 14; i++) {
    ctx.moveTo(vanishX, horizonY)
    ctx.lineTo(vanishX + i * (W / 9), H)
  }
  ctx.stroke()

  // Horizontal rungs, spaced so they bunch up toward the horizon
  ctx.beginPath()
  for (let i = 0; i < 16; i++) {
    const t = ((i + flow) % 16) / 16
    const y = horizonY + depth * t * t
    if (y <= horizonY || y > H) continue
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
  }
  ctx.stroke()

  // Glow sitting on the horizon line itself
  const glow = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY + 10)
  glow.addColorStop(0, 'rgba(255,34,68,0)')
  glow.addColorStop(1, 'rgba(255,34,68,0.08)')
  ctx.fillStyle = glow
  ctx.fillRect(0, horizonY - 60, W, 70)

  ctx.restore()
}

const ArcadeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    let W = 0
    let H = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const shapes = Array.from({ length: SHAPE_COUNT }, createShape)
    const dustFar = Array.from({ length: DUST_FAR_COUNT }, createDust)
    const dustNear = Array.from({ length: DUST_NEAR_COUNT }, createDust)

    let scroll = window.scrollY
    let lastScroll = scroll
    let velocity = 0            // smoothed px per frame
    let pointerTargetX = 0
    let pointerTargetY = 0
    let pointerX = 0
    let pointerY = 0
    let frame = 0

    const onScroll = () => { scroll = window.scrollY }
    const onPointer = (e: PointerEvent) => {
      pointerTargetX = e.clientX / window.innerWidth - 0.5
      pointerTargetY = e.clientY / window.innerHeight - 0.5
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    if (!coarse) window.addEventListener('pointermove', onPointer, { passive: true })

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H)
      drawGrid(ctx, W, H, 120, 0, 0, RED + '0.05)')
      drawGrid(ctx, W, H, 60, 0, 0, RED + '0.035)')
      drawHorizon(ctx, W, H, 0, 0)
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.92)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)
    }

    const draw = () => {
      frame++

      // Ease the pointer and the scroll velocity so nothing snaps.
      pointerX += (pointerTargetX - pointerX) * POINTER_EASE
      pointerY += (pointerTargetY - pointerY) * POINTER_EASE

      const rawVelocity = scroll - lastScroll
      lastScroll = scroll
      velocity += (rawVelocity - velocity) * VELOCITY_EASE
      const boost = Math.min(Math.abs(velocity) / 55, 1)   // 0–1 "going fast" signal

      ctx.clearRect(0, 0, W, H)
      const span = H * SPAN_SCREENS

      // ── L1 · far dust (factor 0.04) ─────────────────────────────────────
      dustFar.forEach((d) => {
        const y = (((d.y * span - scroll * 0.04) % span) + span) % span - H
        if (y < -10 || y > H + 10) return
        const flicker = 0.7 + 0.3 * Math.sin(frame * 0.02 + d.twinkle)
        ctx.fillStyle = WHITE + (d.opacity * 0.5 * flicker).toFixed(3) + ')'
        ctx.fillRect(d.x * W + pointerX * 6, y, d.size, d.size)
      })

      // ── L2 · coarse grid (factor 0.05) ──────────────────────────────────
      drawGrid(ctx, W, H, 120, pointerX * 8, -scroll * 0.05, RED + '0.05)')

      // ── L3 · medium grid (factor 0.16) ──────────────────────────────────
      drawGrid(ctx, W, H, 60, pointerX * 14, -scroll * 0.16, RED + '0.035)')

      // ── L4 · receding horizon floor ─────────────────────────────────────
      drawHorizon(ctx, W, H, (scroll * 0.012) % 16, pointerX * 30)

      // ── L5 · fine grid (factor 0.30) ────────────────────────────────────
      drawGrid(ctx, W, H, 30, pointerX * 20, -scroll * 0.3, RED + '0.022)')

      // ── L6 · diagonal speed lines (factor 0.5, stretched by velocity) ───
      const speedOffset = (scroll * 0.5) % 150
      ctx.strokeStyle = RED + (0.05 + boost * 0.12).toFixed(3) + ')'
      ctx.lineWidth = 1 + boost
      ctx.beginPath()
      for (let i = -H; i < W + H; i += 150) {
        const x = i + speedOffset + pointerX * 26
        ctx.moveTo(x, 0)
        ctx.lineTo(x - H, H)
      }
      ctx.stroke()

      // ── L7 · floating shapes (factor 0.55–1.0, per shape) ───────────────
      const streak = boost * 0.5
      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed * (1 + boost * 3)

        const factor = 0.55 + shape.depth * 0.45
        const y = (((shape.y * span - scroll * factor) % span) + span) % span - H
        if (y < -60 || y > H + 60) return

        const x = shape.x * W + pointerX * 34 * shape.depth
        const fade = Math.min(Math.min(y + 90, H - y + 90) / 90, 1)
        drawShape(ctx, shape, x, y + pointerY * 16 * shape.depth, shape.opacity * fade, streak)
      })

      // ── L8 · near dust (factor 1.15 — brightest and fastest) ────────────
      dustNear.forEach((d) => {
        const y = (((d.y * span - scroll * 1.15) % span) + span) % span - H
        if (y < -10 || y > H + 10) return
        ctx.fillStyle = RED + (d.opacity * 0.8).toFixed(3) + ')'
        ctx.fillRect(d.x * W + pointerX * 46, y, d.size, d.size * (1 + boost * 6))
      })

      // ── L9 · CRT overlay: scanlines, sweep, vignette ────────────────────
      ctx.strokeStyle = 'rgba(0,0,0,0.055)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let y = 0; y < H; y += 4) {
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
      }
      ctx.stroke()

      // A single bright scanline sweeping down the screen
      const sweepY = ((frame * 1.6) % (H + 200)) - 100
      const sweep = ctx.createLinearGradient(0, sweepY - 40, 0, sweepY + 40)
      sweep.addColorStop(0, 'rgba(255,34,68,0)')
      sweep.addColorStop(0.5, 'rgba(255,34,68,0.035)')
      sweep.addColorStop(1, 'rgba(255,34,68,0)')
      ctx.fillStyle = sweep
      ctx.fillRect(0, sweepY - 40, W, 80)

      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.92)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      rafId.current = requestAnimationFrame(draw)
    }

    if (reduced) {
      // One static frame: the depth cues stay, the motion does not.
      drawStatic()
      window.addEventListener('resize', drawStatic)
    } else {
      rafId.current = requestAnimationFrame(draw)
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', drawStatic)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default ArcadeBackground
