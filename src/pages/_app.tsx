import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import { JSX } from 'react'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

