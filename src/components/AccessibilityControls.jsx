import { useEffect, useRef, useState } from 'react'

export default function AccessibilityControls() {
  const [large, setLarge] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [open, setOpen] = useState(false)
  const controlsRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', large)
  }, [large])

  useEffect(() => {
    const closeControls = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.type === 'pointerdown' && !controlsRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', closeControls)
    document.addEventListener('pointerdown', closeControls)
    return () => {
      document.removeEventListener('keydown', closeControls)
      document.removeEventListener('pointerdown', closeControls)
      window.speechSynthesis?.cancel()
    }
  }, [])

  const readPage = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    if (!speaking) {
      const utterance = new SpeechSynthesisUtterance(document.querySelector('main')?.innerText || document.body.innerText)
      utterance.onend = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
      setSpeaking(true)
    } else setSpeaking(false)
  }

  return (
    <div ref={controlsRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open accessibility options"
        aria-expanded={open}
        aria-controls="accessibility-menu"
        className="grid h-9 w-9 place-items-center rounded-[3px] border border-mistLine text-ink transition-colors hover:border-violet hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
      >
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.5" r="2" />
          <path d="M4.5 8.5c4.9 1.6 10.1 1.6 15 0M12 10v10M8.5 20l3.5-6 3.5 6" />
        </svg>
      </button>

      {open && (
        <div
          id="accessibility-menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-md border border-mistLine bg-paper p-2 shadow-[0_16px_40px_rgb(31_20_55_/_0.16)] dark:border-white/15 dark:bg-[#241A3D]"
          aria-label="Accessibility options"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#C8BFE3]">Accessibility</p>
          <button type="button" onClick={() => setLarge((value) => !value)} aria-pressed={large} className="flex w-full items-center justify-between rounded px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-lilac/20 dark:text-[#EDE7F8] dark:hover:bg-white/10">
            <span>Larger text</span><span aria-hidden="true" className="font-semibold">{large ? 'A−' : 'A+'}</span>
          </button>
          <button type="button" onClick={readPage} aria-pressed={speaking} className="flex w-full items-center justify-between rounded px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-lilac/20 dark:text-[#EDE7F8] dark:hover:bg-white/10">
            <span>{speaking ? 'Stop reading' : 'Read page aloud'}</span>
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {speaking ? <rect x="7" y="7" width="10" height="10" /> : <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /></>}
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
