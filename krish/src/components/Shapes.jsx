import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Flat 2D "sticker" shapes. Each floats/spins via CSS and drifts at its own speed on scroll (parallax)
const P = {
  star: <path d="M50 0 58 42 100 50 58 58 50 100 42 58 0 50 42 42Z" />,
  ring: <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" />,
  squiggle: <path d="M0 50Q12 10 25 50T50 50T75 50T100 50" fill="none" strokeWidth="8" strokeLinecap="round" />,
  plus: <path d="M40 0h20v40h40v20H60v40H40V60H0V40h40Z" />,
  tri: <path d="M50 5 95 90H5Z" />,
  dot: <circle cx="50" cy="50" r="45" />,
}
// items: [type, left%, top%, size px, parallax speed, color, css animation (spin|float|pulse|wob)]
export default function Shapes({ items }) {
  const root = useRef()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('.shape').forEach((el) =>
        gsap.to(el, { y: -el.dataset.speed * 260, ease: 'none', scrollTrigger: { trigger: root.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }))
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div className="shapes" ref={root} aria-hidden>
      {items.map(([t, l, tp, s, sp, c, a], i) => (
        <div key={i} className="shape" data-speed={sp} style={{ left: l + '%', top: tp + '%', width: s, height: s, color: c }}>
          <svg viewBox="0 0 100 100" className={a} fill="currentColor" stroke="currentColor">{P[t]}</svg>
        </div>
      ))}
    </div>
  )
}
