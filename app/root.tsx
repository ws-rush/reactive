import { Trans } from '@lingui/macro'
import { useRouteError } from 'react-router-dom'

export function Component() {
  return (
    <>
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
    </>
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
