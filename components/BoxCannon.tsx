import { BoxProps, Physics, PlaneProps, useBox, usePlane } from '@react-three/cannon'

function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    // @ts-ignore
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

function Cube(props: BoxProps) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 1, 0], ...props }))
  return (
    // @ts-ignore
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color={0xFF00FF} />
    </mesh>
  )
}

const BoxCannon = () => {
  return (
    <Physics>
      <Cube />
      <Plane />
    </Physics>
  )
}

export default BoxCannon
