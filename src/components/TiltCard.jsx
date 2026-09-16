import { useRef } from 'react'

/**
 * Tilts its children in 3D toward the cursor, with a soft highlight that
 * tracks the pointer. Falls back to a plain div on touch devices or when
 * the visitor prefers reduced motion.
 */
export default function TiltCard({ children, className = '', max = 7 }) {
  const ref = useRef(null)

  const active =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMouseMove = (e) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }

  const reset = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className={`tilt-card transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  )
}
