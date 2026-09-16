import { useRef } from 'react'

/**
 * Wraps an anchor/button so it subtly follows the cursor while hovered
 * (a "magnetic" pull), then eases back to rest on mouse leave.
 * Skipped automatically on touch devices via the pointer:fine check below.
 */
export default function Magnetic({ children, className = '', strength = 14, as: Tag = 'a', ...rest }) {
  const ref = useRef(null)

  const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const onMouseMove = (e) => {
    if (!isFinePointer || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`
  }

  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
