'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

function GridFloor({ y }: { y: number }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts: number[] = []
    const size = 12
    const divisions = 20

    for (let i = -divisions; i <= divisions; i++) {
      const p = (i / divisions) * size
      verts.push(-size, y, p, size, y, p)
      verts.push(p, y, -size, p, y, size)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
    return geo
  }, [y])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#9B1C1C" transparent opacity={0.15} />
    </lineSegments>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DataStream(_props: { offset: number }) {
  const ref = useRef<THREE.Points>(null)
  const { geo, mat } = useMemo(() => {
    const count = 40
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = -62 + Math.random() * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: '#C41E1E', size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.8 })
    return { geo, mat }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.04
      if (positions[i + 1] < -66) positions[i + 1] = -60
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

export default function CommandCenter({ visible = true }: { visible?: boolean }) {
  if (!visible) return null

  return (
    <group>
      <GridFloor y={-66} />
      <DataStream offset={0} />
      <DataStream offset={1} />

      {/* Central ring */}
      <mesh position={[0, -62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.04, 16, 128]} />
        <meshBasicMaterial color="#9B1C1C" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.025, 16, 128]} />
        <meshBasicMaterial color="#9B1C1C" transparent opacity={0.3} />
      </mesh>

      {/* Title */}
      <Billboard position={[0, -59, 0]}>
        <Text fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle" font="/fonts/SpaceGrotesk-Medium.woff">
          INITIATE CONTACT
        </Text>
        <Text fontSize={0.2} color="#9B1C1C" anchorX="center" anchorY="top" position={[0, -0.45, 0]} font="/fonts/SpaceGrotesk-Medium.woff">
          xevarolabs.com · raheelchaudary774@gmail.com
        </Text>
      </Billboard>

      {/* Floating node markers */}
      {[[-3, -61, 0], [3, -61, 0], [0, -61, 3], [0, -61, -3]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#E53E3E" emissive="#E53E3E" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
