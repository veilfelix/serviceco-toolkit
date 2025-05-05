import Seo from '@/components/Seo/Seo'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <>
      <Seo
        title="ServiceCo Toolkit"
        description="A modern starter kit for service company websites."
      />
      <Container className="py-16">
        <Heading as ="h1" className="pb-2">Welcome to ServiceCo Toolkit</Heading>
        <Text as="p" className="py-2">A modern starter kit for service company websites</Text>
        <Button className="my-2">This is a Button</Button>
      </Container>
    </>
  )
}
