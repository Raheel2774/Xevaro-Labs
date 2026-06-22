'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
  spread?: number
  color?: string
}

export default function Particles({ count = 2500, spread = 30, color = '#9B1C1C' }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Spherical distribution
      const r     = Math.random() * spread
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) - spread * 0.3
      positions[i3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 0.015 + 0.003
    }
    return { positions, sizes }
  }, [count, spread])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  const material = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.012,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  }), [color])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y  = state.clock.elapsedTime * 0.015
    meshRef.current.rotation.x  = state.clock.elapsedTime * 0.008
  })

  return <points ref={meshRef} geometry={geometry} material={material} />
}
