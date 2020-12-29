import { AlpineDispatch, ComponentInit } from '../../../types'
import * as rules from '../../store/rules'
import createForm, { Component as FormComponent } from './form'

type Methods = {
  onDelete: ($dispatch: AlpineDispatch) => Promise<void>
  isEdit: () => boolean
  onReset: ($dispatch: AlpineDispatch) => void
}

type Component = FormComponent & Methods

declare global {
  interface Window {
    $rule: () => Component
    $ruleInit: ComponentInit
  }
}

window.$rule = function () {
  return {
    ...createForm(),
    fields: {
      id: '',
      name: '',
      enabled: false,
      if: '',
      thenOn: '',
      thenOff: '',
    },
    async onDelete($dispatch) {
      if (this.isEdit()) {
        await rules.remove(this.fields.id)
        $dispatch('to', { name: 'rules' })
      }
    },
    isEdit() {
      return this.fields.id
    },
    onReset($dispatch) {
      $dispatch('to', { name: 'rules' })
    },
    async onSubmit($dispatch) {
      this.submitted = true
      if (this.isValid()) {
        const data = { ...this.fields }
        if (!this.isEdit()) {
          await rules.add(data)
        } else {
          await rules.update(this.fields.id, data)
        }
        $dispatch('to', { name: 'rules' })
      }
    },
  }
}

window.$ruleInit = function () {
  return async function () {
    const { page } = await store.get('page')
    if (page?.params.id) {
      // TODO: back to rules if rule is not found
      this.fields = await rules.get(page.params.id)
    }
  }
}
