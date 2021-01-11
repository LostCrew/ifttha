import every from 'lodash/every'

import { Settings } from '../../types'
import store, { watch } from './index'

type Callback = (value: boolean, oldValue?: boolean) => void
type Options = {
  immediate?: boolean
}

const keys = ['apiBaseUrl', 'apiToken']
const validate = (settings: Settings): boolean => every(settings)

export { keys }

export const areValid = async (): Promise<boolean> => {
  const settings = (await store.get(keys)) as Settings
  return keys.every(key => key in settings) && validate(settings)
}

export const onValidChange = async (
  callback: Callback,
  { immediate }: Options = {}
): Promise<void> => {
  let valid = null
  if (immediate) {
    valid = await areValid()
    callback(valid)
  }
  watch(keys, newSettings => {
    const newValid = validate(newSettings as Settings)
    if (newValid !== valid) {
      callback(newValid, valid)
      valid = newValid
    }
  })
}
