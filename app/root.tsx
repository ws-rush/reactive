import { Helmet } from 'react-helmet'

export function Component() {
  return (
    <>
      <Helmet>
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
      </Helmet>
      <Outlet />
    </>
  )
}
