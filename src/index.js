import 'webextension-polyfill'

import * as api from './api'

const turnOnScene = async name => {
  const response = await api.postService('scene', 'turn_on', { entity_id: `scene.${name}` })
  console.log(response)
}

const init = async () => {
  try {
    await api.init()
    document.addEventListener('fullscreenchange', async () => {
      const scene = document.fullscreenElement ? 'living_room_night' : 'living_room_dusk'
      turnOnScene(scene)
    })
  } catch (err) {
    console.log(err)
  }
}

init()
