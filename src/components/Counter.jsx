import { useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'

/**
 * Counts up to `value` the first time it scrolls into view, easing out
 * so it decelerates into the final number rather than stopping abruptly.
 */
export default function Counter({ value, suffix = '', duration = 1100, className = '' }) {
  const [wrapRef, inView] = useInView()
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    let rafId

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(Math.round(eased * value))
      if (p < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, value, duration])

  return (
    <span ref={wrapRef} className={className}>
      {display}
      {suffix}
    </span>
  )
}
