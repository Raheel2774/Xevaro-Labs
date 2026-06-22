'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { streamVertex, streamFragment } from './coreShaders'

interface StreamProps {
  count?: number
  activity?: number
}

const PALETTE = ['#22d3ee', '#3b82f6', '#7c3aed', '#06b6d4']

/**
 * Automation streams — curved "data rivers" that arc through the system,
 * carrying glowing packets (API calls / workflows). They orbit slowly,
 * splitting and merging visually around the core.
 */
function Stream({ seed, activity }: { seed: number; activity: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { geometry, color, speed } = useMemo(() => {
    // Build a smooth Catmull-Rom curve that loops near the core
    const rng = mulberry32(seed * 9973)
    const pts: THREE.Vector3[] = []
    const segs = 6
    const baseR = 3 + rng() * 5
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2
      const wobble = (rng() - 0.5) * 4
      pts.push(new THREE.Vector3(
        Math.cos(a) * (baseR + wobble),
        (rng() - 0.5) * 8,
        Math.sin(a) * (baseR + wobble),
      ))
    }
    const curve = new THREE.CatmullRomCurve3(pts, true)
    const geometry = new THREE.TubeGeometry(curve, 120, 0.04 + rng() * 0.04, 8, true)
    const color = PALETTE[Math.floor(rng() * PALETTE.length)]
    const speed = 0.3 + rng() * 0.6
    return { geometry, color, speed }
  }, [seed])

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uSpeed:   { value: speed },
    uColor:   { value: new THREE.Color(color) },
    uOpacity: { value: 0.6 },
  }), [color, speed])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta
      matRef.current.uniforms.uOpacity.value = 0.35 + activity * 0.5
    }
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03
  })

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={streamVertex}
          fragmentShader={streamFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default function AutomationStreams({ count = 7, activity = 0 }: StreamProps) {
  const streams = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count])
  return (
    <group>
      {streams.map(s => <Stream key={s} seed={s} activity={activity} />)}
    </group>
  )
}

// Deterministic PRNG so geometry is stable across renders
function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
