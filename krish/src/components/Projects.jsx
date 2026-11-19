import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Shapes from './Shapes.jsx'
gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { title: 'Neon Reel', desc: 'Short-form video series.', long: 'A 12-part motion series with custom type and sound design.', hue: 12 },
  { title: 'Orbit App', desc: 'Habit tracker concept.', long: 'Mobile product design, from research to prototype.', hue: 200 },
  { title: 'Chrome Type', desc: 'Experimental typeface.', long: 'A variable display face explored in 3D and print.', hue: 280 },
  { title: 'Studio Bloom', desc: 'Brand identity.', long: 'Logo, palette and social kit for a ceramics studio.', hue: 140 },
  { title: 'Pulse FM', desc: 'Audio-visual site.', long: 'WebGL music player with reactive visuals.', hue: 40 },
].map((p, i) => ({ ...p, link: '#', img: `https://picsum.photos/seed/krish${i + 3}/600/800` })) // swap img for your own screenshots

const N = PROJECTS.length
const STEP = 1 // each card sits 1 unit apart on the arc

export default function Projects() {
  const [open, setOpen] = useState(null)
  const [active, setActive] = useState(2)
  const cards = useRef([])
  const st = useRef({ pos: 2, vel: 0, drag: false, lastX: 0, moved: 0 })
  const wrap = useRef()

  // Layout cards on an arc from a continuous position value (0..N-1, wraps)
  const layout = () => {
    const { pos } = st.current
    const narrow = innerWidth < 700
    const gap = narrow ? 96 : Math.min(190, innerWidth / 7)
    cards.current.forEach((el, i) => {
      let d = (((i - pos + N / 2) % N) + N) % N - N / 2 // signed distance to center
      const a = Math.abs(d)
      gsap.set(el, {
        x: d * gap, y: a * a * 22, rotate: d * 7,
        scale: 1 - Math.min(a, 2) * 0.06 + (a < 0.5 ? (0.5 - a) * 0.2 : 0),
        zIndex: 10 - Math.round(a * 2), opacity: a > 2.6 ? 0 : 1,
      })
    })
    setActive((c) => { const n = ((Math.round(pos) % N) + N) % N; return n === c ? c : n })
  }

  useEffect(() => {
    layout()
    const s = st.current
    const tick = () => {
      if (!s.drag) { // inertia, then ease to the nearest card
        s.pos += s.vel; s.vel *= 0.93
        if (Math.abs(s.vel) < 0.004) s.pos += (Math.round(s.pos) - s.pos) * 0.1
      }
      layout()
    }
    gsap.ticker.add(tick)
    addEventListener('resize', layout)
    return () => { gsap.ticker.remove(tick); removeEventListener('resize', layout) }
  }, [])

  // Pointer drag (mouse + touch)
  const down = (e) => { const s = st.current; s.drag = true; s.lastX = e.clientX; s.moved = 0; s.vel = 0 }
  const move = (e) => {
    const s = st.current; if (!s.drag) return
    const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.moved += Math.abs(dx)
    const d = -dx / 160; s.pos += d; s.vel = d
  }
  const up = () => { st.current.drag = false }
  const key = (e) => {
    if (e.key === 'ArrowRight') st.current.vel = 0.12
    if (e.key === 'ArrowLeft') st.current.vel = -0.12
  }

  // Custom "drag" cursor hint
  // Parallax: giant outline text slides sideways as the section scrolls past
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => gsap.fromTo('.bgword span', { xPercent: 5 }, { xPercent: -45, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } }), wrap)
    return () => ctx.revert()
  }, [])
  const go = (d) => gsap.to(st.current, { pos: Math.round(st.current.pos) + d, duration: 0.7, ease: 'power3.out', overwrite: true })
  const hint = useRef()
  const hm = (e) => { const r = wrap.current.getBoundingClientRect(); gsap.to(hint.current, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.25 }) }

  return (
    <section id="projects" className="projects" ref={wrap} onPointerMove={hm}
      onPointerEnter={() => gsap.to(hint.current, { opacity: 1, scale: 1 })} onPointerLeave={() => gsap.to(hint.current, { opacity: 0, scale: 0.6 })}>
      <div className="bgword" aria-hidden><span>selected work • selected work • selected work •</span></div>
      <Shapes items={[['star', 6, 10, 70, 0.8, '#fff', 'spin'], ['ring', 88, 16, 100, 0.5, '#0A0A0A', 'float'], ['squiggle', 3, 68, 120, 1, '#0A0A0A', 'wob'], ['plus', 92, 74, 50, 0.6, '#fff', 'spin'], ['dot', 22, 86, 24, 0.4, '#fff', 'pulse']]} />
      <h2>project</h2>
      <div className="fan" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onKeyDown={key} tabIndex={0} aria-label="Projects carousel. Use arrow keys or drag.">
        {PROJECTS.map((p, i) => (
          <button key={p.title} ref={(el) => (cards.current[i] = el)} className={`card ${active === i ? 'card--on' : ''}`}
            onClick={() => st.current.moved < 6 && (active === i ? setOpen(p) : (st.current.pos = i))}>
            <img className="card__img" src={p.img} alt={`${p.title} preview`} loading="lazy" draggable={false} />
            <span className="card__cap"><strong>{p.title}</strong><small>{p.desc}</small></span>
          </button>
        ))}
      </div>
      <div className="info" aria-live="polite">
        <span className="count">0{active + 1} / 0{N}</span>
        <h3>{PROJECTS[active].title}</h3><p>{PROJECTS[active].desc}</p>
        <div className="ctrl"><button aria-label="Previous project" onClick={() => go(-1)}>←</button><button aria-label="Next project" onClick={() => go(1)}>→</button></div>
      </div>
      <span className="dragHint" ref={hint} aria-hidden>drag →</span>
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <img className="modal__img" src={open.img} alt="" /><h3>{open.title}</h3><p>{open.long}</p>
            <a href={open.link} className="btn">View project</a>
            <button className="btn btn--ghost" onClick={() => setOpen(null)} autoFocus>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
