/**
 * Static homepage hero backdrop (art direction: Codex, 2026-11-14). Replaces the 4.4 MB autoplay
 * video: an engraved river bend in cobalt contours, pure SVG, no media requests, no client JS.
 */
const riverBend =
  'M420-100 C420 64 90 80 90 268 C90 452 382 398 382 576 C382 750 170 766 170 1010'

export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop__grid grid-pattern" />

      <svg className="hero-backdrop__river" viewBox="0 0 600 900" fill="none" focusable="false">
        <path className="hero-backdrop__band" d={riverBend} transform="translate(66 0)" strokeWidth="144" />

        <g className="hero-backdrop__contours" strokeWidth="1">
          {Array.from({ length: 12 }, (_, index) => (
            <path key={index} d={riverBend} transform={`translate(${index * 12} 0)`} vectorEffect="non-scaling-stroke" />
          ))}
        </g>

        <path
          className="hero-backdrop__edge"
          d={riverBend}
          transform="translate(132 0)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
