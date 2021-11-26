import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Move from './entity/move'
import Cube, { RubikRotation } from './entity/cube'
import { getBoxes, rotateAroundWorldAxis } from './helper'
import { MathUtils } from 'three'

export type RubikProps = {
  size?: number
  length?: number
}

export type RubikRef = {
  rotate: (rotation: keyof RubikRotation, inversed?: boolean, stepAngle?: number) => void
}

const defaultStepAngle: number = 6
const colors = {
  front: 0xFFFFFF,
  back: 0xFFCC00,
  up: 0xCC0000,
  down: 0xEE6600,
  right: 0x009922,
  left: 0x2255DD,
  netral: 0x000000
}

const Rubik = forwardRef<RubikRef, RubikProps>(({ size = 3, length = 1 }, ref) => {
  const rubik = useRef<THREE.Mesh>(null!)
  const moveRef = useRef<Move>()

  const rotateBoxes = (rotation: keyof RubikRotation, targetAngle: number) => {
    const boxes = getBoxes(rubik.current.children, rotation)
    for (let box of boxes) {
      rotateAroundWorldAxis(
        box,
        Cube.rotation[rotation].axis,
        MathUtils.degToRad(-targetAngle)
      )
    }
  }

  const rotate = (face: keyof RubikRotation, inversed: boolean = false, stepAngle = defaultStepAngle): Promise<void> => {
    if (moveRef.current) return Promise.resolve()

    return new Promise<void>(resolve => {
      moveRef.current = new Move(face, ['B', 'L', 'D'].includes(face) ? !inversed : inversed, stepAngle)

      moveRef.current.onComplete(() => {
        Cube.rotate(face, inversed)
        moveRef.current = undefined
        resolve()
      })

      moveRef.current.onProgress(move => {
        const targetSign = Math.sign(move.targetAngle)
        rotateBoxes(face, stepAngle * targetSign)
      })

    })
  }

  useEffect(() => {
    const listenToKeyboard = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      if (Object.keys(Cube.rotation).includes(key)) rotate(key as keyof RubikRotation)
    }

    window.addEventListener('keypress', listenToKeyboard)
    return () => window.removeEventListener('keypress', listenToKeyboard)
  }, [])

  useImperativeHandle(ref, () => ({ rotate }))

  useFrame(() => { if (moveRef.current) moveRef.current.run() })

  const gap = length / 10
  const offset = (-size / 2) + 0.5 - gap

  return <group ref={rubik}>
    {[...Array(size)].map((_, x) =>
      [...Array(size)].map((_, y) =>
        [...Array(size)].map((_, z) => (
          <mesh
            name={`${x}-${y}-${z}`}
            key={`${x}-${y}-${z}`}
            position={[(x + (x * gap) + offset) * length, (y + (y * gap) + offset) * length, (z + (z * gap) + offset) * length]}
          >
            <boxGeometry args={[length, length, length]} />
            <meshStandardMaterial attachArray="material" color={x === size - 1 ? colors.right : colors.netral} />
            <meshStandardMaterial attachArray="material" color={x === 0 ? colors.left : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === size - 1 ? colors.up : colors.netral} />
            <meshStandardMaterial attachArray="material" color={y === 0 ? colors.down : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === size - 1 ? colors.front : colors.netral} />
            <meshStandardMaterial attachArray="material" color={z === 0 ? colors.back : colors.netral} />
          </mesh>
        ))
      )
    )}
  </group>
})

export default Rubik