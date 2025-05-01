import Seo from '@/components/Seo/Seo'
import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <>
      <Seo
        title="ServiceCo Toolkit"
        description="A modern starter kit for service company websites."
      />
      <main>
        <h1>Welcome to ServiceCo Toolkit</h1>
      </main>
    </>
  )
}
