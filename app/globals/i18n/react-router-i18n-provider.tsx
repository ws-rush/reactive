/* eslint-disable react-compiler/react-compiler */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nProvider, type I18nProviderProps } from '@lingui/react'

let origNavigate: (to: string, options?: any) => void

export function ReactRouterI18nProvider(
  props: I18nProviderProps & { readonly mode: 'cookie' | 'url' }
) {
  if (props.mode === 'url') {
    // @ts-expect-error add window typing
    const dataRouter = window.__reactRouterDataRouter
    if (!origNavigate) origNavigate = dataRouter.navigate

    dataRouter.navigate = (to: string, options?: any) => {
      if (typeof to !== 'string') return origNavigate(to, options)

      if (options.replace) return origNavigate(to, options)

      const lang = dataRouter.state.matches[0].params?.lang
      const next =
        locale.availableLocales.includes(to.split('/')[1]) || !lang
          ? to
          : `/${lang}${to}`

      return origNavigate(next, options)
    }
  }

  return <I18nProvider {...props} />
}
