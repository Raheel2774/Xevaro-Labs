'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralFlowProps {
  count?: number
  radius?: number
  activity?: number
  mouse?: React.RefObject<{ x: number; y: number }>
}

const dummy = new THREE.Object3D()

/**
 * Live AI neural network, instanced nodes drifting in a spherical volume,
 * connected by pulsing data-packet lines that continuously re-route.
 * Nodes react to cursor proximity.
 */
export default function NeuralFlow({ count = 120, radius = 9, activity = 0, mouse }: NeuralFlowProps) {
  const meshRef  = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const lineMat  = useRef<THREE.LineBasicMaterial>(null)

  // Procedural node base positions + drift params
  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => {
      const r     = radius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      return {
        base: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
        pos: new THREE.Vector3(),
        freq: 0.2 + Math.random() * 0.5,
        amp:  0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.8,
      }
    })
  }, [count, radius])

  // Precompute nearest-neighbor edges (kept small for perf)
  const edges = useMemo(() => {
    const e: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      const dists: { j: number; d: number }[] = []
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        dists.push({ j, d: nodes[i].base.distanceTo(nodes[j].base) })
      }
      dists.sort((a, b) => a.d - b.d)
      for (let k = 0; k < 2; k++) {
        if (dists[k] && dists[k].d < 4) e.push([i, dists[k].j])
      }
    }
    return e
  }, [nodes])

  const linePositions = useMemo(() => new Float32Array(edges.length * 6), [edges])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return geo
  }, [linePositions])

  const mouseWorld = useRef(new THREE.Vector3())

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!meshRef.current) return

    // Project mouse to a plane in front of the system
    if (mouse?.current) {
      mouseWorld.current.set(mouse.current.x * radius, mouse.current.y * radius, 0)
    }

    // Update nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      n.pos.set(
        n.base.x + Math.sin(t * n.freq + n.phase) * n.amp,
        n.base.y + Math.cos(t * n.freq * 0.8 + n.phase) * n.amp,
        n.base.z + Math.sin(t * n.freq * 1.1 + n.phase) * n.amp,
      )

      // Cursor proximity push + glow
      let prox = 0
      if (mouse?.current) {
        const d = n.pos.distanceTo(mouseWorld.current)
        if (d < 4) {
          prox = 1 - d / 4
          n.pos.lerp(mouseWorld.current, prox * 0.08)
        }
      }

      dummy.position.copy(n.pos)
      const s = (n.scale * (0.06 + activity * 0.03)) * (1 + prox * 1.5)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update connection lines
    if (linesRef.current) {
      const arr = lineGeo.attributes.position.array as Float32Array
      for (let k = 0; k < edges.length; k++) {
        const [a, b] = edges[k]
        const pa = nodes[a].pos, pb = nodes[b].pos
        arr.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], k * 6)
      }
      lineGeo.attributes.position.needsUpdate = true
      if (lineMat.current) lineMat.current.opacity = 0.08 + activity * 0.12 + Math.sin(t * 2) * 0.03
    }
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.2}
          roughness={0.2}
          metalness={0.6}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial ref={lineMat} color="#3b82f6" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
