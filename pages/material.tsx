import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

const objects = [
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshBasicMaterial color={0x038cfc} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshLambertMaterial color={0xa200ff} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshPhongMaterial flatShading color={0xfa2f6c} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshStandardMaterial flatShading color={0xFF0000} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshPhysicalMaterial flatShading color={0x2ffabd} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshToonMaterial color={0x2ffabd} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshDepthMaterial fog depthTest depthWrite visible opacity={1} />
  </>,
  <>
    <sphereGeometry args={[1, 6, 3]} />
    <meshNormalMaterial />
  </>,
]

const Material: NextPage = () => {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10] }} style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={1} />
      <ambientLight />
      <pointLight castShadow position={[5, 10, 4]} />
      <axesHelper />
      {objects.map((Component, i) => (
        <mesh castShadow position={[(i * 3) - (3 * (objects.length / 2)), 2, 0]} key={i}>
          {Component}
        </mesh>
      ))}
      <gridHelper />
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, .01, 0]}>
        <planeGeometry args={[33, 8]} />
        <meshStandardMaterial color={0xFFFFFF} />
      </mesh>
      <Stats />
    </Canvas>
  )
}

export default Material