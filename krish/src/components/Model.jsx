import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState, intro } from '../App.jsx'

const chrome = { color: '#e8e8ea', metalness: 1, roughness: 0.12, envMapIntensity: 1.4 }

// Procedural chrome sculpture: glossy sphere + 3 interlocking rings + orbiting beads
function Sculpture() {
  const group = useRef(), r1 = useRef(), r2 = useRef(), r3 = useRef(), beads = useRef()
  useFrame((s, dt) => {
    // tilt toward the cursor (s.pointer is -1..1), plus a scroll-reactive spin
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -s.pointer.y * 0.5, 0.05)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, s.pointer.x * 0.6, 0.05)
    const boost = intro.spin * (1 + Math.min(Math.abs(scrollState.velocity) * 0.15, 4))
    r1.current.rotation.x += dt * 0.35 * boost
    r2.current.rotation.y += dt * 0.28 * boost
    r3.current.rotation.z -= dt * 0.22 * boost
    beads.current.rotation.y += dt * 0.5 * intro.spin
    beads.current.rotation.z += dt * 0.2
  })
  return (
    <group ref={group}>
      <mesh><sphereGeometry args={[0.75, 64, 64]} /><meshStandardMaterial color="#9a9a9e" metalness={1} roughness={0.05} envMapIntensity={1.6} /></mesh>
      <mesh ref={r1}><torusGeometry args={[1.35, 0.13, 48, 128]} /><meshStandardMaterial {...chrome} /></mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, 0]}><torusGeometry args={[1.6, 0.1, 48, 128]} /><meshStandardMaterial {...chrome} /></mesh>
      <mesh ref={r3} rotation={[0, Math.PI / 3, Math.PI / 4]}><torusGeometry args={[1.95, 0.07, 48, 128]} /><meshStandardMaterial {...chrome} /></mesh>
      <group ref={beads}>
        {[[2.4, 0.4, 0, 0.12], [-2.2, -0.6, 0.8, 0.09], [0.6, 1.9, -1.2, 0.1], [-0.8, -2.1, -1, 0.07]].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]}><sphereGeometry args={[r, 32, 32]} /><meshStandardMaterial {...chrome} /></mesh>
        ))}
      </group>
    </group>
  )
}

export default function Model() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}><Sculpture /></Float>
      {/* Studio-style HDR reflections (drei preset) */}
      <Environment preset="studio" />
    </>
  )
}
