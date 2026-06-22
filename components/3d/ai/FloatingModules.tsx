'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating AI modules — each represents a real Xevaro capability and orbits
 * the core with organic motion, emitting a glow tied to its "activity".
 *
 *  agent    → energy-core sphere (AI agent)
 *  workflow → rounded node block (n8n-style)
 *  api      → wireframe cube (API endpoint)
 *  data     → cylinder container (CRM / data store)
 *  trigger  → octahedron (automation trigger)
 */

type ModuleType = 'agent' | 'workflow' | 'api' | 'data' | 'trigger'

interface ModuleDef {
  type: ModuleType
  orbit: number
  speed: number
  offset: number
  y: number
  size: number
  color: string
}

const COLORS = { cyan: '#22d3ee', blue: '#3b82f6', violet: '#7c3aed', teal: '#06b6d4' }

function buildModules(activityVisible: number): ModuleDef[] {
  const base: ModuleDef[] = [
    { type: 'agent',    orbit: 3.4, speed: 0.32, offset: 0.0, y: 0.6,  size: 0.42, color: COLORS.cyan },
    { type: 'workflow', orbit: 4.2, speed: 0.24, offset: 1.1, y: -0.5, size: 0.5,  color: COLORS.violet },
    { type: 'api',      orbit: 3.0, speed: 0.4,  offset: 2.2, y: 1.0,  size: 0.4,  color: COLORS.teal },
    { type: 'data',     orbit: 5.0, speed: 0.18, offset: 3.0, y: -0.8, size: 0.45, color: COLORS.blue },
    { type: 'trigger',  orbit: 3.8, speed: 0.36, offset: 4.0, y: 0.3,  size: 0.38, color: COLORS.cyan },
    { type: 'agent',    orbit: 4.6, speed: 0.28, offset: 5.0, y: -0.3, size: 0.4,  color: COLORS.violet },
    { type: 'workflow', orbit: 5.4, speed: 0.2,  offset: 0.6, y: 0.9,  size: 0.46, color: COLORS.blue },
    { type: 'api',      orbit: 4.0, speed: 0.34, offset: 3.6, y: -1.0, size: 0.36, color: COLORS.teal },
  ]
  // Reveal extra modules as the system grows with scroll
  const visibleCount = Math.round(4 + activityVisible * (base.length - 4))
  return base.slice(0, Math.max(4, visibleCount))
}

function ModuleMesh({ def }: { def: ModuleDef }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef  = useRef<THREE.Mesh>(null)
  const matRef   = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const a = t * def.speed + def.offset
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(a) * def.orbit,
        def.y + Math.sin(t * 0.6 + def.offset) * 0.4,
        Math.sin(a) * def.orbit,
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004
      meshRef.current.rotation.y += 0.006
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 1.4 + Math.sin(t * 2 + def.offset) * 0.6
    }
  })

  const geom = useMemo(() => {
    switch (def.type) {
      case 'agent':    return <icosahedronGeometry args={[def.size, 2]} />
      case 'workflow': return <boxGeometry args={[def.size * 1.4, def.size, def.size * 0.4]} />
      case 'api':      return <boxGeometry args={[def.size, def.size, def.size]} />
      case 'data':     return <cylinderGeometry args={[def.size * 0.7, def.size * 0.7, def.size * 1.3, 16]} />
      case 'trigger':  return <octahedronGeometry args={[def.size, 0]} />
    }
  }, [def])

  return (
    <group ref={groupRef}>
      {/* Solid module */}
      <mesh ref={meshRef}>
        {geom}
        <meshStandardMaterial
          ref={matRef}
          color={def.color}
          emissive={def.color}
          emissiveIntensity={1.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Wireframe shell for "api" + "workflow" tech feel */}
      {(def.type === 'api' || def.type === 'workflow') && (
        <mesh scale={1.15}>
          {geom}
          <meshBasicMaterial color={def.color} wireframe transparent opacity={0.2} />
        </mesh>
      )}

      {/* Glow halo */}
      <mesh scale={1.6}>
        <sphereGeometry args={[def.size, 12, 12]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.07} depthWrite={false} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export default function FloatingModules({ activity = 0 }: { activity?: number }) {
  const modules = useMemo(() => buildModules(activity), [activity])
  return (
    <group>
      {modules.map((m, i) => <ModuleMesh key={`${m.type}-${i}`} def={m} />)}
    </group>
  )
}
