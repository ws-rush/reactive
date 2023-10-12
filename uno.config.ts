import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerVariantGroup,
  } from 'unocss'
  
  export default defineConfig({
    theme: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Lato', 'serif'],
      }
    },
    presets: [
      presetUno(),
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