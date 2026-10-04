import { useEffect, useState } from 'react'
import SectionDivider from './SectionDivider'
import { LINKEDIN_RECOMMENDATIONS, reviews } from '../data/reviews'

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = reviews.length
  const canSlide = total > 1

  useEffect(() => {
    if (paused || !canSlide) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [paused, canSlide, total])

  const goPrev = () => setIndex((current) => (current - 1 + total) % total)
  const goNext = () => setIndex((current) => (current + 1) % total)

  return (
    <section id="reviews" className="py-10 transition-colors md:py-12">
      <SectionDivider label="Reviews" />
      <div className="mx-auto mt-5 max-w-content px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-[1.35rem] tracking-[-0.03em] dark:text-[#F6F2FC] md:text-[1.55rem]">
            Client reviews
          </h2>
          <div className="flex items-center gap-3">
            {canSlide ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous review"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#E4D8F6] text-inkSoft transition hover:border-violet hover:text-violet dark:border-white/15 dark:hover:border-lilac dark:hover:text-lilac"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next review"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#E4D8F6] text-inkSoft transition hover:border-violet hover:text-violet dark:border-white/15 dark:hover:border-lilac dark:hover:text-lilac"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            ) : null}
            <a
              href={LINKEDIN_RECOMMENDATIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.78rem] font-medium text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-2xl border border-[#E7E0F2]/90 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
          dir="ltr"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((item) => (
              <blockquote key={item.id} className="w-full shrink-0 px-4 py-4 text-start md:px-5 md:py-4" dir="auto">
                <p className="line-clamp-3 text-[0.92rem] leading-6 text-ink dark:text-[#EDE7F8] md:text-[0.95rem] md:leading-7">
                  “{item.quote}”
                </p>
                <footer className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem]">
                  <span className="font-semibold text-ink dark:text-[#F6F2FC]">{item.name}</span>
                  <span className="text-mist">·</span>
                  <span className="text-inkSoft dark:text-[#C8BFE3]">{item.role}</span>
                  <span className="text-mist">·</span>
                  <span className="text-violet dark:text-lilac">{item.relation}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {canSlide ? (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show review from ${review.name}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-violet dark:bg-lilac' : 'w-1.5 bg-[#D9D3E3] dark:bg-white/20'}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
