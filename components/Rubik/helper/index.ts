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