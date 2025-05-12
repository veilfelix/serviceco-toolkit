import { useState } from 'react'
import Seo from '@/components/composed/Seo/Seo'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import { JSX } from 'react'
import Switch from '@/components/ui/Switch/Switch'
import ModalConfirm from '@/components/composed/ModalConfirm/ModalConfirm'

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
        <ModalConfirm 
          open={open} 
          onOpenChange={setOpen} 
          title={'Very Useful Placeholders S01 E01: Dialog'} 
          description={'Do you want to close the Dialog?'} 
          onConfirm={() => setOpen(checked)}
          onCancel={() => {setOpen(true)}}
          confirmText='Yes, of course'
          cancelText='No'
          isDismissable={false}
        >
          <Switch checked={checked} onCheckedChange={setChecked} label="If so, you must turn this switch on!" />
          <p className="mt-4">{checked ? 'You trusted me? 🤡 Now turn it off' : ''}</p>
        </ModalConfirm>
      </Container>
    </>
  )
}
