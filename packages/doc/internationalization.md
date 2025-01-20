---
outline: deep
---

# Internationalization

Reactive uses linguijs for internationalization (i18n) support, implemented through custom utilities in app/globals/i18n/.

::: danger
you should be carefull when change utilities in `app/globals`
:::

The framework supports two i18n modes:

* URL prefix mode (e.g., localhost:5173/en/products)
* LocalStorage mode (for applications where URL should remain unaffected)

## Adding Languages

Configure supported languages in app/globals/i18n/index.ts`

```ts{3-15}
{
  ...
  default: 'en', // Fallback Language
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
  ...
}
```

## Implementation Modes

Locale data loading is handled in app/root.tsx through the clientLoader function. The implementation differs based on your chosen mode:

::: code-group

```ts{1-3} [url-mode.ts]
export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  // read locale from url, if not provided use default locale
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
```

```ts{1-3} [localStorage-mode.ts]
export async function clientLoader() {
  // read locale from localStorage, if not provided use default locale
  const currentLocale = locale.value || locale.default

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
```

:::

::: warning
in `url mode` you should prefix all routes with name `($lang).` to read `params.lang` correctly, in `localStorage` mode you should remove this prefix from all routes
:::

## Smart Locale Detection

You can enhance the default locale fallback with more sophisticated detection strategies:

```ts
// Browser language detection
const urlLocale = params?.lang ||
      navigator.language.slice(0, 2) ||
      navigator.language[0].slice(0, 2)|| 
      locale.default

const localStorageLocale ||
      navigator.language.slice(0, 2) ||
      navigator.language[0].slice(0, 2) || 
      locale.default

// User preferences integration
const userPrefLocale = fetch(`/user/prefrences`).then(res => res.jsone()).locale

const urlLocale = params?.lang ||
      userPrefLocale ||
      locale.default

const localStorageLocale ||
      userPrefLocale ||
      locale.default
```

## Working with Translation Messages

### Adding Messages

Add translation messages in your code using linguijs syntax (see lingui docs for advanced use cases):

::: code-group

```tsx{2,5} [Welcome.tsx]
// Using t macro
import { t } from '@lingui/macro'

function Welcome() {
  return <h1>{t`Welcome to Reactive`}</h1>
}
```

```tsx{2,8-10} [Greeting.tsx]
// Using Trans component
import { Trans } from '@lingui/macro'

function Greeting() {
  const name = 'Rushied'
  const count = 5
  return (
    <Trans>
      Hello, {{ name }}! You have {{ count }} messages.
    </Trans>
  )
}
```

### Extracting Messages

After adding new messages, extract them to translation files:

```bash
pnpm run messages:extract
```

This command will:

1. Scan your codebase for translation messages
2. Update or create translation files (`.po` files) in `app/locales/`

### Translating Messages

You can edit the generated .po files using:

* Any text editor
* [Poedit](https://poedit.net/) (recommended for better translation management)

Example .po file content:

```po
#: src/components/Welcome.tsx:5
msgid "Welcome to Reactive"
msgstr "مرحباً بك في Reactive"

#: src/components/Greeting.tsx:8
msgid "Hello, {name}! You have {count} messages."
msgstr "مرحباً {name}! لديك {count} رسائل."
```

::: tip
Poedit provides a user-friendly interface for managing translations and helps maintain consistent translations across your application.
:::

After updating translations, rebuild your application to see the changes take effect.