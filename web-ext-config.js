module.exports = {
  build: {
    overwriteDest: true
  },
  run: {
    firefox: 'firefox',
    firefoxProfile: 'default-release',
    pref: ['extensions.webextensions.tabhide.enabled=true'],
    startUrl: ['about:debugging'] // Open URLs on start
  },
  sourceDir: 'dist',
  verbose: false
}
