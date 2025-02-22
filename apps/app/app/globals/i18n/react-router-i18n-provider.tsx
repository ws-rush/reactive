/* eslint-disable react-compiler/react-compiler */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from '@/routes'
import { I18nProvider, type I18nProviderProps } from '@lingui/react'

let origNavigate: (to: string, options?: any) => void

export function ReactRouterI18nProvider(
  props: I18nProviderProps & { readonly mode: 'cookie' | 'url' }
) {
  if (props.mode === 'url') {
    if (!origNavigate) origNavigate = router.navigate

    // @ts-expect-error fix later
    router.navigate = (to: string, options?: any) => {
      if (typeof to !== 'string') return origNavigate(to, options)

      if (options.replace) return origNavigate(to, options)

      const lang = router.state.matches[0].params?.lang
      const next =
        locale.availableLocale.includes(to.split('/')[1]) || !lang
          ? to
          : `/${lang}${to}`

      return origNavigate(next, options)
    }
  }

  return <I18nProvider {...props} />
}
