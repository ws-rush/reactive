import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactRefresh from 'eslint-plugin-react-refresh'
import mizdraLayoutShift from '@mizdra/eslint-plugin-layout-shift'
import sonarjs from 'eslint-plugin-sonarjs'
import deprecate from 'eslint-plugin-deprecate'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/dist',
      '**/build',
      '**/app/locales',
      '**/.react-router',
      '**/*.config.ts',
      '**/*.d.ts',
      '**/*.json',
      '**/pnpm-lock.yaml',
      '**/unimport.d.ts',
      '**eslint.config.js',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  ...fixupConfigRules(
    compat.extends(
      'canonical/auto',
      'plugin:sonarjs/recommended',
      'eslint:recommended',
      'plugin:react-hooks/recommended'
    )
  ),
  {
    plugins: {
      'react-compiler': reactCompiler,
      'react-refresh': reactRefresh,
      '@mizdra/layout-shift': mizdraLayoutShift,
      sonarjs: fixupPluginRules(sonarjs),
      deprecate,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      'react-refresh/only-export-components': [
        'off',
        {
          allowConstantExport: true,
        },
      ],

      'react-compiler/react-compiler': 'error',
      'no-undef': 'off',
      'prettier/prettier': 'off',
      'canonical/filename-match-exported': 'off',
      'func-style': 'off',
      'canonical/filename-match-regex': 'off',
      'react/function-component-definition': 'off',
      'canonical/id-match': 'off',
      'react/jsx-no-undef': 'off',
      'import/no-unassigned-import': 'off',
      'import/extensions': 'off',
      'react/forbid-component-props': 'off',
    },
  },
]
