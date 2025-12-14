<p align='center'>
  <img src='https://api.iconify.design/carbon:chart-radar.svg?color=%23939598' alt='Reactive - Opinionated Vite Starter Template' width='80'/>
</p>

<p align='center'>
Mocking up web app with <b>Reactive</b><br>
</p>

<br>

<p align='center'>
<a href="https://reactive-template.netlify.app/">Live Demo</a>
<a href="https://reactive-docs.netlify.app/">Docs</a>
</p>

<br>

## Features

- ⚡️ [React 19](https://react.dev/), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂️ [File based routing with layouts support](https://reactrouter.com/dev/how-to/file-route-conventions)

- 📦 [Components auto importing](./app/components)

- 🔮 [State Management via Tawr](https://www.npmjs.com/package/@tawr/state)

- 🎨 [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework packed with classes

- 😃 [Use icons from any icon sets with components](https://github.com/unplugin/unplugin-icons)

- 🔤 [Self-hosted fonts](https://fontsource.org/fonts/red-hat-text/install).

- 🌍 [I18n ready](https://lingui.dev/)

<!-- - 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) -->

- 🗒 [Markdown Support](https://github.com/hmsk/vite-plugin-markdown?tab=readme-ov-file)

- 🏷️ [Manage meta tsgs](https://react.dev/blog/2024/04/25/react-19#support-for-metadata-tags)

- 🖼 [Transform and Optmize images](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite)

- 🦾 TypeScript, of course

- 🐶 Git hooks with [lefthook](https://github.com/evilmartians/lefthook)

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)<!--, E2E Testing with [Cypress](https://cypress.io/)
  on [GitHub Actions](https://github.com/features/actions) # miss ci piplines and e2e test-->

- 🔎 Inspect code with - [Vite Inspect](https://github.com/antfu/vite-plugin-inspect), visit it at `/__inspect`. also open components in editor with React DevTools.

<br>

## Try it now!

> Reactive requires Node >=20.x

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/wusaby-rush/reactive/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit ws-rush/reactive my-reactive-app
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
