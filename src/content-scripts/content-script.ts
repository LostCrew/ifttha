import { all as allRules } from '../store/rules'
import { enableRules } from './manager' // disableRules
// import { onValidChange } from './store/settings'

const init = async () => {
  const rules = await allRules()
  enableRules(rules)
}

// onValidChange(
//   valid => {
//     if (valid) {
//       enableRules()
//     } else {
//       disableRules()
//     }
//   },
//   { immediate: true }
// )

init()
