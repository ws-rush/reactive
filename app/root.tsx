// css imports
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'virtual:uno.css'
// js imports
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { I18nProvider } from '@lingui/react'
import { ClickToComponent } from 'click-to-react-component'
import { useRouteError } from 'react-router-dom'

// load default language
await locale.set(locale.value)
// initial mode load
mode.set(mode.value)

export function Component() {
  return (
    <I18nProvider i18n={i18n}>
      <title>Reactive</title>
      <meta
        content="Opinionated React Starter Template, ispired by vitesse"
        name="description"
      />
      <meta
        content={mode.isDark ? '#00aba9' : '#ffffff'}
        name="theme-color"
      />
      <link
        href={mode.isPreferdDark ? '/favicon-dark.svg' : '/favicon.svg'}
        rel="icon"
        type="image/svg+xml"
      />
      <Outlet />
      <ClickToComponent />
    </I18nProvider>
  )
}

export function ErrorBoundray() {
  const navigate = useNavigate()
  const error = useRouteError()

  // log error in sentry or other log service
  // eslint-disable-next-line no-console
  console.log(error)

  function logout() {
    // also remove tokens
    navigate('/login')
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>
        <Trans>Sorry, there is an error.</Trans>
      </h1>
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/')}
          type="button"
        >
          <Trans>Go to Home</Trans>
        </button>
        <button
          onClick={() => logout()}
          type="button"
        >
          <Trans>Logout</Trans>
        </button>
      </div>
    </div>
  )
}
