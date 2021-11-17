import { useTexture } from "@react-three/drei"

const BoxTexture = () => {
  const colorMap = useTexture('/logo.png')
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  )
}

export default BoxTexture
