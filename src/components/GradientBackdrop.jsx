/**
 * Soft violet colour blobs + optional floating UI/UX motifs.
 * Motifs show during the Who Am I intro, then fade out.
 */
export default function GradientBackdrop({ showMotifs = false }) {
  return (
    <div className="gradient-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
      <span className="blob blob-d" />

      <div className={`ux-motifs ${showMotifs ? 'is-visible' : 'is-hidden'}`}>
        <svg className="ux-motif ux-cursor" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 4.5L8.2 24.2L13.1 18.8L18.8 27.4L22.2 25.4L16.4 16.7L23.5 15.2L6 4.5Z"
            fill="currentColor"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>

        <div className="ux-motif ux-artboard">
          <span className="ux-handle tl" />
          <span className="ux-handle tr" />
          <span className="ux-handle bl" />
          <span className="ux-handle br" />
        </div>

        <svg className="ux-motif ux-pen" viewBox="0 0 120 80" fill="none">
          <path
            d="M8 58 C 28 18, 52 72, 72 28 S 108 12, 112 40"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="8" cy="58" r="3.2" fill="currentColor" />
          <circle cx="72" cy="28" r="3.2" fill="currentColor" />
          <circle cx="112" cy="40" r="3.2" fill="currentColor" />
          <path d="M8 58 L28 18 M72 28 L52 72 M112 40 L108 12" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </svg>

        <div className="ux-motif ux-stack">
          <span className="ux-stack-bar" />
          <span className="ux-stack-row" />
          <span className="ux-stack-row short" />
          <span className="ux-stack-row" />
        </div>

        <div className="ux-motif ux-swatches">
          <span style={{ background: '#5A3E8E' }} />
          <span style={{ background: '#A78BDB' }} />
          <span style={{ background: '#D4C2F5' }} />
        </div>

        <div className="ux-motif ux-wire">
          <span className="ux-wire-nav" />
          <span className="ux-wire-hero" />
          <span className="ux-wire-line" />
          <span className="ux-wire-line short" />
          <span className="ux-wire-btn" />
        </div>

        <div className="ux-motif ux-type">Aa</div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper dark:to-midnight" />
    </div>
  )
}
