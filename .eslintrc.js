module.exports = {
  env: {
    node: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  root: true,
  rules: {},
};
