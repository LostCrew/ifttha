import { HAResponse, Settings } from '..//types'
import { get } from '../store'
import { keys as settingsKeys } from '../store/settings'

let settings: Settings = Object.fromEntries(settingsKeys.map(key => [key, ''])) as Settings

const updateState = async (): Promise<void> => {
  settings = (await get(settingsKeys)) as Settings
}

export default async (path: string, options = {}): HAResponse => {
  await updateState()
  try {
    const response = await fetch(`${settings.apiBaseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${settings.apiToken}`,
        'Content-Type': 'application/json'
      },
      ...options
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}
