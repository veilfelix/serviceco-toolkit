import { useState } from 'react'
import Seo from '@/components/composed/Seo/Seo'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import { Dialog } from '@/components/composed/Dialog/Dialog'
import { JSX } from 'react'
import Switch from '@/components/ui/Switch/Switch'

export default function Home(): JSX.Element {
  const [open, setOpen] = useState(false)

  const [checked, setChecked] = useState(false)

  return (
    <>
      <Seo
        title="ServiceCo Toolkit"
        description="A modern starter kit for service company websites."
      />
      <Container className="py-10">
        <Heading as="h1">
          Welcome to ServiceCo Toolkit
        </Heading>
        <Text as="p">
          A modern starter kit for service company websites
        </Text>
        <Button className="my-3" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="sr-only" aria-hidden />
          </Dialog.Trigger>
          <Dialog.Overlay />
          <Dialog.Content title="Confirmation" description="This dialog allows the user to close the Dialog">
            <Text>Do you want to close the Dialog?</Text>
            <Switch checked={checked} onCheckedChange={setChecked} label="If so, you must turn this switch on!" />
            <p className="mt-4">{checked ? 'You trusted me? 🤡 Now turn it off' : ''}</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button disabled={checked} variant="secondary" onClick={() => setOpen(false)}>
                Yes, of course
              </Button>
              <Button variant="primary">No</Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </Container>
    </>
  )
}
