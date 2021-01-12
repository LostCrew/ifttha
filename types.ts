export type AlpineDispatch = (event: string, data: Record<string, unknown>) => unknown
export type Init = () => () => Promise<void>
export type RuleID = string
export type ConditionID = 'fullscreen'
export type ConditionData = Record<string, string>
export type Condition = {
  id: ConditionID
  data?: ConditionData
}
export type Conditions = Condition[]
export type ActionID = 'scene-turn-on'
export type ActionEntityID = string
export type ActionData = Record<string, ActionEntityID | string>
export type Action = {
  id: ActionID
  data?: ActionData
}

export type Rule = {
  id: RuleID
  name: string
  enabled: boolean
  conditions: Conditions
  actionOn: Action
  actionOff: Action
}

export type Rules = Rule[]

export type Settings = {
  apiBaseUrl: string
  apiToken: string
}
