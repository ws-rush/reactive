import { i18n } from '@lingui/core'

// load default language
let locale = navigator.language || navigator.language[0]
locale = locale.slice(0, 2)
const { messages } = await import(`../locales/${locale}.po`)
i18n.load(locale, messages)
i18n.activate(locale)

export default i18n