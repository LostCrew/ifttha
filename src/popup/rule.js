import store from '../store'

const createInitial = () => ({
  id: '',
  name: '',
  enabled: false,
  if: '',
  thenOn: '',
  thenOff: '',
})

window.$rule = function () {
  return {
    rule: createInitial(),
    toRemove: false,
    isSet(key) {
      return this.rule[key]
    },
    set(values) {
      Object.assign(this.rule, values)
    },
    remove() {
      this.toRemove = true
    },
  }
}

window.$ruleInit = function () {
  return async function () {
    const { page, rules } = await store.get(['page', 'rules'])
    const rule = rules.find(rule => rule.id === page.params.id)
    const index = rules.findIndex(rule => rule.id === page.params.id)
    this.rule = rule || createInitial()
    this.$watch('rule', value => {
      rules[index] = value
      try {
        store.set({ rules })
      } catch (err) {
        console.log(err)
      }
    })
    this.$watch('toRemove', value => {
      if (value) {
        rules.splice(index, 1)
        try {
          store.set({ rules })
        } catch (err) {
          console.log(err)
        }
      }
    })
  }
}
