import { FC, PropsWithChildren } from 'react'
import type { NextPage } from 'next'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { useRef } from 'react'

const Orbit: FC<PropsWithChildren<{ position?: [number, number, number] }>> = ({ children, position }) => {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh} position={position}>
      {children}
    </mesh>
  )
}

type PlanetProps = PropsWithChildren<{
  time: number
  color: string
  args: [number, number, number]
  scale?: [number, number, number]
  position: [number, number, number]
}>

const BasicPlanet: FC<PlanetProps> = ({ time = 0.01, color = 0x038cfc, args, scale, position, children }) => {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    mesh.current.rotation.y += time
  })

  return (
    <mesh ref={mesh} scale={scale} position={position} >
      <sphereGeometry args={args} />
      <meshStandardMaterial flatShading color={color} />
      {children}
    </mesh>
  )
}

const Earth: FC<PropsWithChildren<{ materialProps?: any }>> = ({ children }) => {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    mesh.current.rotation.y += 0.03
  })

  return (
    <mesh ref={mesh} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
      <sphereBufferGeometry args={[1, 6, 3]} />
      <meshNormalMaterial flatShading />
      {children}
    </mesh>
  )
}

const Sun = () => <BasicPlanet time={0.01} color="yellow" args={[1, 6, 3]} position={[0, 0, 0]}>
  <Orbit position={[3, 0, 0]}>
    <Earth materialProps={{ wireframe: true }} />
    <Earth>
      <Orbit position={[2, 0, 0]}>
        <BasicPlanet time={0.01} color="white" args={[1, 6, 3]} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
      </Orbit>
    </Earth>
  </Orbit>
</BasicPlanet>

const SceneGraph: NextPage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Orbit>
        <Sun />
        <gridHelper />
      </Orbit>
      <Stats />
    </Canvas>
  )
}

export default SceneGraph
