/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { imagetools } from 'vite-imagetools'
import { plugin, Mode } from 'vite-plugin-markdown'
import { pluginJsonServer } from 'vite-plugin-json-server'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'
import { vitePlugin as remix } from '@remix-run/dev'
import { qrcode } from 'vite-plugin-qrcode'
import Unimport from 'unimport/unplugin'
import babel from 'vite-plugin-babel'

const ReactCompilerConfig = {
  /* ... */
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/app' } },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['tests/**/*.{spec,test}.?(c|m)[jt]s?(x)'],
    environment: 'happy-dom',
  },

  plugins: [
    remix({
      ssr: false,
      future: {
        unstable_routeConfig: true,
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'], // if you use TypeScript
        plugins: [
          '@babel/plugin-syntax-jsx',
          ['babel-plugin-react-compiler', ReactCompilerConfig],
          'macros',
        ],
      },
    }),
    // macrosPlugin(),
    lingui(),
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
      defaultStyle: 'vertical-align: middle;',
      defaultClass: 'inline-block',
    }),
    Inspect(),
    topLevelAwait(),
    // add `declare module "@/content/*"` to vite-env.d.ts to use with typescript
    plugin({
      mode: [Mode.HTML, Mode.MARKDOWN, Mode.TOC, Mode.REACT],
    }),
    pluginJsonServer({
      profile: './db',
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
