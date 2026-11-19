import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { scrollState } from '../App.jsx'

const Group = ({ gref }) => <div ref={gref} className="ribbon__group">{Array.from({ length: 30 }, (_, i) => <span key={i}>krish</span>)}</div>

// Two tilted ribbons: A loops left, B loops right, forever. Each track holds two identical
// groups; we shift by exactly one group's width, so the wrap is invisible. Scroll speed boosts it.
export default function Marquee() {
  const a = useRef(), b = useRef(), ga = useRef(), gb = useRef()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let pa = 1, pb = 1, xa = 0, xb = 0, init = false
    const measure = () => {
      pa = ga.current.offsetWidth; pb = gb.current.offsetWidth
      xa = Math.max(-pa, Math.min(0, xa))
      if (!init) { xb = -pb; init = true } else xb = Math.max(-pb, Math.min(0, xb))
    }
    measure()
    const ro = new ResizeObserver(measure); ro.observe(ga.current)
    document.fonts?.ready.then(measure)
    const tick = () => {
      const s = (1.4 + Math.min(Math.abs(scrollState.velocity) * 0.7, 16)) * gsap.ticker.deltaRatio()
      xa -= s; if (xa <= -pa) xa += pa
      xb += s; if (xb >= 0) xb -= pb
      a.current.style.transform = `translate3d(${xa}px,0,0)`
      b.current.style.transform = `translate3d(${xb}px,0,0)`
    }
    gsap.ticker.add(tick)
    return () => { gsap.ticker.remove(tick); ro.disconnect() }
  }, [])
  return (
    <div className="ribbons" aria-hidden>
      <div className="ribbon ribbon--a"><div ref={a} className="ribbon__track"><Group gref={ga} /><Group /></div></div>
      <div className="ribbon ribbon--b"><div ref={b} className="ribbon__track"><Group gref={gb} /><Group /></div></div>
    </div>
  )
}
