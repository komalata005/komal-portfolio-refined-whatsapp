import Reveal from './Reveal'
import { useLocale } from '../context/LocaleContext'

const swatches = [
  { name: 'Whisper', hex: '#F1ECF8', className: 'bg-paperTint' },
  { name: 'Stone', hex: '#ACAFC2', className: 'bg-mist' },
  { name: 'Lilac', hex: '#9B7FD9', className: 'bg-lilac' },
  { name: 'Violet', hex: '#5A3E8E', className: 'bg-violet' },
  { name: 'Midnight', hex: '#241A3D', className: 'bg-midnight' },
]

export default function DesignSystem() {
  const { t } = useLocale()
  const s = t.system

  return (
    <section id="system" className="border-t border-mistLine py-22 transition-colors dark:border-white/10 md:py-24">
      <div className="mx-auto max-w-content px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[1.7rem] dark:text-[#F6F2FC] md:text-[2.3rem]">{s.title}</h2>
          <p className="max-w-[40ch] text-inkSoft dark:text-[#C8BFE3]">{s.subtitle}</p>
        </div>

        <Reveal className="mb-14">
          <h3 className="mb-5 text-sm font-semibold text-inkSoft dark:text-[#C8BFE3]">{s.color}</h3>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map((sw) => (
              <div key={sw.name} className="overflow-hidden rounded-md border border-mistLine transition-transform duration-300 hover:-translate-y-1 dark:border-white/10">
                <div className={`h-[78px] ${sw.className}`} />
                <div className="bg-white p-2.5 text-[0.8rem] dark:bg-midnight2">
                  <b className="block text-[0.85rem] dark:text-[#F6F2FC]">{sw.name}</b>
                  <span className="text-inkSoft dark:text-[#9C90BC]">{sw.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="mb-14">
          <h3 className="mb-5 text-sm font-semibold text-inkSoft dark:text-[#C8BFE3]">{s.type}</h3>
          <div className="divide-y divide-mistLine border-y border-mistLine dark:divide-white/10 dark:border-white/10">
            <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-5.5">
              <div className="flex-1 font-serif text-[2.6rem] dark:text-[#F6F2FC]">{s.typeSamples.display}</div>
              <div className="w-[170px] flex-none text-[0.82rem] text-inkSoft dark:text-[#9C90BC] sm:text-right">Fraunces · 500 · Display</div>
            </div>
            <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-5.5">
              <div className="flex-1 font-serif text-[1.7rem] dark:text-[#F6F2FC]">{s.typeSamples.heading}</div>
              <div className="w-[170px] flex-none text-[0.82rem] text-inkSoft dark:text-[#9C90BC] sm:text-right">Fraunces · 500 · Heading</div>
            </div>
            <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-5.5">
              <div className="flex-1 text-[1.05rem] dark:text-[#F6F2FC]">{s.typeSamples.body}</div>
              <div className="w-[170px] flex-none text-[0.82rem] text-inkSoft dark:text-[#9C90BC] sm:text-right">IBM Plex Sans · 400 · Body</div>
            </div>
            <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-5.5">
              <div className="flex-1 text-[0.85rem] font-medium dark:text-[#F6F2FC]">{s.typeSamples.label}</div>
              <div className="w-[170px] flex-none text-[0.82rem] text-inkSoft dark:text-[#9C90BC] sm:text-right">IBM Plex Sans · 500 · Label</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="mb-14">
          <h3 className="mb-5 text-sm font-semibold text-inkSoft dark:text-[#C8BFE3]">{s.buttons}</h3>
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-[3px] border border-violet bg-violet px-6 py-3 text-[0.95rem] font-medium text-paper transition-transform hover:-translate-y-px hover:bg-violetDeep">
              {s.primaryAction}
            </button>
            <button className="rounded-[3px] border border-mistLine px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac">
              {s.secondaryAction}
            </button>
          </div>
          <div className="mt-3.5 flex items-center gap-4 rounded-md bg-midnight p-5">
            <button className="rounded-[3px] border border-lilac bg-lilac px-6 py-3 text-[0.95rem] font-medium text-midnight transition-colors hover:bg-[#B8A4E8]">
              {s.onDark}
            </button>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <h3 className="mb-5 text-sm font-semibold text-inkSoft dark:text-[#C8BFE3]">{s.tags}</h3>
          <div className="flex flex-wrap gap-2">
            {['UX research', 'Design systems', 'Prototyping'].map((tag) => (
              <span key={tag} className="rounded-full border border-[#D7C9F2] bg-[#F4EEFC] px-2.5 py-1 text-[0.76rem] text-violet dark:border-lilac/30 dark:bg-lilac/10 dark:text-lilac">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Figma', 'React', 'Usability testing'].map((tag) => (
              <span key={tag} className="rounded-full border border-mistLine px-3.5 py-1.5 text-[0.85rem] text-inkSoft dark:border-white/15 dark:text-[#C8BFE3]">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
