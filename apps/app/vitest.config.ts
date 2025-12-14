/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['tests/**/*.{spec,test}.?(c|m)[jt]s?(x)'],
    environment: 'happy-dom',
  },
})
