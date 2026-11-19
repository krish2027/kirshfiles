// Flat 2D animated illustration: a developer typing code (pure SVG + CSS keyframes)
const LINES = [[204, 186, 90, '#FF1E1E'], [216, 202, 70, '#F5F5F2'], [216, 218, 96, '#9a9a9e'], [204, 234, 56, '#F5F5F2'], [216, 250, 80, '#FF1E1E']]
const skin = '#f0c8a0', ink = '#0A0A0A'
export default function Coder() {
  return (
    <svg className="coder" viewBox="0 0 400 400" role="img" aria-label="Animated illustration of Krish coding on a laptop">
      <ellipse cx="200" cy="376" rx="170" ry="10" fill={ink} opacity=".12" />
      <g fontFamily="Space Grotesk" fontWeight="700" fontSize="26">
        <text className="sym" x="50" y="100" fill={ink}>{'</>'}</text>
        <text className="sym s2" x="310" y="90" fill="#FF1E1E">{'{ }'}</text>
        <text className="sym s3" x="350" y="190" fill={ink}>#</text>
        <text className="sym s4" x="24" y="200" fill="#FF1E1E">;</text>
      </g>
      <path className="spin" style={{ transformOrigin: '250px 50px' }} d="M250 35 254 46 265 50 254 54 250 65 246 54 235 50 246 46Z" fill="#FF1E1E" />
      {/* legs + chair */}
      <path d="M80 306H152V364" stroke={ink} strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="162" cy="368" rx="20" ry="8" fill="#F5F5F2" stroke={ink} strokeWidth="3" />
      <rect x="56" y="312" width="86" height="12" rx="6" fill="#444" /><rect x="94" y="324" width="8" height="34" fill="#444" />
      <path d="M62 360H134" stroke="#444" strokeWidth="8" strokeLinecap="round" />
      {/* body + head */}
      <rect x="68" y="188" width="64" height="126" rx="30" fill="#FF1E1E" stroke={ink} strokeWidth="4" transform="rotate(8 100 310)" />
      <g className="nod">
        <circle cx="112" cy="158" r="30" fill={skin} stroke={ink} strokeWidth="4" />
        <path d="M82 156a30 30 0 0 1 60-4q-14-14-34-8-16 2-26 12z" fill={ink} />
        <circle cx="100" cy="164" r="6" fill={skin} stroke={ink} strokeWidth="3" />
        <circle className="blink" cx="132" cy="160" r="3.5" fill={ink} />
        <path d="M126 174q8 5 14-1" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* laptop screen */}
      <rect x="184" y="150" width="148" height="128" rx="10" fill={ink} /><rect x="194" y="160" width="128" height="108" rx="5" fill="#1c1c1c" />
      {['#FF1E1E', '#ffc800', '#3ccf4e'].map((c, i) => <circle key={c} cx={204 + i * 11} cy="171" r="3" fill={c} />)}
      {LINES.map(([x, y, w, f], i) => <rect key={i} className="ln" style={{ animationDelay: `${i * 0.4}s` }} x={x} y={y} width={w} height="8" rx="4" fill={f} />)}
      <rect className="cur" x="302" y="248" width="6" height="12" fill="#fff" />
      {/* desk, laptop base, mug */}
      <rect x="110" y="292" width="272" height="14" rx="7" fill={ink} /><rect x="350" y="306" width="12" height="62" fill={ink} />
      <rect x="170" y="278" width="180" height="14" rx="7" fill="#cfcfcf" stroke={ink} strokeWidth="3" />
      <rect x="360" y="262" width="22" height="30" rx="4" fill="#FF1E1E" stroke={ink} strokeWidth="3" />
      <path className="steam" d="M366 256q-6-8 0-14t0-12" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path className="steam" style={{ animationDelay: '.9s' }} d="M376 256q-6-8 0-14t0-12" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* typing arms */}
      {[['arm', 'M108 224L196 279', 196], ['arm2', 'M100 232L228 279', 228]].map(([c, d, hx]) => (
        <g key={c} className={c}>
          <path d={d} stroke={ink} strokeWidth="24" strokeLinecap="round" /><path d={d} stroke="#FF1E1E" strokeWidth="16" strokeLinecap="round" />
          <circle cx={hx} cy="279" r="10" fill={skin} stroke={ink} strokeWidth="3" />
        </g>
      ))}
    </svg>
  )
}
