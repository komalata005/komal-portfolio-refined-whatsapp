export default function SectionDivider({ label }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider-line section-divider-line-left" />
      <span className="section-divider-mark">
        <span className="section-divider-orbit" />
        <span className="section-divider-diamond" />
        {label ? <span className="section-divider-label">{label}</span> : null}
      </span>
      <span className="section-divider-line section-divider-line-right" />
    </div>
  )
}
