import SectionDivider from './SectionDivider'
import { SEO_FAQS } from '../seo/site'

/**
 * Crawlable on-page SEO content: expertise cards + FAQ preview.
 */
export default function SeoContent() {
  return (
    <section id="expertise" className="scroll-mt-24 py-12 transition-colors md:py-14" aria-labelledby="expertise-heading">
      <SectionDivider label="Expertise" />
      <div className="mx-auto mt-6 max-w-content px-8">
        <div className="max-w-[62ch]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet dark:text-lilac">
            UI UX · Product · Mobile
          </p>
          <h2 id="expertise-heading" className="mt-2 font-serif text-[1.45rem] tracking-[-0.03em] dark:text-[#F6F2FC] md:text-[1.7rem]">
            UI UX designer &amp; product designer for apps people ship
          </h2>
          <p className="mt-3 text-[0.92rem] leading-7 text-inkSoft dark:text-[#C8BFE3]">
            Looking for a <strong className="font-medium text-ink dark:text-[#F6F2FC]">UI UX designer</strong>,{' '}
            <strong className="font-medium text-ink dark:text-[#F6F2FC]">product designer</strong>,{' '}
            <strong className="font-medium text-ink dark:text-[#F6F2FC]">app designer</strong>, or{' '}
            <strong className="font-medium text-ink dark:text-[#F6F2FC]">mobile designer</strong>? Komal Ata designs
            clear product interfaces, mobile apps, SaaS dashboards, fintech, HR, and enterprise systems, from
            research to high-fidelity Figma ready for engineering.
          </p>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'UI/UX design', body: 'Flows, wireframes, usability, and polished interface design.' },
            { title: 'Product design', body: 'End-to-end product thinking for SaaS and consumer apps.' },
            { title: 'Mobile app design', body: 'iOS/Android patterns, onboarding, and thumb-friendly UI.' },
            { title: 'Design systems', body: 'Reusable components and tokens teams can ship with.' },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-[#E7E0F2]/90 bg-white/45 px-4 py-4 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="font-serif text-[1.02rem] text-ink dark:text-[#F6F2FC]">{item.title}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-5 text-inkSoft dark:text-[#C8BFE3]">{item.body}</p>
            </li>
          ))}
        </ul>

        <div id="faq-preview" className="mt-8 border-t border-[#E7E0F2]/90 pt-6 dark:border-white/10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-serif text-[1.15rem] dark:text-[#F6F2FC]">Frequently asked</h3>
            <a href="/faq" className="text-[0.82rem] font-medium text-violet transition hover:underline dark:text-lilac">
              Full FAQ →
            </a>
          </div>
          <dl className="mt-4 grid gap-3 md:grid-cols-2">
            {SEO_FAQS.slice(0, 4).map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-[#E7E0F2]/90 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <dt className="font-serif text-[0.95rem] text-ink dark:text-[#F6F2FC]">{item.q}</dt>
                <dd className="mt-2 text-[0.82rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
