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
  console.log(objects)
  if (rotation === 'F') return objects.filter(cube => /[0-9]-[0-9]-2/.test(cube.name))
  if (rotation === 'B') return objects.filter(cube => /[0-9]-[0-9]-0/.test(cube.name))
  if (rotation === 'R') return objects.filter(cube => /2-[0-9]-[0-9]/.test(cube.name))
  if (rotation === 'L') return objects.filter(cube => /0-[0-9]-[0-9]/.test(cube.name))
  if (rotation === 'U') return objects.filter(cube => /[0-9]-2-[0-9]/.test(cube.name))
  if (rotation === 'D') return objects.filter(cube => /[0-9]-0-[0-9]/.test(cube.name))
  if (rotation === 'M') return objects.filter(cube => /[0-9]-1-[0-9]/.test(cube.name))
  if (rotation === 'S') return objects.filter(cube => /1-[0-9]-[0-9]/.test(cube.name))
  if (rotation === 'E') return objects.filter(cube => /[0-9]-[0-9]-1/.test(cube.name))
  return objects
}