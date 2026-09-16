import { useEffect, useState } from 'react'

/** A thin gradient bar pinned to the top that fills as the page scrolls. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-30 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-lilac to-violet transition-[width] duration-100 ease-out dark:from-violet dark:to-lilac"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
