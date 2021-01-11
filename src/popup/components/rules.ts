import { Init, Rules } from '../../../types'
import { all, update } from '../../store/rules'

type State = {
  rules: Rules
}

type Component = State & {
  setEnabled: (id: string, enabled: boolean) => Promise<void>
}

declare global {
  interface Window {
    $rules: () => Component
    $rulesInit: Init
  }
}

window.$rules = function () {
  return {
    rules: [],
    async setEnabled(id, enabled) {
      await update(id, { enabled })
    },
  }
}

window.$rulesInit = function () {
  return async function () {
    const rules = await all()
    this.rules = rules
  }
}
