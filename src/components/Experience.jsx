import { experience } from '../data/experience'
import Reveal from './Reveal'
import { useLocale } from '../context/LocaleContext'

export default function Experience() {
  const { t } = useLocale()

  return (
    <section id="experience" className="border-t border-mistLine py-22 transition-colors dark:border-white/10 md:py-24">
      <div className="mx-auto max-w-content px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{t.experience.title}</h2>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{t.experience.subtitle}</p>
        </div>

        <div className="experience-timeline border-t border-mistLine dark:border-white/10">
          {experience.map((e, i) => {
            const item = t.experience.items[e.company]
            return (
              <Reveal
                key={e.company}
                delay={i * 90}
                className="experience-item grid grid-cols-1 gap-2 border-b border-mistLine py-7 dark:border-white/10 md:grid-cols-[220px_1fr] md:gap-8"
              >
                <div className="text-[0.92rem] text-inkSoft dark:text-[#9C90BC]">{e.when}</div>
                <div>
                  <h3 className="mb-1 font-serif text-xl dark:text-[#F6F2FC]">{e.company}</h3>
                  <div className="mb-2.5 text-[0.95rem] text-violet dark:text-lilac">{item.role}</div>
                  <ul className="list-disc space-y-1 pl-5 text-inkSoft dark:text-[#C8BFE3]">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-6 rounded-r border-l-[3px] border-lilac bg-paperTint px-5 py-4 text-[0.95rem] text-inkSoft dark:bg-midnight2 dark:text-[#C8BFE3]">
          <span className="font-medium text-ink dark:text-[#F6F2FC]">Open to opportunities</span> — looking to join a top technology company where thoughtful UI/UX can make a meaningful impact.
        </div>
      </div>
    </section>
  )
}
