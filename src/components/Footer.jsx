import { useLocale } from '../context/LocaleContext'
import Magnetic from './Magnetic'
import { useEmailDialog } from './EmailPopup'

function FancyText({ text, fancy = [], accentClass = 'font-serif italic text-violet dark:text-lilac' }) {
  if (!text) return null
  const tokens = text.split(/(\s+)/)
  return tokens.map((token, i) => {
    if (/^\s+$/.test(token)) return token
    const clean = token.replace(/[.,!?]$/, '').toLowerCase()
    const punct = token.match(/[.,!?]$/)?.[0] || ''
    const word = punct ? token.slice(0, -1) : token
    if (fancy.some((f) => f.toLowerCase() === clean)) {
      return (
        <em key={i} className={accentClass}>
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
    { href: '/#expertise', label: t.nav.expertise || 'Expertise' },
    { href: '/#about', label: t.nav.about },
    { href: '/faq', label: t.nav.faq || 'FAQ' },
  ]

  return (
    <footer id="contact" className="relative isolate overflow-hidden px-8 pb-8 pt-20 text-ink dark:text-[#E8E4F0] md:pt-24">
      {/* Light: soft paper wash. Dark: black/gray base with the previous purple woven in */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(167,139,219,0.14),transparent_42%),radial-gradient(ellipse_at_85%_100%,rgba(212,194,245,0.18),transparent_48%),linear-gradient(180deg,#F4F0FA_0%,#EDE8F6_45%,#E8E2F2_100%)] dark:bg-[radial-gradient(ellipse_at_12%_-10%,rgba(90,62,142,0.45),transparent_48%),radial-gradient(ellipse_at_88%_110%,rgba(122,92,180,0.28),transparent_52%),radial-gradient(ellipse_at_50%_60%,rgba(40,40,48,0.55),transparent_60%),linear-gradient(165deg,#08080A_0%,#121018_38%,#1A1624_68%,#0C0C10_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/25 to-transparent dark:via-lilac/35" aria-hidden="true" />
      <span className="footer-star fs1" aria-hidden="true">✦</span>
      <span className="footer-star fs2" aria-hidden="true">✧</span>
      <span className="footer-star fs3" aria-hidden="true">✦</span>

      <div className="relative mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-violet dark:text-lilac/80">
              Open for <em className="font-serif italic normal-case tracking-normal text-ink dark:text-[#EDE7F8]">work</em>
            </p>
            <h2 className="mt-4 max-w-[15ch] font-serif text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-ink dark:text-[#F2F2F5] md:text-[3.4rem]">
              <FancyText
                text={t.footer.heading}
                fancy={['build', 'worth', 'using', 'بنائیں', 'استعمال']}
                accentClass="font-serif italic text-violet dark:text-lilac"
              />
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-7 text-inkSoft dark:text-[#B0A8C4]">
              <FancyText
                text={t.footer.lede}
                fancy={['senior', 'UI/UX', 'depth', 'سینئر', 'تفصیل']}
                accentClass="font-serif italic text-violet dark:text-lilac"
              />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic
                as="button"
                type="button"
                onClick={openEmail}
                strength={10}
                className="rounded-full bg-violet px-6 py-3 text-[0.95rem] font-medium text-paper shadow-[0_12px_30px_rgba(90,62,142,0.22)] transition hover:bg-violetDeep dark:bg-lilac dark:text-midnight dark:shadow-[0_12px_28px_rgba(90,62,142,0.35)] dark:hover:bg-[#E4D8F8]"
              >
                {t.footer.emailCta}
              </Magnetic>
              <a
                href="https://wa.me/923101339029"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-white/70 px-5 py-3 text-[0.95rem] font-medium text-ink backdrop-blur-md transition hover:border-violet hover:text-violet dark:border-lilac/25 dark:bg-white/[0.06] dark:text-[#E8E8EE] dark:hover:border-lilac/50 dark:hover:bg-lilac/10"
              >
                <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-inkSoft dark:text-[#8A829C]">Explore</p>
              <ul className="mt-4 space-y-3">
                {explore.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[0.98rem] text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-inkSoft dark:text-[#8A829C]">Connect</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <li>
                  <a href="mailto:komal.ata005@gmail.com" className="text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
                    komal.ata005@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+923101339029" className="text-inkSoft transition hover:text-violet dark:text-[#C8BFE3] dark:hover:text-lilac">
                    +92 310 1339029
                  </a>
                </li>
                <li className="text-inkSoft dark:text-[#A89CBC]">Karachi, Pakistan</li>
                <li>
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-white/80 px-3 py-1.5 text-[0.78rem] text-ink dark:border-lilac/20 dark:bg-lilac/10 dark:text-[#EDE7F8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                    Available now
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-violet/15 pt-5 text-[0.8rem] text-inkSoft dark:border-lilac/15 dark:text-[#8A829C]">
          <p>© {year} Komal Ata</p>
          <p className="font-sans text-[0.95rem] font-semibold tracking-[-0.01em] text-ink dark:text-[#EDE7F8]">Komal Ata</p>
          <a href="#hero" className="transition hover:text-violet dark:hover:text-lilac">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
