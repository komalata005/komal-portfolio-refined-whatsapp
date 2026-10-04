import { useEffect, useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import { useEmailDialog } from './EmailPopup'
import Magnetic from './Magnetic'
import Counter from './Counter'
import useParallax from '../hooks/useParallax'
import GradientBackdrop from './GradientBackdrop'

export default function Hero() {
  const { t } = useLocale()
  const { openEmail } = useEmailDialog()
  const [revealed, setRevealed] = useState(false)
  const [typedHeadline, setTypedHeadline] = useState('')
  const cardParallax = useParallax(0.06)

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
  }, [])
  useEffect(() => {
    setTypedHeadline(''); let i = 0
    const timer = window.setInterval(() => { i += 1; setTypedHeadline(t.hero.headline.slice(0, i)); if (i >= t.hero.headline.length) window.clearInterval(timer) }, 38)
    return () => window.clearInterval(timer)
  }, [t.hero.headline])

  const shown = revealed ? 'animate-rise-in' : 'opacity-0'

  return (
    <section id="hero" className="relative isolate overflow-hidden py-24 md:py-28">
      <GradientBackdrop />
      <span className="hero-star hero-star-one" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-two" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-three" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-four" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-five" aria-hidden="true">✦</span>
      <span className="hero-star hero-star-six" aria-hidden="true">✧</span>
      <span className="hero-star hero-star-seven" aria-hidden="true">✦</span>
      <div className="mx-auto grid max-w-content grid-cols-1 items-end gap-9 px-8 md:grid-cols-[1.55fr_1fr] md:gap-16">
        <div>
          <div className={`mb-6 flex flex-wrap items-center gap-3.5 ${shown}`} style={{ animationDelay: '0ms' }}>
            <img
              src="https://komalata01.netlify.app/assets/images/profile-pic.png"
              alt="Komal Ata"
              className="h-14 w-14 animate-float rounded-full border-2 border-white object-cover shadow-md dark:border-midnight2"
            />
            <span className="text-[0.95rem] text-inkSoft dark:text-[#C8BFE3]">
              Komal Ata <span className="text-mist">·</span> {t.hero.roleTag}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E4D8F6] bg-[#F7F3FC] px-3 py-1 text-[0.78rem] font-medium text-ink">
              <span className="h-2 w-2 rounded-full bg-violet" aria-hidden="true" />
              Available Now
            </span>
          </div>

          <h1
            className="max-w-[12ch] font-serif text-[2.35rem] leading-[1.02] tracking-[-0.5px] md:max-w-[16ch] md:text-[3.6rem] dark:text-[#F6F2FC]"
            style={{ animationDelay: '50ms' }}
          >
            {typedHeadline}<span className="typing-caret" aria-hidden="true">|</span>
          </h1>

          <p className={`mt-6 max-w-[52ch] text-[1.08rem] text-inkSoft dark:text-[#C8BFE3] ${shown}`} style={{ animationDelay: '350ms' }}>
            {t.hero.lede}
          </p>

          <div className={`hero-actions mt-8 flex flex-wrap gap-3.5 ${shown}`} style={{ animationDelay: '450ms' }}>
            <Magnetic
              href="#work"
              strength={10}
              className="rounded-[3px] border border-violet bg-violet px-6 py-3 text-[0.95rem] font-medium text-paper hover:bg-violetDeep"
            >
              {t.hero.ctaWork}
            </Magnetic>
            <button
              type="button"
              onClick={openEmail}
              className="inline-flex items-center gap-2 rounded-[3px] border border-mistLine px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
            >
              {t.hero.ctaTalk || "Let's talk"}
            </button>
          </div>
        </div>

        <div ref={cardParallax} className={`relative pt-4 ${shown}`} style={{ animationDelay: '300ms' }}>
          <div className="absolute right-3 top-0 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#2A2144] px-3 py-1.5 text-[0.68rem] text-white shadow-lg">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F07178]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#6FBF7A]" />
            </span>
            Schedule Edge — ERP
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.62rem] tracking-wide">Enterprise UX</span>
          </div>
          <article className="relative z-[1] mt-4 rounded-[28px] border border-[#E7DFF4] bg-white p-4 text-ink shadow-[0_24px_50px_rgba(90,62,142,0.16)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-violet">Flagship case study</p>
                <p className="mt-1 text-[0.72rem] text-inkSoft">Mobile app · Design system</p>
                <h2 className="mt-2 font-serif text-[1.35rem] leading-tight">Nuré</h2>
              </div>
              <div className="rounded-2xl bg-[#2A2144] px-3 py-2 text-right text-white">
                <p className="font-serif text-sm">75/25</p>
                <p className="text-[0.62rem] text-white/70">Shared today</p>
              </div>
            </div>
            <p className="mt-3 text-[0.84rem] leading-6 text-inkSoft">
              “Less nagging. More sharing.” The home screen shows who is carrying the day, then names one fair next move.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-[#F6F1FC] p-3">
                <p className="text-[0.68rem] text-inkSoft">Target split</p>
                <p className="mt-1 font-serif text-lg">50/50</p>
              </div>
              <div className="rounded-2xl bg-[#2A2144] p-3 text-white">
                <p className="text-[0.68rem] text-white/70">One ask</p>
                <p className="mt-1 text-sm leading-5">Move one task, not a lecture</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['UX research', 'Product design', 'Figma'].map((tag) => (
                <span key={tag} className="rounded-full border border-[#E4D8F6] bg-[#F8F4FD] px-2.5 py-1 text-[0.7rem] text-violet">{tag}</span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href="/case-study/nure" className="rounded-full bg-violet px-4 py-2 text-sm font-medium text-white hover:bg-violetDeep">View case study →</a>
              <a href="https://www.figma.com/design/FMlgZ9a1k9c4RV309HjFY7/Nure" target="_blank" rel="noopener noreferrer" className="text-sm text-inkSoft hover:text-violet">Figma file ↗</a>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#EFE8F8] pt-3">
              <div className="flex items-center gap-2">
                <img src="https://komalata01.netlify.app/assets/images/profile-pic.png" alt="" className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">Komal Ata <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-violet">Product lead</span></p>
                  <p className="text-[0.72rem] text-inkSoft">Senior UI/UX designer · BSc Software Engineering</p>
                </div>
              </div>
              <p className="hidden text-right text-[0.72rem] text-inkSoft sm:block">Ex-Cipher Impact</p>
            </div>
          </article>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-content px-8">
        <article className="rounded-[28px] border border-[#E7DFF4] bg-white p-5 text-ink shadow-[0_16px_40px_rgba(90,62,142,0.08)] md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="https://komalata01.netlify.app/assets/images/profile-pic.png" alt="" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold">Komal Ata <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-violet">· Lead</span></p>
                <p className="max-w-[16ch] text-sm leading-5 text-inkSoft">Product designer and systems lead</p>
              </div>
            </div>
            <p className="text-right text-[0.72rem] uppercase tracking-[0.16em] text-inkSoft">
              Snapshot
              <span className="mt-1 flex items-center justify-end gap-2 text-[0.82rem] normal-case tracking-normal text-violet">
                <span className="h-2 w-2 rounded-full bg-[#D7C9F2]" aria-hidden="true" />
                Open to senior roles
              </span>
            </p>
          </div>
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="text-[0.72rem] text-inkSoft">Experience</dt>
              <dd className="mt-1 font-serif text-2xl"><Counter value={5} />+ years practice</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] text-inkSoft">Engineering DNA</dt>
              <dd className="mt-1 font-serif text-2xl">BSc Software Eng.</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] text-inkSoft">Location</dt>
              <dd className="mt-1 font-serif text-2xl">Karachi · Worldwide</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] text-inkSoft">Core focus</dt>
              <dd className="mt-1 font-serif text-2xl">ERP, fintech and AI UX</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Figma tokens', 'Design systems', 'Claude & Cursor', 'React / Tailwind'].map((chip) => (
              <span key={chip} className="rounded-full border border-[#E4D8F6] bg-[#FBF9FD] px-3 py-1 text-[0.75rem] text-inkSoft">{chip}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
