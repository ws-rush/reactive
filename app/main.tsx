import './styles/main.css'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// load default language
await locale.set(locale.value)
// initial mode load
mode.set(mode.value)

createRoot(document.querySelector('#root') as Element).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>
)
