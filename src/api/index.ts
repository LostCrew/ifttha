import { HAResponse, HADomain, HAService, HAData } from '../types'
import fetch from './fetch'

const get = fetch
const post = (url: string, options: RequestInit) => fetch(url, { ...options, method: 'post' })

export const getRoot = (): HAResponse => get('/')
export const postService = (domain: HADomain, service: HAService, data: HAData): HAResponse =>
  post(`/services/${domain}/${service}`, { body: JSON.stringify(data) })
