import { Condition } from './../../../types/index'
import { Action, AlpineDispatch, Condition, Init, Rule } from '../../../types'
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

const createAction = (): Action => ({
  id: 'scene-turn-on',
  data: {},
})

const createFields = (): Rule => ({
  id: '',
  name: '',
  enabled: false,
  conditions: [createCondition()],
  actionOn: createAction(),
  actionOff: createAction(),
})

window.$rule = function () {
  return {
    ...createForm(),
    actionOffShown: false,
    actionOnShown: false,
    conditionsShown: false,
    fields: createFields(),
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
    onActionOn() {
      this.actionOnShown = !this.actionOnShown
    },
    onActionOff() {
      this.actionOffShown = !this.actionOffShown
    },
    onConditions() {
      console.log(this.conditionsShown)
      this.conditionsShown = !this.conditionsShown
    },
    async onDelete($dispatch) {
      if (this.isEdit()) {
        await rules.remove(this.fields.id)
        $dispatch('to', { name: 'rules' })
      }
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
    const { page } = await store.get('page')
    if (page?.params.id) {
      // TODO: back to rules if rule is not found
      this.fields = await rules.get(page.params.id)
    }
  }
}
