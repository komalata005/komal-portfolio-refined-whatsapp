/** Behance-style graphical accents for case study pages. Decorative only. */

export function ArtboardFrame({ children, label }) {
  return (
    <div className="cs-artboard relative">
      <span className="cs-handle tl" aria-hidden="true" />
      <span className="cs-handle tr" aria-hidden="true" />
      <span className="cs-handle bl" aria-hidden="true" />
      <span className="cs-handle br" aria-hidden="true" />
      {label && (
        <span className="cs-artboard-label" aria-hidden="true">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

export function JourneyMap({ steps }) {
  return (
    <div className="cs-journey" aria-hidden="true">
      {steps.map((step, i) => (
        <div key={step} className="cs-journey-step">
          <span className="cs-journey-dot">{i + 1}</span>
          <span className="cs-journey-name">{step}</span>
          {i < steps.length - 1 && <span className="cs-journey-line" />}
        </div>
      ))}
    </div>
  )
}

const ICONS = {
  challenge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" strokeLinecap="round" />
    </svg>
  ),
  goals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 19V7.5L12 4l7 3.5V19" strokeLinejoin="round" />
      <path d="M9 19v-6h6v6" strokeLinejoin="round" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="10" cy="10" r="5.5" />
      <path d="M14.5 14.5L19 19" strokeLinecap="round" />
    </svg>
  ),
  process: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="4" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13" width="7" height="7" rx="1.5" />
      <path d="M10.5 7.5h3.2a2 2 0 012 2V13" strokeLinecap="round" />
    </svg>
  ),
  explore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 18l3.5-9.5L12 14l2.5-5.5L19 18" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="7.5" cy="7" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9 9v11" />
    </svg>
  ),
  solution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M8 12.5l2.8 2.8L16.5 9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  ),
  interface: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="2.2" />
      <path d="M9 6.5h6M9 10h6M9 13.5h4" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  outcome: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 16l4-4 3 3 7-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export function SectionMark({ type }) {
  return <span className="cs-section-mark">{ICONS[type] || ICONS.challenge}</span>
}

export function SectionHead({ eyebrow, title, type, lead }) {
  return (
    <div className="flex items-start gap-3">
      {type && <SectionMark type={type} />}
      <div className="min-w-0">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-violet dark:text-lilac">{eyebrow}</p>
        <h2 className="mt-1.5 font-serif text-[1.35rem] tracking-[-0.02em] text-ink dark:text-[#F6F2FC] md:text-[1.5rem]">{title}</h2>
        {lead && <p className="mt-2 max-w-2xl text-[0.86rem] leading-6 text-inkSoft dark:text-[#C8BFE3]">{lead}</p>}
      </div>
    </div>
  )
}

export function PaperGrid({ children }) {
  return <div className="cs-paper-grid">{children}</div>
}

/** Abstract UI thumbnail for screen cards */
export function ScreenThumb({ index = 0, kind = 'phone' }) {
  const variants = ['a', 'b', 'c', 'd']
  const v = variants[index % variants.length]
  return (
    <div className={`cs-screen-thumb cs-screen-thumb--${kind} cs-screen-thumb--${v}`} aria-hidden="true">
      <span className="cs-st-bar" />
      <span className="cs-st-block" />
      <span className="cs-st-row" />
      <span className="cs-st-row short" />
      <span className="cs-st-pill" />
    </div>
  )
}

export function GoalGlyph({ n }) {
  return (
    <span className="cs-goal-glyph" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
        <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        <circle cx="20" cy="20" r="3.2" fill="currentColor" />
      </svg>
      <span>{n}</span>
    </span>
  )
}

export function HeroDecor() {
  return (
    <div className="cs-hero-decor pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="cs-ring cs-ring-a" />
      <span className="cs-ring cs-ring-b" />
      <span className="cs-dot cs-dot-a" />
      <span className="cs-dot cs-dot-b" />
      <span className="cs-dot cs-dot-c" />
      <svg className="cs-curve" viewBox="0 0 200 80" fill="none">
        <path d="M8 52 C 48 8, 90 72, 130 28 S 188 18, 192 44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="52" r="3" fill="currentColor" />
        <circle cx="130" cy="28" r="3" fill="currentColor" />
        <circle cx="192" cy="44" r="3" fill="currentColor" />
      </svg>
      <div className="cs-mini-wire">
        <span />
        <span />
        <span className="short" />
        <span className="btn" />
      </div>
    </div>
  )
}

export function ColorBand({ colors }) {
  if (!colors?.length) return null
  return (
    <div className="cs-color-band" aria-hidden="true">
      {colors.map((c) => (
        <span key={c.hex} style={{ backgroundColor: c.hex }} title={c.name} />
      ))}
    </div>
  )
}
