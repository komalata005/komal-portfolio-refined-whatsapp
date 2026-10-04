import { useLocale } from '../context/LocaleContext'
import Magnetic from './Magnetic'
import { useEmailDialog } from './EmailPopup'

function FancyText({ text, fancy = [] }) {
  if (!text) return null
  const tokens = text.split(/(\s+)/)
  return tokens.map((token, i) => {
    if (/^\s+$/.test(token)) return token
    const clean = token.replace(/[.,!?]$/, '').toLowerCase()
    const punct = token.match(/[.,!?]$/)?.[0] || ''
    const word = punct ? token.slice(0, -1) : token
    if (fancy.some((f) => f.toLowerCase() === clean)) {
      return (
        <em key={i} className="font-serif italic text-lilac">
          {word}
          {punct}
        </em>
      )
    }
    return <span key={i}>{token}</span>
  })
}

export default function Footer() {
  const { t } = useLocale()
  const { openEmail } = useEmailDialog()
  const year = new Date().getFullYear()

  const explore = [
    { href: '/#work', label: t.nav.work },
    { href: '/#about', label: t.nav.about },
    { href: '/#process', label: t.nav.process },
    { href: '/#experience', label: t.nav.experience },
  ]

  return (
    <footer id="contact" className="relative isolate overflow-hidden px-8 pb-8 pt-20 text-[#EDE7F8] md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(155,127,217,0.28),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(90,62,142,0.35),transparent_50%),linear-gradient(180deg,#1B1330_0%,#241A3D_55%,#161022_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lilac/50 to-transparent" aria-hidden="true" />
      <span className="footer-star fs1" aria-hidden="true">✦</span>
      <span className="footer-star fs2" aria-hidden="true">✧</span>
      <span className="footer-star fs3" aria-hidden="true">✦</span>

      <div className="relative mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-lilac/90">
              Open for <em className="font-serif italic normal-case tracking-normal text-[#F0EAFB]">work</em>
            </p>
            <h2 className="mt-4 max-w-[15ch] font-serif text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-[#F8F4FF] md:text-[3.4rem]">
              <FancyText text={t.footer.heading} fancy={['build', 'worth', 'using', 'بنائیں', 'استعمال']} />
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-7 text-[#C8BFE3]">
              <FancyText text={t.footer.lede} fancy={['senior', 'UI/UX', 'depth', 'سینئر', 'تفصیل']} />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic
                as="button"
                type="button"
                onClick={openEmail}
                strength={10}
                className="rounded-full bg-lilac px-6 py-3 text-[0.95rem] font-medium text-midnight shadow-[0_12px_30px_rgba(155,127,217,0.35)] transition hover:bg-[#B8A4E8]"
              >
                {t.footer.emailCta}
              </Magnetic>
              <a
                href="https://wa.me/923101339029"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.95rem] font-medium text-[#F0EAFB] backdrop-blur-md transition hover:border-white/35 hover:bg-white/10"
              >
                <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#9C90BC]">Explore</p>
              <ul className="mt-4 space-y-3">
                {explore.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[0.98rem] text-[#E4DCF5] transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#9C90BC]">Connect</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <li>
                  <a href="mailto:komal.ata005@gmail.com" className="text-[#E4DCF5] transition hover:text-white">
                    komal.ata005@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+923101339029" className="text-[#E4DCF5] transition hover:text-white">
                    +92 310 1339029
                  </a>
                </li>
                <li className="text-[#C8BFE3]">Karachi, Pakistan</li>
                <li>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.78rem] text-[#EDE7F8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                    Available now
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[0.8rem] text-[#9C90BC]">
          <p>© {year} Komal Ata</p>
          <p className="font-sans text-[0.95rem] font-semibold tracking-[-0.01em] text-white">Komal Ata</p>
          <a href="#hero" className="transition hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
