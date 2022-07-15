import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from '../components/navbar';  
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta
        title="Frank Laterza's Portfolio!"
        name="Frank's website"/>
        <meta 
        name="theme-color"
        content="#18181"/>
      </Head>
      {/* navigatoin bar */}
      <NavBar/>
      <Component {...pageProps} />
    </div>
    
  )
}

export default MyApp
