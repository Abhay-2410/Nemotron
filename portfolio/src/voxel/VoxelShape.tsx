import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  DEFAULT_ROTATION_SPEED,
  DEFAULT_VOXEL_SIZE,
  VOXEL_ACCENT,
  VOXEL_LIGHT,
  VOXEL_MID,
} from './constants'
import { generateShapePoints } from './shapes'
import type { VoxelShapeProps } from './types'

export default function VoxelShape({
  shape,
  voxelSize = DEFAULT_VOXEL_SIZE,
  density = 1,
  color = VOXEL_LIGHT,
  accentColor = VOXEL_ACCENT,
  rotationSpeed = DEFAULT_ROTATION_SPEED,
  idleFloat = true,
  highlight = 0,
  mobile = false,
}: VoxelShapeProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const points = useMemo(
    () => generateShapePoints(shape, density, mobile),
    [shape, density, mobile],
  )

  const lightColor = useMemo(() => new THREE.Color(color), [color])
  const midColor = useMemo(() => new THREE.Color(VOXEL_MID), [])
  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh || points.length === 0) return

    points.forEach((point, index) => {
      dummy.position.set(point.x, point.y, point.z)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
      mesh.setColorAt(index, point.accent ? accent : index % 3 === 0 ? midColor : lightColor)
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [points, dummy, lightColor, midColor, accent])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh || highlight <= 0) return

    points.forEach((point, index) => {
      const pulse = Math.sin(index * 0.7 + highlight * Math.PI * 2) * 0.5 + 0.5
      const useAccent = point.accent || pulse > 0.82
      mesh.setColorAt(index, useAccent ? accent : index % 3 === 0 ? midColor : lightColor)
    })

    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [highlight, points, lightColor, midColor, accent])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const time = state.clock.elapsedTime
    mesh.rotation.y = time * rotationSpeed
    mesh.rotation.x = Math.sin(time * 0.18) * 0.05
    mesh.position.y = idleFloat ? Math.sin(time * 0.42) * 0.1 : 0
  })

  if (points.length === 0) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]} frustumCulled>
      <boxGeometry args={[voxelSize, voxelSize, voxelSize]} />
      <meshStandardMaterial roughness={0.9} metalness={0.03} vertexColors toneMapped />
    </instancedMesh>
  )
}
