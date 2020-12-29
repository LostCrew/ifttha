import isEqual from 'lodash/isEqual'

import { ComponentInit } from '../../types'
import store from '../store/index'
import { areValid as areSettingsValid } from '../store/settings'

type Page = {
  name: string
  params: Record<string, string>
}

type State = {
  page: Page
}

type Component = State & {
  isPage: (name: Page['name'], params: Page['params']) => boolean
  to: (name: Page['name'], params: Page['params']) => void
}

declare global {
  interface Window {
    $router: () => Component
    $routerInit: ComponentInit
  }
}

window.$router = function () {
  return {
    page: {
      name: 'rules',
      params: {},
    },
    isPage(name, params = {}) {
      const matchName = name === this.page.name
      const matchParams = isEqual(params, this.page.params)
      return matchName && matchParams
    },
    async to(name, params = {}) {
      await store.set({ page: { name, params } })
      this.page = { name, params }
    },
  }
}

window.$routerInit = function () {
  return async function () {
    const valid = await areSettingsValid()
    if (!valid) {
      this.to('settings')
    }
  }
}
