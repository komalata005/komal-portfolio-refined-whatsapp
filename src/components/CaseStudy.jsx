import { useEffect } from 'react'
import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { caseStudyExtras } from '../data/caseStudyExtras'
import { caseStudyMedia } from '../data/caseStudyMedia'
import Nav from './Nav'
import Footer from './Footer'
import Reveal from './Reveal'
import GradientBackdrop from './GradientBackdrop'
import Seo from './Seo'
import { caseStudySeo } from '../seo/site'
import { useLocale } from '../context/LocaleContext'
import {
  ArtboardFrame,
  JourneyMap,
  SectionHead,
  PaperGrid,
  GoalGlyph,
  HeroDecor,
  ColorBand,
} from './CaseStudyGraphics'

const card =
  'rounded-2xl border border-[#E7E0F2]/90 bg-white/70 p-4 shadow-[0_8px_24px_rgba(46,33,80,0.04)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none'

function CardTitle({ children }) {
  return <h3 className="font-serif text-[1.05rem] leading-snug text-ink dark:text-[#F6F2FC]">{children}</h3>
}

const JOURNEY = ['Overview', 'Challenge', 'Goals', 'Research', 'Process', 'System', 'Screens', 'Outcome']

export default function CaseStudy({ slug }) {
  const { t } = useLocale()
  const project = projects.find((p) => p.slug === slug)
  const study = caseStudies[slug] ? { ...caseStudies[slug], ...(caseStudyExtras[slug] || {}) } : null
  const media = caseStudyMedia[slug] || { screens: [], designSystem: [], typography: [], kind: 'phone' }
  const index = projects.findIndex((p) => p.slug === slug)
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const ui = {
    back: 'Back to work',
    figma: 'Open Figma file',
    all: 'All projects',
    missing: 'Case study not found.',
    home: 'Back to portfolio',
    next: 'Next project',
    ...(t.localeCase || {}),
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const seo = study && project ? caseStudySeo(study, project) : null
  const isPhone = media.kind === 'phone'
  const screenList = (Array.isArray(media.screens) ? media.screens : study?.screens || []).slice(0, 6)

  if (!project || !study) {
    return (
      <>
        <Seo title="Case study not found | Komal Ata" path={`/case-study/${slug}`} noindex />
        <Nav />
        <main className="mx-auto max-w-content px-8 py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-violet">404</p>
          <h1 className="font-serif text-3xl dark:text-[#F6F2FC]">{ui.missing}</h1>
          <a href="/" className="mt-8 inline-flex rounded-full bg-violet px-5 py-3 text-sm text-white">
            {ui.home}
          </a>
        </main>
        <Footer />
      </>
    )
  }

  const facts = [
    ['Role', study.role],
    ['Platform', study.platform],
    ['Tools', study.tools],
    ['File', study.file],
  ]

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        image={seo.image}
        type="article"
        jsonLdExtra={seo.jsonLd}
      />
      <Nav />
      <main>
        {/* Hero */}
        <article className="relative overflow-hidden border-b border-mistLine dark:border-white/10">
          <GradientBackdrop />
          <HeroDecor />
          <div className="relative mx-auto max-w-content px-6 pb-10 pt-10 md:px-8 md:pb-14 md:pt-12">
            <a href="/#work" className="mb-6 inline-flex text-[0.82rem] text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
              ← {ui.back}
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#D7C9F2] bg-[#F4EEFC] px-2.5 py-1 text-[0.68rem] font-medium text-violet dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac">
                {study.meta}
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-inkSoft dark:text-[#9C90BC]">{study.name}</span>
              {project.status && (
                <span className="rounded-full border border-mistLine px-2.5 py-1 text-[0.68rem] text-inkSoft dark:border-white/15 dark:text-[#C8BFE3]">
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-[1.85rem] leading-[1.12] tracking-[-0.03em] text-ink dark:text-[#F6F2FC] md:text-[2.35rem]">
              {study.heading || study.tagline}
            </h1>
            {study.heading && (
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-inkSoft dark:text-[#C8BFE3]">{study.tagline}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-violet px-4 py-2 text-[0.82rem] font-medium text-white transition hover:bg-violetDeep"
              >
                {ui.figma} ↗
              </a>
              <a
                href="/#work"
                className="inline-flex items-center rounded-full border border-mistLine bg-white/70 px-4 py-2 text-[0.82rem] font-medium text-ink transition hover:border-violet dark:border-white/15 dark:bg-white/5 dark:text-[#EDE7F8]"
              >
                {ui.all}
              </a>
            </div>
          </div>
        </article>

        <section className="mx-auto max-w-content space-y-10 px-6 py-10 md:space-y-12 md:px-8 md:py-14">
          {/* Cover */}
          <Reveal>
            <ArtboardFrame label={study.name}>
              <div className={`overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${study.name} UI UX case study by Komal Ata`}
                    className="block aspect-[16/9] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center p-8 text-white/80">
                    <span className="font-serif text-2xl">{study.name}</span>
                  </div>
                )}
              </div>
              {study.colors && <ColorBand colors={study.colors} />}
            </ArtboardFrame>
          </Reveal>

          <JourneyMap steps={JOURNEY} />

          {/* Project brief */}
          <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className={card}>
                <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-inkSoft dark:text-[#9C90BC]">{label}</dt>
                <dd className="mt-1.5 font-serif text-[0.95rem] leading-snug text-ink dark:text-[#F6F2FC]">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Detailed overview */}
          <div className={`${card} !p-5 md:!p-6`}>
            <SectionHead type="challenge" eyebrow="01 · Project overview" title="What this work covers" />
            {media.scope && (
              <p className="mt-3 max-w-3xl text-[0.95rem] leading-7 text-ink dark:text-[#EDE7F8]">{media.scope}</p>
            )}
            <p className="mt-3 max-w-3xl text-[0.92rem] leading-7 text-inkSoft dark:text-[#C8BFE3]">{study.overview}</p>

            {(media.highlights?.length > 0 || media.deliverables?.length > 0) && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {media.highlights?.length > 0 && (
                  <div className="rounded-xl bg-[#F7F3FC] p-4 dark:bg-white/[0.04]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-violet dark:text-lilac">Key highlights</p>
                    <ul className="mt-3 space-y-2">
                      {media.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-[0.86rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet dark:bg-lilac" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {media.deliverables?.length > 0 && (
                  <div className="rounded-xl bg-[#F7F3FC] p-4 dark:bg-white/[0.04]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-violet dark:text-lilac">Deliverables</p>
                    <ul className="mt-3 space-y-2">
                      {media.deliverables.map((d) => (
                        <li key={d} className="flex gap-2 text-[0.86rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet dark:bg-lilac" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Challenge */}
          <div className={`${card} !p-5 md:!p-6`}>
            <SectionHead type="challenge" eyebrow="02 · Challenge" title="The problem worth solving" />
            <p className="mt-3 max-w-3xl text-[0.92rem] leading-7 text-ink dark:text-[#EDE7F8]">{study.problem}</p>
            {study.target && (
              <p className="mt-3 max-w-3xl text-[0.88rem] leading-7 text-inkSoft dark:text-[#B0A8C4]">
                <span className="font-medium text-ink dark:text-[#F6F2FC]">Audience. </span>
                {study.target}
              </p>
            )}
            {study.audience?.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {study.audience.map((a) => (
                  <div key={a.title} className="rounded-xl border border-[#E7E0F2]/80 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <CardTitle>{a.title}</CardTitle>
                    <p className="mt-2 text-[0.84rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{a.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Goals */}
          {study.goals?.length > 0 && (
            <div>
              <SectionHead type="goals" eyebrow="03 · Goals" title="What success looked like" />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {study.goals.map((goal, i) => (
                  <Reveal key={goal} className={card}>
                    <GoalGlyph n={i + 1} />
                    <p className="mt-3 text-[0.86rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{goal}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Research / people */}
          {study.people && (
            <div>
              <SectionHead type="research" eyebrow="04 · Research" title="Who this was for" />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {study.people.map((person) => (
                  <Reveal key={person.name} className={card}>
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-midnight2"
                        />
                        <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-white bg-violet dark:border-midnight2 dark:bg-lilac" aria-hidden="true" />
                      </div>
                      <div>
                        <CardTitle>{person.name}</CardTitle>
                        <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-violet dark:text-lilac">{person.role}</p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {(person.points || [person.pain]).map((point) => (
                        <li key={point} className="flex gap-2 text-[0.84rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet dark:bg-lilac" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          <div>
            <SectionHead type="process" eyebrow="05 · Process" title="How it was shaped" />
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {study.process.map((step, i) => (
                <li key={step.title} className={`relative ${card}`}>
                  <span className="absolute end-3 top-3 font-serif text-3xl leading-none text-violet/15 dark:text-lilac/20" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="text-[0.65rem] font-semibold text-violet dark:text-lilac">Step {i + 1}</span>
                  <CardTitle>
                    <span className="mt-1 block">{step.title}</span>
                  </CardTitle>
                  <p className="mt-2 text-[0.84rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{step.body || step.note}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Wireframes */}
          {study.sketch && (
            <div>
              <SectionHead
                type="explore"
                eyebrow="06 · Exploration"
                title="Sketched before the color"
                lead="Pencil wireframes of the key screens, drawn on paper before the interface was built."
              />
              <div className="mt-4">
                <PaperGrid>
                  <img src={study.sketch} alt={`${study.name} pencil wireframes`} className="w-full rounded-lg" />
                </PaperGrid>
              </div>
            </div>
          )}

          {/* Design system — real boards + colors + type + components */}
          <div>
            <SectionHead
              type="system"
              eyebrow="07 · Design system"
              title="Language of the product"
              lead="Colors, type, and components taken from this project’s Figma file, not a generic kit."
            />

            {study.colors && (
              <div className={`mt-4 ${card}`}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#9C90BC]">Color palette</p>
                <ColorBand colors={study.colors} />
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                  {study.colors.map((color) => (
                    <div key={color.hex} className="flex items-center gap-2.5" title={color.use}>
                      <span
                        className="h-10 w-10 shrink-0 rounded-full border border-black/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] dark:border-white/15"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[0.78rem] font-medium text-ink dark:text-[#F6F2FC]">{color.name}</p>
                        <p className="font-sans text-[0.65rem] tracking-wide text-inkSoft dark:text-[#9C90BC]">{color.hex}</p>
                        <p className="mt-0.5 max-w-[10rem] text-[0.68rem] leading-4 text-inkSoft dark:text-[#9C90BC]">{color.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {media.typography?.length > 0 && (
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {media.typography.map((type) => (
                  <div key={type.label} className={card}>
                    <p className="text-[0.62rem] uppercase tracking-[0.14em] text-violet dark:text-lilac">{type.label}</p>
                    <p className="mt-2 font-serif text-[1.25rem] leading-snug text-ink dark:text-[#F6F2FC]">{type.sample}</p>
                    <p className="mt-2 text-[0.78rem] leading-5 text-inkSoft dark:text-[#C8BFE3]">{type.detail}</p>
                  </div>
                ))}
              </div>
            )}

            {media.designSystem?.length > 0 && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {media.designSystem.map((item) => (
                  <Reveal key={item.name} className={`${card} !p-3 ${item.wide ? 'md:col-span-2' : ''}`}>
                    <div className="overflow-hidden rounded-xl bg-[#F4F0FA] dark:bg-white/[0.03]">
                      <img src={item.image} alt={`${study.name} ${item.name}`} className="block w-full object-contain" />
                    </div>
                    <div className="px-1 pt-3 pb-1">
                      <CardTitle>{item.name}</CardTitle>
                      <p className="mt-1 text-[0.82rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {study.components?.length > 0 && (
              <div className="mt-4">
                <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#9C90BC]">Key components</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {study.components.map((item) => (
                    <Reveal key={item.name} className={card}>
                      <div className="mb-2 flex h-8 items-end gap-1" aria-hidden="true">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: study.colors?.[0]?.hex || '#5A3E8E', opacity: 0.35 }} />
                        <span className="h-5 w-8 rounded-sm" style={{ backgroundColor: study.colors?.[1]?.hex || '#A78BDB', opacity: 0.55 }} />
                        <span className="h-4 w-5 rounded-sm" style={{ backgroundColor: study.colors?.[2]?.hex || '#D4C2F5', opacity: 0.7 }} />
                      </div>
                      <CardTitle>{item.name}</CardTitle>
                      <p className="mt-1.5 text-[0.82rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.note}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Decisions */}
          <div>
            <SectionHead type="solution" eyebrow="08 · Solution" title="Decisions inside the product" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {study.decisions.map((item, i) => (
                <Reveal key={item.title} className={card}>
                  <span className="inline-flex h-6 items-center rounded-full bg-[#F4EEFC] px-2 text-[0.65rem] font-semibold text-violet dark:bg-lilac/15 dark:text-lilac">
                    0{i + 1}
                  </span>
                  <CardTitle>
                    <span className="mt-2 block">{item.title}</span>
                  </CardTitle>
                  <p className="mt-2 text-[0.84rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Real interface screens — Nuré, Break Smart, Etizan (Arabic) only */}
          {screenList.length > 0 && (
            <div>
              <SectionHead
                type="interface"
                eyebrow="09 · Interface"
                title="Real screens from the file"
                lead={
                  slug === 'etizan'
                    ? 'Arabic RTL frames from the Etizan Figma file.'
                    : 'Exported from the project Figma, named so a reviewer can open the same frames.'
                }
              />

              <div className={`mt-5 grid gap-5 ${isPhone ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
                {screenList.map((screen, i) => {
                  const wide = screen.wide || (!isPhone && screenList.length <= 3)
                  return (
                    <Reveal
                      key={screen.name + i}
                      className={`${card} !p-3 ${wide && isPhone ? 'sm:col-span-2 lg:col-span-3' : ''} ${wide && !isPhone ? 'md:col-span-2' : ''}`}
                    >
                      {screen.image ? (
                        <div
                          className={`overflow-hidden rounded-xl bg-[#F4F0FA] dark:bg-[#1A1624] ${
                            isPhone && !wide ? 'mx-auto max-w-[240px]' : ''
                          }`}
                        >
                          <img
                            src={screen.image}
                            alt={`${study.name}: ${screen.name}`}
                            className={`block w-full ${isPhone && !wide ? 'object-contain' : 'object-cover'}`}
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <div className="flex items-start justify-between gap-2 px-1 pt-3 pb-1">
                        <div>
                          <CardTitle>{screen.name}</CardTitle>
                          <p className="mt-1.5 text-[0.84rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{screen.note}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-[#F4EEFC] px-2 py-0.5 text-[0.65rem] font-semibold text-violet dark:bg-lilac/15 dark:text-lilac">
                          {i + 1}
                        </span>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          )}

          {/* Outcomes */}
          <div>
            <SectionHead type="outcome" eyebrow="10 · Outcome" title="What a client can take from this" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {study.outcomes.map((item, i) => (
                <Reveal
                  key={item}
                  className="relative overflow-hidden rounded-2xl border border-[#E4D8F6] bg-[#F7F3FC] p-4 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <span className="pointer-events-none absolute -end-2 -top-3 font-serif text-6xl text-violet/10 dark:text-lilac/15" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="relative font-serif text-xl text-violet dark:text-lilac">0{i + 1}</span>
                  <p className="relative mt-3 text-[0.86rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* File CTA */}
          <Reveal className={`${card} !p-5 md:!p-6`}>
            <SectionHead type="system" eyebrow="The file" title="Read it against the file" />
            <p className="mt-2 max-w-2xl text-[0.88rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">
              Screens, components, and flows live in {study.file}. This case study follows that file rather than a separate deck.
            </p>
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-violet px-5 py-2.5 text-[0.82rem] font-medium text-white transition hover:bg-violetDeep"
            >
              {ui.figma} ↗
            </a>
          </Reveal>

          {next && (
            <a
              href={`/case-study/${next.slug}`}
              className={`flex items-center justify-between ${card} transition hover:border-violet/40 dark:hover:border-lilac/30`}
            >
              <span className="text-[0.8rem] text-inkSoft dark:text-[#C8BFE3]">{ui.next}</span>
              <span className="font-serif text-[1.15rem] text-ink dark:text-[#F6F2FC]">{next.displayName || next.name} →</span>
            </a>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
