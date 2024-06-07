import {
  defineConfig,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss'
// import presetTheme from 'unocss-preset-theme'

export default defineConfig({
  presets: [
    presetUno(), // by default follow existinse of `.dark` class, to follow system only set ({ dark: 'media' })
    // presetTheme({
    //   theme: {
    //     dark: {
    //       // put your theme here
    //     },
    //   },
    // }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Lato',
      },
      provider: 'bunny',
    }),
  ],
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Lato', 'serif'],
    },
  },
  transformers: [transformerVariantGroup()],
})
