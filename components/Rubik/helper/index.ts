import { Object3D, Quaternion } from 'three'
import { RubikRotation } from '../entity/cube'

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

export function getBoxes(objects: Object3D[], rotation: keyof RubikRotation): Object3D[] {
  if (rotation === 'F') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'B') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'R') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'L') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'U') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'D') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'M') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'S') return objects.filter(cube => cube.name.includes(rotation))
  if (rotation === 'E') return objects.filter(cube => cube.name.includes(rotation))
  return objects
}