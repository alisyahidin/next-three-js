import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import type { NextPage } from 'next'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { Group } from 'three'
import styles from '../styles/rubik.module.css'

const ceil = (num: number): number => Math.ceil(num * 100) / 100

type RubikProps = {
  size: number
  length?: number
}

type RubikActions = {
  handleRotateFront: () => void
}

const colors = {
  front: 0xFFFFFF,
  back: 0xFFCC00,
  up: 0xCC0000,
  bottom: 0xEE6600,
  right: 0x009922,
  left: 0x2255DD,
  netral: 0x000000
}

const Rubik = forwardRef<RubikActions, RubikProps>(({ size = 3, length = 1 }, ref) => {
  const { scene } = useThree()
  const rubik = useRef<THREE.Mesh>(null!)
  const pivot = useRef(new Group())
  const [rotation, setRotation] = useState<'F' | null>(null)
  const gap = length / 10
  const offset = (-size / 2) + 0.5 - gap

  const handleRotateFront = () => {
    scene.add(pivot.current)
    const front = rubik.current.children.filter(cube => /[0-9]-[0-9]-2/.test(cube.name))
    front.forEach(cube => pivot.current.add(cube))
    setRotation('F')
  }

  useImperativeHandle(ref, () => ({
    handleRotateFront
  }))

  useEffect(() => {
    const front = rubik.current.children.filter(cube => /[0-9]-[0-9]-2/.test(cube.name))
    console.log(front)
  }, [rubik])

  useFrame(() => {
    if (rotation === 'F') {
      pivot.current.rotation.z -= 0.01

      console.log(ceil(pivot.current.rotation.z))
      if (ceil(pivot.current.rotation.z) % ceil(-Math.PI / 2) === 0) setRotation(null)
    }
  })

  return <group ref={rubik}>
    {[...Array(size)].map((_, x) =>
      [...Array(size)].map((_, y) =>
        [...Array(size)].map((_, z) => (
          <mesh
            key={`${x}-${y}-${z}`}
            name={`${x}-${y}-${z}`}
            position={[(x + (x * gap) + offset) * length, (y + (y * gap) + offset) * length, (z + (z * gap) + offset) * length]}
          >
            <boxGeometry args={[length, length, length]} />
            <meshStandardMaterial attachArray="material" color={x === size - 1 ? colors.right : colors.netral} />
            <meshStandardMaterial attachArray="material" color={x === 0 ? colors.left : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === size - 1 ? colors.up : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === 0 ? colors.bottom : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === size - 1 ? colors.front : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === 0 ? colors.back : colors.netral} />
          </mesh>
        ))
      )
    )}
  </group>
})

const RubikPage: NextPage = () => {
  const rubik = useRef<RubikActions>(null!)
  return (
    <>
      <Canvas style={{ height: '100vh' }}>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
        <ambientLight />
        <axesHelper scale={6} position={[0, 0, 0]} />
        <Rubik ref={rubik} size={3} length={0.5} />
        <Stats />
      </Canvas>
      <div className={styles['button-action']}>
        <button onClick={() => console.log(rubik.current.handleRotateFront())} className={styles.btn}>F</button>
        <button onClick={() => console.log('Test')} className={styles.btn}>F'</button>
      </div>
    </>
  )
}

export default RubikPage