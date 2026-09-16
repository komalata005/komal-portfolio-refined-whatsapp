/**
 * Live machine translation, used ONLY for languages that don't have a
 * hand-written entry in i18n/translations.js.
 *
 * Uses MyMemory's public endpoint — free and keyless, so nothing secret
 * ends up in this frontend bundle. Trade-offs worth knowing:
 *   - Rate limited (roughly 5k words/day per IP, anonymous)
 *   - Machine quality: fine for gist, not for a headline you're proud of
 *   - Adds a network round-trip, so there's a visible loading state
 *
 * Results are cached in sessionStorage so switching back to a language
 * you already viewed is instant and costs no extra requests.
 *
 * To swap in a paid provider (DeepL, Google), replace translateBatch()
 * below — everything else stays the same. Route it through a small
 * backend so the API key never reaches the browser.
 */

const ENDPOINT = 'https://api.mymemory.translated.net/get'
const CACHE_PREFIX = 'tr-cache:'

function cacheKey(text, target) {
  return `${CACHE_PREFIX}${target}:${text}`
}

function readCache(text, target) {
  try {
    return sessionStorage.getItem(cacheKey(text, target))
  } catch {
    return null
  }
}

function writeCache(text, target, value) {
  try {
    sessionStorage.setItem(cacheKey(text, target), value)
  } catch {
    /* storage full or blocked — not fatal, just skip caching */
  }
}

/** Translate a single string. Returns the original text if anything fails. */
async function translateOne(text, target, source = 'en') {
  if (!text || typeof text !== 'string' || !text.trim()) return text

  const cached = readCache(text, target)
  if (cached !== null) return cached

  try {
    const url = `${ENDPOINT}?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const out = data?.responseData?.translatedText
    if (!out || typeof out !== 'string') throw new Error('Unexpected response shape')
    writeCache(text, target, out)
    return out
  } catch (err) {
    console.warn('[translate] falling back to source text:', err.message)
    return text
  }
}

/**
 * Walks the English translation object and translates every string value,
 * preserving the exact shape so components can read it unchanged.
 * Requests run in small batches to stay polite to the public endpoint.
 */
/** Brand names, tool names and codes that should never be translated. */
const SKIP = new Set([
  'Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Cursor', 'Claude', 'ChatGPT',
  'HTML', 'CSS / SCSS', 'Bootstrap', 'Tailwind', 'React', 'Nuré', 'Schedule Edge',
  'Octofy', 'Carry App', 'Puffy', 'Break Smart', 'Real Estate', 'Cipher Impact',
  'HRSG', 'Groupshop', 'Botsify', 'PIA', 'Aa Interfaces',
  'Sir Syed University of Engineering & Technology',
])

function shouldSkip(text) {
  if (SKIP.has(text.trim())) return true
  // Pure numbers/symbols ("01", "5 years" is fine to translate, "↗" is not)
  if (!/[a-z]/i.test(text)) return true
  return false
}

export async function translateTree(tree, target, { batchSize = 6 } = {}) {
  const jobs = []

  function walk(node, assign) {
    if (typeof node === 'string') {
      if (!shouldSkip(node)) jobs.push({ text: node, assign })
      return node
    }
    if (Array.isArray(node)) {
      const arr = []
      node.forEach((item, i) => {
        arr[i] = walk(item, (v) => {
          arr[i] = v
        })
      })
      return arr
    }
    if (node && typeof node === 'object') {
      const obj = {}
      for (const [k, v] of Object.entries(node)) {
        obj[k] = walk(v, (val) => {
          obj[k] = val
        })
      }
      return obj
    }
    return node
  }

  const result = walk(tree, () => {})

  for (let i = 0; i < jobs.length; i += batchSize) {
    const slice = jobs.slice(i, i + batchSize)
    await Promise.all(
      slice.map(async (job) => {
        const translated = await translateOne(job.text, target)
        job.assign(translated)
      }),
    )
  }

  return result
}
