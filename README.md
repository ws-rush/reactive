<p align='center'>
  <img src='https://user-images.githubusercontent.com/11247099/154486817-f86b8f20-5463-4122-b6e9-930622e757f2.png' alt='Vitesse - Opinionated Vite Starter Template' width='600'/>
</p>

<p align='center'>
Mocking up web app with <b>Vitesse</b><sup><em>(speed)</em></sup><br>
</p>

<br>

<p align='center'>
<a href="https://vitesse.netlify.app/">Live Demo</a>
</p>

<br>

## Features

- ⚡️ [React 18](https://react.dev/), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing with layouts support](https://github.com/oedotme/generouted) #miss modals implementation

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via zustand](https://github.com/pmndrs/zustand)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n ready](./locales)

- 🔎 [Component Preview](https://github.com/johnsoncodehk/vite-plugin-vue-component-preview)

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-vue-markdown)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)

- 🔤 [Self-hosted fonts](https://github.com/cssninjaStudio/unplugin-fonts)

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

<br>


## Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router](https://github.com/vuejs/router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.vuejs.org) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`unplugin-vue-macros`](https://github.com/sxzz/unplugin-vue-macros) - Explore and extend more macros and syntax sugar to Vue.
- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
- [`vite-plugin-vue-component-preview`](https://github.com/johnsoncodehk/vite-plugin-vue-component-preview) - Preview single component in VSCode
- [`vite-plugin-vue-markdown`](https://github.com/antfu/vite-plugin-vue-markdown) - Markdown as components / components in Markdown
  - [`markdown-it-shiki`](https://github.com/antfu/markdown-it-shiki) - [Shiki](https://github.com/shikijs/shiki) for syntax highlighting
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - unplugin for Vue I18n
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - Sitemap generator
- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively
- [`vite-plugin-webfont-dl`](https://github.com/feat-agency/vite-plugin-webfont-dl) - Zero-config webfont (Google Fonts) downloader and injector to improve website's performance.
- [`vite-plugin-vue-devtools`](https://github.com/webfansplz/vite-plugin-vue-devtools) - Designed to enhance the Vue developer experience.

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [Cypress](https://cypress.io/) - E2E testing
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [`vite-ssg`](https://github.com/antfu/vite-ssg) - Static-site generation
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Variations

As this template is strongly opinionated, the following provides a curated list for community-maintained variations with different preferences and feature sets. Check them out as well. PR to add yours is also welcome!

###### Official

- [vitesse-lite](https://github.com/antfu/vitesse-lite) - Lightweight version of Vitesse
- [vitesse-nuxt3](https://github.com/antfu/vitesse-nuxt3) - Vitesse for Nuxt 3
- [vitesse-nuxt-bridge](https://github.com/antfu/vitesse-nuxt-bridge) - Vitesse for Nuxt 2 with Bridge
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - WebExtension Vite starter template

###### Community

- [vitesse-ssr-template](https://github.com/frandiox/vitesse-ssr-template) by [@frandiox](https://github.com/frandiox) - Vitesse with SSR
- [vitailse](https://github.com/zynth17/vitailse) by [@zynth17](https://github.com/zynth17) - Like Vitesse but with TailwindCSS
- [vitesse-modernized-chrome-ext](https://github.com/xiaoluoboding/vitesse-modernized-chrome-ext) by [@xiaoluoboding](https://github.com/xiaoluoboding) - ⚡️ Modernized Chrome Extension Manifest V3 Vite Starter Template
- [vitesse-stackter-clean-architect](https://github.com/shamscorner/vitesse-stackter-clean-architect) by [@shamscorner](https://github.com/shamscorner) - A modular clean architecture pattern in vitesse template
- [vitesse-enterprise](https://github.com/FranciscoKloganB/vitesse-enterprise) by [@FranciscoKloganB](https://github.com/FranciscoKloganB) - Consistent coding styles regardless of team-size.
- [vitecamp](https://github.com/nekobc1998923/vitecamp) by [@nekobc1998923](https://github.com/nekobc1998923) - Like Vitesse but without SSG/SSR/File based routing, includes Element Plus
- [vitesse-h5](https://github.com/YunYouJun/vitesse-h5) by [@YunYouJun](https://github.com/YunYouJun) - Vitesse for Mobile
- [bat](https://github.com/olgam4/bat) by [@olgam4](https://github.com/olgam4) - Vitesse for SolidJS
- [vitesse-solid](https://github.com/xbmlz/vitesse-solid) by [@xbmlz](https://github.com/xbmlz) - Vitesse for SolidJS, build with [`SolidStart`](https://start.solidjs.com/), includes [UnoCSS](https://github.com/unocss/unocss) and [HopeUI](https://hope-ui.com/).

## Try it now!

> Vitesse requires Node >=14.18

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/antfu/vitesse/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit antfu/vitesse my-vitesse-app
cd my-vitesse-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `App.vue`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the vitesse image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t vitesse:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 vitesse:latest
```

## Why

I have created several Vite apps recently. Setting the configs up is kinda the bottleneck for me to make the ideas simply come true within a very short time.

So I made this starter template for myself to create apps more easily, along with some good practices that I have learned from making those apps. It's strongly opinionated, but feel free to tweak it or even maintain your own forks. [(see community maintained variation forks)](#variations)


# React + TypeScript + Vite

## libraries

>install devtools for every one later
>complete explain

- react-router-dom

- Vite Inspector
- Auto Import (react, react-router, layouts, views and components dirs)
- vite-plugin-top-level-await
- unocss (icons and __unocss)

- zustand
- @tanstack/react-query
- react-hook-form

TODO:

- configure router modals
- configure linguijs
- configure unplugin-images
- configure linter and prettier with package.json scripts
- configure testing frameworks

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## vite config

there is two ways to define configs

```js
import { defineConfig, loadEnv } from 'vite'
				  
// way one
export default defineConfig({})

// way two: command -> [build, serve, ....], mode -> [development, production], ssrBuild
export default defineConfig(({ command, mode, ssrBuild }) => {
   // if there await code here make it async
   // also we can load enviroment variables: mode -> which mode variables, cwd -> current working directory, '' -> vriables that which this string 
   const env = loadEnv(mode, process.cwd(), '')
   // return configs, it can be conditional, like diffrent config for diffrent modes
   return {}
})
```

## vite options

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig({
   /* 
   set serve url in dev mode, 
   if you integrate with backend project make `base` as static files of backend framework
   also may change `base` for deployment reasons
   notice: used absolute assets like src="/vite" will not work with new base, src='vite' will work with any
   */
   base: '/static', // default is `/`
   envPrefix: 'APP_', /* default is VITE_ */
   /* `direnv` mean `.env` files should be in directory `./direnv` */ 
   envDir: 'direnv', /* default is `.` */
   build: {
   /* support newer js versions (not recommanded) */
   target: 'es2022',
   /* generate manifest.json in build dir, to easier mapping for pwa and backend integration */
   manifest: true,
   /* specify build directory, can be'static/' for bakends like django */
   outDir: 'dist/',
   /* 
   set entrypoints for components, can be single entrypoint for entire app
   default is index.html and index.js in frontend if this option doesnt set
   when make more than one entrypoint we enable chuncks
   it is for more than one html file for all project
   */
   rollupOptions: {
      input: {
         main: '/src/main.jsx',
         warning: '/src/warning.jsx',
         refrsh: 'refresh.js',
      }
   }
   },
   /* enable source map for css, scss, ... */
   css: {
      devSourcemap: true
   },
   server: {
      port: 8080,
      /* if port used and true it will not run on the next port */
      strictPort: true,
      /* enable proxy if connect to api from other domain */
      proxy: {
         "/web": {
            target: "https://test.domain.com",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path
         },
      },
   },
   preview: {
      port: 8080,
      /* if port used and true it will not run on the next port */
      strictPort: true,
   },
   /* disable clear screen with every reboot */
   clearScreen: false,
   /* `info`, `warn`, `error`, `silent` */
   logLevel: 'silent', // default is `info`
   /* 
      add to tsconfig:
      "baseUrl": ".",
      "paths": { "@/*": ["src/*"] }, 
   */
   resolve: { alias: { '@': '/src' } },
})
```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
