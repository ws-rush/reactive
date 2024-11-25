import { useNavigate, useParams } from '@remix-run/react'

type RouteParameters = {
  [key: string]: string | undefined
  lang?: string
}

// Type for the localized navigate function
type LocalizedNavigateFunction = (
  to: string | number,
  options?: {
    replace?: boolean
    state?: never
  }
) => void

export const useLocalizedNavigate = (): LocalizedNavigateFunction => {
  const navigate = useNavigate()
  const { lang } = useParams<RouteParameters>()

  const localizedNavigate: LocalizedNavigateFunction = (to, options?) => {
    // If 'to' is a number, treat it as a relative navigation (go back/forward)
    if (typeof to === 'number') {
      navigate(to)
      return
    }

    // Construct the localized path
    const localizedPath = lang ? `/${lang}${to}` : to
    navigate(localizedPath, options)
  }

  return localizedNavigate
}
