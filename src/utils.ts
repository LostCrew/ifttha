type Entry = [unknown, unknown]
type Entries = Entry[]

type Filter = (fn: (key: string, value: unknown) => boolean) => (entries: Entries) => Entries
type MapValues = (fn: (key: string, value: unknown) => unknown) => (entries: Entries) => Array<unknown>
type Modification = Filter | MapValues
type Compose = (object: Record<string, unknown>, ...fns: Array<Modification>) => Record<string, unknown>

export const filter: Filter = fn => entries => entries.filter(([key, value]) => fn(key, value))
export const mapValues: MapValues = fn => entries => entries.map(([key, value]) => [key, fn(key, value)])
export const compose: Compose = (object, ...fns) => {
  const entries = Object.entries(object)
  const modified = [...fns].reduce((acc, fn) => fn(acc), entries)
  return Object.fromEntries(modified)
}
