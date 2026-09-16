import { useEffect, useRef } from 'react'

/**
 * Moves an element vertically as it passes through the viewport, so it
 * drifts slower (or faster) than the page. `speed` is a multiplier:
 * negative drifts up, positive drifts down. 0.15 is subtle, 0.4 is strong.
 * Runs on rAF and skips entirely for reduced-motion visitors.
 */
export default function useParallax(speed = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId
    let ticking = false

    const update = () => {
      const rect = node.getBoundingClientRect()
      // How far this element's centre is from the viewport centre.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      node.style.transform = `translate3d(0, ${offset * speed * -1}px, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [speed])

  return ref
}
