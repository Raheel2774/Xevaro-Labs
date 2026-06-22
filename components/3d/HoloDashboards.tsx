'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { holoVertexShader, holoFragmentShader } from './shaders'

const cases = [
  { title: 'E-Commerce AI',   metric: '+340% Revenue',  pos: [-3.5, -32, 0],  rot: [0, 0.3, 0] },
  { title: 'SaaS Automation', metric: '80% Saved Time', pos: [3.5,  -33, -1], rot: [0, -0.3, 0] },
  { title: 'Chatbot Deploy',  metric: '50K Users/Day',  pos: [-3.0, -36, -2], rot: [0, 0.2, 0] },
  { title: 'BPA Pipeline',    metric: '$2M Recovered',  pos: [3.0,  -35, 1],  rot: [0, -0.25, 0] },
]

function HoloPanel({ data }: { data: typeof cases[0] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef  = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color('#9B1C1C') },
  }), [])

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
    if (meshRef.current) {
      meshRef.current.position.y = data.pos[1] + Math.sin(state.clock.elapsedTime * 0.4 + data.pos[0]) * 0.15
    }
  })

  return (
    <group position={data.pos as [number, number, number]} rotation={data.rot as [number, number, number]}>
      {/* Holographic panel */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2.8, 1.8]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border frame lines */}
      {[[-1.4, 0.9], [1.4, 0.9], [-1.4, -0.9], [1.4, -0.9]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.001]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#C41E1E" transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Title */}
      <Text
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        position={[0, 0.7, 0.01]}
        font="/fonts/SpaceGrotesk-Medium.woff"
      >
        {data.title}
      </Text>

      {/* Metric */}
      <Text
        fontSize={0.35}
        color="#E53E3E"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.05, 0.01]}
        font="/fonts/SpaceGrotesk-Medium.woff"
      >
        {data.metric}
      </Text>

      {/* Bottom label */}
      <Text
        fontSize={0.14}
        color="#9B1C1C"
        anchorX="center"
        anchorY="bottom"
        position={[0, -0.7, 0.01]}
        font="/fonts/SpaceGrotesk-Medium.woff"
      >
        XEVARO LABS · CASE STUDY
      </Text>
    </group>
  )
}

export default function HoloDashboards({ visible = true }: { visible?: boolean }) {
  if (!visible) return null
  return (
    <group>
      {cases.map((c, i) => <HoloPanel key={i} data={c} />)}
    </group>
  )
}
