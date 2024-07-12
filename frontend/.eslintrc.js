module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: [
    '@typescript-eslint', 
    'prefer-arrow', 
    'jsx-a11y', 
    'react'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'prefer-arrow/prefer-arrow-functions': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any' :'off'
  },
  settings: {
    react: {
        version: 'detect'
      }
  },
};
