import { useState } from 'react'
import Seo from '@/components/composed/Seo/Seo'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import { JSX } from 'react'
import Switch from '@/components/ui/Switch/Switch'
import ModalConfirm from '@/components/composed/ModalConfirm/ModalConfirm'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { withSharedNamespaces } from '@/utils/i18nSSR'

export default function Home(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  const { t } = useTranslation('home')

  return (
    <>
      <Seo
        titleKey="meta.home.title"
        descriptionKey="meta.home.description"
      />
      <Container className="py-10">
        <Heading as="h1">
          {t('hero.title')}
        </Heading>
        <Text as="p">
          {t('hero.subtitle')}
        </Text>
        <Button className="my-3" onClick={() => setOpen(true)}>
          {t('hero.cta')}
        </Button>
        <ModalConfirm
          open={open}
          onOpenChange={setOpen}
          title={t('modal.title')}
          description={t('modal.description')}
          onConfirm={() => setOpen(checked)}
          onCancel={() => setOpen(true)}
          confirmText={t('modal.confirm')}
          cancelText={t('modal.cancel')}
          isDismissable={false}
        >
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            label={t('modal.switchLabel')}
          />
          <p className="mt-4">
            {checked ? t('modal.afterSwitch') : ''}
          </p>
        </ModalConfirm>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withSharedNamespaces(locale ?? 'en', ['home']),
  }
}
