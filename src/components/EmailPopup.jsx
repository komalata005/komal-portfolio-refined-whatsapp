import { createContext, useContext, useEffect, useState } from 'react'

const EMAIL = 'komal.ata005@gmail.com'

const EmailDialogContext = createContext(null)

export function EmailDialogProvider({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <EmailDialogContext.Provider value={{ openEmail: () => setOpen(true) }}>
      {children}
      <EmailPopup open={open} onClose={() => setOpen(false)} />
    </EmailDialogContext.Provider>
  )
}

export function useEmailDialog() {
  const ctx = useContext(EmailDialogContext)
  if (!ctx) throw new Error('useEmailDialog must be used within EmailDialogProvider')
  return ctx
}

export default function EmailPopup({ open, onClose }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" role="presentation">
      <button type="button" aria-label="Close email popup" className="absolute inset-0 bg-midnight/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-popup-title"
        className="relative w-full max-w-md rounded-md border border-white/10 bg-paper p-8 text-ink shadow-[0_30px_80px_rgba(18,10,38,.35)] dark:bg-midnight2 dark:text-[#EDE7F8]"
      >
        <p id="email-popup-title" className="text-xs uppercase tracking-[0.22em] text-violet dark:text-lilac">
          Email Komal
        </p>
        <p className="mt-4 break-all font-serif text-2xl leading-snug md:text-3xl">{EMAIL}</p>
        <p className="mt-3 text-sm leading-6 text-inkSoft dark:text-[#C8BFE3]">
          Copy the address, or open it in your mail app.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copy}
            className="rounded-[3px] border border-violet bg-violet px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violetDeep"
          >
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center rounded-[3px] border border-mistLine px-5 py-2.5 text-sm font-medium text-ink transition hover:border-violet dark:border-white/15 dark:text-[#EDE7F8]"
          >
            Open mail
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-2 py-2.5 text-sm text-inkSoft dark:text-[#C8BFE3]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
