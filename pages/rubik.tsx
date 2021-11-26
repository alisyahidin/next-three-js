import { useRef } from 'react'
import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import Rubik, { RubikRef } from '../components/Rubik'
import styles from '../styles/rubik.module.css'

const RubikPage: NextPage = () => {
  const rubik = useRef<RubikRef>(null!)

  return (
    <>
      <Canvas gl={{ pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio * 5 : 2 }} style={{ height: '100vh' }}>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxDistance={15} minDistance={3} />
        <ambientLight />
        <axesHelper scale={6} position={[0, 0, 0]} />
        <Rubik ref={rubik} length={0.5} />
        <Stats />
      </Canvas>
      <div className={styles['button-action']}>
        <div>
          <button onClick={() => rubik.current.rotate('U')} className={styles.btn}>U</button>
          <button onClick={() => rubik.current.rotate('U', true)} className={styles.btn}>U'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('F')} className={styles.btn}>F</button>
          <button onClick={() => rubik.current.rotate('F', true)} className={styles.btn}>F'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('L')} className={styles.btn}>L</button>
          <button onClick={() => rubik.current.rotate('L', true)} className={styles.btn}>L'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('D')} className={styles.btn}>D</button>
          <button onClick={() => rubik.current.rotate('D', true)} className={styles.btn}>D'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('B')} className={styles.btn}>B</button>
          <button onClick={() => rubik.current.rotate('B', true)} className={styles.btn}>B'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('R')} className={styles.btn}>R</button>
          <button onClick={() => rubik.current.rotate('R', true)} className={styles.btn}>R'</button>
        </div>
        {/* <div>
          <button onClick={() => rubik.current.rotate('M')} className={styles.btn}>M</button>
          <button onClick={() => rubik.current.rotate('M', true)} className={styles.btn}>M'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('S')} className={styles.btn}>S</button>
          <button onClick={() => rubik.current.rotate('S', true)} className={styles.btn}>S'</button>
        </div>
        <div>
          <button onClick={() => rubik.current.rotate('E')} className={styles.btn}>E</button>
          <button onClick={() => rubik.current.rotate('E', true)} className={styles.btn}>E'</button>
        </div> */}
      </div>
    </>
  )
}

export default RubikPage