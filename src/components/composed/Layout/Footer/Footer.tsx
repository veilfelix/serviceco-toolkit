'use client'

import { JSX } from 'react'
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher'
import Grid from '@/components/ui/Grid/Grid'
import Container from '@/components/ui/Container/Container'
import { useTranslation } from 'next-i18next'

/**
 * This Footer component is a temporary placeholder to ease development by providing the app with a basic Layout.
 * Hence why no unit test was implemented for that component.
 */
export default function Footer(): JSX.Element {
  const { t } = useTranslation('layout')
  
  return (
    <footer className="bg-muted text-muted-foreground py-4 mt-8">
      <Container>
        <Grid columns='auto-fill' justify='evenly' align='center'>
          <div>{t('footer.copyright', { year: new Date().getFullYear() })}</div>
          <LanguageSwitcher compact/>
        </Grid>
      </Container>
    </footer>
  )
}
