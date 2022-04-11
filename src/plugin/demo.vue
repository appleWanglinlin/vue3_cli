<template>
  <div>

  </div>
</template>

<script>
import { getCurrentInstance } from "vue"

export default {
  setup () {
    const instance = getCurrentInstance()
    console.log('setup-$name', instance.appContext.config.globalProperties.$name)
  },
  created () {
    console.log('created-$name', this.$name)
    console.log('inject-myName', this.myName)
  },
  inject: ['myName']
}
</script>

<style lang="scss" scoped>

</style>