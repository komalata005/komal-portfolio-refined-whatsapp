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
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.work.title}</h2>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{t.work.subtitle}</p>
        </Reveal>

        <div ref={gridRef} className="skew-on-scroll grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const baseItem = t.work.items[p.name] || { desc: p.desc, meta: p.meta, tags: p.tags }
            const item = {
              ...baseItem,
              meta: p.name === 'Break Smart' ? 'Mobile app · Wellness' : p.name === 'Schedule Edge' ? 'Website · ERP system' : baseItem.meta,
            }
            return (
              <Reveal key={p.name} delay={(i % 3) * 90} className="flex flex-col">
                <a href={p.figmaUrl} target="_blank" rel="noopener noreferrer" className="mb-5 block" aria-label={`Open ${p.name} in Figma`}><TiltCard><div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-gradient-to-br p-4 ${p.gradient}`}
                >
                  <ProjectVisual kind={p.kind} />
                  <span className="absolute right-3.5 top-3 rounded-full border border-white/35 px-2.5 py-1 text-[0.68rem] tracking-wide text-white/80">
                    {item.meta.split(' · ')[0]}
                  </span>
                </div></TiltCard></a>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-xl dark:text-[#F6F2FC]"><a href={p.figmaUrl} target="_blank" rel="noopener noreferrer" className="hover:text-violet dark:hover:text-lilac">{p.name} ↗</a></h3>
                  <p className="text-[0.94rem] text-inkSoft dark:text-[#C8BFE3]">{item.desc}</p>
                  <div className="text-[0.82rem] text-inkSoft dark:text-[#9C90BC]">{item.meta}</div>
                  <div className="mt-0.5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="whitespace-nowrap rounded-full border border-[#D7C9F2] bg-[#F4EEFC] px-2.5 py-1 text-[0.76rem] text-violet transition-colors hover:bg-violet hover:text-white dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
