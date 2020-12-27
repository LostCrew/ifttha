import { SETTINGS } from '../constants'
import store from '../store'

window.$router = function () {
  return {
    page: {
      name: 'rules',
      params: {},
    },
    isPage(name, params = {}) {
      const matchName = name === this.page.name
      const matchParams =
        Object.keys(params).length > 0
          ? Object.entries(params).every(([key, value]) => this.page.params[key] === value)
          : true
      return matchName && matchParams
    },
    to(name, params = {}) {
      this.page = { name, params }
    },
  }
}

window.$routerInit = function () {
  return async function () {
    const state = await store.get(SETTINGS)
    this.$watch('page', page => {
      try {
        store.set({ page })
      } catch (err) {
        console.log(err)
      }
    })
    if (SETTINGS.some(setting => !state[setting])) {
      this.to('settings')
    }
  }
}
