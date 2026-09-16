import { useEffect, useState } from 'react'

export default function AccessibilityControls() {
  const [large, setLarge] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', large)
  }, [large])

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

  return <div className="accessibility-controls" aria-label="Accessibility controls">
    <button onClick={() => setLarge((value) => !value)} aria-pressed={large}>{large ? 'A−' : 'A+'}<span className="sr-only">Toggle larger text</span></button>
    <button onClick={readPage} aria-pressed={speaking}>{speaking ? '■' : '🔊'}<span className="sr-only">Read page aloud</span></button>
  </div>
}
