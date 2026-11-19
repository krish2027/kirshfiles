import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { intro } from '../App.jsx'

// Black curtain. The hero's own 3D model is raised above it (see Hero.jsx), so the
// model stays in place: it spins fast, slows down, and the curtain slides up behind it.
export default function Loader({ onDone }) {
  const root = useRef(), num = useRef()
  useEffect(() => {
    intro.spin = 30
    const o = { p: 0 }
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(intro, { spin: 1, duration: 3, ease: 'power3.out' }, 0.3)
      .to(o, { p: 100, duration: 3, ease: 'power2.inOut', onUpdate: () => num.current && (num.current.textContent = Math.round(o.p)) }, 0.3)
      .to(root.current, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, '+=0.2')
    return () => tl.kill()
  }, [])
  return <div className="loader" ref={root} role="status" aria-label="Loading"><p className="loader__num"><span ref={num}>0</span>%</p></div>
}
