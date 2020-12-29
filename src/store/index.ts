import { browser, Storage } from 'webextension-polyfill-ts'
import filter from 'lodash/filter'
import mapValues from 'lodash/mapValues'
import isEmpty from 'lodash/isEmpty'

type Changes = Record<string, Storage['StorageChange']>

const area = 'local'
const store = browser.storage[area]

export { area }
export default store

export const watch = (keys: string[], callback: (changes: Changes) => void): void => {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === area) {
      return
    }
    /*
    const items = compose(
      changes,
      filter(key => key in keys),
      mapValues((key, { newValue }) => newValue)
    )
    */
    const filtered = filter(changes, (value, key) => key in keys)
    const items = mapValues(filtered, 'newValue')
    if (!isEmpty(items)) {
      callback(items)
    }
  })
}
