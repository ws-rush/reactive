import { type I18n, i18n } from '@lingui/core'

export type LocaleEntry = {
  direction: 'rtl' | 'ltr'
  label: string
  locale: string
}

class Locale {
  private locales: Record<string, LocaleEntry>

  private defaultValue: string

  private mode: 'localStorage' | 'url'

  private i18nInstance: I18n

  private origNavigate?: (to: string, options?: { replace?: boolean }) => void

  public constructor(
    locales: Record<string, LocaleEntry>,
    defaultValue: string,
    mode: 'localStorage' | 'url',
    i18nInstance: I18n,
  ) {
    this.locales = locales
    this.defaultValue = defaultValue
    this.mode = mode
    this.i18nInstance = i18nInstance
  }

  private async loadLocale(localeValue: string) {
    // load and activate locale
    const { messages } = await import(`../../locales/${localeValue}.po`)
    i18n.load(localeValue, messages)
    i18n.activate(localeValue)

    // change page direction
    document.documentElement.setAttribute('lang', localeValue)
    document.documentElement.setAttribute(
      'dir',
      this.locales[localeValue].direction,
    )
  }

  public get i18n() {
    return this.i18nInstance
  }

  public async set(value: string) {
    const localeValue = !value || !this.locales[value] ? this.value : value

    await this.loadLocale(localeValue)
    // set localStorage
    localStorage.setItem('locale', localeValue)
  }

  public get default() {
    return this.defaultValue
  }

  public get availableLocale() {
    return Object.keys(this?.locales)
  }

  public get value() {
    return localStorage.getItem('locale') || this.default
  }

  public async toggleLocales() {
    const locales = this.availableLocale
    const currentIndex = locales.indexOf(this.value)
    const nextIndex = (currentIndex + 1) % locales.length
    const newLocale = locales[nextIndex]

    await this.set(newLocale)
  }

  public i18nRevalidate() {
    return ({ currentUrl, nextUrl }: { currentUrl: URL; nextUrl: URL }) =>
      currentUrl.pathname !== nextUrl.pathname && this.mode === 'url'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public navigateInterceptor(router: any) {
    if (!this.origNavigate) this.origNavigate = router.navigate
    return (to: string, options?: { replace?: boolean }) => {
      if (typeof to !== 'string' && this.origNavigate)
        return this.origNavigate(to, options)

      if (options && options.replace && this.origNavigate)
        return this.origNavigate(to, options)

      const lang = router.state.matches[0].params?.lang
      const next =
        this.availableLocale.includes(to.split('/')[1]) || !lang
          ? to
          : `/${lang}${to}`

      if (this.origNavigate) this.origNavigate(next, options)
      return true
    }
  }
}

export const locale = new Locale(
  {
    ar: {
      direction: 'rtl',
      label: 'العربية',
      locale: 'ar',
    },
    en: {
      direction: 'ltr',
      label: 'English',
      locale: 'en',
    },
  },
  'en',
  'url',
  i18n,
)
