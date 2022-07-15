import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetaTags } from '../components/meta/metaTag'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <MetaTags/>
    </div>
    
  )
}

export default MyApp
