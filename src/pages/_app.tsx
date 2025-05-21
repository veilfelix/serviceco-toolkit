import type { AppProps } from 'next/app'
import Layout from '@/components/composed/Layout/Layout'
import '@/styles/globals.css'
import { JSX } from 'react'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(App)