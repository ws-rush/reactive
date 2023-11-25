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
import { ClickToComponent } from 'click-to-react-component'

// TODO:
// remove this line it should autoimport from config I think
import { i18n } from '@lingui/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <I18nProvider i18n={i18n}> */}
        <RouterProvider router={router} />
        <ClickToComponent />
    {/* </I18nProvider> */}
  </StrictMode>
)
