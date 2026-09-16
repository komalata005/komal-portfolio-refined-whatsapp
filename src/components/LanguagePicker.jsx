import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, API_LANGUAGES } from '../i18n/languages'
import { useLocale } from '../context/LocaleContext'

export default function LanguagePicker() {
  const { locale, setLocale, language, loading } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const pick = (code) => {
    setLocale(code)
    setOpen(false)
  }

  const Item = ({ l }) => (
    <button
      key={l.code}
      onClick={() => pick(l.code)}
      className={`flex w-full items-center justify-between gap-4 px-3.5 py-2 text-left text-[0.88rem] transition-colors hover:bg-paperTint dark:hover:bg-white/5 ${
        locale === l.code ? 'text-violet dark:text-lilac' : 'text-ink dark:text-[#EDE7F8]'
      }`}
    >
      <span>{l.native}</span>
      <span className="text-[0.75rem] text-inkSoft dark:text-[#9C90BC]">{l.label}</span>
    </button>
  )

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose language"
        className="flex items-center gap-1.5 rounded-[3px] border border-mistLine px-3 py-2 text-[0.82rem] font-medium text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
      >
        {loading ? (
          <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
          </svg>
        )}
        <span>{language.native}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 z-30 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-md border border-mistLine bg-paper py-1.5 shadow-xl dark:border-white/10 dark:bg-midnight2"
        >
          {LANGUAGES.map((l) => (
            <Item key={l.code} l={l} />
          ))}

          <div className="my-1.5 border-t border-mistLine px-3.5 pt-2 pb-1 text-[0.7rem] uppercase tracking-wide text-inkSoft dark:border-white/10 dark:text-[#9C90BC]">
            Auto-translated
          </div>
          {API_LANGUAGES.map((l) => (
            <Item key={l.code} l={l} />
          ))}
        </div>
      )}
    </div>
  )
}
