import { Settings } from '../types'
import store from './store/index'

type HAData = Record<string, string>
type HAResponse = Promise<unknown>

let state: Settings = {
  apiBaseUrl: '',
  apiToken: '',
}

const updateState = async (): Promise<void> => {
  state = (await store.get(['apiBaseUrl', 'apiUrl'])) as Settings
}

const request = async (path: string, options = {}): HAResponse => {
  await updateState()
  try {
    const response = await fetch(`${state.apiBaseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${state.apiToken}`,
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
const post = (url: string, options) => request(url, { ...options, method: 'post' })

export const getRoot = (): HAResponse => get('/')
export const postService = (domain: string, service: string, data: HAData): HAResponse =>
  post(`/services/${domain}/${service}`, { body: JSON.stringify(data) })
