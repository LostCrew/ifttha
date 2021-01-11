import { AlpineDispatch, Condition, Init, Rule } from '../../../types'
import store from '../../store'
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
    $ruleInit: Init
  }
}

const createCondition = (): Condition => ({
  id: 'fullscreen',
  data: {},
})

const createFields = (): Rule => ({
  id: '',
  name: '',
  enabled: false,
  conditions: [createCondition()],
  actionOn: '',
  actionOff: '',
})

window.$rule = function () {
  return {
    ...createForm(),
    fields: createFields(),
    async onDelete($dispatch) {
      if (this.isEdit()) {
        await rules.remove(this.fields.id)
        $dispatch('to', { name: 'rules' })
      }
    },
    addCondition() {
      const condition = createCondition()
      return this.fields.conditions.push(condition)
    },
    haveOneCondition() {
      return this.fields.conditions.length === 1
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
        const data = JSON.parse(JSON.stringify(this.fields))
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
    try {
      const { page } = await store.get('page')
      console.log(page)
      if (page?.params.id) {
        // TODO: back to rules if rule is not found
        this.fields = await rules.get(page.params.id)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
