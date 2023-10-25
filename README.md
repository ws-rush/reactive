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

- 🗂 [File based routing with layouts support](https://github.com/oedotme/generouted)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via zustand](https://github.com/pmndrs/zustand)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n ready](./locales)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) # not supported yet

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import)

- 🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg) # not implemeted

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-vue-markdown) # not implemented

- 🖼 [Transform and Optmize images](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite)

- 🔤 [Self-hosted fonts](https://github.com/cssninjaStudio/unplugin-fonts)

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions) # miss ci piplines

- ☁️ Deploy on Netlify, zero-config # not implemented

- 🔗 [Top Level Await](https://www.npmjs.com/package/vite-plugin-top-level-await) out of box

- 🔎 Inspect code with - [Vite Inspect](https://github.com/antfu/vite-plugin-inspect), and UnoCSS, visit them at `/__inspect` and `__unocss`. also open compnents in editor with [Alt + Right-Click](https://github.com/ArnaudBarre/vite-plugin-react-click-to-component)

>for component preview add [Preview.js](https://marketplace.visualstudio.com/items?itemName=zenclabs.previewjs) to vscode

<br>

## Try it now!

> Reactive requires Node >=14.18

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/wusaby-rush/reactive/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit wusaby-rush/reactive my-reactive-app
cd my-reactive-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Remove the `.github` folder
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:5173

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

Configure apps is a headeach, I loved vitesse template for vue, so I decided do one for react.

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

# TODO:

- configure linter and prettier with package.json scripts, docker, pipline
- SSG with Markdown
- SSR
- PWA
- consider self-hosted unplugin fonts
- consider linguijs with unplugin

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
