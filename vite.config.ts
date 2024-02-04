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
import { readdirSync } from 'fs'

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

function buildRoutesMap(baseDirectorry, list) {
  const result = {
    path: '/',
    lazy: `ImportStart'@/${'root'}.lazy.tsx'ImportEnd`,
    children: []
  };

  // Sort the list based on paths
  // list.sort();

  list.forEach(element => {
    let current = result;

    // split file name to array without extension
    const tree = element.split('.').slice(0, -1);
    
    // handle lazy routes
    let isLazyRoute = false
    if (tree.at(-1) === 'lazy') {
      tree.pop()
      isLazyRoute = true
    }
    console.log(tree)

    tree.forEach((child, index) => {
      const isLastChild = index === tree.length - 1;
      const item_name = child.replace('/route', '').replace(/\(([^)]*)\)\??$/, '$1?').replace(/\$+$/, '*').replace(/^\$/, ':');
      console.log(child, item_name)
      if (isLastChild) {
        const lazyImport = `ImportStart'@/routes/${element}'ImportEnd`;

        if (child.startsWith('_index')) {
          const existingChild = current.children.find(c => c.index);

          if (existingChild) {
            existingChild.lazy = lazyImport;
          } else {
            current.children.push({
              index: true,
              lazy: lazyImport
            });
          }
        } else {
          // const item_name = child.replace('/route', '').replace(/\(([^)]*)\)\??$/, '$1?').replace(/\$+$/, '*').replace(/^\$/, ':');
          const existingChild = current.children.find(c => c.path === item_name);

          if (existingChild) {
            existingChild.lazy = lazyImport;
          } else {
            current.children.push({
              path: item_name,
              lazy: lazyImport,
              children: []  // Initialize the children array for the leaf node
            });
          }
        }
      } else {
        let foundChild = current.children.find(c => c.path === child);

        if (!foundChild) {
          foundChild = {
            path: item_name,
            children: []
          };
          current.children.push(foundChild);
        }

        current = foundChild;
      }
    });
  });

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
        const routesMap = buildRoutesMap(baseDirectory, files);
        // console.log(JSON.stringify(routesMap, null, 2));

        const routesObject = JSON.stringify([routesMap])
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
