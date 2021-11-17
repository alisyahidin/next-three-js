import { FC, Suspense, useRef } from 'react'
import type { NextPage } from 'next'
import { GLTF } from 'three-stdlib'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Stats, useGLTF } from '@react-three/drei'

type DreiGLTF = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.Material>
}

useGLTF.preload('/shoe-draco.glb')
const ShoeMesh: FC = props => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/shoe-draco.glb') as DreiGLTF

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

const Shoe: NextPage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={5} minDistance={3} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<></>}>
        <ShoeMesh />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
      </Suspense>
      <Stats />
    </Canvas>
  )
}

export default Shoe
