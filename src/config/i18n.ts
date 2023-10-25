import { i18n } from '@lingui/core'

export type Locale = 'ar' | 'en'

export const locales = {
    'ar': {
        label: 'العربية',
        direction: 'rtl',
        locale: 'ar'
    },
    'en': {
        label: 'English',
        direction: 'ltr',
        locale: 'en'
    }
}

// load default language
const locale = (localStorage.getItem('locale') || navigator.language.slice(0, 2) || navigator.language[0].slice(0, 2)) as Locale
setLocale(locale)

export async function setLocale(locale: Locale) {
    // load and activate local
    const { messages } = await import(`../locales/${locale}.po`)
    i18n.load(locale, messages)
    i18n.activate(locale)

    // change page direction
    document.documentElement.setAttribute('lang', locale)
    document.documentElement.setAttribute('dir', locales[locale].direction)

    // set localStorage
    localStorage.setItem('locale', locale)
}

export default i18n