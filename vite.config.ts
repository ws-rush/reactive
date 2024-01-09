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

async function main() {
  const baseDirectory = 'src/routes';

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

// convert files to routes
// function convertInputToOutput(list) {
//   const result = {
//     path: '/',
//     lazy: 'import(src/routes/root.tsx)',
//     children: []
//   };

//   // Sort the list based on paths
//   list.sort();

//   list.forEach(element => {
//     const tree = element.split('.').slice(0, -1);
//     let current = result;

//     tree.forEach((child, index) => {
//       const isLastChild = index === tree.length - 1;

//       if (isLastChild) {
//         if (element.startsWith('_index')) {
//           current.children.push({
//             index: true,
//             lazy: `import(src/routes/${element})`
//           });
//         } else {
//           const item_name = child.replace('/route', '');
//           const existingChild = current.children.find(c => c.path === item_name);

//           if (existingChild) {
//             current = existingChild;
//           } else {
//             current.children.push({
//               path: item_name,
//               lazy: `import(src/routes/${element})`,
//               // children: []  // Initialize the children array for the leaf node
//             });
//             current = current.children[current.children.length - 1];
//           }
//         }
//       } else {
//         let foundChild = current.children.find(c => c.path === child);

//         if (!foundChild) {
//           foundChild = {
//             path: child,
//             children: []
//           };
//           current.children.push(foundChild);
//         }

//         current = foundChild;
//       }
//     });
//   });

//   return result;
// }

function convertInputToOutput(list) {
  const result = {
    path: '/',
    lazy: 'import(src/routes/root.tsx)',
    children: []
  };

  // Sort the list based on paths
  list.sort();

  list.forEach(element => {
    const tree = element.split('.').slice(0, -1);
    let current = result;

    tree.forEach((child, index) => {
      const isLastChild = index === tree.length - 1;

      if (isLastChild) {
        const lazyImport = `import(src/routes/${element})`;

        if (element.startsWith('_index')) {
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
          const item_name = child.replace('/route', '');
          const existingChild = current.children.find(c => c.path === item_name);

          if (existingChild) {
            existingChild.lazy = lazyImport;
          } else {
            current.children.push({
              path: item_name,
              lazy: lazyImport,
              // children: []  // Initialize the children array for the leaf node
            });
          }
        }
      } else {
        let foundChild = current.children.find(c => c.path === child);

        if (!foundChild) {
          foundChild = {
            path: child,
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

    // console.log(routes)
    // console.log(imports)

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
    async load(id) {
      const files = await main()
      console.log(files)
      const routesObject = convertInputToOutput(files);
      console.log(JSON.stringify(routesObject, null, 2));
      // generate router from routes
      if (id === 'router:routes') {
        // console.log('loading')
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
        // console.log('transforming', code)
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
