/// <reference types="vite/client" />

import { lingui } from '@lingui/vite-plugin'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import { imagetools } from 'vite-imagetools'
import { plugin, Mode } from 'vite-plugin-markdown'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import { reactRouter } from '@react-router/dev/vite'
import { qrcode } from 'vite-plugin-qrcode'
import Unimport from 'unimport/unplugin'
import macrosPlugin from 'vite-plugin-babel-macros'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite'
// import babel from 'vite-plugin-babel'

const ReactCompilerConfig = {
  /* ... */
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/app' } },

  plugins: [
    // valiadte .env variables, see https://github.com/Julien-R44/vite-plugin-validate-env
    ValidateEnv({}),
    tailwindcss(),
    reactRouter(),
    macrosPlugin(),
    lingui(),
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
      defaultStyle: 'vertical-align: middle;',
      defaultClass: 'inline-block',
    }),
    Inspect(),
    // add `declare module "@/content/*"` to vite-env.d.ts to use with typescript
    plugin({
      mode: [Mode.HTML, Mode.MARKDOWN, Mode.TOC, Mode.REACT],
    }),
    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    imagetools(),
    qrcode(),
    Unimport.vite({
      presets: ['react', 'vitest'],
      dirs: [
        './app/components/**',
        './app/globals/**',
        './app/middlewares/**',
        './app/stores/**',
        './app/queries/**',
      ],
      dts: true,
    }),
  ],
})
