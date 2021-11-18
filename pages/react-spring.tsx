import { FC, useRef } from 'react'
import type { NextPage } from 'next'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'

const Box: FC<MeshProps> = props => {
  const box = useRef<THREE.Mesh>(null!)
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }))

  const handleClick = () => {
    api.start({
      scale: scale.get() === 1 ? 2 : 1
    })
  }

  useFrame(() => {
    box.current.rotation.y += 0.01
  })

  return (
    <animated.mesh ref={box} onClick={handleClick} scale={scale} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial flatShading color={0x0000FF} />
    </animated.mesh>
  )
}

const ReactSpring: NextPage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
      <ambientLight />
      <axesHelper position={[0, 0, 0]} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-2, 0, 0]} />
      <Box position={[2, 0, 0]} />
      <Stats />
    </Canvas>
  )
}

export default ReactSpring
