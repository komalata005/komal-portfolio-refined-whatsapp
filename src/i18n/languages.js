/**
 * The 8 curated languages. These have hand-written translations in
 * translations.js — instant, no network call, no rate limits.
 */
export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'ur', label: 'Urdu', native: 'اردو', dir: 'rtl' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'de', label: 'German', native: 'Deutsch', dir: 'ltr' },
  { code: 'it', label: 'Italian', native: 'Italiano', dir: 'ltr' },
  { code: 'ru', label: 'Russian', native: 'Русский', dir: 'ltr' },
  { code: 'ja', label: 'Japanese', native: '日本語', dir: 'ltr' },
  { code: 'zh', label: 'Chinese', native: '中文', dir: 'ltr' },
]

/**
 * Extra languages with NO hand-written translation. Picking one of these
 * triggers a live machine-translation fetch (see services/translate.js).
 * Add or remove freely — nothing else needs to change.
 */
export const API_LANGUAGES = [
  { code: 'fr', label: 'French', native: 'Français', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'pt', label: 'Portuguese', native: 'Português', dir: 'ltr' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe', dir: 'ltr' },
  { code: 'ko', label: 'Korean', native: '한국어', dir: 'ltr' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands', dir: 'ltr' },
]

export const ALL_LANGUAGES = [...LANGUAGES, ...API_LANGUAGES]

export const RTL_CODES = ALL_LANGUAGES.filter((l) => l.dir === 'rtl').map((l) => l.code)

export function getLanguage(code) {
  return ALL_LANGUAGES.find((l) => l.code === code) || LANGUAGES[0]
}
