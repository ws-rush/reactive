import './styles/main.css'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { I18nProvider } from '@lingui/react'
import {
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router'

export const links = () => [
  {
    href:
      typeof window !== 'undefined' && mode.isPreferdDark
        ? '/favicon-dark.svg'
        : '/favicon.svg',
    rel: 'icon',
    type: 'image/svg+xml',
  },
]

export function meta() {
  return [
    { title: 'Reactive' },
    {
      content: 'Reactive',
      property: 'og:title',
    },
    {
      content: 'Opinionated React Starter Template, ispired by vitesse',
      name: 'description',
    },
    {
      content:
        typeof window !== 'undefined' && mode.isDark ? '#00aba9' : '#ffffff',
      name: 'theme-color',
    },
  ]
}

export function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export async function clientLoader({ params, request }: LoaderFunctionArgs) {
  const lang = params?.lang
  const fallbackLang = 'en' // or whatever your fallback language is

  // If lang param exists but not in available locales, redirect to URL without lang
  if (lang && !locale.availableLocales.includes(lang)) {
    const url = new URL(request.url)
    const pathWithoutLang = url.pathname.replace(`/${lang}`, '')
    return redirect(pathWithoutLang + url.search)
  }

  // Set language - use provided lang or fallback
  const languageToUse = lang || fallbackLang
  await locale.set(languageToUse)

  // Set initial mode
  mode.set(mode.value)

  return { lang: languageToUse }
}

export default function App() {
  return (
    <I18nProvider i18n={i18n}>
      <Outlet />
    </I18nProvider>
  )
}

export function HydrateFallback() {
  return (
    <div className="h-screen grid place-items-center">
      <h1>I am Loader, Put your Logo here</h1>
    </div>
  )
}

export function ErrorBoundray() {
  const navigate = useLocalizedNavigate()
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
