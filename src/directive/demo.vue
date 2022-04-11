<template>
  <div>
    <h1 v-format-time>{{ timestamp }}</h1>
  </div>
</template>

<script>
  import { ref } from "vue"
  export default {
    setup() {
      const timestamp = ref(1649386627664)
      return {
        timestamp
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>