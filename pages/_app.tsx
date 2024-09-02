import { AppProps } from 'next/app'
import { GoogleTagManager } from '@next/third-parties/google'

import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GoogleTagManager gtmId="GTM-5XTX9BLG" />
    <Component {...pageProps} />
  </>
}

export default MyApp
