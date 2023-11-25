/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import UnoCSS from 'unocss/vite'
import Unfonts from 'unplugin-fonts/vite'
import { imagetools } from 'vite-imagetools'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'
import AutoImport from 'unplugin-auto-import/vite'
import { lingui } from "@lingui/vite-plugin";
import { readdirSync } from 'fs'

function remixRouter() {

  const remixRouterGenerator = (element: string, path: string) => {
    const hasLazy = element.includes(".lazy.");
    const imports = !hasLazy ? `import * as ${element.slice(0, element.lastIndexOf("."))} from '${path}/${element}';` : ''
    const routes = []

    if (hasLazy) {
      routes.push({
        path: element.includes("root") ? '/' : element.slice(0, element.lastIndexOf(".")),
        lazy: `importStart'${path}/${element}'importEnd`,
      })
    } else {
      routes.push({
        path: element.includes("root") ? '/' : element.slice(0, element.lastIndexOf(".")),
        spread: `spreadStartrootspreadEnd`,
      })
    }

    console.log(routes)
    console.log(imports)

    // console.log(routes)
    return {
      routes,
      imports
    }

    // const files = readdirSync(`${path}/routes`)
  }
  return {
    name: 'vite-plugin-remix-router',
    enforce: 'pre',
    resolveId(source) {
      if (source === 'router:routes') {
        return source
      }
    },
    load(id) {
      // generate router from routes
      if (id === 'router:routes') {
        console.log('loading')
        const { routes, imports } = remixRouterGenerator('root.lazy.tsx', './src')
        const objectString = JSON.stringify(routes)
          .replace(/"importStart/g, '() => import(')
          .replace(/importEnd"/g, ')')
          .replace(/"spread":"spreadStart/g, '...')
          .replace(/spreadEnd"/g, '')
        const test = `${imports} export const routes = ${objectString}`
        return test
      }
    },
    transform(code, id) {
      if (id === 'router:routes') {
        console.log('transforming', code)
        return code
      }

      // if (id.endsWith('root.tsx')) {
      //   console.log('transforming', code)
      //   return code
      // }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  test: {
    environment: "happy-dom",
  },
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    remixRouter(),
    // generouted(),
    UnoCSS(),
    Inspect(),
    topLevelAwait(),

    Unfonts({
      fontsource: { 
        families: [{
          name: 'Lato',
          weights: [100,300,400,700,900]
        }] 
      } 
    }),

    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    imagetools(),

    AutoImport({
      imports: [
        'react', 
        'react-router-dom',
      ],
      dirs: [
        "src/components/**",
        "src/config/**",
      ],
      defaultExportByFilename: true,
      dts: true,
      injectAtEnd: true,
      eslintrc: { enabled: true }
    })
  ],
})
