import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enable Prettier rules
    },
    ignores: [
      '**/node_modules/**', // Ignore node_modules
      '**/dist/**',         // Ignore dist folder
    ],
  },
];
