export type VoxelShapeType =
  | 'torus'
  | 'sphere'
  | 'lattice'
  | 'helix'
  | 'pyramid'
  | 'wave-grid'

export type VoxelPlacement = 'hero-text' | 'left' | 'right' | 'center'

export type VoxelPoint = {
  x: number
  y: number
  z: number
  accent?: boolean
}

export type VoxelShapeProps = {
  shape: VoxelShapeType
  voxelSize?: number
  density?: number
  color?: string
  accentColor?: string
  rotationSpeed?: number
  idleFloat?: boolean
  highlight?: number
  mobile?: boolean
}

export type SectionVoxelProps = {
  shape: VoxelShapeType
  placement?: VoxelPlacement
  eager?: boolean
  density?: number
  scale?: number
  opacity?: number
  scrollHighlight?: boolean
  className?: string
}

export type VoxelSceneProps = {
  shape: VoxelShapeType
  density: number
  scale: number
  highlight: number
  mouse: { x: number; y: number }
  scrollOffset: number
  active: boolean
  mobile: boolean
}
