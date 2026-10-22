import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type UseCountUpOptions = {
  start?: number
  duration?: number
  decimals?: number
}

export function useCountUp(
  active: boolean,
  end: number,
  { start = 0, duration = 1.2, decimals = 0 }: UseCountUpOptions = {},
) {
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(start)
  const [display, setDisplay] = useState(() =>
    (reduceMotion ? end : start).toFixed(decimals),
  )

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplay(latest.toFixed(decimals))
  })

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(end.toFixed(decimals))
      return
    }

    if (!active) return

    motionValue.set(start)
    const controls = animate(motionValue, end, {
      duration,
      ease: [0, 0, 0.2, 1],
    })

    return () => controls.stop()
  }, [active, end, start, duration, decimals, reduceMotion, motionValue])

  return display
}

type CountUpProps = {
  value: number
  active: boolean
  start?: number
  duration?: number
  decimals?: number
  className?: string
}

export function CountUp({
  value,
  active,
  start = 0,
  duration = 1.2,
  decimals = 0,
  className = '',
}: CountUpProps) {
  const display = useCountUp(active, value, { start, duration, decimals })

  return <span className={className}>{display}</span>
}
