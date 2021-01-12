module.exports = {
  env: {
    node: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    // '@vue/typescript',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  root: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
