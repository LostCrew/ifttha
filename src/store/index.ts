import { browser, Storage } from 'webextension-polyfill-ts'
import filter from 'lodash/filter'
import mapValues from 'lodash/mapValues'
import isEmpty from 'lodash/isEmpty'

type Changes = Record<string, Storage['StorageChange']>
type StorageGetKeys = string | string[] | Object | null
type StorageSetItems = Object
type StorageRemoveKeys = string | string[]
// type StorageCallback = (items: { [key: string]: any }) => void

const area = 'local'
const storage = (chrome || browser).storage[area]

export const get = (keys: StorageGetKeys): Promise<{ [key: string]: any }> =>
  new Promise(resolve => storage.get(keys, resolve))
export const set = (items: StorageSetItems): Promise<null> =>
  new Promise(resolve => storage.set(items, resolve.bind(null, null)))
export const remove = (keys: StorageRemoveKeys): Promise<null> =>
  new Promise(resolve => storage.remove(keys, resolve.bind(null, null)))

export { area }
export const watch = (keys: string[], callback: (changes: Changes) => void): void => {
  ;(chrome || browser).storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== area) {
      return
    }
    const filtered = filter(changes, (value, key) => key in keys)
    const items = mapValues(filtered, 'newValue')
    if (!isEmpty(items)) {
      callback(items)
    }
  })
}
