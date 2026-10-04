import { projects } from '../data/projects'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { useRef } from 'react'
import useScrollVelocity from '../hooks/useScrollVelocity'
import { useLocale } from '../context/LocaleContext'

export default function Work() {
  const { t } = useLocale()
  const gridRef = useRef(null)
  useScrollVelocity(gridRef)

  return (
    <section id="work" className="border-t border-mistLine py-22 transition-colors dark:border-white/10 md:py-24">
      <div className="mx-auto max-w-content px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-violet dark:text-lilac">Curated portfolio</p>
            <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.work.title}</h2>
          </div>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{t.work.subtitle}</p>
        </Reveal>

        <div ref={gridRef} className="skew-on-scroll grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((p, i) => {
            const projectName = p.displayName || p.name
            const baseItem = t.work.items[p.name] || { desc: p.desc, meta: p.meta, tags: p.tags }
            const item = {
              ...baseItem,
              meta: p.category || (p.name === 'Break Smart' ? 'Mobile app · Wellness' : p.name === 'Schedule Edge' ? 'Website · ERP system' : baseItem.meta),
            }
            const caseHref = `/case-study/${p.slug}`
            return (
              <Reveal key={p.name} delay={(i % 2) * 90} className="flex flex-col">
                <article className="flex h-full flex-col rounded-3xl border border-[#E7E0F2] bg-white p-4 shadow-[0_10px_30px_rgba(70,49,111,0.06)] dark:border-white/10 dark:bg-midnight2">
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-inkSoft dark:text-[#9C90BC]">{item.meta}</p>
                    {p.status && (
                      <span className="shrink-0 rounded-full bg-[#F3ECFC] px-2.5 py-1 text-[0.68rem] font-medium text-violet dark:bg-lilac/15 dark:text-lilac">
                        {p.status}
                      </span>
                    )}
                  </div>
                  <h3 className="px-1 font-serif text-2xl dark:text-[#F6F2FC]">
                    <a href={caseHref} className="hover:text-violet dark:hover:text-lilac">{projectName}</a>
                  </h3>
                  <p className="mt-2 px-1 text-[0.92rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.desc}</p>
                  <a href={caseHref} className="group mt-4 block" aria-label={`View ${projectName} case study`}>
                    <TiltCard>
                      <div className={`relative flex ${p.image ? 'aspect-[8/5]' : 'aspect-[4/3] p-4'} items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient}`}>
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={`${projectName} project overview`}
                            width="1600"
                            height="1000"
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                          />
                        ) : (
                          <ProjectVisual kind={p.kind} />
                        )}
                      </div>
                    </TiltCard>
                  </a>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex flex-wrap gap-2">
                      {(item.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="whitespace-nowrap rounded-full border border-[#E4D8F6] bg-[#F8F4FD] px-2.5 py-1 text-[0.72rem] text-violet dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={caseHref} className="text-[0.85rem] font-medium text-violet hover:text-violetDeep dark:text-lilac">
                      {t.work.caseCta || 'View case study'} →
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
