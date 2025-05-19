import { Meta, StoryObj } from '@storybook/react'
import { Dialog } from '@/components/composed/Dialog/Dialog'
import Button from '@/components/ui/Button/Button'

const meta: Meta = {
  title: 'Composed/Dialog',
  component: Dialog.Root,
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content title="Demo Dialog" description="This Dialog is for a demo on Storybook">
        <p>This is the dialog content. It can include any React elements.</p>
      </Dialog.Content>
    </Dialog.Root>
  ),
}
