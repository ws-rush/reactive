/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { BrowserBuiltinProvider } from 'vitest/node'

export default defineConfig({
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['tests/**/*.{spec,test}.?(c|m)[jt]s?(x)'],
    browser: {
      enabled: true,
      provider: playwright() as unknown as BrowserBuiltinProvider,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  }
})
