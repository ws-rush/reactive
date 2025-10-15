import './styles/main.css'
import { I18nProvider } from '@lingui/react'
import {
  type ClientLoaderFunctionArgs,
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from 'react-router'
import type { Route } from './+types/root'
import { GlobalBusHandler } from './globals/bus'

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
        <meta content="width=device-width, initial-scale=1" name="viewport" />
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

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const currentLocale = params?.lang || locale.default

  if (!locale.availableLocale.includes(currentLocale)) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  // set initial locale
  locale.set(currentLocale)

  // Set initial mode
  mode.set(mode.value)

  return true
}

export default function App() {
  return (
    <I18nProvider i18n={locale.i18n}>
      <Outlet />
      <GlobalBusHandler />
    </I18nProvider>
  )
}

export const shouldRevalidate = locale.i18nRevalidate()

export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-16 h-px bg-gray-200">
            <div className="h-full bg-gray-400 rounded-full animate-pulse-subtle"></div>
          </div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
        </div>
        <p className="text-sm text-gray-500 font-light">Loading...</p>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate()

  const reportError = () => {
    // In a real app, this would send error details to a reporting service
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      status: isRouteErrorResponse(error) ? error.status : null,
      statusText: isRouteErrorResponse(error) ? error.statusText : null,
      data: isRouteErrorResponse(error) ? error.data : null,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }

    console.log('Error reported:', errorDetails)
    // Here you would typically send this to your error reporting service
    // Example: Sentry.captureException(error)
    alert("Error has been reported to our team. We'll look into it.")
  }

  const goBack = () => {
    window.history.back()
  }

  const logout = () => {
    // Clear authentication tokens and redirect to login
    localStorage.clear()
    sessionStorage.clear()
    navigate('/login')
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-100 p-6 text-center">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-light text-gray-900 mb-1">
                {error.status} {error.statusText}
              </h1>
              <p className="text-sm text-gray-500">
                {error.data || 'Something went wrong'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  ← go back
                </button>
                <NavLink
                  to="/"
                  prefetch="viewport"
                  viewTransition
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm text-center"
                >
                  ← back to stories
                </NavLink>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  reload page
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  logout
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reportError}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  report issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-100 p-6 text-center">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-light text-gray-900 mb-1">
                Application Error
              </h1>
              <p className="text-sm text-gray-500">{error.message}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  ← go back
                </button>
                <NavLink
                  to="/"
                  prefetch="viewport"
                  viewTransition
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm text-center"
                >
                  ← back to stories
                </NavLink>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  reload page
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  logout
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reportError}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  report issue
                </button>
              </div>
            </div>

            {import.meta.env.DEV && (
              <details className="text-left pt-4 border-t border-gray-100">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                  technical details
                </summary>
                <div className="mt-3 space-y-2">
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <div className="font-medium text-gray-700 mb-1">
                      Message
                    </div>
                    <div className="font-mono text-gray-600">
                      {error.message}
                    </div>
                  </div>
                  {error.stack && (
                    <div className="bg-gray-50 p-2 rounded text-xs">
                      <div className="font-medium text-gray-700 mb-1">
                        Stack
                      </div>
                      <pre className="font-mono text-gray-600 whitespace-pre-wrap overflow-auto max-h-24">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-100 p-6 text-center">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-light text-gray-900 mb-1">
                Unknown Error
              </h1>
              <p className="text-sm text-gray-500">
                An unexpected error occurred
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  ← go back
                </button>
                <NavLink
                  to="/"
                  prefetch="viewport"
                  viewTransition
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm text-center"
                >
                  ← back to stories
                </NavLink>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  reload page
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  logout
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reportError}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  report issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
