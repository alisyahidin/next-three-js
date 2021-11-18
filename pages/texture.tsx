import { Suspense } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

const Box = dynamic(() => import('../components/BoxTexture'), { ssr: false })

const TexturePage: NextPage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={10} minDistance={6} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Box />
      </Suspense>
      <Stats />
    </Canvas>
  )
}

export default TexturePage
