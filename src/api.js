import { OPTIONS } from './constants'
import store from './store'

let state = {}

const updateState = async () => {
  state = await store.get(OPTIONS)
}

const request = async (path, options) => {
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
const post = (url, options) => request(url, { ...options, method: 'post' })

export const init = () => updateState()
export const getRoot = () => get('/')
export const postService = (domain, service, data) =>
  post(`/services/${domain}/${service}`, {
    body: JSON.stringify(data),
  })
