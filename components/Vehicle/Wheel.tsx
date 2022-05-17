import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCylinder } from '@react-three/cannon'

useGLTF.preload('/Wheel.glb')

// Auto-generated by: https://github.com/pmndrs/gltfjsx
// @ts-ignore
const Wheel = forwardRef(({ radius = 0.7, leftSide, ...props }, ref) => {
  // @ts-ignore
  const { nodes, materials } = useGLTF('/wheel.glb')
  // @ts-ignore
  useCylinder(() => ({ mass: 1, type: 'Kinematic', material: 'wheel', collisionFilterGroup: 0, args: [radius, radius, 0.5, 16], ...props }), ref)
  return (
    // @ts-ignore
    <mesh ref={ref}>
      <mesh rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <mesh material={materials.Rubber} geometry={nodes.wheel_1.geometry} />
        <mesh material={materials.Steel} geometry={nodes.wheel_2.geometry} />
        <mesh material={materials.Chrom} geometry={nodes.wheel_3.geometry} />
      </mesh>
    </mesh>
  )
})

Wheel.displayName = 'Wheel Component'

export default Wheel
