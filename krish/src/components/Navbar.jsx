import { useEffect, useState } from 'react'
const links = [['Home', '#home'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact']]

// Floating glass pill that shrinks after the user scrolls
export default function Navbar() {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const on = () => setSmall(window.scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  const go = (e, href) => {
    e.preventDefault()
    window.__lenis ? window.__lenis.scrollTo(href, { offset: -20 }) : document.querySelector(href)?.scrollIntoView()
  }
  return (
    <nav className={`nav ${small ? 'nav--small' : ''}`} aria-label="Main">
      {links.map(([l, h]) => <a key={l} href={h} onClick={(e) => go(e, h)}>{l}</a>)}
    </nav>
  )
}
