module.exports = {
  env: {
    node: true,
    webextensions: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', '@vue/prettier', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  root: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
