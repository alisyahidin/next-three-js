import { Suspense } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

const Box = dynamic(() => import('../components/BoxCannon'), { ssr: false })

const Cannon: NextPage = () => {

  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
      <ambientLight />
      <axesHelper position={[0, 0, 0]} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Box />
      </Suspense>
      <Stats />
    </Canvas>
  )
}

export default Cannon
