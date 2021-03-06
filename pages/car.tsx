// https://codesandbox.io/s/ebr0x?file=/src/index.js

import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { CylinderArgs, Physics, PlaneProps, useCylinder, usePlane } from '@react-three/cannon'
import { Ref, Suspense } from 'react'
import Vehicle from '../components/Vehicle'
import { Group, Mesh } from 'three'

function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref as Ref<Group>}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  )
}

function Pillar({ args = [0.7, 0.7, 5, 16] as CylinderArgs, ...props }) {
  const [ref] = useCylinder(() => ({ mass: 10, args, ...props }))
  return (
    <mesh ref={ref as Ref<Mesh>} castShadow>
      <cylinderGeometry args={args as any} />
      <meshNormalMaterial />
    </mesh>
  )
}

const Car: NextPage = () => {
  return (
    <Canvas style={{ height: '100vh' }} dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <fog attach="fog" args={['#171720', 10, 50]} />
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />
      {/* @ts-ignore */}
      <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
        <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
        <Pillar position={[-5, 2.5, -5]} userData={{ id: 'pillar-1' }} />
        <Pillar position={[0, 2.5, -5]} userData={{ id: 'pillar-2' }} />
        <Pillar position={[5, 2.5, -5]} userData={{ id: 'pillar-3' }} />
      </Physics>
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}

export default Car