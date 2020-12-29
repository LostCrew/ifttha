import filter from 'lodash/filter'
import { v4 as uuid } from 'uuid'

import { Rules, Rule, RuleID } from '../../types'
import store from './index'

const keyPrefix = 'rule-'
const getKey = (id: RuleID) => `${keyPrefix}${id}`

export const all = async (): Promise<Rules> => {
  const state = await store.get()
  const filtered = filter(state, (value, key) => key.startsWith(keyPrefix))
  return Object.values(filtered)
}

export const add = async (data: Rule): Promise<unknown> => {
  const id = uuid()
  const key = getKey(id)
  data.id = id
  return store.set({ [key]: data })
}

export const update = async (id: RuleID, data: Partial<Rule>): Promise<unknown> => {
  const key = getKey(id)
  const items = await store.get(key)
  const item = items[key]
  if (!item) {
    return
  }
  const updated = Object.assign(item, data)
  return store.set({ [key]: updated })
}
export const remove = (id: RuleID): Promise<unknown> => store.remove(getKey(id))
