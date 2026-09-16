import Reveal from './Reveal'
import { useLocale } from '../context/LocaleContext'

export default function About() {
  const { t } = useLocale()

  return (
    <section id="about" className="border-t border-mistLine py-22 transition-colors dark:border-white/10 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-9 px-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <h2 className="mb-5 font-serif text-[2rem] dark:text-[#F6F2FC]">{t.about.title}</h2>
          <p className="max-w-[56ch] text-inkSoft dark:text-[#C8BFE3]">{t.about.p1}</p>
          <p className="mt-4 max-w-[56ch] text-inkSoft dark:text-[#C8BFE3]">{t.about.p2}</p>
          <div className="mt-6 border-t border-mistLine pt-5 text-[0.92rem] text-inkSoft dark:border-white/10 dark:text-[#C8BFE3]">
            <span className="font-medium text-ink dark:text-[#F6F2FC]">{t.about.eduLine}</span> — {t.about.eduSchool}
            <br />
            {t.about.langLine}
          </div>
        </Reveal>

        <div className="space-y-6">
          {t.about.skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <h4 className="mb-3 text-[0.9rem] font-semibold dark:text-[#F6F2FC]">{g.title}</h4>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-mistLine px-3.5 py-1.5 text-[0.85rem] text-inkSoft transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#C8BFE3] dark:hover:border-lilac dark:hover:text-lilac"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
