'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

const tools = [
  { name: 'OpenAI',      color: '#10A37F', r: 3.6, speed: 0.38, offset: 0,    y: 0.5,   size: 0.18 },
  { name: 'n8n',         color: '#EA4B71', r: 4.2, speed: 0.28, offset: 0.9,  y: -0.3,  size: 0.18 },
  { name: 'Shopify',     color: '#95BF47', r: 3.2, speed: 0.45, offset: 1.8,  y: 0.8,   size: 0.16 },
  { name: 'HubSpot',     color: '#FF7A59', r: 4.8, speed: 0.22, offset: 2.7,  y: -0.6,  size: 0.17 },
  { name: 'Claude',      color: '#CC9B7A', r: 3.8, speed: 0.34, offset: 3.5,  y: 0.2,   size: 0.18 },
  { name: 'WhatsApp',    color: '#25D366', r: 3.0, speed: 0.52, offset: 4.2,  y: -0.9,  size: 0.16 },
  { name: 'AWS',         color: '#FF9900', r: 5.2, speed: 0.18, offset: 5.0,  y: 0.4,   size: 0.17 },
  { name: 'Vercel',      color: '#FFFFFF', r: 4.0, speed: 0.30, offset: 5.8,  y: -0.4,  size: 0.17 },
]

function ToolNode({ tool, groupAngle }: { tool: typeof tools[0]; groupAngle: number }) {
  const nodeRef  = useRef<THREE.Group>(null)
  const dotRef   = useRef<THREE.Mesh>(null)
  const glowRef  = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const angle = t * tool.speed + tool.offset + groupAngle
    const x = Math.cos(angle) * tool.r
    const z = Math.sin(angle) * tool.r

    if (nodeRef.current) {
      nodeRef.current.position.set(x, tool.y + Math.sin(t * 0.7 + tool.offset) * 0.15, z)
    }
    if (dotRef.current) {
      dotRef.current.rotation.y += 0.02
    }
    const pulse = Math.sin(t * 2 + tool.offset) * 0.15 + 1
    if (glowRef.current) glowRef.current.scale.setScalar(pulse)
  })

  return (
    <group ref={nodeRef}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={tool.color} transparent opacity={0.25} depthWrite={false} />
      </mesh>

      {/* Core dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={tool.color}
          emissive={tool.color}
          emissiveIntensity={2.5}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Label */}
      <Billboard>
        <Text
          fontSize={tool.size}
          color={tool.color}
          anchorX="center"
          anchorY="bottom"
          position={[0, 0.22, 0]}
          font="/fonts/SpaceGrotesk-Medium.woff"
        >
          {tool.name}
        </Text>
      </Billboard>
    </group>
  )
}

function OrbitRing({ radius, opacity = 0.08 }: { radius: number; opacity?: number }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  return (
    // @ts-expect-error, R3F 'line' overrides SVG line element
    <line geometry={geometry}>
      <lineBasicMaterial color="#9B1C1C" transparent opacity={opacity} />
    </line>
  )
}

export default function OrbitingTools({ visible = true }: { visible?: boolean }) {
  if (!visible) return null

  return (
    <group>
      {/* Orbit guide rings */}
      {[3.0, 3.6, 4.0, 4.2, 4.8, 5.2].map((r, i) => (
        <OrbitRing key={i} radius={r} opacity={0.05} />
      ))}

      {/* Tool nodes */}
      {tools.map((tool, i) => (
        <ToolNode key={i} tool={tool} groupAngle={0} />
      ))}
    </group>
  )
}
