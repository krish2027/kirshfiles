import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Loader from './components/Loader.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
gsap.registerPlugin(ScrollTrigger)

// Shared scroll velocity (px/frame, smoothed) used by the marquee + hero
export const intro = { spin: 1 } // spin multiplier used by the loader
export const scrollState = { velocity: 0, progress: 0 }

export default function App() {
  const [ready, setReady] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => { document.documentElement.style.overflow = ready ? '' : 'hidden' }, [ready])
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    // Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      scrollState.velocity = e.velocity
      scrollState.progress = e.progress
    })
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  return (
    <>
      <a className="skip" href="#projects">Skip to projects</a>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Projects />
        <Marquee />
        <About />
        <Contact />
      </main>
    </>
  )
}
