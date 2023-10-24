// css imports
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'unfonts.css'
import './index.css'

// js imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { I18nProvider } from '@lingui/react' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <ModeProvider>
        <RouterProvider router={router} />
      </ModeProvider>
    </I18nProvider>
  </StrictMode>
)
