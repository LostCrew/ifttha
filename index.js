import * as api from './api'

const turnOnScene = async name => {
  const response = await api.postService('scene', 'turn_on', { entity_id: `scene.${name}` })
  console.log(response)
}

console.log('IFTTHA running!')
document.addEventListener('fullscreenchange', async () => {
  try {
    const scene = document.fullscreenElement ? 'living_room_night' : 'living_room_dusk'
    await turnOnScene(scene)
  } catch (err) {
    console.log(err)
  }
})
