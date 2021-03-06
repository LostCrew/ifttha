import { Init } from '../../../types'
import store from '../../store'
import createForm, { Component as FormComponent } from './form'

type Component = FormComponent

declare global {
  interface Window {
    $settings: () => Component
    $settingsInit: Init
  }
}

window.$settings = function () {
  return {
    ...createForm(),
    fields: {
      apiBaseUrl: '',
      apiToken: '',
    },
    async onSubmit($dispatch) {
      this.submitted = true
      if (this.isValid()) {
        await store.set(JSON.parse(JSON.stringify(this.fields)))
        $dispatch('to', { name: 'rules' })
      }
    },
  }
}

window.$settingsInit = function () {
  return async function () {
    const state = await store.get(['apiBaseUrl', 'apiToken'])
    this.fields.apiBaseUrl = state.apiBaseUrl || ''
    this.fields.apiToken = state.apiToken || ''
  }
}
