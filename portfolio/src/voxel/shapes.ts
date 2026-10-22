import { DESKTOP_MAX_VOXELS, MOBILE_MAX_VOXELS } from './constants'
import type { VoxelPoint, VoxelShapeType } from './types'

function capPoints(points: VoxelPoint[], max: number): VoxelPoint[] {
  if (points.length <= max) return points
  const stride = points.length / max
  return Array.from({ length: max }, (_, index) => points[Math.floor(index * stride)])
}

function add(points: VoxelPoint[], x: number, y: number, z: number, accent = false) {
  points.push({ x, y, z, accent })
}

export function generateShapePoints(
  shape: VoxelShapeType,
  density: number,
  mobile: boolean,
): VoxelPoint[] {
  const max = mobile ? MOBILE_MAX_VOXELS : DESKTOP_MAX_VOXELS
  const d = Math.max(0.45, Math.min(1.2, density))

  switch (shape) {
    case 'torus':
      return capPoints(generateTorus(d), max)
    case 'sphere':
      return capPoints(generateSphere(d), max)
    case 'lattice':
      return capPoints(generateLattice(d), max)
    case 'helix':
      return capPoints(generateHelix(d), max)
    case 'pyramid':
      return capPoints(generatePyramid(d), max)
    case 'wave-grid':
      return capPoints(generateWaveGrid(d), max)
    default:
      return []
  }
}

function generateTorus(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const major = 3.2
  const minor = 1.05
  const step = 0.36 / density

  for (let u = 0; u < Math.PI * 2; u += step) {
    for (let v = 0; v < Math.PI * 2; v += step * 1.08) {
      const x = (major + minor * Math.cos(v)) * Math.cos(u)
      const y = minor * Math.sin(v)
      const z = (major + minor * Math.cos(v)) * Math.sin(u)
      add(points, x, y, z, Math.abs(Math.sin(u * 2.4)) > 0.94)
    }
  }

  return points
}

function generateSphere(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const radius = 2.7
  const step = 0.4 / density

  for (let x = -radius; x <= radius; x += step) {
    for (let y = -radius; y <= radius; y += step) {
      for (let z = -radius; z <= radius; z += step) {
        const dist = Math.sqrt(x * x + y * y + z * z)
        const shell = Math.abs(dist - radius * 0.7) < step * 1.3
        const blob = dist <= radius * 0.75 && dist >= radius * 0.38
        if (shell || blob) {
          const warp =
            Math.sin(x * 0.85) * 0.1 + Math.cos(y * 1.05) * 0.08 + Math.sin(z * 0.75) * 0.07
          add(points, x * (1 + warp * 0.12), y * (1 + warp * 0.1), z * (1 + warp * 0.08))
        }
      }
    }
  }

  return points
}

function generateLattice(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const size = 3
  const step = 0.44 / density

  for (let x = -size; x <= size; x += step) {
    for (let y = -size; y <= size; y += step) {
      for (let z = -size; z <= size; z += step) {
        const onEdge =
          Math.abs(x - size) < step ||
          Math.abs(x + size) < step ||
          Math.abs(y - size) < step ||
          Math.abs(y + size) < step ||
          Math.abs(z - size) < step ||
          Math.abs(z + size) < step
        const onStrut = Math.abs(x) < step || Math.abs(y) < step || Math.abs(z) < step
        if (onEdge || onStrut) {
          const accentSeed = Math.abs(Math.round(x * 13 + y * 7 + z * 11)) % 19
          add(points, x, y, z, onStrut && !onEdge && accentSeed > 15)
        }
      }
    }
  }

  return points
}

function generateHelix(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const turns = 2.2
  const height = 5.2
  const radius = 1.25
  const step = 0.24 / density

  for (let t = 0; t <= turns * Math.PI * 2; t += step) {
    const y = (t / (turns * Math.PI * 2) - 0.5) * height
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    add(points, x, y, z)

    if (Math.floor(t / step) % 5 === 0) {
      add(points, x * 0.55, y + 0.32, z * 0.55, true)
      add(points, x * 1.12, y - 0.18, z * 1.12)
    }
  }

  return points
}

function generatePyramid(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const layers = Math.floor(7 * density)
  const block = 0.4 / density

  for (let layer = 0; layer < layers; layer++) {
    const span = layers - layer
    for (let x = -span; x <= span; x += 1) {
      for (let z = -span; z <= span; z += 1) {
        add(
          points,
          x * block,
          layer * block * 0.9 - layers * block * 0.35,
          z * block,
          layer === layers - 1,
        )
      }
    }
  }

  return points
}

function generateWaveGrid(density: number): VoxelPoint[] {
  const points: VoxelPoint[] = []
  const span = 3.2
  const step = 0.5 / density

  for (let x = -span; x <= span; x += step) {
    for (let z = -span; z <= span; z += step) {
      const y = Math.sin(x * 0.8) * 0.3 + Math.cos(z * 0.7) * 0.24
      add(points, x, y, z, Math.abs(x) < step && Math.abs(z) < step)
    }
  }

  return points
}
