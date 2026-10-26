import { useEffect, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Seo from './Seo'
import { SEO_FAQS, SITE_NAME, absoluteUrl } from '../seo/site'

export default function FaqPage() {
  const [open, setOpen] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': absoluteUrl('/faq#faq'),
    url: absoluteUrl('/faq'),
    name: `FAQ | Hire ${SITE_NAME} UI UX Designer`,
    mainEntity: SEO_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <Seo
        title={`FAQ | Hire ${SITE_NAME} UI UX & Product Designer`}
        description="Answers about hiring Komal Ata for UI UX design, product design, mobile app design, Figma delivery, remote work from Karachi, and available case studies."
        path="/faq"
        jsonLdExtra={jsonLd}
      />
      <Nav />
      <main className="mx-auto max-w-content px-6 py-12 md:px-8 md:py-16">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-violet dark:text-lilac">FAQ</p>
        <h1 className="mt-2 max-w-[18ch] font-serif text-[1.85rem] tracking-[-0.03em] text-ink dark:text-[#F6F2FC] md:text-[2.35rem]">
          Frequently asked questions
        </h1>
        <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-7 text-inkSoft dark:text-[#C8BFE3]">
          Hiring a UI UX designer, product designer, or mobile app designer? Straight answers about Komal Ata’s work,
          process, and availability.
        </p>

        <div className="mt-8 space-y-2.5">
          {SEO_FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-[#E7E0F2]/90 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-start md:px-5"
                >
                  <span className="font-serif text-[1.05rem] leading-snug text-ink dark:text-[#F6F2FC]">{item.q}</span>
                  <span
                    className={`mt-1 shrink-0 text-violet transition dark:text-lilac ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="border-t border-[#E7E0F2]/80 px-4 pb-4 pt-3 text-[0.9rem] leading-7 text-inkSoft dark:border-white/10 dark:text-[#C8BFE3] md:px-5">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/#work"
            className="inline-flex rounded-full bg-violet px-5 py-2.5 text-[0.85rem] font-medium text-white transition hover:bg-violetDeep"
          >
            See selected work
          </a>
          <a
            href="/#expertise"
            className="inline-flex rounded-full border border-mistLine bg-white/70 px-5 py-2.5 text-[0.85rem] font-medium text-ink transition hover:border-violet dark:border-white/15 dark:bg-white/5 dark:text-[#EDE7F8]"
          >
            Expertise
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
