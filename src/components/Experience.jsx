import { useEffect, useState } from 'react'
import { experience } from '../data/experience'
import SectionDivider from './SectionDivider'
import { useLocale } from '../context/LocaleContext'

function useVisibleCount() {
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 640) setVisible(1)
      else if (window.innerWidth <= 900) setVisible(2)
      else setVisible(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return visible
}

export default function Experience() {
  const { t } = useLocale()
  const visible = useVisibleCount()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const maxIndex = Math.max(0, experience.length - visible)

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (paused || maxIndex <= 0) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, 3200)
    return () => window.clearInterval(timer)
  }, [paused, maxIndex])

  const goPrev = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1))
  const goNext = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1))

  return (
    <section id="experience" className="py-14 transition-colors md:py-16">
      <SectionDivider label="Experience" />
      <div className="mx-auto mt-7 max-w-content px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[42ch]">
            <h2 className="font-serif text-[1.5rem] dark:text-[#F6F2FC] md:text-[1.9rem]">{t.experience.title}</h2>
            <p className="mt-1.5 text-[0.92rem] text-inkSoft dark:text-[#C8BFE3]">{t.experience.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous experience"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#D9D3E3] bg-white text-ink shadow-sm transition hover:border-violet hover:text-violet dark:border-white/15 dark:bg-white/10 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next experience"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#D9D3E3] bg-white text-ink shadow-sm transition hover:border-violet hover:text-violet dark:border-white/15 dark:bg-white/10 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="experience-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="experience-slider-track"
            style={{
              width: `${(experience.length / visible) * 100}%`,
              transform: `translateX(-${(index * 100) / experience.length}%)`,
            }}
          >
            {experience.map((e) => {
              const item = t.experience.items[e.company]
              return (
                <div
                  key={e.company}
                  className="experience-slider-item"
                  style={{ width: `${100 / experience.length}%` }}
                >
                  <div className="glass-shell h-full">
                    <article className="glass-card flex h-full min-w-0 flex-col p-4 md:p-5">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/50 bg-white/80 p-1.5 dark:border-white/10 dark:bg-white/10">
                          {e.logo ? (
                            <img
                              src={e.logo}
                              alt={`${e.company} logo`}
                              width="44"
                              height="44"
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-serif text-sm text-ink dark:text-[#F6F2FC]">{e.company[0]}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.68rem] text-[#8A8296] dark:text-[#9C90BC]">{e.when}</p>
                          <h3 className="mt-0.5 font-serif text-[1.15rem] leading-tight text-ink dark:text-[#F6F2FC]">{e.company}</h3>
                          <p className="mt-0.5 text-[0.82rem] text-inkSoft dark:text-[#C8BFE3]">{item.role}</p>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-[0.82rem] leading-5 text-inkSoft dark:text-[#C8BFE3]">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#B0A8BE]" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show experience set ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-violet dark:bg-lilac' : 'w-2 bg-[#D9D3E3] dark:bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
