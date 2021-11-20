import { FC, useRef, useEffect } from 'react'
import type { NextPage } from 'next'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

type RubikProps = {
  size: number
  length?: number
}

const colors = {
  front: 0xFFFFFF,
  back: 0xFFCC00,
  up: 0xCC0000,
  bottom: 0xEE6600,
  right: 0x009922,
  left: 0x2255DD,
  netral: 0x000000
}

const Rubik: FC<RubikProps> = ({ size = 3, length = 1 }) => {
  const rubik = useRef<THREE.Mesh>(null!)
  const gap = length / 5
  const offset = (-size / 2) + 0.5 - gap

  useEffect(() => {
    const front = rubik.current.children.filter(cube => /[0-9]-[0-9]-2/.test(cube.name))
    console.log(front)
  }, [rubik])

  useFrame(() => {
    rubik.current.rotation.z += 0.01
  })

  return <group ref={rubik}>
    {[...Array(size)].map((_, x) =>
      [...Array(size)].map((_, y) =>
        [...Array(size)].map((_, z) => (
          <mesh
            key={`${x}-${y}-${z}`}
            name={`${x}-${y}-${z}`}
            position={[(x + (x * gap) + offset) * length, (y + (y * gap) + offset) * length, (z + (z * gap) + offset) * length]}
          >
            <boxGeometry args={[length, length, length]} />
            <meshStandardMaterial attachArray="material" color={x === size - 1 ? colors.right : colors.netral} />
            <meshStandardMaterial attachArray="material" color={x === 0 ? colors.left : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === size - 1 ? colors.up : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === 0 ? colors.bottom : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === size - 1 ? colors.front : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === 0 ? colors.back : colors.netral} />
          </mesh>
        ))
      )
    )}
  </group>
}

const RubikPage: NextPage = () => {

  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
      <ambientLight />
      <axesHelper scale={6} position={[0, 0, 0]} />
      <Rubik size={3} length={0.5} />
      <Stats />
    </Canvas>
  )
}

export default RubikPage