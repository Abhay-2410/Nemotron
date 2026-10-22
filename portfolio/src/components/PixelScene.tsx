import { useEffect, useRef } from 'react'

type PixelSceneProps = {
  className?: string
  fixed?: boolean
}

const PALETTE = {
  top: ['#2d2d2d', '#333333', '#3a3a3a', '#252525'],
  left: ['#1a1a1a', '#151515', '#1f1f1f'],
  right: ['#0f0f0f', '#121212', '#0a0a0a'],
  accent: ['#1e3a5f', '#312e81', '#1a2e1a', '#3b2f4a'],
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(Math.floor(seed)) % arr.length]
}

/** Scroll-independent height — parallax is position-only so scroll stays cheap. */
function heightAt(x: number, y: number, time: number): number {
  const wave =
    Math.sin(x * 0.35 + time * 0.0008) * 0.5 +
    Math.cos(y * 0.28 + time * 0.0006) * 0.5 +
    Math.sin((x + y) * 0.2 + time * 0.0004) * 0.35
  const ridge =
    Math.exp(-((x - 8) ** 2 + (y - 6) ** 2) / 18) * 2.2 +
    Math.exp(-((x - 18) ** 2 + (y - 14) ** 2) / 24) * 1.6
  return Math.max(0, Math.floor((wave + ridge + 1.2) * 1.8))
}

type Cell = {
  gx: number
  gy: number
  baseX: number
  baseY: number
  seed: number
  topColor: string
  leftColor: string
  rightColor: string
}

export default function PixelScene({ className = '', fixed = false }: PixelSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.15)
    // Larger tiles = far fewer path fills while looking the same at a glance.
    const tileW = isMobile ? 42 : 36
    const tileH = tileW / 2
    const halfW = tileW * 0.5
    const halfH = tileH * 0.5
    const extension = isMobile ? 4 : 6
    const padding = 8
    const animFps = isMobile ? 14 : 18
    const frameInterval = 1000 / animFps
    const parallaxRate = 0.04
    const idleStopMs = 900

    let width = 0
    let height = 0
    let cells: Cell[] = []
    let time = 0
    let lastFrame = 0
    let scrollY = window.scrollY
    let visible = !document.hidden
    let animating = !reduceMotion
    let frameId = 0
    let idleTimer = 0
    let needsPaint = true
    let linearGradient: CanvasGradient | null = null
    let vignetteGradient: CanvasGradient | null = null

    const buildCells = (cols: number, rows: number) => {
      const next: Cell[] = []

      for (let gy = -extension; gy < rows; gy += 1) {
        for (let gx = -extension; gx < cols; gx += 1) {
          const seed = gx * 13 + gy * 7
          const accent = seed % 17 === 0

          next.push({
            gx,
            gy,
            baseX: (gx - gy) * halfW,
            baseY: (gx + gy) * halfH,
            seed,
            topColor: accent ? pick(PALETTE.accent, seed + 5) : pick(PALETTE.top, seed),
            leftColor: accent ? pick(PALETTE.accent, seed + 3) : pick(PALETTE.left, seed + 1),
            rightColor: accent ? pick(PALETTE.accent, seed) : pick(PALETTE.right, seed + 2),
          })
        }
      }

      next.sort((a, b) => a.gx + a.gy - (b.gx + b.gy))
      cells = next
    }

    const rebuildGradients = () => {
      linearGradient = ctx.createLinearGradient(0, 0, 0, height)
      linearGradient.addColorStop(0, 'rgba(0,0,0,0.08)')
      linearGradient.addColorStop(0.5, 'rgba(0,0,0,0.18)')
      linearGradient.addColorStop(1, 'rgba(0,0,0,0.45)')

      vignetteGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.15,
        width * 0.5,
        height * 0.5,
        width * 0.85,
      )
      vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)')
      vignetteGradient.addColorStop(1, 'rgba(0,0,0,0.4)')
    }

    const resize = () => {
      if (fixed) {
        width = document.documentElement.clientWidth || window.innerWidth
        height = window.innerHeight
      } else {
        const parent = canvas.parentElement
        if (!parent) return
        width = parent.clientWidth
        height = parent.clientHeight
      }

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false

      // Size once for a long page so scroll never rebuilds the grid.
      const scrollRange = Math.max(
        2400,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const coveredShift = scrollRange * parallaxRate
      const diagonal =
        Math.ceil((width / 2 / halfW + (height + coveredShift) / halfH) / 2) + padding
      const cols = Math.min(90, Math.max(Math.ceil(width / halfW) + padding, diagonal))
      const rows = Math.min(90, Math.max(Math.ceil(height / halfH) + padding, diagonal))
      buildCells(cols, rows)
      rebuildGradients()
      needsPaint = true
    }

    const drawBlock = (sx: number, sy: number, blockH: number, cell: Cell) => {
      const depth = blockH * tileH
      const x = sx
      const y = sy - depth

      if (blockH > 0) {
        ctx.fillStyle = cell.rightColor
        ctx.beginPath()
        ctx.moveTo(x, y + tileH + depth)
        ctx.lineTo(x + halfW, y + halfH + depth)
        ctx.lineTo(x + halfW, y + halfH)
        ctx.lineTo(x, y + tileH)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = cell.leftColor
        ctx.beginPath()
        ctx.moveTo(x + halfW, y + halfH + depth)
        ctx.lineTo(x + tileW, y + depth)
        ctx.lineTo(x + tileW, y)
        ctx.lineTo(x + halfW, y + halfH)
        ctx.closePath()
        ctx.fill()
      }

      ctx.fillStyle = cell.topColor
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + halfW, y - halfH)
      ctx.lineTo(x + tileW, y)
      ctx.lineTo(x + halfW, y + halfH)
      ctx.closePath()
      ctx.fill()
    }

    const render = () => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      const originX = width * 0.5
      const originY = height * 0.68 - scrollY * parallaxRate
      const cullL = -tileW * 2
      const cullR = width + tileW * 2
      const cullT = -tileH * 12
      const cullB = height + tileH * 8

      for (let i = 0; i < cells.length; i += 1) {
        const cell = cells[i]
        const sx = originX + cell.baseX
        if (sx < cullL || sx > cullR) continue
        const sy = originY + cell.baseY
        if (sy < cullT || sy > cullB) continue

        // Use frozen `time` while idle — do not reset to 0 (that causes a visible jump).
        drawBlock(sx, sy, heightAt(cell.gx, cell.gy, time), cell)
      }

      if (linearGradient) {
        ctx.fillStyle = linearGradient
        ctx.fillRect(0, 0, width, height)
      }
      if (vignetteGradient) {
        ctx.fillStyle = vignetteGradient
        ctx.fillRect(0, 0, width, height)
      }

      needsPaint = false
    }

    const stopLoop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
        frameId = 0
      }
    }

    const scheduleIdleStop = () => {
      window.clearTimeout(idleTimer)
      if (reduceMotion) return
      idleTimer = window.setTimeout(() => {
        animating = false
      }, idleStopMs)
    }

    const loop = (now: number) => {
      frameId = 0
      if (!visible) return

      const elapsed = now - lastFrame
      const shouldAnim = animating && !reduceMotion
      const due = elapsed >= frameInterval

      // Scroll/parallax paints immediately; wave animation stays FPS-capped.
      if (needsPaint || (shouldAnim && due)) {
        if (shouldAnim && due) {
          lastFrame = now - (elapsed % frameInterval)
          time += elapsed
        }
        render()
      }

      if (visible && (animating || needsPaint)) {
        frameId = window.requestAnimationFrame(loop)
      }
    }

    const ensureLoop = () => {
      if (!visible || frameId) return
      lastFrame = performance.now()
      frameId = window.requestAnimationFrame(loop)
    }

    const onScroll = () => {
      scrollY = window.scrollY
      needsPaint = true

      // Animate gently only near the top of the page; freeze while browsing content.
      if (!reduceMotion && scrollY < height * 1.1) {
        animating = true
        scheduleIdleStop()
      } else {
        animating = false
        window.clearTimeout(idleTimer)
      }

      ensureLoop()
    }

    const onVisibility = () => {
      visible = !document.hidden
      if (visible) {
        needsPaint = true
        ensureLoop()
      } else {
        stopLoop()
      }
    }

    resize()
    onScroll()
    render()
    if (!reduceMotion) {
      animating = true
      ensureLoop()
      scheduleIdleStop()
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(idleTimer)
      stopLoop()
    }
  }, [fixed])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
