'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import { coreVertexShader, coreFragmentShader, glowVertexShader, glowFragmentShader } from './shaders'

interface AICoreProps {
  scale?: number
  visible?: boolean
}

export default function AICore({ scale = 1, visible = true }: AICoreProps) {
  const coreRef    = useRef<THREE.Mesh>(null)
  const glowRef    = useRef<THREE.Mesh>(null)
  const outerRef   = useRef<THREE.Mesh>(null)
  const groupRef   = useRef<THREE.Group>(null)
  const coreMat    = useRef<THREE.ShaderMaterial>(null)
  const glowMat    = useRef<THREE.ShaderMaterial>(null)

  const coreUniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uStrength: { value: 0.28 },
    uColorA:   { value: new THREE.Color('#5C0F0F') },
    uColorB:   { value: new THREE.Color('#9B1C1C') },
    uColorC:   { value: new THREE.Color('#E53E3E') },
  }), [])

  const glowUniforms = useMemo(() => ({
    uColor:     { value: new THREE.Color('#C41E1E') },
    uIntensity: { value: 1.2 },
  }), [])

  useFrame((state, delta) => {
    if (coreMat.current)  coreMat.current.uniforms.uTime.value += delta
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
    if (coreRef.current)  coreRef.current.rotation.x += delta * 0.06
    if (outerRef.current) outerRef.current.rotation.y -= delta * 0.08

    const pulse = Math.sin(state.clock.elapsedTime * 1.6) * 0.04 + 1
    if (coreRef.current) coreRef.current.scale.setScalar(pulse)
  })

  if (!visible) return null

  return (
    <group ref={groupRef} scale={scale}>
      {/* Deep core — inner dark sphere */}
      <mesh>
        <icosahedronGeometry args={[1.1, 4]} />
        <meshStandardMaterial color="#200000" roughness={0.6} metalness={0.8} />
      </mesh>

      {/* Noise-displaced shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 64]} />
        <shaderMaterial
          ref={coreMat}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={coreUniforms}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Inner fresnel glow — back face */}
      <mesh ref={glowRef} scale={1.05}>
        <icosahedronGeometry args={[1.5, 16]} />
        <shaderMaterial
          ref={glowMat}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere */}
      <mesh ref={outerRef} scale={1.55}>
        <icosahedronGeometry args={[1.5, 8]} />
        <meshBasicMaterial
          color="#9B1C1C"
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>

      {/* Far glow plane (billboard) */}
      <mesh scale={3.5}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color="#C41E1E"
          transparent
          opacity={0.06}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
