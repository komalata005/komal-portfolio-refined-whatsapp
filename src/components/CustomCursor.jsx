import { useEffect, useRef, useState } from 'react'

/** A quiet floral cursor that follows directly, without spring motion. */
export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const onMove = (event) => cursorRef.current?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`)
    const onOver = (event) => event.target.closest('a, button, [role="button"]') && cursorRef.current?.classList.add('flower-cursor-hover')
    const onOut = (event) => event.target.closest('a, button, [role="button"]') && cursorRef.current?.classList.remove('flower-cursor-hover')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={cursorRef} className="flower-cursor pointer-events-none fixed left-0 top-0 z-[100]" aria-hidden="true">
      <span>✿</span>
    </div>
  )
}
