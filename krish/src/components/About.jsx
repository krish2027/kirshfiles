import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Coder from './Coder.jsx'
gsap.registerPlugin(ScrollTrigger)
const SKILLS = ['Motion design', 'Three.js', 'React', 'Video editing', 'Branding', 'UI design']
// Education (left column). Edit freely.
const EDU = [['2022', '10th Pass', 'Govt High School'], ['Class 12', '12th Pass', 'Govt Model Senior Secondary School, Sector 37D'], ['Diploma', 'Computer Diploma', '1 year course']]

export default function About() {
  const root = useRef()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.reveal', { yPercent: 100, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.about__top', start: 'top 80%' } })
      gsap.from('.tag', { scale: 0.6, opacity: 0, stagger: 0.07, ease: 'back.out(2)', scrollTrigger: { trigger: '.tags', start: 'top 90%' } })
      // education: the red line draws as you scroll, each card slides in and its dot pops
      gsap.from('.edu__line', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.edu', start: 'top 75%', end: 'bottom 75%', scrub: true } })
      gsap.utils.toArray('.edu__item').forEach((el) => {
        gsap.from(el, { x: -70, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        gsap.from(el.querySelector('.edu__dot'), { scale: 0, duration: 0.5, ease: 'back.out(3)', scrollTrigger: { trigger: el, start: 'top 85%' } })
      })
      gsap.from('.coder', { x: 90, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.coder', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="about" className="about" ref={root}>
      <div className="about__top">
        <h2><span className="mask"><span className="reveal">about me</span></span></h2>
        <p>I'm Krish, a creator who mixes design, code and motion to make things that feel alive.</p>
        <ul className="tags">{SKILLS.map((s) => <li className="tag" key={s}>{s}</li>)}</ul>
      </div>
      <div className="about__grid">
        <ol className="edu" aria-label="Education">
          <span className="edu__line" aria-hidden />
          {EDU.map(([l, t, p]) => <li className="edu__item" key={t}><i className="edu__dot" /><small>{l}</small><h3>{t}</h3><span>{p}</span></li>)}
        </ol>
        <Coder />
      </div>
    </section>
  )
}
