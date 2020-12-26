import { SETTINGS } from '../constants'
import store from '../store'

window.$tabs = function () {
  return {
    shown: 'rules',
    isShown(tab) {
      return tab === this.shown
    },
    show(tab) {
      this.shown = tab
    },
  }
}
window.$tabsInit = function () {
  return async function () {
    const state = await store.get(SETTINGS)
    if (SETTINGS.some(setting => !state[setting])) {
      this.shown = 'settings'
    }
  }
}
