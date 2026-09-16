import { useEffect } from 'react'

/**
 * Applies a small skew to a container based on how fast the page is
 * scrolling, then settles back to flat. Gives scrolling a sense of weight
 * — fast flicks bend the content slightly, slow scrolling doesn't.
 * Writes to a CSS variable so the styling stays in CSS.
 */
export default function useScrollVelocity(ref, { max = 3, damping = 0.88 } = {}) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lastY = window.scrollY
    let velocity = 0
    let rafId

    const tick = () => {
      const y = window.scrollY
      const delta = y - lastY
      lastY = y

      // Blend toward the new delta, then decay back to rest.
      velocity += (delta - velocity) * 0.25
      velocity *= damping

      const skew = Math.max(-max, Math.min(max, velocity * 0.22))
      node.style.setProperty('--skew', `${skew.toFixed(2)}deg`)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [ref, max, damping])
}
