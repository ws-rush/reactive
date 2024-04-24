/// <reference types="vitest" />

import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import { plugin, Mode } from 'vite-plugin-markdown'
import { pluginJsonServer } from 'vite-plugin-json-server'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'
import remixRouter from 'unplugin-remix-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    remixRouter(),
    lingui(),
    UnoCSS(),
    Inspect(),
    topLevelAwait(),

    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    plugin({ mode: [Mode.HTML, Mode.MARKDOWN, Mode.TOC, Mode.REACT] }),

    pluginJsonServer({
      profile: './db',
    }),

    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    imagetools(),

    AutoImport({
      defaultExportByFilename: true,
      dirs: ['app/components/**', 'app/config/**'],
      dts: true,
      eslintrc: { enabled: true },
      imports: ['react', 'react-router-dom'],
      injectAtEnd: true,
    }),
  ],
  resolve: { alias: { '@': '/app' } },
  test: {
    environment: 'happy-dom',
  },
})
