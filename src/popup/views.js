import { SETTINGS } from '../constants'
import store from '../store'

window.$views = function () {
  return {
    shown: 'rules',
    isShown(name) {
      return name === this.shown
    },
    show(name) {
      this.shown = name
    },
  }
}
window.$viewsInit = function () {
  return async function () {
    const state = await store.get(SETTINGS)
    if (SETTINGS.some(setting => !state[setting])) {
      this.shown = 'settings'
    }
  }
}
