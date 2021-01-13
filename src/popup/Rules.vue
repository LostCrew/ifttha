<template>
  <section class="px-4 py-3">
    <h2 class="text-xl">Rules</h2>
    <template v-if="rules.length > 0">
      <div class="flex justify-between items-center py-1" v-for="rule in rules" :key="rule.name">
        <div class="flex items-center overflow-hidden" :title="rule.name">
          <span
            x-text="rule.name"
            class="text-lg min-width overflow-ellipsis overflow-hidden"
          ></span>
          <RouterLink
            :to="`/rules/${rule.id}`"
            class="group cursor-pointer px-3 py-1"
            aria-label="Edit rule"
          >
            <img v-svg-inline src="../assets/edit.svg" aria-hidden="true" />
          </RouterLink>
        </div>
        <div class="flex-shrink-0 relative inline-block w-10 align-middle select-none">
          <input
            type="checkbox"
            :name="`rule-${rule.id}`"
            :id="`rule-${rule.id}`"
            class="absolute block w-6 h-6 -ml-1 rounded-full bg-white appearance-none cursor-pointer transition-all duration-150 ease-in transform toggle-checkbox"
            :checked="rule.enabled"
            @change="onEnableChange(rule.id, $event.target.checked)"
          />
          <label
            :for="`rule-${rule.id}`"
            class="block overflow-hidden h-4 mt-1 rounded-full bg-gray-400 cursor-pointer toggle-label transition-colors duration-150 ease-in"
          >
            <span class="sr-only">Turn rule on/off</span>
          </label>
        </div>
      </div>
    </template>
    <div class="py-3" v-else>
      <p>No rules yet!</p>
    </div>
    <div class="flex justify-end pt-2">
      <Button to="/add-rule">
        <img v-svg-inline src="../assets/plus.svg" aria-hidden="true" />
        Add rule
      </Button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// eslint-disable-next-line no-unused-vars
import { Rule, RuleID, Rules } from '../types'
import { all, update } from '../store/rules'

export default defineComponent({
  name: 'Rules',
  data() {
    return {
      rules: [] as Rules
    }
  },
  async created() {
    this.rules = await all()
  },
  methods: {
    onEnableChange(id: RuleID, enabled: Rule['enabled']) {
      update(id, { enabled })
    }
  }
})
</script>
