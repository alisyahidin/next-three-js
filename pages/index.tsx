import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import Box from '../components/Box'

const Home: NextPage = () => {
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

export default Home
