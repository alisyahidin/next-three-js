import { Vector3 } from "three";

export const cubes = {
  'U-F-L': '0-2-2',
  'U-L-B': '0-2-0',
  'U-B-R': '2-2-0',
  'U-R-F': '2-2-2',
  'D-F-L': '0-0-2',
  'D-L-B': '0-0-0',
  'D-B-R': '2-0-0',
  'D-R-F': '2-0-2',
  'U-F': '1-2-2',
  'U-L': '0-2-1',
  'U-B': '1-2-0',
  'U-R': '2-2-1',
  'F-L': '0-1-2',
  'L-B': '0-1-0',
  'B-R': '2-1-0',
  'R-F': '2-1-2',
  'D-F': '1-0-2',
  'D-L': '0-0-1',
  'D-B': '1-0-0',
  'D-R': '2-0-1',
  'F-F': '1-1-2',
  'L-L': '0-1-1',
  'B-B': '1-1-0',
  'R-R': '2-1-1',
  'U-U': '1-2-1',
  'D-D': '1-0-1',
  'C': '1-1-1',
}

export type CubeTypes = keyof typeof cubes

export type RubikRotation = {
  F: { axis: THREE.Vector3 },
  B: { axis: THREE.Vector3 },
  U: { axis: THREE.Vector3 },
  D: { axis: THREE.Vector3 },
  R: { axis: THREE.Vector3 },
  L: { axis: THREE.Vector3 },
  M: { axis: THREE.Vector3 },
  S: { axis: THREE.Vector3 },
  E: { axis: THREE.Vector3 },
}

export default class Cube {
  static angles = {
    CLOCKWISE: 90,
    COUNTERCLOCKWISE: -90
  }

  static axis = {
    X: new Vector3(1, 0, 0),
    Y: new Vector3(0, 1, 0),
    Z: new Vector3(0, 0, 1)
  }

  static rotation: RubikRotation = {
    F: { axis: Cube.axis.Z },
    B: { axis: Cube.axis.Z },
    U: { axis: Cube.axis.Y },
    D: { axis: Cube.axis.Y },
    R: { axis: Cube.axis.X },
    L: { axis: Cube.axis.X },
    M: { axis: Cube.axis.Y },
    S: { axis: Cube.axis.X },
    E: { axis: Cube.axis.Z },
  }
}