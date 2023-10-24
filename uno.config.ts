import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerVariantGroup,
  } from 'unocss'
import presetTheme from 'unocss-preset-theme'
  
export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Lato', 'serif'],
    }
  },
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetTheme({
      theme: {
        dark: {
          // put your theme here
        }
      }
    }),
    presetIcons({
      // prefix: '',
      // warn: true,
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Lato'
      }
    })
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})