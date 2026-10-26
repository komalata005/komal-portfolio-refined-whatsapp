import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

/** Canonical site URL, update if your live domain changes. */
export const SITE_URL = 'https://komalata.co'
export const PROFILE_IMAGE =
  'https://komalata01.netlify.app/assets/images/profile-pic.png'

export const SITE_NAME = 'Komal Ata'

export const DEFAULT_TITLE =
  'Komal Ata | UI UX Designer · Product Designer · Mobile App Designer'

export const DEFAULT_DESCRIPTION =
  'Hire Komal Ata | UI UX designer, product designer, and mobile app designer. 5+ years designing SaaS, fintech, HR, and consumer apps. Figma case studies, design systems, and shipped product UI.'

export const DEFAULT_KEYWORDS = [
  'UI UX designer',
  'UI/UX designer',
  'UX designer',
  'UI designer',
  'product designer',
  'app designer',
  'mobile designer',
  'mobile app designer',
  'web product designer',
  'SaaS UI designer',
  'Figma UI UX designer',
  'design systems designer',
  'UX designer portfolio',
  'product design portfolio',
  'hire UI UX designer',
  'UI UX designer Karachi',
  'product designer Pakistan',
  'Komal Ata designer',
  'Komal Ata',
].join(', ')

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/projects/nure-portfolio-thumbnail.png`

export const SEO_FAQS = [
  {
    q: 'Why hire Komal Ata for UI UX and product design?',
    a: 'Komal Ata is a UI UX and product designer with over five years of experience across mobile apps, SaaS, fintech, HR, and enterprise products. Her portfolio covers research, flows, and Figma delivery ready for engineering. See case studies at komalata.co.',
  },
  {
    q: 'Does Komal Ata design mobile apps and product interfaces?',
    a: 'Yes. Komal is a mobile app designer and product designer specializing in end-to-end UI/UX, research, flows, high-fidelity Figma UI, and design systems that ship with engineering.',
  },
  {
    q: 'What industries has Komal designed for?',
    a: 'Her case studies span household productivity (Nuré), manufacturing ERP (Schedule Edge), HR tech (Octofy), fintech spend (Caary), e-commerce (Puffy), wellness scheduling (Break Smart), construction web (Real Estate), and Arabic RTL enterprise UI (Etizan).',
  },
  {
    q: 'Does she work in Figma and hand off to engineering?',
    a: 'Yes. Work is designed in Figma with flows, components, and states intended for engineering handoff. Several case studies link directly to the source Figma files.',
  },
  {
    q: 'Can Komal Ata work remotely?',
    a: 'Yes. She is based in Karachi, Pakistan and available for remote UI UX and product design roles worldwide, with experience collaborating closely with engineering teams.',
  },
  {
    q: 'Where is Komal Ata based?',
    a: 'Komal Ata is a UI/UX and product designer based in Karachi, Pakistan, available for remote product design and UI/UX work worldwide.',
  },
  {
    q: 'How do I contact Komal for a design role or project?',
    a: 'Email komal.ata005@gmail.com, message on WhatsApp at +92 310 1339029, or use the contact section on komalata.co. She is open to new roles and available to join immediately.',
  },
  {
    q: 'What is included in her UI UX case studies?',
    a: 'Each case study covers the challenge, goals, users, process, wireframes, color and components, design decisions, key screens, and outcomes, tied to the real Figma file for that product.',
  },
]

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Komal Ata',
  alternateName: ['Komalata', 'Komal Ata UI UX'],
  url: SITE_URL,
  image: PROFILE_IMAGE,
  jobTitle: ['UI/UX Designer', 'Product Designer', 'Mobile App Designer'],
  description: DEFAULT_DESCRIPTION,
  knowsAbout: [
    'UI/UX design',
    'Product design',
    'Mobile app design',
    'App designer',
    'Web design',
    'Design systems',
    'Figma',
    'User research',
    'SaaS product design',
    'Fintech UX',
    'Enterprise UX',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'UI/UX Designer',
    occupationLocation: {
      '@type': 'City',
      name: 'Karachi',
    },
    skills: 'UI design, UX design, product design, mobile app design, Figma, design systems',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://www.linkedin.com/in/komal-ata',
    SITE_URL,
  ],
  email: 'mailto:komal.ata005@gmail.com',
  telephone: '+923101339029',
}

export const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#services`,
  name: 'Komal Ata | UI UX & Product Design',
  url: SITE_URL,
  image: PROFILE_IMAGE,
  description:
    'Professional UI UX design, product design, and mobile app design services by Komal Ata: portfolios, case studies, and design systems.',
  provider: { '@id': `${SITE_URL}/#person` },
  areaServed: ['PK', 'Worldwide'],
  serviceType: [
    'UI/UX Design',
    'Product Design',
    'Mobile App Design',
    'Web Product Design',
    'Design Systems',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressCountry: 'PK',
  },
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Komal Ata | UI UX Designer Portfolio',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: ['en'],
  publisher: { '@id': `${SITE_URL}/#person` },
  about: { '@id': `${SITE_URL}/#person` },
}

export function portfolioItemListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#portfolio`,
    name: 'UI UX & Product Design Case Studies by Komal Ata',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => {
      const study = caseStudies[project.slug]
      return {
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/case-study/${project.slug}`),
        name: study?.name || project.displayName || project.name,
        description: study?.meta || project.category || 'UI/UX case study',
      }
    }),
  }
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faq`,
    mainEntity: SEO_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: DEFAULT_TITLE,
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: { '@id': `${SITE_URL}/#person` },
  }
}

export function caseStudySeo(study, project) {
  const name = study?.name || project?.displayName || project?.name || 'Case study'
  const focus = study?.meta || project?.category || 'UI/UX case study'
  const path = `/case-study/${project?.slug || ''}`
  return {
    title: `${name} UI UX Case Study | Product Design by Komal Ata`,
    description: `${name} | ${focus}. UI UX and product design case study by Komal Ata: research, flows, mobile/web interface design, and Figma delivery.`,
    path,
    image: project?.image ? absoluteUrl(project.image) : DEFAULT_OG_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': absoluteUrl(`${path}#work`),
      name: `${name} | UI UX Case Study`,
      description: study?.overview || study?.tagline || focus,
      creator: { '@id': `${SITE_URL}/#person` },
      url: absoluteUrl(path),
      image: project?.image ? absoluteUrl(project.image) : DEFAULT_OG_IMAGE,
      about: ['UI/UX design', 'Product design', focus],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name, item: absoluteUrl(path) },
        ],
      },
    },
  }
}

export function sitemapPaths() {
  return ['/', '/faq', ...projects.map((p) => `/case-study/${p.slug}`)]
}
