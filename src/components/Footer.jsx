import { useLocale } from '../context/LocaleContext'
import Magnetic from './Magnetic'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer id="contact" className="bg-gradient-to-br from-midnight to-midnight2 px-8 pb-10 pt-24 text-[#EDE7F8]">
      <div className="mx-auto max-w-content">
        <h2 className="max-w-[16ch] font-serif text-[2rem] text-[#F6F2FC] md:text-[3rem]">{t.footer.heading}</h2>
        <p className="mt-4 max-w-[50ch] text-[1.05rem] text-[#C8BFE3]">{t.footer.lede}</p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Magnetic
            href="mailto:komal.ata005@gmail.com"
            strength={10}
            className="rounded-[3px] border border-lilac bg-lilac px-6 py-3 text-[0.95rem] font-medium text-midnight"
          >
            {t.footer.emailCta}
          </Magnetic>
          <a
            href="https://wa.me/923101339029"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[3px] border border-white/25 px-6 py-3 text-[0.95rem] font-medium text-[#EDE7F8] transition-colors hover:border-white/50"
          >
            WhatsApp Komal ↗
          </a>
        </div>
        <div className="mt-20 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[0.85rem] text-[#9C90BC]">
          <div>{t.footer.location}</div>
          <a href="mailto:komal.ata005@gmail.com" className="text-[#C8BFE3] hover:text-white">
            komal.ata005@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
