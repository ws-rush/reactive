import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    transformerVariantGroup,
  } from 'unocss'
  
  export default defineConfig({
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
    ],
    transformers: [
      transformerVariantGroup(),
    ],
  })