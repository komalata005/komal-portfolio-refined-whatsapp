import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'
import { translations as curatedTranslations } from '../i18n/curatedTranslations'
import { getLanguage, RTL_CODES } from '../i18n/languages'
import { translateTree } from '../services/translate'

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('locale') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
    document.documentElement.dir = RTL_CODES.includes(locale) ? 'rtl' : 'ltr'
  }, [locale])

  const [fetched, setFetched] = useState({})
  const [loading, setLoading] = useState(false)
  const allCurated = { ...curatedTranslations, ...translations }
  useEffect(() => {
    if (allCurated[locale] || fetched[locale]) return
    let cancelled = false
    setLoading(true)
    translateTree(translations.en, locale)
      .then((tree) => { if (!cancelled) setFetched((prev) => ({ ...prev, [locale]: tree })) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [locale, fetched])
  const t = allCurated[locale] || fetched[locale] || translations.en

  return <LocaleContext.Provider value={{ locale, setLocale, t, loading, language: getLanguage(locale) }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
