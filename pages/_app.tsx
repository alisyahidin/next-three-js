import type { AppProps } from 'next/app'
import Menu from '../components/Menu'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <div style={{ position: 'relative' }}>
    <Menu />
    <Component {...pageProps} />
  </div>
}
export default MyApp