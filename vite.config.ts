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

async function isFileExist(filePath) {
  try {
    await fs.stat(filePath);
    return true; // File exists
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false; // File does not exist
    } else {
      throw error; // Other error occurred
    }
  }
}

async function getFiles(directory, pattern) {
  try {
    const files = await fs.readdir(directory);
    let matchingFiles = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // If it's a directory, get the files in that directory
        const subdirectoryFiles = await fs.readdir(filePath);
        const matchingSubdirectoryFiles = subdirectoryFiles
          .filter(subItem => pattern.test(subItem))
          .map(subItem => path.join(filePath, subItem));

        matchingFiles = matchingFiles.concat(matchingSubdirectoryFiles);
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

function buildRoutesMap(strings, appDirectory, level = 0,) {
  const result = [];
  let intenalImports = ""

  const firstSegments = new Set(
    strings
      .map(str => str.split('.')[level].replace('/route', ''))
      .filter(str => str !== undefined && str !== 'tsx' && str !== 'lazy')
  );

  if (firstSegments.size === 0) {
    return { routesMap: result };
  }

  const reversedSegments = Array.from(firstSegments).reverse();

  for (let segment of reversedSegments) {
    const filteredStrings = strings
      .filter(str => str.split('.')[level] === segment || str.split('.')[level] === `${segment}/route`)

    const routePath = segment.replace(/\(([^)]*)\)\??$/, '$1?').replace(/\$+$/, '*').replace(/^\$/, ':');

    if (filteredStrings.length === 0) {
      continue;
    }

    const newNode = {};

    if (routePath === '_index') {
      newNode.index = true;
    } else if (!routePath.startsWith('_')) {
      newNode.path = routePath;
    }

    const page = filteredStrings.find(str => 
      str.endsWith(`${segment}.tsx`) ||
      str.endsWith(`${segment}/route.tsx`)
    );

    const lazyPage = filteredStrings.find(str => 
      str.endsWith(`${segment}.lazy.tsx`) ||
      str.endsWith(`${segment}/route.lazy.tsx`)
    );

    if (lazyPage) {
      const absolutePath = path.resolve(__dirname, appDirectory, `routes/${lazyPage}`)
      newNode.lazy = `ImportStart'${absolutePath}'ImportEnd`;
    }

    if (page) {
      const random = Math.floor(Math.random()*100000+1)
      const absolutePath = path.resolve(__dirname, appDirectory, `routes/${page}`)
      intenalImports += `import * as route${random} from '${absolutePath}'\n`;
      newNode.spread = `SpreadStartroute${random}SpreadEnd`;
    }

    const { routesMap, imports } = buildRoutesMap(filteredStrings, appDirectory ,level + 1);
    if (routesMap.length > 0) newNode.children = routesMap;
    if (imports) intenalImports += imports

    if (segment.endsWith('_')) {
      const slicedSegment = segment.slice(0, -1)
      routesMap.forEach(node => {
        result.push({ ...node, path: node.index ? slicedSegment : `${slicedSegment}/${node.path}` })
      })
    } else {
      result.push(newNode);
    }
  }

  return { routesMap: result, imports: intenalImports };
}

export function remixRouter({ appDirectory } = { appDirectory: './app' }) {

  return {
    name: 'vite-plugin-remix-router',
    enforce: 'pre',
    async resolveId(source) {
      if (source === 'virtual:routes') {
        return source;
      }
    },
    async load(id) {
      if (id === 'virtual:routes') {
        const files = await listFiles(appDirectory + '/routes')
        let { routesMap, imports } = buildRoutesMap(files, appDirectory)

        if (await isFileExist(appDirectory + '/root.lazy.tsx')) {
          const absolutePath = path.resolve(__dirname, appDirectory, 'root.lazy.tsx')
          routesMap = [{
            path: '/',
            lazy: `ImportStart${absolutePath}ImportEnd`,
            children: routesMap
          }]
        } else if (await isFileExist(appDirectory + '/root.tsx')) {
          const absolutePath = path.resolve(__dirname, appDirectory, 'root.tsx')
          imports += `import * as root from '${absolutePath}'\n`
          routesMap = [{
            path: '/',
            spread: `SpreadStartrootSpreadEnd`,
            children: routesMap
          }]
        }
  
        const routesObject = JSON.stringify(routesMap)
          .replace(/"ImportStart/g, '() => import(')
          .replace(/ImportEnd"/g, ')')
          .replace(/"spread":"SpreadStart/g, '...')
          .replace(/SpreadEnd"/g, '')
        console.log(JSON.stringify(routesObject, null, 2))

        const routesCode = `${imports}\nexport const routes = ${routesObject}`
        return routesCode
      }
    },
  };
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
    remixRouter({ appDirectory: './src' }),
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
