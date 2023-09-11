import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import UnoCSS from 'unocss/vite'
import Unfonts from 'unplugin-fonts/vite'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [
    react(), 
    generouted(),
    UnoCSS(),
    Inspect(), 
    Unfonts({ fontsource: { families: ['Lato'] } }),
    AutoImport({
      imports: [
        'react', 
        'react-router-dom',
        {
          '@generouted/react-router': ['Routes']
        }
      ],
      dirs: [
        "src/components/**",
      ],
      defaultExportByFilename: true,
      dts: true,
      injectAtEnd: true,
      eslintrc: { enabled: true }
    })
  ],
})
