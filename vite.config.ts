/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import Unfonts from 'unplugin-fonts/vite'
import { imagetools } from 'vite-imagetools'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'
import AutoImport from 'unplugin-auto-import/vite'
import { lingui } from "@lingui/vite-plugin";

// get files in pattern
import { promises as fs } from 'fs';
import path from 'path';
import { normalizePath  } from 'vite'

async function getFiles(directory, pattern) {
  try {
    const files = await fs.readdir(directory);
    let matchingFiles = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // If it's a directory, recursively search for files
        matchingFiles = matchingFiles.concat(await getFiles(filePath, pattern));
      } else if (pattern.test(file)) {
        // If it's a file and matches the pattern, add it to the result
        matchingFiles.push(filePath);
      }
    }

    return matchingFiles;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function listFiles(baseDirectory: string) {
  // Define the patterns for matching files
  const topLevelPattern = /\.tsx$/;
  const subdirectoryPattern = /^route\.tsx$/;

  let result = []

  try {
    const topLevelFiles = await getFiles(baseDirectory, topLevelPattern);
    const subdirectoryFiles = await getFiles(baseDirectory, subdirectoryPattern);

    result.push(...topLevelFiles)
    result.push(...subdirectoryFiles)
  } catch (error) {
    console.error('Error:', error);
  }

  return result.map(path => normalizePath(path).replace('src/routes/', ''))
}

function buildRoutesMap(result, strings, level = 0) {
  const firstSegments = new Set(strings.map(str => str.split('.')[level].replace('/route', ''))
    .filter(str => str !== undefined)
    .filter(str => str !== 'tsx')
    .filter(str => str !== 'lazy'));

  if (firstSegments.size === 0) {
    return;
  }

  const reversedSegments = Array.from(firstSegments).reverse();

  for (const segment of reversedSegments) {
    const filteredStrings = strings.filter(str => (str.split('.')[level] === segment || str.split('.')[level] === `${segment}/route`)).reverse();
    const path = segment.replace(/\(([^)]*)\)\??$/, '$1?').replace(/\$+$/, '*').replace(/^\$/, ':')

    if (filteredStrings.length === 0) {
      continue;
    } else if (filteredStrings.length === 1 && (filteredStrings[0].endsWith(`${segment}.tsx`) || filteredStrings[0].endsWith(`${segment}.lazy.tsx`) || filteredStrings[0].endsWith(`${segment}/route.tsx`) || filteredStrings[0].endsWith(`${segment}/route.lazy.tsx`))) {
      // leaf can be in format (segment)[/route][.lazy].tsx
      console.log('---------------- leaf:', segment, filteredStrings);
      const newNode = {};
      if (path === '_index') newNode.index = true
      else newNode.path = path
      newNode.lazy = `ImportStart'@/routes/${filteredStrings[0]}'ImportEnd`
      result.push(newNode);
    } else {
      // parent can be in format (segment)[/route][.lazy].tsx
      console.log('---------------- parent:', segment, filteredStrings);
      const newNode = {}
      if (!segment.startsWith('_')) newNode.path = path;
      const layout = filteredStrings.find(str => (str.endsWith(`${segment}.tsx`) || str.endsWith(`${segment}.lazy.tsx`) || str.endsWith(`${segment}/route.tsx`) || str.endsWith(`${segment}/route.lazy.tsx`)));
      if (layout) newNode.lazy = `ImportStart'@/routes/${layout}'ImportEnd`;
      newNode.children = [];
      result.push(newNode);
      buildRoutesMap(result.find(c => JSON.stringify(c) === JSON.stringify(newNode)).children, filteredStrings, level + 1);
    }
  }

  return result;
}

function remixRouter({ baseDirectory } = { baseDirectory: 'src/routes' }) {
  return {
    name: 'vite-plugin-remix-router',
    enforce: 'pre',
    resolveId(source) {
      if (source === 'router:routes') {
        return source
      }
    },
    async load(id) {
      if (id === 'router:routes') {
        // generate router from routes
        const files = await listFiles(baseDirectory)
        const tree = [{
          path: '/',
          lazy: `ImportStart'@/root.lazy.tsx'ImportEnd`,
          children: []
        }]
        const routesMap = buildRoutesMap(tree[0].children, files)
        console.log(JSON.stringify(routesMap, null, 2));

        const routesObject = JSON.stringify(tree)
          .replace(/"ImportStart/g, '() => import(')
          .replace(/ImportEnd"/g, ')')
          // .replace(/"spread":"spreadStart/g, '...')
          // .replace(/spreadEnd"/g, '')

        const routesCode = `export const routes = ${routesObject}`
        return routesCode
      }
    },
    // transform(code, id) {
    //   if (id === 'router:routes') {
    //     console.log('transforming', code)
    //     return code
    //   }
    // }
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
