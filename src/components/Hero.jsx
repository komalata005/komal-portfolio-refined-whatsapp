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
    blurb: 'A card and budget for every employee — fintech UI that keeps spend controls easy to scan.',
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
            <div className="min-w-0 text-left">
              <div className={`mb-2 flex flex-wrap items-center justify-start gap-2.5 ${contentShown}`}>
                <img
                  src="https://komalata01.netlify.app/assets/images/profile-pic.png"
                  alt="Komal Ata"
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

              <h1 className="min-h-[2.2em] max-w-[18ch] text-left font-serif text-[2.15rem] leading-[1.05] tracking-[-0.5px] md:min-h-[1.9em] md:text-[3.1rem] dark:text-[#F6F2FC]">
                {renderHeadline(typedHeadline)}
                {!headlineDone && <span className="typing-caret" aria-hidden="true">|</span>}
              </h1>

              <p className={`mt-3 max-w-[46ch] text-left text-[1rem] leading-7 text-inkSoft dark:text-[#C8BFE3] ${contentShown}`} style={{ animationDelay: '120ms' }}>
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

                  <div className="mt-2.5 px-0.5 text-left">
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

          <div className={`mx-auto mt-8 max-w-content px-8 ${contentShown}`} style={{ animationDelay: '280ms' }}>
            <article className="hero-snapshot relative overflow-hidden rounded-2xl border border-white/55 bg-white/45 px-4 py-4 shadow-[0_16px_40px_rgba(70,49,111,0.08)] backdrop-blur-2xl dark:border-white/12 dark:bg-white/[0.05] dark:shadow-[0_0_36px_rgba(155,127,217,0.14)] md:px-6 md:py-4">
              <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-lilac/15 blur-3xl dark:bg-lilac/20" aria-hidden="true" />

              <div className="relative flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet dark:text-lilac">Background</p>
                    <p className="font-serif text-[1.65rem] leading-none tracking-[-0.03em] text-ink dark:text-[#F6F2FC]">
                      <Counter value={5} />
                      <span className="text-violet dark:text-lilac">+</span>
                      <em className="ml-1.5 text-[0.95rem] italic text-violet dark:text-lilac">years</em>
                    </p>
                    <span className="hidden h-4 w-px bg-[#E4D8F6] dark:bg-white/15 sm:block" aria-hidden="true" />
                    <p className="text-[0.8rem] text-inkSoft dark:text-[#C8BFE3]">Product design across apps & systems</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  {[
                    {
                      label: 'BSc Software Eng.',
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M22 10L12 5 2 10l10 5 10-5z" />
                          <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Karachi · remote',
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.4" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Apps & UI systems',
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="14" rx="2" />
                          <path d="M8 20h8M12 18v2" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="inline-flex items-center gap-2 text-[0.84rem] text-ink dark:text-[#EDE7F8]">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-[#E4D8F6]/90 bg-white/70 text-violet dark:border-white/12 dark:bg-white/[0.06] dark:text-lilac">
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#E7E0F2]/80 pt-3 dark:border-white/10">
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#B7ABD4]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M4 7h16M4 12h10M4 17h14" />
                    </svg>
                    Industries
                  </span>
                  {['Healthcare', 'Fintech', 'ERP', 'HR', 'Real estate', 'AI'].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#E4D8F6]/90 bg-white/65 px-2.5 py-1 text-[0.74rem] font-medium text-ink dark:border-white/12 dark:bg-white/[0.06] dark:text-[#E8E0F6]"
                    >
                      {chip}
                    </span>
                  ))}
                  <span className="mx-1 hidden h-4 w-px bg-[#E4D8F6] dark:bg-white/15 md:block" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#B7ABD4]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M12 3l1.8 5.4H19l-4.4 3.2 1.7 5.4L12 14.8 7.7 17l1.7-5.4L5 8.4h5.2L12 3z" />
                    </svg>
                    Tools
                  </span>
                  {['Figma', 'Stitch', 'Claude', 'Cursor', 'AI'].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#E4D8F6]/90 bg-white/65 px-2.5 py-1 text-[0.74rem] font-medium text-ink dark:border-white/12 dark:bg-white/[0.06] dark:text-[#E8E0F6]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  )
}
