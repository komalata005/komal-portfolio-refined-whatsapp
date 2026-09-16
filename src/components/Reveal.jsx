import useInView from '../hooks/useInView'

/**
 * Wraps children in an element that fades and slides up into place the
 * first time it scrolls into view. Pass `delay` (ms) to stagger a group
 * of siblings, and `as` to change the rendered tag (default "div").
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
      } ${className}`}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </Tag>
  )
}
