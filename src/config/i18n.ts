import { i18n } from '@lingui/core'

export type Locale = 'ar' | 'en'

export const locale = {
    locales: {
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
    },
    get value() {
        return (localStorage.getItem('locale') || navigator.language.slice(0, 2) || navigator.language[0].slice(0, 2)) as Locale
    },
    async set(value: Locale) {
        // load and activate local
        const { messages } = await import(`../locales/${value}.po`)
        i18n.load(value, messages)
        i18n.activate(value)

        // change page direction
        document.documentElement.setAttribute('lang', value)
        document.documentElement.setAttribute('dir', this.locales[value].direction)

        // set localStorage
        localStorage.setItem('locale', value)
    }
}

// load default language
await locale.set(locale.value)