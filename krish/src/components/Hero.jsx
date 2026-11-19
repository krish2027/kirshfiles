import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
const Model = lazy(() => import('./Model.jsx')) // 3D code loads only when needed

// Low-power heuristic: few cores, low memory, or reduced motion → static fallback
const lowPower = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ||
  (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2

export default function Hero({ ready }) {
  const root = useRef()
  const [fallback] = useState(lowPower)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ready) gsap.fromTo('.hero__in', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [ready])
  return (
    <section id="home" className="hero" ref={root}>
      <h1 className="hero__in hero__title">i am<br />krish</h1>
      <div className={`hero__model${ready ? '' : ' hero__model--top'}`} aria-label="Rotating chrome 3D sculpture" role="img">
        {fallback ? <div className="hero__fallback" /> : (
          <Suspense fallback={<div className="hero__fallback" />}>
            <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }}><Model /></Canvas>
          </Suspense>
        )}
      </div>
      <p className="hero__in hero__hint">scroll down<br />to know more <span className="arrow" aria-hidden>↓</span></p>
    </section>
  )
}
