import { Object3D, Quaternion } from 'three'
import { RubikRotation } from '../entity/cube'
import state from '../state'

export function rotateAroundWorldAxis(
  object: THREE.Object3D,
  axisVector: THREE.Vector3,
  radians: number
) {
  const quaternion = new Quaternion()

  quaternion.setFromAxisAngle(axisVector, radians)

  object.quaternion.multiplyQuaternions(quaternion, object.quaternion)
  object.position.sub(axisVector)
  object.position.applyQuaternion(quaternion)
  object.position.add(axisVector)
}

export const getInitialState = (size: number) => {
  // x1, x2, ..., xN-1, xN -> L, L1, ..., R1, R
  // y1, y2, ..., yN-1, yN -> D, D1, ..., U1, U
  // z1, z2, ..., zN-1, zN -> B, B1, ..., F1, F

  const renamePosition = {
    X: ['L', 'R'],
    Y: ['D', 'U'],
    Z: ['B', 'F'],
  }

  const mapNameByPosition = ([x, y, z]: [number, number, number], size: number) => {
    const isEven = size % 2 === 0
    const middle = Math.floor(size / 2)
    const getNameByIndex = (index: number) => index < middle ? 0 : 1
    const getNumber = (index: number) => {
      if (isEven) {
        return (index === 0 || index === (size - 1))
          ? ''
          : index < middle
            ? index
            : (size - 1) - index
      } else {
        return (index === 0 || index === (size - 1) || index === middle)
          ? ''
          : index < middle
            ? index
            : (size - 1) - index
      }
    }

    return isEven
      ? [
        renamePosition['X'][getNameByIndex(x)] + getNumber(x),
        renamePosition['Y'][getNameByIndex(y)] + getNumber(y),
        renamePosition['Z'][getNameByIndex(z)] + getNumber(z)
      ].filter(Boolean).join('-')
      : [
        x === middle ? '' : renamePosition['X'][getNameByIndex(x)] + getNumber(x),
        y === middle ? '' : renamePosition['Y'][getNameByIndex(y)] + getNumber(y),
        z === middle ? '' : renamePosition['Z'][getNameByIndex(z)] + getNumber(z)
      ].filter(Boolean).join('-')
  }

  const get3D = (size: number) => {
    let array = []
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          array.push({ [`${x}-${y}-${z}`]: mapNameByPosition([x, y, z], size) })
        }
      }
    }
    return array.reduce((prev, current) => ({ ...prev, ...current }), {})
  }

  return get3D(size)
}

export function getBoxes(objects: Object3D[], face: keyof RubikRotation): Object3D[] {
  const rotationPieces = Object.keys(state)
    .filter(position => position.includes(face))
    .map(key => state[key as keyof typeof state])

  if (face === 'F') return objects.filter(cube => rotationPieces.includes(cube.name))
  if (face === 'B') return objects.filter(cube => rotationPieces.includes(cube.name))
  if (face === 'R') return objects.filter(cube => rotationPieces.includes(cube.name))
  if (face === 'L') return objects.filter(cube => rotationPieces.includes(cube.name))
  if (face === 'U') return objects.filter(cube => rotationPieces.includes(cube.name))
  if (face === 'D') return objects.filter(cube => rotationPieces.includes(cube.name))
  // if (face === 'M') return objects.filter(cube => rotationPieces.includes(cube.name))
  // if (face === 'S') return objects.filter(cube => rotationPieces.includes(cube.name))
  // if (face === 'E') return objects.filter(cube => rotationPieces.includes(cube.name))
  return objects
}