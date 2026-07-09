'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { coreVertex, coreFragment, glowVertex, glowFragment } from './coreShaders'

/**
 * The Xevaro AI Core, a pulsing neural nucleus at the center of the system.
 * Activity rises with scroll, making it brighter, larger, and more energetic.
 */
export default function IntelligentCore({ activity = 0, quality = 'high' }: { activity?: number; quality?: 'high' | 'low' }) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef  = useRef<THREE.Mesh>(null)
  const coreMat  = useRef<THREE.ShaderMaterial>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const detail   = quality === 'high' ? 48 : 16

  const coreUniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uActivity: { value: 0 },
    uCyan:     { value: new THREE.Color('#22d3ee') },
    uBlue:     { value: new THREE.Color('#1e3a8a') },
    uViolet:   { value: new THREE.Color('#7c3aed') },
  }), [])

  const glowUniforms = useMemo(() => ({
    uColor:     { value: new THREE.Color('#22d3ee') },
    uIntensity: { value: 1.0 },
  }), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (coreMat.current) {
      coreMat.current.uniforms.uTime.value += delta
      coreMat.current.uniforms.uActivity.value += (activity - coreMat.current.uniforms.uActivity.value) * 0.05
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      const scale = 1 + activity * 0.35 + Math.sin(t * 1.6) * 0.03
      groupRef.current.scale.setScalar(scale)
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.15
      ringsRef.current.rotation.x = Math.sin(t * 0.3) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Inner dark nucleus */}
      <mesh>
        <icosahedronGeometry args={[0.85, 3]} />
        <meshStandardMaterial color="#040814" roughness={0.5} metalness={0.9} />
      </mesh>

      {/* Displaced energy shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, detail]} />
        <shaderMaterial
          ref={coreMat}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Fresnel glow */}
      <mesh scale={1.25}>
        <icosahedronGeometry args={[1.15, 16]} />
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbital energy rings */}
      <group ref={ringsRef}>
        {[1.7, 2.1, 2.5].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, 0]}>
            <torusGeometry args={[r, 0.012, 8, 100]} />
            <meshBasicMaterial color={i % 2 ? '#7c3aed' : '#22d3ee'} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
