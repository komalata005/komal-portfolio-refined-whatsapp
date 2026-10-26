import { useEffect, useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import { useEmailDialog } from './EmailPopup'
import Magnetic from './Magnetic'
import Counter from './Counter'
import useParallax from '../hooks/useParallax'
import GradientBackdrop from './GradientBackdrop'
import { projects } from '../data/projects'

const flagshipNotes = {
  Nuré: {
    blurb: '“Less nagging. More sharing.” The home screen shows who is carrying the day, then names one fair next move.',
    focus: 'Shared household load',
    move: 'One clear ask at a time',
  },
  'Schedule Edge': {
    blurb: 'An ERP redesign that simplifies complex manufacturing workflows across modules without losing the business spine.',
    focus: 'Enterprise workflows',
    move: 'Quote to installed door',
  },
  Octofy: {
    blurb: 'HR mobile flows that keep onboarding and everyday people tasks clear for busy teams.',
    focus: 'HR mobile UX',
    move: 'Fewer steps, clearer tasks',
  },
  'Carry App': {
    blurb: 'A card and budget for every employee, fintech UI that keeps spend controls easy to scan.',
    focus: 'Employee spend',
    move: 'Budget at a glance',
  },
  Puffy: {
    blurb: 'Homepage and product pages shaped so shoppers can compare mattress options without friction.',
    focus: 'E-commerce clarity',
    move: 'Compare, then decide',
  },
  'Break Smart': {
    blurb: 'A wellness schedule product that makes short restorative breaks feel doable during the workday.',
    focus: 'Wellness habits',
    move: 'Ten minutes, four times',
  },
  'Real Estate': {
    blurb: 'Property browsing UI that surfaces the right listings and next steps without burying the details.',
    focus: 'Listing discovery',
    move: 'Browse with intent',
  },
  Etizan: {
    blurb: 'English-to-Arabic UI conversion with an RTL-first interface system for pharmacy and distribution work.',
    focus: 'Arabic RTL UI',
    move: 'Mirror with care',
  },
}

function renderWhoAmI(text) {
  if (!text) return '\u00A0'
  const prefix = 'Who am '
  const iLetter = 'I'
  const suffix = '?'
  if (text.length <= prefix.length) {
    return <span className="text-ink dark:text-[#F2EEF8]">{text}</span>
  }
  const afterPrefix = text.slice(prefix.length)
  const hasI = afterPrefix.startsWith(iLetter)
  const rest = hasI ? afterPrefix.slice(1) : afterPrefix
  return (
    <>
      <span className="text-ink dark:text-[#F2EEF8]">{prefix.slice(0, Math.min(text.length, prefix.length))}</span>
      {hasI ? <em className="whoami-i not-italic text-violet dark:text-lilac">{iLetter}</em> : null}
      {rest ? <span className="text-ink dark:text-[#F2EEF8]">{rest.startsWith(suffix) ? suffix : rest}</span> : null}
    </>
  )
}

function renderHeadline(text) {
  const parts = []
  let remaining = text
  let key = 0
  while (remaining.length) {
    const designsAt = remaining.toLowerCase().indexOf('designs')
    const loveAt = remaining.toLowerCase().indexOf('love')
    let nextAt = -1
    let nextWord = ''
    if (designsAt !== -1 && (loveAt === -1 || designsAt <= loveAt)) {
      nextAt = designsAt
      nextWord = remaining.slice(designsAt, designsAt + (remaining.toLowerCase().startsWith('designs', designsAt) ? 7 : 6))
    } else if (loveAt !== -1) {
      nextAt = loveAt
      nextWord = remaining.slice(loveAt, loveAt + 4)
    }
    if (nextAt === -1) {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }
    if (nextAt > 0) parts.push(<span key={key++}>{remaining.slice(0, nextAt)}</span>)
    parts.push(
      <em key={key++} className="font-serif italic text-violet dark:text-lilac">
        {nextWord}
      </em>
    )
    remaining = remaining.slice(nextAt + nextWord.length)
  }
  return parts
}

export default function Hero() {
  const { t } = useLocale()
  const { openEmail } = useEmailDialog()
  const [whoText, setWhoText] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [typedHeadline, setTypedHeadline] = useState('')
  const [headlineDone, setHeadlineDone] = useState(false)
  const [flagshipIndex, setFlagshipIndex] = useState(0)
  const [flagshipPaused, setFlagshipPaused] = useState(false)
  const cardParallax = useParallax(0.06)
  const whoAmI = 'Who am I?'

  useEffect(() => {
    setWhoText('')
    setShowContent(false)
    setTypedHeadline('')
    setHeadlineDone(false)
    let i = 0
    let holdTimer
    const typeTimer = window.setInterval(() => {
      i += 1
      setWhoText(whoAmI.slice(0, i))
      if (i >= whoAmI.length) {
        window.clearInterval(typeTimer)
        holdTimer = window.setTimeout(() => {
          setWhoText('')
          setShowContent(true)
        }, 900)
      }
    }, 55)
    return () => {
      window.clearInterval(typeTimer)
      if (holdTimer) window.clearTimeout(holdTimer)
    }
  }, [])

  useEffect(() => {
    if (!showContent) return undefined
    setTypedHeadline('')
    setHeadlineDone(false)
    let i = 0
    const headline = t.hero.headline
    const typeTimer = window.setInterval(() => {
      i += 1
      setTypedHeadline(headline.slice(0, i))
      if (i >= headline.length) {
        window.clearInterval(typeTimer)
        setHeadlineDone(true)
      }
    }, 36)
    return () => window.clearInterval(typeTimer)
  }, [showContent, t.hero.headline])

  useEffect(() => {
    if (!showContent || flagshipPaused || projects.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setFlagshipIndex((current) => (current + 1) % projects.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [showContent, flagshipPaused])

  const contentShown = showContent ? 'animate-rise-in' : 'pointer-events-none invisible opacity-0'
  const project = projects[flagshipIndex]
  const projectName = project.displayName || project.name
  const item = t.work.items[project.name] || { desc: project.desc, meta: project.meta, tags: project.tags }
  const meta = project.category || item.meta || 'Case study'
  const note = flagshipNotes[project.name] || { focus: 'Product design', move: 'Clear next step' }
  const caseHref = `/case-study/${project.slug}`

  return (
    <section id="hero" className={`relative isolate overflow-hidden pb-14 pt-2 md:pb-16 md:pt-3 ${!showContent ? 'whoami-stage' : ''}`}>
      <GradientBackdrop showMotifs={!showContent} />
      <span className="hero-star hero-star-one" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-two" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-three" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-four" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-five" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-six" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-seven" aria-hidden="true">✦</span>
      {!showContent && (
        <>
          <span className="hero-star whoami-star s8" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s9" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s10" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s11" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s12" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s13" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s14" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s15" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s16" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s17" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s18" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s19" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s20" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s21" aria-hidden="true">✧</span>
          <span className="hero-star whoami-star s22" aria-hidden="true">✦</span>
          <span className="hero-star whoami-star s23" aria-hidden="true">✧</span>
          <span className="whoami-glow" aria-hidden="true" />
        </>
      )}

      {!showContent && (
        <div className="relative z-[1] mx-auto flex min-h-[52vh] max-w-content items-center justify-center px-8 py-10 md:min-h-[56vh]">
          <h1 className="whoami-title font-serif text-[2.8rem] italic leading-tight tracking-[-0.5px] md:text-[4.4rem]">
            {renderWhoAmI(whoText)}
            <span className="typing-caret" aria-hidden="true">|</span>
          </h1>
        </div>
      )}

      {showContent && (
        <>
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-8 px-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
            <div className="min-w-0 text-start">
              <div className={`mb-2 flex flex-wrap items-center justify-start gap-2.5 ${contentShown}`}>
                <img
                  src="https://komalata01.netlify.app/assets/images/profile-pic.png"
                  alt="Komal Ata | UI UX designer and product designer"
                  className="h-14 w-14 animate-float rounded-full border-2 border-white object-cover shadow-md dark:border-midnight2"
                />
                <span className="text-[0.92rem] text-inkSoft dark:text-[#C8BFE3]">
                  Komal Ata <span className="text-mist">·</span> {t.hero.roleTag}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E4D8F6] bg-[#F7F3FC] px-3 py-1 text-[0.76rem] font-medium text-ink">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                  Available Now
                </span>
              </div>

              <h1 className="min-h-[2.2em] max-w-[18ch] text-start font-serif text-[2.15rem] leading-[1.05] tracking-[-0.5px] md:min-h-[1.9em] md:text-[3.1rem] dark:text-[#F6F2FC]">
                {renderHeadline(typedHeadline)}
                {!headlineDone && <span className="typing-caret" aria-hidden="true">|</span>}
              </h1>

              <p className={`mt-3 max-w-[46ch] text-start text-[1rem] leading-7 text-inkSoft dark:text-[#C8BFE3] ${contentShown}`} style={{ animationDelay: '120ms' }}>
                {t.hero.lede}
              </p>

              <div className={`hero-actions mt-5 flex flex-wrap items-center justify-start gap-3 ${contentShown}`} style={{ animationDelay: '220ms' }}>
                <Magnetic
                  href="#work"
                  strength={10}
                  className="rounded-full border border-violet bg-violet px-5 py-2.5 text-[0.92rem] font-medium text-paper hover:bg-violetDeep"
                >
                  {t.hero.ctaWork}
                </Magnetic>
                <button
                  type="button"
                  onClick={openEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-mistLine px-5 py-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
                >
                  {t.hero.ctaTalk || "Let's talk"}
                </button>
              </div>
            </div>

            <div
              ref={cardParallax}
              className={`work-flip-stage relative ${contentShown}`}
              style={{ animationDelay: '180ms' }}
              onMouseEnter={() => setFlagshipPaused(true)}
              onMouseLeave={() => setFlagshipPaused(false)}
            >
              <div key={project.slug} className="glass-shell animate-card-flip">
                <article className="glass-card p-2.5 text-ink dark:text-[#F6F2FC]">
                  <a
                    href={caseHref}
                    className={`relative block w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
                    aria-label={`View ${projectName} case study`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${projectName} preview`}
                        width="800"
                        height="400"
                        className="aspect-[16/10] h-auto w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/10] bg-gradient-to-br from-lilac/40 to-violet" />
                    )}
                  </a>

                  <div className="mt-2.5 px-0.5 text-start">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-violet dark:text-lilac">Featured project</p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h2 className="font-serif text-[1.15rem] leading-tight">{projectName}</h2>
                      <span className="text-[0.72rem] text-inkSoft dark:text-[#B7ABD4]">{meta}</span>
                    </div>
                    <p className="mt-1 text-[0.78rem] leading-5 text-inkSoft dark:text-[#C8BFE3]">
                      <span className="font-medium text-ink dark:text-[#EDE7F8]">{note.focus}</span>
                      <span className="mx-1.5 text-mist">·</span>
                      {note.move}
                    </p>
                  </div>

                  <div className="mt-2.5 flex w-full flex-wrap items-center justify-between gap-2 px-0.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a href={caseHref} className="rounded-full bg-violet px-3.5 py-1.5 text-[0.82rem] font-medium text-white hover:bg-violetDeep">View case study →</a>
                      {project.figmaUrl && (
                        <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-inkSoft hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">Figma file ↗</a>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Previous featured project"
                        onClick={() => setFlagshipIndex((current) => (current - 1 + projects.length) % projects.length)}
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-white/40 text-ink backdrop-blur-md hover:border-violet hover:text-violet dark:border-white/15 dark:bg-white/10 dark:text-[#EDE7F8]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Next featured project"
                        onClick={() => setFlagshipIndex((current) => (current + 1) % projects.length)}
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-white/40 text-ink backdrop-blur-md hover:border-violet hover:text-violet dark:border-white/15 dark:bg-white/10 dark:text-[#EDE7F8]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className={`mx-auto mt-10 max-w-content px-8 ${contentShown}`} style={{ animationDelay: '280ms' }}>
            <article className="hero-snapshot relative overflow-hidden rounded-[1.5rem] border border-[#E8E0F4]/95 bg-gradient-to-br from-white/85 via-[#F7F2FC]/90 to-[#EBE3F6]/80 px-5 py-6 shadow-[0_28px_70px_rgba(70,49,111,0.11)] backdrop-blur-2xl dark:border-white/10 dark:from-[#1C1730]/95 dark:via-[#151122]/90 dark:to-[#100E18]/95 dark:shadow-[0_28px_60px_rgba(0,0,0,0.4)] md:px-8 md:py-8">
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <span className="absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-violet/[0.1] blur-3xl dark:bg-lilac/[0.1]" />
                <span className="absolute -right-12 -top-24 h-52 w-52 rounded-full bg-lilac/25 blur-3xl dark:bg-violet/30" />
                <span className="absolute bottom-0 end-1/4 h-32 w-32 rounded-full bg-[#D4C2F5]/30 blur-3xl dark:bg-lilac/10" />
                <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet/35 to-transparent dark:via-lilac/40" />
              </div>

              <div className="relative grid items-center gap-7 lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.25fr)] lg:gap-9">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet/15 bg-white/70 px-2.5 py-1 dark:border-lilac/20 dark:bg-white/[0.06]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-violet/10 text-violet dark:bg-lilac/15 dark:text-lilac" aria-hidden="true">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3l2.2 6.6H21l-5.4 3.9 2.1 6.5L12 16.8 6.3 20l2.1-6.5L3 9.6h6.8L12 3z" />
                      </svg>
                    </span>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-violet dark:text-lilac">Background</p>
                  </div>
                  <h2 className="mt-3 max-w-[16ch] font-serif text-[1.5rem] leading-[1.12] tracking-[-0.03em] text-ink dark:text-[#F6F2FC] md:text-[1.85rem]">
                    Built to ship product UI with engineering teams
                  </h2>
                  <p className="mt-2.5 max-w-[38ch] text-[0.9rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">
                    Five years designing mobile apps, SaaS, and enterprise interfaces, from research to Figma ready for build.
                  </p>
                </div>

                <div className="relative flex items-center justify-center lg:px-1">
                  <div className="relative grid h-[7.25rem] w-[7.25rem] place-items-center rounded-full border border-violet/20 bg-gradient-to-br from-white via-[#F4EEFC] to-[#E8DFF6] shadow-[0_12px_32px_rgba(90,62,142,0.16)] dark:border-lilac/25 dark:from-[#2A2340] dark:via-[#221C38] dark:to-[#1A1528] dark:shadow-[0_12px_28px_rgba(0,0,0,0.35)] md:h-[8rem] md:w-[8rem]">
                    <span className="absolute inset-2 rounded-full border border-dashed border-violet/25 dark:border-lilac/30" aria-hidden="true" />
                    <span className="absolute -top-1 end-3 grid h-7 w-7 place-items-center rounded-full bg-violet text-white shadow-md dark:bg-lilac dark:text-midnight" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l2.5 1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div className="text-center">
                      <p className="font-serif text-[2.65rem] leading-none tracking-[-0.04em] text-ink dark:text-[#F6F2FC] md:text-[2.9rem]">
                        <Counter value={5} />
                        <span className="text-violet dark:text-lilac">+</span>
                      </p>
                      <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-violet dark:text-lilac">years</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    {
                      k: 'Education',
                      v: 'BSc Software Engineering',
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <path d="M22 10L12 5 2 10l10 5 10-5z" />
                          <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
                        </svg>
                      ),
                    },
                    {
                      k: 'Based in',
                      v: 'Karachi · remote worldwide',
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.3" />
                        </svg>
                      ),
                    },
                    {
                      k: 'Focus',
                      v: 'Apps, SaaS & design systems',
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="14" rx="2.2" />
                          <path d="M8 20h8M12 18v2" />
                        </svg>
                      ),
                    },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="group rounded-2xl border border-[#E7E0F2]/90 bg-white/65 p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-violet/30 hover:shadow-[0_12px_28px_rgba(90,62,142,0.1)] dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-lilac/35"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#F4EEFC] to-[#E8DFF8] text-violet shadow-[inset_0_0_0_1px_rgba(90,62,142,0.12)] dark:from-lilac/20 dark:to-violet/20 dark:text-lilac">
                        {row.icon}
                      </span>
                      <p className="mt-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-inkSoft dark:text-[#9C90BC]">{row.k}</p>
                      <p className="mt-1 font-serif text-[0.95rem] leading-snug text-ink dark:text-[#F6F2FC]">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 border-t border-[#E4D8F6]/85 pt-4 dark:border-white/10">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-inkSoft dark:text-[#B0A8C4]">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet/10 text-violet dark:bg-lilac/15 dark:text-lilac" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 7h16M4 12h10M4 17h14" />
                    </svg>
                  </span>
                  Healthcare · Fintech · ERP · HR · Real estate · AI
                </span>
                <span className="hidden h-4 w-px bg-[#E4D8F6] dark:bg-white/15 md:block" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-inkSoft dark:text-[#B0A8C4]">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet/10 text-violet dark:bg-lilac/15 dark:text-lilac" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M9 9h6M9 12h6M9 15h3" strokeLinecap="round" />
                    </svg>
                  </span>
                  Figma · design systems · engineering handoff
                </span>
                <span className="ms-auto inline-flex items-center gap-1.5 rounded-full border border-violet/20 bg-white/80 px-3 py-1.5 text-[0.72rem] font-medium text-violet shadow-sm dark:border-lilac/25 dark:bg-lilac/10 dark:text-lilac">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" aria-hidden="true" />
                  Open to senior roles
                </span>
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  )
}
