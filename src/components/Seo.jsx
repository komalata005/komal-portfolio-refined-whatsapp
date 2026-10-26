import { useEffect } from 'react'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  faqJsonLd,
  personJsonLd,
  portfolioItemListJsonLd,
  professionalServiceJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from '../seo/site'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function upsertLink(rel, href, extra = {}) {
  const selector = Object.entries(extra).reduce(
    (sel, [k, v]) => `${sel}[${k}="${v}"]`,
    `link[rel="${rel}"]`,
  )
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd(id) {
  document.getElementById(id)?.remove()
}

/**
 * World-class SPA SEO head: titles, social, geo, and rich JSON-LD graph.
 */
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLdExtra = null,
  homeGraph = false,
}) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', DEFAULT_KEYWORDS)
    upsertMeta('name', 'author', 'Komal Ata')
    upsertMeta('name', 'creator', 'Komal Ata')
    upsertMeta('name', 'publisher', 'Komal Ata')
    upsertMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )
    upsertMeta('name', 'googlebot', noindex ? 'noindex' : 'index, follow')
    upsertMeta('name', 'rating', 'general')
    upsertMeta('name', 'revisit-after', '3 days')
    upsertMeta('name', 'geo.region', 'PK-SD')
    upsertMeta('name', 'geo.placename', 'Karachi')
    upsertMeta('name', 'geo.position', '24.8607;67.0011')
    upsertMeta('name', 'ICBM', '24.8607, 67.0011')
    upsertMeta('name', 'theme-color', '#5A3E8E')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type === 'article' ? 'article' : 'website')
    upsertMeta('property', 'og:site_name', `${SITE_NAME} | UI UX & Product Designer`)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:alt', 'Komal Ata UI UX designer portfolio')
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMeta('property', 'profile:first_name', 'Komal')
    upsertMeta('property', 'profile:last_name', 'Ata')
    upsertMeta('property', 'profile:username', 'komal-ata')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
    upsertMeta('name', 'twitter:image:alt', 'Komal Ata UI UX & product designer')

    upsertJsonLd('seo-person-jsonld', personJsonLd)
    upsertJsonLd('seo-website-jsonld', websiteJsonLd)
    upsertJsonLd('seo-service-jsonld', professionalServiceJsonLd)

    if (homeGraph) {
      upsertJsonLd('seo-profile-jsonld', profilePageJsonLd())
      upsertJsonLd('seo-portfolio-jsonld', portfolioItemListJsonLd())
      upsertJsonLd('seo-faq-jsonld', faqJsonLd())
    } else {
      removeJsonLd('seo-profile-jsonld')
      removeJsonLd('seo-portfolio-jsonld')
      removeJsonLd('seo-faq-jsonld')
    }

    if (jsonLdExtra) upsertJsonLd('seo-page-jsonld', jsonLdExtra)
    else removeJsonLd('seo-page-jsonld')

    // Keep SITE_URL discoverable for tools that read the DOM
    upsertLink('alternate', SITE_URL, { type: 'text/html' })
  }, [title, description, path, image, type, noindex, jsonLdExtra, homeGraph])

  return null
}
