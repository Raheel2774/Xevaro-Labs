'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const testimonials = [
  { name: 'Sarah K.',   role: 'CEO, RetailCo',     quote: 'Revenue 3x in 90 days.', color: '#9B1C1C', pos: [-4, -48, 0],  rot: [0.1, 0.4, 0.05]  },
  { name: 'Ahmed R.',   role: 'CTO, TechFlow',     quote: 'Best AI team we worked with.', color: '#C41E1E', pos: [4,  -49, -1], rot: [-0.05, -0.3, 0.08] },
  { name: 'Maria L.',   role: 'Founder, SaaSBase', quote: 'Automation saved us 80% time.', color: '#5C0F0F', pos: [0,  -51, 2],  rot: [0.08, 0.15, -0.06] },
  { name: 'James T.',   role: 'Dir, OmegaShop',    quote: 'Our chatbot converts 2x now.', color: '#9B1C1C', pos: [-4.5, -52, -2], rot: [0.05, 0.5, 0.03] },
  { name: 'Priya S.',   role: 'CPO, NexaAI',       quote: 'Xevaro is years ahead.', color: '#E53E3E', pos: [4.5, -50.5, 1], rot: [-0.1, -0.45, 0.07] },
  { name: 'Daniel W.',  role: 'MD, AutoVentures',  quote: 'ROI in 30 days flat.', color: '#C41E1E', pos: [0,  -47, -2], rot: [0.06, 0.25, -0.04] },
]

function GlassCube({ data }: { data: typeof testimonials[0] }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef  = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = data.pos[1] + Math.sin(t * 0.5 + data.pos[0]) * 0.2
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x += 0.002
    }
  })

  return (
    <group ref={groupRef} position={data.pos as [number, number, number]} rotation={data.rot as [number, number, number]}>
      {/* Glass box */}
      <RoundedBox ref={meshRef} args={[2.2, 1.4, 0.12]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial
          color={data.color}
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Border */}
      <RoundedBox args={[2.26, 1.46, 0.1]} radius={0.07} smoothness={4}>
        <meshBasicMaterial color={data.color} transparent opacity={0.5} wireframe />
      </RoundedBox>

      {/* Quote */}
      <Billboard>
        <Text
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.15, 0.1]}
          maxWidth={1.9}
          textAlign="center"
          font="/fonts/SpaceGrotesk-Medium.woff"
        >
          &quot;{data.quote}&quot;
        </Text>
        <Text
          fontSize={0.13}
          color={data.color}
          anchorX="center"
          anchorY="top"
          position={[0, -0.35, 0.1]}
          font="/fonts/SpaceGrotesk-Medium.woff"
        >
          — {data.name} · {data.role}
        </Text>
      </Billboard>
    </group>
  )
}

export default function GlassCubes({ visible = true }: { visible?: boolean }) {
  if (!visible) return null
  return (
    <group>
      <ambientLight intensity={0.3} />
      {testimonials.map((t, i) => <GlassCube key={i} data={t} />)}
    </group>
  )
}
