import { v4 as uuid } from 'uuid'

import store from '../store'

// const mockRules = function () {
//   if (this.rules.length === 0) {
//     this.rules.push({
//       id: uuid(),
//       name: 'Netflix',
//       enabled: false,
//       if: 'fullscreen',
//       thenOn: 'scene.living_room_night',
//       thenOff: 'scene.living_room_dusk',
//     })
//   }
// }

window.$rules = function () {
  return {
    rules: [],
    set(id, data) {
      const rule = this.rules.find(rule => rule.id === id)
      if (rule) {
        Object.assign(rule, data)
      }
    },
  }
}

window.$rulesInit = function () {
  return async function () {
    const state = await store.get(['rules'])
    this.rules = state.rules || []
    this.$watch('rules', rules => {
      try {
        store.set({ rules })
      } catch (err) {
        console.log(err)
      }
    })
    // mockRules.call(this)
  }
}
