import { useEffect, useState } from 'react'

/** A thin gradient bar pinned to the top that fills as the page scrolls. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const [rtl, setRtl] = useState(false)

  useEffect(() => {
    const syncDir = () => setRtl(document.documentElement.dir === 'rtl')
    syncDir()

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()

    const observer = new MutationObserver(syncDir)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-30 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-lilac to-violet transition-[width] duration-100 ease-out dark:from-violet dark:to-lilac rtl:bg-gradient-to-l"
        style={{
          width: `${pct}%`,
          marginInlineStart: rtl ? 'auto' : 0,
        }}
      />
    </div>
  )
}
