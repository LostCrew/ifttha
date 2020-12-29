import * as api from './api'
import { all as allRules } from './store/rules'
import { onValidChange } from './store/settings'

const listenerMap = new Map()

const turnOnScene = (scene: string) => api.postService('scene', 'turn_on', { entity_id: scene })

const enableRules = async () => {
  const rules = await allRules()
  rules.forEach(rule => {
    const listeners = listenerMap.has(rule.id) ? listenerMap.get(rule.id) : new Map()
    if (rule.if === 'fullscreen') {
      const handler = async () => {
        const scene = document.fullscreenElement ? rule.thenOn : rule.thenOff
        await turnOnScene(scene)
      }
      listeners.set('fullscreen', handler)
      document.addEventListener('fullscreenchange', handler)
    }
  })
}

const disableRules = () => {
  // test
}

onValidChange(
  valid => {
    if (valid) {
      enableRules()
    } else {
      disableRules()
    }
  },
  { immediate: true }
)
