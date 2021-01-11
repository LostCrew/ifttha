import { Settings } from '../types'
import store from './store'
import { keys as settingsKeys } from './store/settings'

type HAData = Record<string, string>
type HAResponse = Promise<unknown>
type HADomain = string
type HAService = string

let settings: Settings = Object.fromEntries(settingsKeys.map(key => [key, ''])) as Settings

const updateState = async (): Promise<void> => {
  settings = (await store.get(settingsKeys)) as Settings
}

const request = async (path: string, options = {}): HAResponse => {
  await updateState()
  try {
    const response = await fetch(`${settings.apiBaseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${settings.apiToken}`,
        'Content-Type': 'application/json',
      },
      ...options,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const get = request
const post = (url: string, options: RequestInit) => request(url, { ...options, method: 'post' })

export const getRoot = (): HAResponse => get('/')
export const postService = (domain: HADomain, service: HAService, data: HAData): HAResponse =>
  post(`/services/${domain}/${service}`, { body: JSON.stringify(data) })
