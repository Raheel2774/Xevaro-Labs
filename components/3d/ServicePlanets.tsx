'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

const services = [
  { label: 'AI Automation', color: '#9B1C1C', pos: [-5, -17, 2],   r: 0.7, speed: 0.5 },
  { label: 'Web Dev',       color: '#C41E1E', pos: [5,  -17, -1],  r: 0.55, speed: 0.65 },
  { label: 'Shopify',       color: '#95BF47', pos: [-3, -20, -3],  r: 0.5, speed: 0.45 },
  { label: 'AI Chatbots',   color: '#10A37F', pos: [4,  -21, 3],   r: 0.6, speed: 0.55 },
  { label: 'SaaS Build',    color: '#FF7A59', pos: [0,  -18, 4],   r: 0.5, speed: 0.7 },
  { label: 'BPA',           color: '#E53E3E', pos: [-6, -21, 1],   r: 0.45, speed: 0.6 },
]

function Planet({ service }: { service: typeof services[0] }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const matRef   = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = service.pos[1] + Math.sin(t * service.speed + service.pos[0]) * 0.3
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008
      meshRef.current.rotation.x += 0.004
    }
    const pulse = Math.sin(t * 2 + service.pos[0]) * 0.08 + 1
    if (matRef.current) matRef.current.emissiveIntensity = pulse * 0.5
  })

  return (
    <group ref={groupRef} position={service.pos as [number, number, number]}>
      {/* Planet sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[service.r, 3]} />
        <meshStandardMaterial
          ref={matRef}
          color={service.color}
          emissive={service.color}
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.6}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[service.r * 1.02, 3]} />
        <meshBasicMaterial color={service.color} transparent opacity={0.1} wireframe />
      </mesh>

      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[service.r * 1.35, 16, 16]} />
        <meshBasicMaterial color={service.color} transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Label */}
      <Billboard>
        <Text
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          position={[0, service.r + 0.2, 0]}
          font="/fonts/SpaceGrotesk-Medium.woff"
        >
          {service.label}
        </Text>
      </Billboard>
    </group>
  )
}

export default function ServicePlanets({ visible = true }: { visible?: boolean }) {
  if (!visible) return null
  return (
    <group>
      {services.map((s, i) => <Planet key={i} service={s} />)}
    </group>
  )
}
