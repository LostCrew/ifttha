import { SETTINGS } from '../constants'
import store from '../store'

window.$settings = function () {
  return {
    apiBaseUrl: '',
    apiToken: '',
    isSet(key) {
      return this[key]
    },
    set(key, value) {
      this[key] = value
    },
  }
}

window.$settingsInit = function () {
  const watcher = async (key, value) => {
    try {
      await store.set({ [key]: value })
    } catch (err) {
      console.log(err)
    }
  }

  return async function () {
    const state = await store.get(SETTINGS)
    this.apiBaseUrl = state.apiBaseUrl || ''
    this.apiToken = state.apiToken || ''
    this.$watch('apiBaseUrl', watcher.bind(this, 'apiBaseUrl'))
    this.$watch('apiToken', watcher.bind(this, 'apiToken'))
  }
}
