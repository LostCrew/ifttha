<template>
  <RouterLink
    v-bind="$attrs"
    class="flex items-center px-3 py-2 rounded-full border cursor-pointer text-sm uppercase font-bold transition-colors duration-150 ease-out hover:border-gray-400"
    :class="{
      'bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600': type === 'outline'
    }"
  >
    <slot />
  </RouterLink>
</template>

<script>
import { defineComponent } from 'vue'

const types = ['outline', 'primary']

export default defineComponent({
  props: {
    type: {
      type: String,
      validator: value => types.includes(value),
      default: 'outline'
    }
  }
})
</script>
