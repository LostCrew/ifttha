export type AlpineDispatch = (event: string, data: Record<string, unknown>) => unknown

export type ComponentInit = () => () => Promise<void>

export type RuleID = string

export type Rule = {
  id: RuleID
  name: string
  enabled: boolean
  if: string
  thenOn: string
  thenOff: string
}

export type Rules = Rule[]

export type Settings = {
  apiBaseUrl: string
  apiToken: string
}
