import Reveal from './Reveal'
import { useLocale } from '../context/LocaleContext'

export default function Process() {
  const { t } = useLocale()
  const steps = t.process.steps

  return (
    <section id="process" className="border-t border-mistLine py-22 transition-colors dark:border-white/10 md:py-24">
      <div className="mx-auto max-w-content px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.process.title}</h2>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{t.process.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 border-t border-mistLine dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 100}
              className={`border-b border-mistLine py-7 pr-6 dark:border-white/10 ${
                (i + 1) % 4 !== 0 ? 'lg:border-r lg:dark:border-white/10' : ''
              } ${(i + 1) % 2 !== 0 ? 'sm:border-r sm:dark:border-white/10 lg:border-r' : 'sm:border-r-0'}`}
            >
              <div className="font-serif text-lg italic text-lilac">{s.num}</div>
              <h3 className="mb-2 mt-2.5 font-serif text-[1.15rem] dark:text-[#F6F2FC]">{s.title}</h3>
              <p className="text-[0.95rem] text-inkSoft dark:text-[#C8BFE3]">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-7 rounded-r border-l-[3px] border-lilac bg-paperTint px-5 py-4 text-[0.95rem] text-inkSoft dark:bg-midnight2 dark:text-[#C8BFE3]">
          <span className="font-medium text-ink dark:text-[#F6F2FC]">{t.process.aiNoteLabel}</span> — {t.process.aiNote}
        </Reveal>
      </div>
    </section>
  )
}
