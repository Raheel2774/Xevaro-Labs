'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralNetworkProps {
  nodeCount?: number
  visible?: boolean
  opacity?: number
}

export default function NeuralNetwork({ nodeCount = 80, visible = true, opacity = 1 }: NeuralNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef  = useRef<THREE.LineSegments>(null)

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10 - 8,
        (Math.random() - 0.5) * 10,
      ))
    }

    const lineVerts: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].distanceTo(nodes[j])
        if (d < 3.5) {
          lineVerts.push(...nodes[i].toArray(), ...nodes[j].toArray())
        }
      }
    }

    const nodePositions = new Float32Array(nodes.flatMap(n => n.toArray()))
    const linePositions = new Float32Array(lineVerts)
    return { nodePositions, linePositions }
  }, [nodeCount])

  const nodeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    return geo
  }, [nodePositions])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return geo
  }, [linePositions])

  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: '#E53E3E',
    size: 0.08,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9 * opacity,
    depthWrite: false,
  }), [opacity])

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#9B1C1C',
    transparent: true,
    opacity: 0.25 * opacity,
    depthWrite: false,
  }), [opacity])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.04
    linesRef.current.rotation.y  = t * 0.04
    pointsRef.current.position.y = Math.sin(t * 0.3) * 0.3
    linesRef.current.position.y  = Math.sin(t * 0.3) * 0.3
  })

  if (!visible) return null

  return (
    <group>
      <points ref={pointsRef} geometry={nodeGeo} material={nodeMat} />
      <lineSegments ref={linesRef} geometry={lineGeo} material={lineMat} />
    </group>
  )
}
