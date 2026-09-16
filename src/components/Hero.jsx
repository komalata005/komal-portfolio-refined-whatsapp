import { useEffect, useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import Magnetic from './Magnetic'
import Counter from './Counter'
import useParallax from '../hooks/useParallax'
import GradientBackdrop from './GradientBackdrop'

export default function Hero() {
  const { t } = useLocale()
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
            className={`max-w-[16ch] font-serif text-[2.4rem] leading-[1.06] tracking-[-0.5px] md:text-[4.1rem] dark:text-[#F6F2FC]`}
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
            <a
              href="https://komalata01.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] border border-mistLine px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
            >
              {t.hero.ctaPortfolio}
            </a>
          </div>
        </div>

        <div className="space-y-5">
        <div ref={cardParallax} className={`rounded border border-mistLine bg-paperTint p-6 dark:border-white/10 dark:bg-midnight2 ${shown}`} style={{ animationDelay: '300ms' }}>
          <div className="text-[0.92rem] text-inkSoft dark:text-[#C8BFE3]">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#6FBF7A]" />
            {t.hero.statusBadge}
          </div>
          <div className="mt-3.5 text-base dark:text-[#F6F2FC]">{t.hero.statusLine}</div>
          <div className="mt-5 grid gap-2.5 border-t border-mistLine pt-4 text-[0.92rem] text-inkSoft dark:border-white/10 dark:text-[#C8BFE3]">
            <div>
              {t.hero.factExperience} — <span className="font-medium text-ink dark:text-[#F6F2FC]"><Counter value={5} /> {t.hero.factExperienceValue.replace(/[0-9]+\s*/, '')}</span>
            </div>
            <div>
              {t.hero.factBased} — <span className="font-medium text-ink dark:text-[#F6F2FC]">{t.hero.factBasedValue}</span>
            </div>
            <div>
              {t.hero.factBackground} — <span className="font-medium text-ink dark:text-[#F6F2FC]">{t.hero.factBackgroundValue}</span>
            </div>
          </div>
        </div>
        <aside className={`rounded border border-mistLine/80 bg-paper/60 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-midnight/55 ${shown}`} style={{ animationDelay: '380ms' }}>
          <h2 className="font-serif text-xl dark:text-[#F6F2FC]">{t.about.title}</h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-inkSoft dark:text-[#C8BFE3]">{t.about.p1}</p>
          <div className="mt-4 border-t border-mistLine pt-3 text-[0.82rem] text-inkSoft dark:border-white/10 dark:text-[#C8BFE3]"><span className="font-medium text-ink dark:text-[#F6F2FC]">{t.about.eduLine}</span> — {t.about.eduSchool}</div>
          <div className="mt-3 text-[0.8rem] text-violet dark:text-lilac">AI design tools: Cursor · Claude · ChatGPT · Stitch · MCP servers for Figma workflows</div>
        </aside>
        </div>
      </div>
    </section>
  )
}
