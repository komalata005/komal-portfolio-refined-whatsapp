import { useLocale } from '../context/LocaleContext'
import { useTheme } from '../context/ThemeContext'
import LanguagePicker from './LanguagePicker'
import AccessibilityControls from './AccessibilityControls'

export default function Nav() {
  const { t } = useLocale()
  const { theme, toggleTheme } = useTheme()

  const links = [
    { href: '#work', label: t.nav.work },
    { href: '#process', label: t.nav.process },
    { href: '#experience', label: t.nav.experience },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-mistLine bg-paper/85 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-midnight/85">
      <div className="mx-auto flex max-w-content items-center justify-between px-8 py-5">
        <span className="font-script text-3xl leading-none pb-1 text-violet dark:text-lilac">Komal Ata</span>

        <ul className="hidden gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[0.95rem] text-inkSoft transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-violet after:transition-all after:duration-300 hover:text-violet hover:after:w-full dark:text-[#C8BFE3] dark:hover:text-lilac dark:after:bg-lilac"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions flex items-center gap-2.5">
          <LanguagePicker />
          <AccessibilityControls />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-[3px] border border-mistLine text-ink transition-colors hover:border-violet hover:text-violet dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <a
            href="https://wa.me/923101339029"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-[3px] border border-mistLine px-5 py-2.5 text-[0.95rem] text-ink transition-colors hover:border-violet hover:text-violet sm:inline-block dark:border-white/15 dark:text-[#EDE7F8] dark:hover:border-lilac dark:hover:text-lilac"
          >
            WhatsApp ↗
          </a>
        </div>
      </div>
    </header>
  )
}
