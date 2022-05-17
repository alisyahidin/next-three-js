import { FC, Suspense, useCallback, useMemo, useRef } from 'react'
import type { NextPage } from 'next'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, useTexture } from '@react-three/drei'

const Points: FC = () => {
  const imgText = useTexture('/circle.png')
  const bufferRef = useRef<THREE.BufferAttribute>(null!);

  let t = 0;
  let f = 0.002;
  let a = 3;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }, [t, f, a])

  const count = 100
  const sep = 3
  const position = useMemo<Float32Array>(() => {
    const positions = []
    for (let x1 = 0; x1 < count; x1++) {
      for (let z1 = 0; z1 < count; z1++) {
        const x = sep * (x1 - count / 2)
        const z = sep * (z1 - count / 2)
        const y = 0
        positions.push(x, y, z)
      }
    }
    return new Float32Array(positions)
  }, [count, sep])

  useFrame(() => {
    t += 15

    const positions = bufferRef.current.array

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        // @ts-ignore
        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          // @ts-ignore
          attachObject={['attributes', 'position']}
          array={position}
          count={position.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={imgText}
        color={0x00AAFF}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1}
      />
    </points>
  )
}

const PointsPage: NextPage = () => {
  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: 'black' }}>
      <Canvas
        camera={{ position: [100, 10, 0], fov: 75 }}
      >
        <Suspense fallback={null}>
          <Points />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  )
}

export default PointsPage
