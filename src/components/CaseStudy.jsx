import { useEffect } from 'react'
import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { caseStudyExtras } from '../data/caseStudyExtras'
import Nav from './Nav'
import Footer from './Footer'
import Reveal from './Reveal'
import GradientBackdrop from './GradientBackdrop'
import { useLocale } from '../context/LocaleContext'

function Label({ children }) {
  return <p className="text-xs uppercase tracking-[0.22em] text-violet dark:text-lilac">{children}</p>
}

export default function CaseStudy({ slug }) {
  const { t } = useLocale()
  const project = projects.find((p) => p.slug === slug)
  const study = caseStudies[slug] ? { ...caseStudies[slug], ...(caseStudyExtras[slug] || {}) } : null
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
    const previous = document.title
    document.title = study ? `${study.name} — Komal Ata` : 'Komal Ata — Senior UI/UX Designer'
    return () => {
      document.title = previous
    }
  }, [study])

  if (!project || !study) {
    return (
      <>
        <Nav />
        <main className="mx-auto max-w-content px-8 py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-violet">404</p>
          <h1 className="font-serif text-4xl dark:text-[#F6F2FC]">{ui.missing}</h1>
          <a href="/" className="mt-8 inline-flex rounded-[3px] bg-violet px-5 py-3 text-sm text-white">
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
    ['Figma', study.file],
  ]

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-mistLine dark:border-white/10">
          <GradientBackdrop />
          <div className="relative mx-auto max-w-content px-8 pb-16 pt-12 md:pb-24 md:pt-16">
            <a href="/#work" className="mb-10 inline-flex text-sm text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
              ← {ui.back}
            </a>
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#D7C9F2] bg-[#F4EEFC] px-3 py-1 text-xs text-violet dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac">
                  {study.meta}
                </span>
              </div>
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-violet dark:text-lilac">{study.name}</p>
              <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight dark:text-[#F6F2FC] md:text-7xl">{study.heading || study.tagline}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-inkSoft dark:text-[#C8BFE3] md:text-2xl">{study.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[3px] border border-violet bg-violet px-5 py-3 text-sm font-medium text-white transition hover:bg-violetDeep"
                >
                  {ui.figma} ↗
                </a>
                <a
                  href="/#work"
                  className="inline-flex items-center rounded-[3px] border border-mistLine bg-white/70 px-5 py-3 text-sm font-medium text-ink transition hover:border-violet dark:border-white/15 dark:bg-white/5 dark:text-[#EDE7F8]"
                >
                  {ui.all}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-content px-8 py-14 md:py-20">
          <Reveal>
            <div className={`overflow-hidden rounded-md bg-gradient-to-br ${project.gradient} shadow-[0_30px_80px_rgba(46,33,80,.16)]`}>
              {project.image ? (
                <img src={project.image} alt={`${study.name} project`} className="block aspect-[8/5] w-full object-cover" />
              ) : (
                <div className="flex aspect-[8/5] items-center justify-center p-8 text-white/80">
                  <span className="font-serif text-3xl">{study.name}</span>
                </div>
              )}
            </div>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-mistLine py-6 dark:border-white/10 md:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.18em] text-inkSoft dark:text-[#9C90BC]">{label}</dt>
                <dd className="mt-2 font-serif text-lg dark:text-[#F6F2FC]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16">
            <Label>01 / The Context</Label>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl dark:text-[#F6F2FC] md:text-5xl">Where the work starts</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-inkSoft dark:text-[#C8BFE3]">{study.overview}</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink dark:text-[#F6F2FC]">{study.problem}</p>
            {study.target && <p className="mt-4 max-w-3xl leading-8 text-inkSoft dark:text-[#C8BFE3]">{study.target}</p>}
          </div>

          {study.people && (
            <div className="mt-10">
              <h3 className="font-serif text-2xl dark:text-[#F6F2FC]">Pain points</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {study.people.map((person) => (
                  <Reveal key={person.name} className="rounded-md border border-mistLine bg-white/70 p-6 dark:border-white/10 dark:bg-white/[.04]">
                    <div className="flex items-center gap-4">
                      <img src={person.image} alt={person.name} className="h-20 w-20 shrink-0 rounded-full object-cover object-center ring-2 ring-white dark:ring-midnight2" />
                      <div>
                        <h4 className="font-serif text-2xl dark:text-[#F6F2FC]">{person.name}</h4>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-violet dark:text-lilac">{person.role}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {(person.points || [person.pain]).map((point) => (
                        <li key={point} className="flex gap-3 leading-6 text-inkSoft dark:text-[#C8BFE3]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet dark:bg-lilac" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20">
            <Label>02 / The Solution</Label>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl dark:text-[#F6F2FC] md:text-5xl">Sketched before the color</h2>
            <p className="mt-5 max-w-2xl leading-7 text-inkSoft dark:text-[#C8BFE3]">
              Pencil wireframes of the key screens, drawn on paper before the interface was built.
            </p>
            {study.sketch && (
              <img
                src={study.sketch}
                alt={`${study.name} pencil wireframes`}
                className="mt-8 w-full rounded-md border border-mistLine bg-[#F7F4EE] dark:border-white/10"
              />
            )}
          </div>

          {study.colors && (
            <div className="mt-12">
              <h3 className="font-serif text-2xl dark:text-[#F6F2FC]">Color</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {study.colors.map((color) => (
                  <div key={color.hex} className="overflow-hidden rounded-md border border-mistLine dark:border-white/10">
                    <div className="h-16" style={{ backgroundColor: color.hex }} />
                    <div className="p-3">
                      <p className="font-serif text-base dark:text-[#F6F2FC]">{color.name}</p>
                      <p className="mt-1 font-sans text-xs tracking-wide text-inkSoft dark:text-[#9C90BC]">{color.hex}</p>
                      <p className="mt-2 text-sm leading-5 text-inkSoft dark:text-[#C8BFE3]">{color.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <h3 className="font-serif text-2xl dark:text-[#F6F2FC]">Decisions inside the solution</h3>
            <div className="mt-10 space-y-8">
              {study.decisions.map((item, i) => (
                <Reveal key={item.title} className="grid gap-3 border-t border-mistLine pt-6 dark:border-white/10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
                  <h3 className="font-serif text-2xl dark:text-[#F6F2FC]">
                    <span className="mr-3 text-sm text-violet dark:text-lilac">0{i + 1}</span>
                    {item.title}
                  </h3>
                  <p className="leading-8 text-inkSoft dark:text-[#C8BFE3]">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="font-serif text-2xl dark:text-[#F6F2FC]">How it was shaped</h3>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {study.process.map((step, i) => (
                <li key={step.title} className="rounded-md bg-paperTint p-6 dark:bg-white/[.035]">
                  <span className="text-xs text-violet dark:text-lilac">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl dark:text-[#F6F2FC]">{step.title}</h3>
                  <p className="mt-2 leading-7 text-inkSoft dark:text-[#C8BFE3]">{step.body || step.note}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20">
            <Label>03 / The Results</Label>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl dark:text-[#F6F2FC] md:text-5xl">What a client can take from this</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {study.outcomes.map((item, i) => (
                <Reveal key={item} className="flex min-h-[180px] flex-col justify-between rounded-md bg-midnight p-6 text-[#F6F2FC]">
                  <span className="font-serif text-4xl text-lilac">0{i + 1}</span>
                  <p className="mt-6 leading-7 text-[#E4DCF6]">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-16 rounded-md border border-mistLine bg-paperTint p-8 dark:border-white/10 dark:bg-midnight2 md:p-12">
            <Label>The file</Label>
            <h2 className="mt-3 font-serif text-4xl dark:text-[#F6F2FC] md:text-5xl">Read it against the file</h2>
            <p className="mt-4 max-w-2xl leading-7 text-inkSoft dark:text-[#C8BFE3]">
              The screens, components, and flows named above live in {study.file}. The case study follows that file rather than a separate deck.
            </p>
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-[3px] bg-violet px-6 py-3 text-sm font-medium text-white transition hover:bg-violetDeep"
            >
              {ui.figma} ↗
            </a>
          </Reveal>

          {next && (
            <a href={`/case-study/${next.slug}`} className="mt-12 flex items-center justify-between border-t border-mistLine pt-8 dark:border-white/10">
              <span className="text-sm text-inkSoft dark:text-[#C8BFE3]">{ui.next}</span>
              <span className="font-serif text-2xl dark:text-[#F6F2FC]">{next.displayName || next.name} →</span>
            </a>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
