import { i18n } from '@lingui/core'

export type Locale = {
  direction: 'rtl' | 'ltr'
  label: string
  locale: string
}

type LocaleInteface = {
  get availableLocales(): string[]
  locales: Record<string, Locale>
  set: (value: string) => Promise<void>
  toggleLocales: () => Promise<void>
  get value(): string
}

export const locale: LocaleInteface = {
  get availableLocales() {
    return Object.keys(this.locales)
  },
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
    // load and activate locale
    const { messages } = await import(`../../locales/${value}.po`)
    i18n.load(value, messages)
    i18n.activate(value)

    // change page direction
    document.documentElement.setAttribute('lang', value)
    document.documentElement.setAttribute('dir', this.locales[value].direction)

    // set localStorage
    localStorage.setItem('locale', value)
  },
  async toggleLocales() {
    const locales = locale.availableLocales
    const newLocale =
      locales[(locales.indexOf(locale.value) + 1) % locales.length]

    await locale.set(newLocale)
  },
  get value() {
    return (
      localStorage.getItem('locale') ||
      navigator.language.slice(0, 2) ||
      navigator.language[0].slice(0, 2)
    )
  },
}
