const pluginJs = require('@eslint/js');
const pluginJest = require('eslint-plugin-jest');
const tseslint = require('typescript-eslint');

module.exports = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '**/*.{js,mjs,cjs,ts}',
    ],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'eslint.config.js',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-console': 'warn',
      'no-undef': 'off',
      'quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    }
  }
];