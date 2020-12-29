import { v4 as uuid } from 'uuid'

import { Rule } from '../types'

export const rules = (): Rule => ({
  id: uuid(),
  name: 'Netflix',
  enabled: false,
  if: 'fullscreen',
  thenOn: 'scene.living_room_night',
  thenOff: 'scene.living_room_dusk',
})
