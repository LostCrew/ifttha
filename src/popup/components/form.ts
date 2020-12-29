import { AlpineDispatch, Settings, Rule } from '../../../types'

type State = {
  submitted: boolean
}

type Methods = {
  hasFieldError: (key: string) => boolean
  isFieldValid: (key: string) => boolean
  isValid: () => boolean
  onSubmit?: ($dispatch: AlpineDispatch, $event: unknown) => void
}

type Field = {
  value: string | number | boolean
  required: boolean
}
type SettingsFields = Record<keyof Settings, Field>
type RuleFields = Record<keyof Rule, Field>

export type Component = State & Methods
export type ComponentArg = Partial<Methods> & { fields: SettingsFields | RuleFields }
export type Merged = () => Component & ComponentArg

export default function (): Component {
  return {
    submitted: false,
    hasFieldError(key) {
      return this.submitted && !this.isFieldValid(key)
    },
    isFieldValid(key) {
      return this.$el.elements[key].checkValidity()
    },
    isValid() {
      return this.$el.checkValidity()
    },
  }
}
