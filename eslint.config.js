import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest'; // Import Jest plugin
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // Add Jest globals
      },
    },
    plugins: {
      prettier: prettierPlugin,
      jest: jestPlugin, // Add Jest plugin
    },
    rules: {
      'prettier/prettier': 'error', // Enable Prettier rules
      ...jestPlugin.configs.recommended.rules, // Include Jest's recommended rules
    },
    ignores: [
      '**/node_modules/**', // Ignore node_modules
      '**/dist/**', // Ignore dist folder
    ],
  },
];
