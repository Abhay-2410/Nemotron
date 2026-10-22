import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { LOW_END_BREAKPOINT, MOBILE_BREAKPOINT, SECTION_OPACITY } from './constants'
import type { SectionVoxelProps, VoxelPlacement } from './types'

const LazyVoxelScene = lazy(() => import('./VoxelScene'))

const placementClasses: Record<VoxelPlacement, string> = {
  'hero-text':
    'top-[54%] left-[20%] max-lg:top-[18%] max-lg:left-[50%] -translate-x-1/2 -translate-y-1/2',
  left: 'top-1/2 left-0 -translate-y-1/2 -translate-x-[10%]',
  right: 'top-1/2 right-0 -translate-y-1/2 translate-x-[10%]',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

function useDeviceProfile() {
  const [profile, setProfile] = useState({ mobile: false, lowEnd: false })

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      setProfile({
        mobile: width < MOBILE_BREAKPOINT,
        lowEnd: width < LOW_END_BREAKPOINT,
      })
    }

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return profile
}

export default function SectionVoxel({
  shape,
  placement = 'right',
  eager = false,
  density = 1,
  scale = 1,
  opacity,
  scrollHighlight = false,
  className = '',
}: SectionVoxelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { mobile, lowEnd } = useDeviceProfile()
  const [mounted, setMounted] = useState(eager)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [scrollOffset, setScrollOffset] = useState(0)
  const [highlight, setHighlight] = useState(0)

  const inView = useInView(containerRef, {
    amount: eager ? 0 : 0.15,
    margin: eager ? '0px' : '100px 0px -60px 0px',
    once: false,
  })

  const targetOpacity =
    opacity ?? (eager ? SECTION_OPACITY.hero : shape === 'wave-grid' ? SECTION_OPACITY.contact : SECTION_OPACITY.default)

  const [displayOpacity, setDisplayOpacity] = useState(eager ? targetOpacity : 0)
  const [displayScale, setDisplayScale] = useState(eager ? 1 : 0.94)

  useEffect(() => {
    if (eager || inView) setMounted(true)
  }, [eager, inView])

  useEffect(() => {
    if (eager) {
      setDisplayOpacity(targetOpacity)
      setDisplayScale(1)
      return
    }

    if (inView) {
      setDisplayOpacity(targetOpacity)
      setDisplayScale(1)
      if (scrollHighlight) setHighlight(1)
    } else {
      setDisplayOpacity(0)
      setDisplayScale(0.94)
      if (scrollHighlight) setHighlight(0)
    }
  }, [eager, inView, targetOpacity, scrollHighlight])

  useEffect(() => {
    if (reduceMotion) return

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x: nx * 0.3, y: ny * 0.2 })
    }

    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const normalized = center / window.innerHeight - 0.5
      setScrollOffset(normalized * 0.5)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduceMotion])

  const effectiveDensity = density * (mobile ? 0.55 : lowEnd ? 0.78 : 1)
  const effectiveScale = scale * (mobile ? 0.78 : lowEnd ? 0.9 : 1)
  const isActive = eager || inView
  const showCanvas = mounted && isActive

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-[min(48vw,420px)] w-[min(48vw,420px)] max-lg:h-[min(62vw,300px)] max-lg:w-[min(62vw,300px)] ${placementClasses[placement]} ${className}`}
    >
      <div
        className="h-full w-full transition-[opacity,transform] duration-1000 ease-out"
        style={{
          opacity: displayOpacity,
          transform: `scale(${displayScale})`,
        }}
      >
        {showCanvas ? (
          <Suspense fallback={null}>
            <LazyVoxelScene
              shape={shape}
              density={effectiveDensity}
              scale={effectiveScale}
              highlight={scrollHighlight ? highlight : 0}
              mouse={mouse}
              scrollOffset={scrollOffset}
              active={isActive}
              mobile={mobile}
              reduceMotion={!!reduceMotion}
            />
          </Suspense>
        ) : mobile && mounted ? (
          <div
            className="h-full w-full rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(232,232,232,0.07) 0%, rgba(110,123,255,0.04) 45%, transparent 72%)',
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
