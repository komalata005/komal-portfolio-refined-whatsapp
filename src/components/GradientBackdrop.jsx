/**
 * Three large, heavily-blurred colour blobs that drift on independent
 * loops, producing a slow shifting gradient behind the hero. Pure CSS
 * transforms so it stays cheap; sits behind content and ignores pointer
 * events. Freezes flat for reduced-motion visitors (handled in index.css).
 */
export default function GradientBackdrop() {
  return (
    <div className="gradient-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
      {/* Softens the blobs into the page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper dark:to-midnight" />
    </div>
  )
}
