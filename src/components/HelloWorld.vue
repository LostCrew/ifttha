<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script lang="ts">
export default {
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
