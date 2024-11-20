/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// load default language
await locale.set(locale.value)
// initial mode load
mode.set(mode.value)

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <RemixBrowser />
      </I18nProvider>
    </StrictMode>
  )
})
