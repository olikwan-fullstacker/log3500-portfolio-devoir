import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // Fichiers React exécutés dans le navigateur
  {
    files: ['src/**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Fichiers exécutés par Node.js
  {
    files: [
      'server.js',
      'vite.config.js',
      'eslint.config.js',
    ],

    extends: [
      js.configs.recommended,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.node,
      },
    },
  },
])