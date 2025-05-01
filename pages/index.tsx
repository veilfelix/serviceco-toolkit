import Head from 'next/head'
import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>ServiceCo Toolkit</title>
        <meta name="description" content="A modern starter kit for service company websites." />
      </Head>
      <main>
        <h1>Welcome to ServiceCo Toolkit</h1>
      </main>
    </>
  )
}
