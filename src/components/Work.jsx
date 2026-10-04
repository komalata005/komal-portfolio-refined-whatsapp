import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectVisual from './ProjectVisual'
import TiltCard from './TiltCard'
import SectionDivider from './SectionDivider'
import { useLocale } from '../context/LocaleContext'

function ProjectCard({ project, t }) {
  const projectName = project.displayName || project.name
  const baseItem = t.work.items[project.name] || { desc: project.desc, meta: project.meta, tags: project.tags }
  const item = {
    ...baseItem,
    meta: project.category || (project.name === 'Break Smart' ? 'Mobile app · Wellness' : project.name === 'Schedule Edge' ? 'Website · ERP system' : baseItem.meta),
  }
  const caseHref = `/case-study/${project.slug}`

  return (
    <article className="portfolio-marquee-card flex h-full flex-col rounded-3xl border border-[#E7E0F2] bg-white p-4 shadow-[0_10px_30px_rgba(70,49,111,0.06)] dark:border-white/10 dark:bg-midnight2">
      <p className="mb-3 px-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-inkSoft dark:text-[#9C90BC]">{item.meta}</p>
      <h3 className="px-1 font-serif text-2xl dark:text-[#F6F2FC]">
        <a href={caseHref} className="hover:text-violet dark:hover:text-lilac">{projectName}</a>
      </h3>
      <p className="mt-2 line-clamp-3 px-1 text-[0.92rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.desc}</p>
      <a href={caseHref} className="group mt-4 block" aria-label={`View ${projectName} case study`}>
        <TiltCard>
          <div className={`relative flex ${project.image ? 'aspect-[8/5]' : 'aspect-[4/3] p-4'} items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient}`}>
            {project.image ? (
              <img
                src={project.image}
                alt={`${projectName} project overview`}
                width="1600"
                height="1000"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
            ) : (
              <ProjectVisual kind={project.kind} />
            )}
          </div>
        </TiltCard>
      </a>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap gap-2">
          {(item.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap rounded-full border border-[#E4D8F6] bg-[#F8F4FD] px-2.5 py-1 text-[0.72rem] text-violet dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a href={caseHref} className="rounded-full border border-violet px-3.5 py-1.5 text-[0.82rem] font-medium text-violet hover:bg-violet hover:text-white dark:border-lilac dark:text-lilac dark:hover:bg-lilac dark:hover:text-midnight">
            {t.work.caseCta || 'View case study'} →
          </a>
          {project.figmaUrl && (
            <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#E4D8F6] bg-[#F8F4FD] px-3.5 py-1.5 text-[0.82rem] font-medium text-ink hover:border-violet hover:text-violet dark:border-white/15 dark:bg-white/5 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac">
              {t.work.figmaCta || 'Figma file'}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  const { t } = useLocale()
  const [paused, setPaused] = useState(false)
  const loop = [...projects, ...projects]

  return (
    <section id="work" className="py-22 transition-colors md:py-24">
      <SectionDivider label="Portfolio" />
      <div className="mx-auto mt-10 max-w-content px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.work.title}</h2>
          <p className="text-[0.85rem] text-inkSoft dark:text-[#9C90BC]">Scrolls continuously · hover to pause</p>
        </div>

        <div
          className={`portfolio-marquee ${paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="portfolio-marquee-track">
            {loop.map((project, i) => (
              <div key={`${project.slug}-${i}`} className="portfolio-marquee-item">
                <ProjectCard project={project} t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
