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
          <div className={`mb-6 flex items-center gap-3.5 ${shown}`} style={{ animationDelay: '0ms' }}>
            <img
              src="https://komalata01.netlify.app/assets/images/profile-pic.png"
              alt="Komal Ata"
              className="h-14 w-14 animate-float rounded-full border-2 border-white object-cover shadow-md dark:border-midnight2"
            />
            <span className="text-[0.95rem] text-inkSoft dark:text-[#C8BFE3]">
              Komal Ata <span className="text-mist">·</span> {t.hero.roleTag}
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

        <div ref={cardParallax} className={`relative ${shown}`} style={{ animationDelay: '300ms' }}>
          <div className="absolute -top-3 right-4 z-10 hidden items-center gap-2 rounded-full border border-white/40 bg-midnight px-3 py-1.5 text-[0.68rem] text-white shadow-lg sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F07178]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#6FBF7A]" />
            <span className="ml-1">Schedule Edge · ERP</span>
          </div>
          <article className="overflow-hidden rounded-3xl border border-[#E7E0F2] bg-white shadow-[0_24px_50px_rgba(70,49,111,0.12)] dark:border-white/10 dark:bg-midnight2">
            <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-violet dark:text-lilac">Flagship case study</p>
              <p className="text-[0.68rem] uppercase tracking-[0.12em] text-inkSoft dark:text-[#9C90BC]">Mobile app</p>
            </div>
            <div className="px-5">
              <h2 className="font-serif text-2xl text-ink dark:text-[#F6F2FC]">Nuré</h2>
              <p className="mt-2 text-sm leading-6 text-inkSoft dark:text-[#C8BFE3]">
                Less nagging. More sharing. A shared-load home that shows who is carrying the day.
              </p>
            </div>
            <a href="/case-study/nure" className="mt-4 block px-5">
              <img
                src="/images/projects/nure-portfolio-thumbnail.png"
                alt="Nuré product screens"
                className="aspect-[8/5] w-full rounded-2xl object-cover"
              />
            </a>
            <div className="flex flex-wrap items-center gap-3 px-5 py-5">
              <a href="/case-study/nure" className="rounded-[3px] bg-violet px-4 py-2 text-sm font-medium text-white hover:bg-violetDeep">
                View case study →
              </a>
              <a href="/case-study/schedule-edge" className="text-sm text-inkSoft hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
                Schedule Edge
              </a>
            </div>
          </article>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-content px-8">
        <article className="rounded-3xl border border-[#E7E0F2] bg-white p-5 shadow-[0_10px_30px_rgba(70,49,111,0.06)] dark:border-white/10 dark:bg-midnight2 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://komalata01.netlify.app/assets/images/profile-pic.png"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-ink dark:text-[#F6F2FC]">
                  Komal Ata <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-violet dark:text-lilac">· Lead</span>
                </p>
                <p className="text-sm text-inkSoft dark:text-[#C8BFE3]">Product designer · 5 years</p>
              </div>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-violet dark:text-lilac">
              <span className="h-2 w-2 rounded-full bg-lilac" aria-hidden="true" />
              Open to senior roles
            </p>
          </div>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-inkSoft dark:text-[#9C90BC]">Experience</dt>
              <dd className="mt-1 font-serif text-xl text-ink dark:text-[#F6F2FC]"><Counter value={5} />+ years</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-inkSoft dark:text-[#9C90BC]">Engineering</dt>
              <dd className="mt-1 font-serif text-xl text-ink dark:text-[#F6F2FC]">BSc Software Eng.</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-inkSoft dark:text-[#9C90BC]">Location</dt>
              <dd className="mt-1 font-serif text-xl text-ink dark:text-[#F6F2FC]">Karachi · Worldwide</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-inkSoft dark:text-[#9C90BC]">Enterprise</dt>
              <dd className="mt-1 font-serif text-xl text-ink dark:text-[#F6F2FC]">ERP, fintech, and product UI</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Figma', 'Design systems', 'Claude & Cursor', 'React / Tailwind'].map((chip) => (
              <span key={chip} className="rounded-full border border-[#E4D8F6] px-3 py-1 text-[0.75rem] text-inkSoft dark:border-white/10 dark:text-[#C8BFE3]">
                {chip}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
