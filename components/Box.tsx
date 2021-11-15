import { FC, useRef, useState } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'

const Box: FC<MeshProps> = props => {
  const mesh = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  useFrame(() => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => { event.stopPropagation(); setActive(prev => !prev) }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(prev => !prev) }}
      onPointerOut={(event) => { event.stopPropagation(); setHovered(prev => !prev) }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box