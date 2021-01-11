import { v4 as uuid } from 'uuid'

import { Rule } from '../types'

export const rules = (): Rule => ({
  id: uuid(),
  name: 'Netflix',
  enabled: false,
  conditions: ['fullscreen'],
  actionOn: 'scene.living_room_night',
  actionOff: 'scene.living_room_dusk',
})
