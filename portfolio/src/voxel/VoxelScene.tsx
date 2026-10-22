import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import type { VoxelSceneProps } from './types'
import VoxelShape from './VoxelShape'

function Scene({
  shape,
  density,
  scale,
  highlight,
  mouse,
  scrollOffset,
  active,
  mobile,
  reduceMotion,
}: VoxelSceneProps & { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current || !active || reduceMotion) return
    groupRef.current.rotation.x = mouse.y * 0.06 + scrollOffset * 0.06
    groupRef.current.rotation.z = mouse.x * 0.04
    groupRef.current.position.y = scrollOffset * 0.25
  })

  return (
    <group ref={groupRef} scale={scale}>
      <VoxelShape
        shape={shape}
        density={density}
        highlight={highlight}
        mobile={mobile}
        rotationSpeed={reduceMotion ? 0 : undefined}
        idleFloat={!reduceMotion}
      />
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} color="#dcdcdc" />
      <directionalLight position={[5, 7, 6]} intensity={0.52} color="#f0f0f0" />
      <directionalLight position={[-6, 1, -5]} intensity={0.16} color="#8b94c6" />
    </>
  )
}

type VoxelSceneRootProps = VoxelSceneProps & { reduceMotion: boolean }

export default function VoxelScene(props: VoxelSceneRootProps) {
  return (
    <Canvas
      className="block h-full w-full"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9.2], fov: 40, near: 0.1, far: 40 }}
      frameloop={props.active ? 'always' : 'demand'}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Lighting />
        <Scene {...props} />
      </Suspense>
    </Canvas>
  )
}
