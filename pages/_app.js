import Nav from '@/components/Nav'
import '@/styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <>
    <Nav/>
  <Component {...pageProps} />
    </>
  )
}
