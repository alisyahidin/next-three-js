import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const BoxTexture = () => {
  const colorMap = useTexture('/logo.png')
  const box = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    box.current.rotation.y += 0.005
    box.current.rotation.x += 0.005
  })

  return (
    <mesh ref={box}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  )
}

export default BoxTexture
