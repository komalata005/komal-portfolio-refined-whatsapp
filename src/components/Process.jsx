import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { useLocale } from '../context/LocaleContext'

export default function Process() {
  const { t } = useLocale()
  const steps = t.process.steps

  return (
    <section id="process" className="py-22 transition-colors md:py-24">
      <SectionDivider label="Process" />
      <div className="mx-auto mt-10 max-w-content px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.process.title}</h2>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{t.process.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 border-t border-[#E4D8F6] dark:border-lilac/25 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 100}
              className={`border-b border-mistLine py-9 dark:border-white/10 ${
                i % 2 === 0 ? 'sm:border-r sm:pl-0 sm:pr-8' : 'sm:pl-8 sm:pr-0'
              } ${
                i % 4 === 0 ? 'lg:border-r lg:pl-0 lg:pr-8' : i % 4 === 3 ? 'lg:border-r-0 lg:pl-8 lg:pr-0' : 'lg:border-r lg:pl-8 lg:pr-8'
              }`}
            >
              <div className="font-serif text-lg italic text-lilac">{s.num}</div>
              <h3 className="mb-2 mt-2.5 font-serif text-[1.15rem] dark:text-[#F6F2FC]">{s.title}</h3>
              <p className="text-[0.95rem] text-inkSoft dark:text-[#C8BFE3]">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mx-4 mt-14 mb-4 rounded-2xl border border-[#E4D8F6] bg-paperTint px-6 py-6 text-[0.95rem] text-inkSoft dark:border-white/10 dark:bg-midnight2 dark:text-[#C8BFE3] md:mx-8 md:mt-16 md:mb-6 md:px-8 md:py-7">
          <span className="font-medium text-ink dark:text-[#F6F2FC]">{t.process.aiNoteLabel}</span>
          <span className="mx-1.5 text-mist">·</span>
          {t.process.aiNote}
        </Reveal>
      </div>
    </section>
  )
}
