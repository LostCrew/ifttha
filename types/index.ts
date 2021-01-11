export type AlpineDispatch = (event: string, data: Record<string, unknown>) => unknown
export type Init = () => () => Promise<void>
export type RuleID = string
export type ConditionID = 'fullscreen'
export type ConditionData = Record<string, unknown>
export type Condition = {
  id: ConditionID
  data?: ConditionData
}
export type Conditions = Condition[]

export type Rule = {
  id: RuleID
  name: string
  enabled: boolean
  conditions: Conditions
  actionOn: string
  actionOff: string
}

export type Rules = Rule[]

export type Settings = {
  apiBaseUrl: string
  apiToken: string
}
