import { useRef, useImperativeHandle, forwardRef, Fragment } from 'react'
import { useFrame } from '@react-three/fiber'
import Move from './entity/move'
import Cube, { RubikRotation } from './entity/cube'
import { getBoxes, rotateAroundWorldAxis } from './helper'
import { BackSide, MathUtils } from 'three'
import { Billboard, Text } from '@react-three/drei'

const mapCubeName = {
  '0-2-2': 'U-F-L',
  '0-2-0': 'U-L-B',
  '2-2-0': 'U-B-R',
  '2-2-2': 'U-R-F',
  '0-0-2': 'D-F-L',
  '0-0-0': 'D-L-B',
  '2-0-0': 'D-B-R',
  '2-0-2': 'D-R-F',
  '1-2-2': 'U-F',
  '0-2-1': 'U-L',
  '1-2-0': 'U-B',
  '2-2-1': 'U-R',
  '0-1-2': 'F-L',
  '0-1-0': 'L-B',
  '2-1-0': 'B-R',
  '2-1-2': 'R-F',
  '1-0-2': 'D-F',
  '0-0-1': 'D-L',
  '1-0-0': 'D-B',
  '2-0-1': 'D-R',
  '1-1-2': 'F-F',
  '0-1-1': 'L-L',
  '1-1-0': 'B-B',
  '2-1-1': 'R-R',
  '1-2-1': 'U-U',
  '1-0-1': 'D-D',
  '1-1-1': 'C',
}

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

  useImperativeHandle(ref, () => ({ rotate }))

  useFrame(() => {
    if (moveRef.current) { moveRef.current.run() }
  })

  const gap = length / 10
  const offset = (-size / 2) + 0.5 - gap

  return <group ref={rubik}>
    {[...Array(size)].map((_, x) =>
      [...Array(size)].map((_, y) =>
        [...Array(size)].map((_, z) => (<Fragment key={`${x}-${y}-${z}`}>
          <mesh
            name={`${x}-${y}-${z}`}
            // key={`${x}-${y}-${z}`}
            renderOrder={5}
            position={[(x + (x * gap) + offset) * length, (y + (y * gap) + offset) * length, (z + (z * gap) + offset) * length]}
          >
            <boxGeometry args={[length, length, length]} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={x === size - 1 ? colors.right : colors.netral} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={x === 0 ? colors.left : colors.netral} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={y === size - 1 ? colors.up : colors.netral} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={y === 0 ? colors.down : colors.netral} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={z === size - 1 ? colors.front : colors.netral} />
            <meshStandardMaterial
              // side={BackSide} transparent opacity={0.5}
              attachArray="material" color={z === 0 ? colors.back : colors.netral} />
          </mesh>
          <Billboard renderOrder={10} position={[(x + (x * gap) + offset) * length, (y + (y * gap) + offset) * length, (z + (z * gap) + offset) * length]}>
            <Text fontSize={0.15}>
              {/* {snap[mapCubeName[`${x}-${y}-${z}` as keyof typeof mapCubeName] as keyof typeof state]} */}
              {mapCubeName[`${x}-${y}-${z}` as keyof typeof mapCubeName]}
            </Text>
          </Billboard>
        </Fragment>))
      )
    )}
  </group>
})

export default Rubik