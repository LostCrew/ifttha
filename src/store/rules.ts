import filter from 'lodash/filter'
import { v4 as uuid } from 'uuid'

import { Rules, Rule, RuleID } from '../types'
import * as store from './index'

const keyPrefix = 'rule-'
const getKey = (id: RuleID) => `${keyPrefix}${id}`

export const all = async (): Promise<Rules> => {
  const state = (await store.get([])) as Object
  const predicate = (value: Rule, key: RuleID): boolean => key.startsWith(keyPrefix)
  const filtered = filter(state, predicate) as Object
  return Object.values(filtered)
}

export const get = async (id: RuleID): Promise<Rule> => {
  const key = getKey(id)
  const state = await store.get(key)
  return state[key]
}

export const add = async (data: Rule): Promise<unknown> => {
  const id = uuid()
  const key = getKey(id)
  data.id = id
  return store.set({ [key]: data })
}

export const update = async (id: RuleID, data: Partial<Rule>): Promise<unknown> => {
  const key = getKey(id)
  const rules = await store.get(key)
  const rule = rules[key] as Rule
  if (!rule) {
    return
  }
  const updated = Object.assign(rule, data)
  return store.set({ [key]: updated })
}
export const remove = (id: RuleID) => store.remove(getKey(id))
