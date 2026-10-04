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
      <GradientBackdrop />
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
                <article className="glass-card flex flex-col items-center p-3 text-ink dark:text-[#F6F2FC]">
                  <p className="w-full text-center text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-violet dark:text-lilac">Featured project</p>
                  <h2 className="mt-1.5 w-full text-center font-serif text-[1.3rem] leading-tight">{projectName}</h2>
                  <p className="mt-0.5 w-full text-center text-[0.7rem] text-inkSoft dark:text-[#C8BFE3]">{meta}</p>
                  <a
                    href={caseHref}
                    className={`mt-2.5 block w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
                    aria-label={`View ${projectName} case study`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${projectName} preview`}
                        width="800"
                        height="400"
                        className="aspect-[2/1] h-auto w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[2/1] bg-gradient-to-br from-lilac/40 to-violet" />
                    )}
                  </a>
                  <div className="mt-2.5 grid w-full grid-cols-2 gap-2">
                    <div className="glass-chip rounded-xl px-2.5 py-2 text-center">
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-violet dark:text-lilac">Problem</p>
                      <p className="mt-0.5 text-[0.72rem] leading-4 text-ink dark:text-[#F0EAFB]">{note.focus}</p>
                    </div>
                    <div className="glass-chip rounded-xl px-2.5 py-2 text-center">
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-violet dark:text-lilac">Design solution</p>
                      <p className="mt-0.5 text-[0.72rem] leading-4 text-ink dark:text-[#F0EAFB]">{note.move}</p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex w-full flex-wrap items-center justify-center gap-2.5">
                    <a href={caseHref} className="rounded-full bg-violet px-3.5 py-1.5 text-[0.82rem] font-medium text-white hover:bg-violetDeep">View case study →</a>
                    {project.figmaUrl && (
                      <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-inkSoft hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">Figma file ↗</a>
                    )}
                  </div>
                  <div className="mt-2 flex w-full items-center justify-center gap-1.5">
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
                </article>
              </div>
            </div>
          </div>

          <div className={`mx-auto mt-16 max-w-content px-8 ${contentShown}`} style={{ animationDelay: '280ms' }}>
            <article className="hero-stats-panel rounded-[28px] border border-white/50 bg-white/55 px-5 py-6 text-ink shadow-[0_16px_40px_rgba(70,49,111,0.1)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/[0.06] dark:text-[#F6F2FC] dark:shadow-[0_0_40px_rgba(155,127,217,0.18),0_20px_50px_rgba(8,4,20,0.35)] md:px-7 md:py-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: 'Experience',
                    value: <><Counter value={5} />+ years</>,
                    hint: 'Product & UI design',
                    iconBg: 'bg-[#E8F7F2] text-[#1F8A70] dark:bg-[#1F8A70]/20 dark:text-[#7DDFC0]',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l2.5 1.5" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Education',
                    value: 'BSc Software Eng.',
                    hint: 'Engineering foundation',
                    iconBg: 'bg-[#FFF1E8] text-[#C56A2D] dark:bg-[#C56A2D]/20 dark:text-[#F0B48A]',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M3 9l9-4 9 4-9 4-9-4z" />
                        <path d="M7 11.5v4.5c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Based in',
                    value: 'Karachi',
                    hint: 'Working worldwide',
                    iconBg: 'bg-[#EAF2FF] text-[#2F6FCB] dark:bg-[#2F6FCB]/20 dark:text-[#9CBDF5]',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
                      </svg>
                    ),
                  },
                  {
                    label: 'I design',
                    value: 'Apps & UI systems',
                    hint: 'Mobile, web, enterprise',
                    iconBg: 'bg-[#FDECEF] text-[#C44B66] dark:bg-[#C44B66]/20 dark:text-[#F0A0B2]',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="14" rx="2" />
                        <path d="M8 21h8M12 18v3" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/60 bg-white/65 px-3.5 py-3.5 text-center shadow-[0_8px_20px_rgba(70,49,111,0.05)] backdrop-blur-xl dark:border-white/12 dark:bg-white/[0.05] dark:shadow-[0_0_24px_rgba(155,127,217,0.12)]"
                  >
                    <div className={`mx-auto mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#B7ABD4]">{item.label}</p>
                    <p className="mt-1 font-serif text-[1.05rem] leading-tight text-ink dark:text-[#F6F2FC]">{item.value}</p>
                    <p className="mt-1 text-[0.75rem] leading-4 text-inkSoft dark:text-[#C8BFE3]">{item.hint}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3.5 shadow-[0_6px_18px_rgba(70,49,111,0.05)] backdrop-blur-xl dark:border-white/12 dark:bg-white/[0.05] dark:shadow-[0_0_24px_rgba(155,127,217,0.12)]">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E8F7F2] text-[#1F8A70] dark:bg-[#1F8A70]/20 dark:text-[#7DDFC0]" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 7h16M7 12h10M9 17h6" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#B7ABD4]">Industries</p>
                      <p className="text-[0.8rem] font-medium text-ink dark:text-[#F6F2FC]">Where I ship work</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Healthcare', 'Fintech', 'ERP', 'HR', 'Real estate', 'AI'].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[#E7E0F2] bg-[#FBF9FD]/80 px-2.5 py-1 text-[0.72rem] font-medium text-inkSoft backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.06] dark:text-[#D8CFE8]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3.5 shadow-[0_6px_18px_rgba(70,49,111,0.05)] backdrop-blur-xl dark:border-white/12 dark:bg-white/[0.05] dark:shadow-[0_0_24px_rgba(155,127,217,0.12)]">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF1E8] text-[#C56A2D] dark:bg-[#C56A2D]/20 dark:text-[#F0B48A]" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3l2.2 4.5L19 8.3l-3.5 3.4.8 4.8L12 14.2 7.7 16.5l.8-4.8L5 8.3l4.8-.8L12 3z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-inkSoft dark:text-[#B7ABD4]">Craft & tools</p>
                      <p className="text-[0.8rem] font-medium text-ink dark:text-[#F6F2FC]">How I build</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Figma', 'Stitch', 'Claude', 'Cursor', 'AI workflows'].map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#E7E0F2] bg-[#FBF9FD]/80 px-2.5 py-1 text-[0.72rem] font-medium text-inkSoft backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.06] dark:text-[#D8CFE8]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  )
}
