import { ConditionID, Condition, Conditions, RuleID, Rule, Rules } from '../types'
import * as api from './api'

type ConditionMet = boolean
type ConditionState = { met: ConditionMet }
type RuleState = Record<ConditionID, ConditionState>
type AreAllMet = () => boolean

const state = new Map<RuleID, RuleState>() // TODO: define types

const turnOnScene = (scene: string) => api.postService('scene', 'turn_on', { entity_id: scene })

const addRuleState = (id: RuleID, conditions: Conditions) => {
  state.set(id, Object.fromEntries(conditions.map(({ id }) => [id, { met: false }])) as RuleState)
}

const createAreAllMet = (id: RuleID): AreAllMet => {
  const ruleState = state.get(id)
  return () => Object.values(ruleState).every(({ met }) => !!met) // TODO: use Proxy
}

const enableCondition = (condition: Condition, rule: Rule, areAllMet: AreAllMet) => {
  const callback = (met: boolean) => {
    const ruleState = state.get(rule.id)
    ruleState[condition.id].met = met
    const allMet = areAllMet()
    const scene = allMet ? rule.actionOn : rule.actionOff
    // TODO: customize this based on actions
    turnOnScene(scene)
  }
  switch (condition.id) {
    case 'fullscreen':
      document.addEventListener('fullscreenchange', () => {
        callback(!!document.fullscreenElement)
      })
      break
  }
}

const enableRule = (rule: Rule) => {
  addRuleState(rule.id, rule.conditions)
  const areAllMet = createAreAllMet(rule.id)
  rule.conditions.forEach(condition => enableCondition(condition, rule, areAllMet))
}

const disableRule = () => {
  // TODO
}

export const enableRules = (rules: Rules): void => rules.forEach(enableRule)
export const disableRules = (rules: Rules): void => rules.forEach(disableRule)
