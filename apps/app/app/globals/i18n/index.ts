import { i18n } from '@lingui/core'

export type Locale = {
  direction: 'rtl' | 'ltr'
  label: string
  locale: string
}

type LocaleInteface = {
  get availableLocale(): string[]
  default: string
  locales: Record<string, Locale>
  set: (value: string) => Promise<void>
  toggleLocales: () => Promise<void>
  get value(): string
}

export const locale: LocaleInteface = {
  get availableLocale() {
    return Object.keys(this.locales)
  },
  default: 'en',
  locales: {
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
  async set(value: string) {
    const localeValue = !value || !this.locales[value] ? this.value : value

    // load and activate locale
    const { messages } = await import(`../../locales/${localeValue}.po`)
    i18n.load(localeValue, messages)
    i18n.activate(localeValue)

    // change page direction
    document.documentElement.setAttribute('lang', localeValue)
    document.documentElement.setAttribute(
      'dir',
      this.locales[localeValue].direction
    )

    // set localStorage
    localStorage.setItem('locale', localeValue)
  },
  async toggleLocales() {
    const locales = locale.availableLocale
    const newLocale =
      locales[(locales.indexOf(locale.value) + 1) % locales.length]

    await locale.set(newLocale)
  },
  get value() {
    return localStorage.getItem('locale') || this.default
  },
}
