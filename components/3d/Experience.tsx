'use client'

import { useRef, useEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

import IntelligentCore   from './ai/IntelligentCore'
import NeuralFlow        from './ai/NeuralFlow'
import AutomationStreams from './ai/AutomationStreams'
import FloatingModules   from './ai/FloatingModules'

type Quality = 'high' | 'low'

// ─── Atmospheric dust ──────────────────────────────────────────────────────────

function Dust({ count, color = '#3b82f6' }: { count: number; color?: string }) {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 22
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = r * Math.cos(ph)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={0.04} sizeAttenuation transparent opacity={0.4} depthWrite={false} />
    </points>
  )
}

// ─── Camera rig: mouse parallax + scroll dolly ──────────────────────────────────

function CameraRig({ mouse, scroll }: { mouse: React.RefObject<{ x: number; y: number }>; scroll: React.RefObject<number> }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 12))

  useFrame(() => {
    const m = mouse.current ?? { x: 0, y: 0 }
    const s = scroll.current ?? 0
    // Parallax: gentle sway toward cursor; dolly outward + downward as you scroll
    target.current.set(
      m.x * 2.2,
      m.y * 1.6 - s * 2.5,
      12 + s * 4,
    )
    camera.position.lerp(target.current, 0.045)
    camera.lookAt(0, -s * 1.5, 0)
  })

  return null
}

// ─── Lighting ────────────────────────────────────────────────────────────────

function Lights({ activity }: { activity: React.RefObject<number> }) {
  const cyan = useRef<THREE.PointLight>(null)
  useFrame(() => {
    if (cyan.current) cyan.current.intensity = 10 + (activity.current ?? 0) * 14
  })
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={cyan} position={[0, 0, 2]} color="#22d3ee" intensity={10} distance={20} decay={2} />
      <pointLight position={[6, 4, 4]}   color="#7c3aed" intensity={6}  distance={18} decay={2} />
      <pointLight position={[-6, -3, 3]} color="#3b82f6" intensity={6}  distance={18} decay={2} />
    </>
  )
}

// ─── Scene graph ─────────────────────────────────────────────────────────────

function Scene({
  mouse, scroll, quality,
}: {
  mouse: React.RefObject<{ x: number; y: number }>
  scroll: React.RefObject<number>
  quality: Quality
}) {
  const activity = useRef(0)
  // Re-render gate for module reveal (cheap throttle)
  const [activityStep, setActivityStep] = useState(0)

  useFrame(() => {
    const target = scroll.current ?? 0
    activity.current += (target - activity.current) * 0.05
    const step = Math.round(activity.current * 10) / 10
    setActivityStep(prev => (prev !== step ? step : prev))
  })

  return (
    <>
      <Lights activity={activity} />
      <CameraRig mouse={mouse} scroll={scroll} />

      <Dust count={quality === 'high' ? 600 : 200} />

      <IntelligentCore activity={activityStep} quality={quality} />
      <NeuralFlow
        count={quality === 'high' ? 120 : 45}
        radius={9}
        activity={activityStep}
        mouse={mouse}
      />
      <AutomationStreams count={quality === 'high' ? 7 : 3} activity={activityStep} />
      <FloatingModules activity={activityStep} />
    </>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────

interface ExperienceProps {
  scrollProgress: number
}

export default function Experience({ scrollProgress }: ExperienceProps) {
  const mouse  = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  const [quality, setQuality] = useState<Quality>('high')
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  // Sync scroll prop into a ref (avoids re-mounting the canvas)
  useEffect(() => { scroll.current = scrollProgress }, [scrollProgress])

  // Mouse tracking (normalized -1..1)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Quality detection (mobile / low-power fallback)
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small  = window.innerWidth < 768
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4
    setQuality(coarse || small || lowCores ? 'low' : 'high')
  }, [])

  // Pause rendering when tab is hidden (perf + battery)
  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <Canvas
      className="fixed inset-0"
      style={{ zIndex: 0 }}
      frameloop={frameloop}
      camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 200 }}
      dpr={quality === 'high' ? [1, 1.75] : [1, 1]}
      gl={{
        antialias: quality === 'high',
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
    >
      <color attach="background" args={['#02030a']} />
      <fog attach="fog" args={['#04061a', 14, 38]} />

      <Suspense fallback={null}>
        <Scene mouse={mouse} scroll={scroll} quality={quality} />

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={quality === 'high' ? 1.6 : 1.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
            blendFunction={BlendFunction.ADD}
          />
          {quality === 'high' ? (
            <DepthOfField focusDistance={0.012} focalLength={0.04} bokehScale={3} height={480} />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
