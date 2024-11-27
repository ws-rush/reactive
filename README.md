<p align='center'>
  <img src='https://api.iconify.design/carbon:chart-radar.svg?color=%23939598' alt='Reactive - Opinionated Vite Starter Template' width='80'/>
</p>

<p align='center'>
Mocking up web app with <b>Reactive</b><br>
</p>

<br>

<p align='center'>
<a href="https://reactive-template.netlify.app/">Live Demo</a>
</p>

<br>

> linguijs have issue with `t` macro, use `<Trans>` micro as much as possible instead, until [issue](https://github.com/lingui/js-lingui/issues/1933) solverd

## Features

- ⚡️ [React 19](https://react.dev/), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂️ [File based routing with layouts support](https://reactrouter.com/dev/how-to/file-route-conventions)

- 📦 [Components auto importing](./app/components)

- 🔮 [State Management via Tawr](https://www.npmjs.com/package/tawr-state)

- 🎨 [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework packed with classes

- 😃 [Use icons from any icon sets with components](https://github.com/unplugin/unplugin-icons)

- 🔤 [Self-hosted fonts](https://fontsource.org/fonts/red-hat-text/install).

- 🌍 [I18n ready](https://lingui.dev/)

<!-- - 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) -->

- 📥 [APIs auto importing](https://github.com/unjs/unimport)

- 🗒 [Markdown Support](https://github.com/hmsk/vite-plugin-markdown?tab=readme-ov-file)

- 🏷️ [Manage meta tsgs](https://react.dev/blog/2024/04/25/react-19#support-for-metadata-tags)

- 🖼 [Transform and Optmize images](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite)

- 🦾 TypeScript, of course

- 🐶 Git hooks with [husky](https://typicode.github.io/husky)

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)<!--, E2E Testing with [Cypress](https://cypress.io/)
  on [GitHub Actions](https://github.com/features/actions) # miss ci piplines and e2e test-->

- ☁️ Deploy on Netlify, zero-config

- 🔎 Inspect code with - [Vite Inspect](https://github.com/antfu/vite-plugin-inspect), visit it at `/__inspect`. also open components in editor with React DevTools, and use [Tailwind CSS Devtools](https://chromewebstore.google.com/detail/tailwind-css-devtools/pgamkpjkbfldnmemhcbekimfdnjcgkco) for tailwind inspecting

- 📝 Mocking Server API with [json-server](https://github.com/yracnet/vite-plugin-json-server/tree/main)

> for component preview add [Preview.js](https://marketplace.visualstudio.com/items?itemName=zenclabs.previewjs) to vscode

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
- [ ] Remove tests and write your own

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
docker buildx build . -t reactive:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 reactive:latest
```

## Why

Configure apps is a headeach, I loved vitesse template for vue, so I decided do one for react.

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
