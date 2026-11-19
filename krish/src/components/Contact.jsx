import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Shapes from './Shapes.jsx'
gsap.registerPlugin(ScrollTrigger)

// Button that gently follows the cursor
function Magnetic({ children, ...p }) {
  const ref = useRef()
  const mv = (e) => { const r = ref.current.getBoundingClientRect(); gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3 }) }
  const lv = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
  return <a ref={ref} onMouseMove={mv} onMouseLeave={lv} {...p}>{children}</a>
}
const SHAPES = [['star', 8, 10, 90, 0.9, '#FF1E1E', 'spin'], ['ring', 84, 8, 120, 0.5, '#F5F5F2', 'float'], ['squiggle', 66, 38, 150, 1.2, '#FF1E1E', 'wob'],
  ['plus', 10, 52, 60, 0.7, '#F5F5F2', 'spin'], ['tri', 90, 62, 80, 1, '#FF1E1E', 'float'], ['dot', 46, 4, 30, 0.3, '#F5F5F2', 'pulse'], ['star', 56, 72, 50, 0.6, '#F5F5F2', 'spin']]

export default function Contact() {
  const root = useRef()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.c-word', { yPercent: 110, rotate: 6, duration: 1, stagger: 0.12, ease: 'power4.out', scrollTrigger: { trigger: '.contact h2', start: 'top 80%' } })
      gsap.from('.contact form > *', { opacity: 0, y: 30, stagger: 0.08, scrollTrigger: { trigger: '.contact form', start: 'top 85%' } })
      // giant footer letters rise one by one as you scroll; badge rotates with scroll
      gsap.from('.g-letter', { yPercent: 105, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.giant', start: 'top bottom', end: 'bottom bottom', scrub: true } })
      gsap.to('.badge', { rotate: 360, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  // Opens the visitor's mail app with the message pre-filled
  const submit = (e) => {
    e.preventDefault(); const f = new FormData(e.target)
    location.href = `mailto:luciferkrish8@gmail.com?subject=${encodeURIComponent('Hello from ' + f.get('name'))}&body=${encodeURIComponent(f.get('message') + '\n\n' + f.get('name') + ' (' + f.get('email') + ')')}`
  }
  return (
    <section id="contact" className="contact" ref={root}>
      <Shapes items={SHAPES} />
      <svg className="badge" viewBox="0 0 120 120" aria-hidden>
        <defs><path id="c" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs>
        <text fontSize="11" letterSpacing="3" fill="#F5F5F2"><textPath href="#c">available for work • available for work •</textPath></text>
        <circle cx="60" cy="60" r="10" fill="#FF1E1E" />
      </svg>
      <h2>{["let's", 'work', 'together'].map((w) => <span className="mask" key={w}><span className="c-word">{w}</span></span>)}</h2>
      <div className="reach"><Magnetic className="btn btn--big" href="mailto:luciferkrish8@gmail.com">luciferkrish8@gmail.com</Magnetic><Magnetic className="btn btn--big btn--ph" href="tel:+917719682046">7719682046</Magnetic></div>
      <form onSubmit={submit}>
        <input name="name" aria-label="Name" placeholder="Name" required />
        <input name="email" aria-label="Email" type="email" placeholder="Email" required />
        <textarea name="message" aria-label="Message" placeholder="Message" rows="4" required />
        <button className="btn">Send message</button>
      </form>
      <p className="socials"><a href="#">Instagram</a> <a href="#">YouTube</a> <a href="#">LinkedIn</a></p>
      <div className="giant" aria-hidden>{'krish'.split('').map((l, i) => <span className="g-letter" key={i}>{l}</span>)}</div>
      <button className="btn btn--ghost top" onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : scrollTo({ top: 0 })}>Back to top ↑</button>
    </section>
  )
}
