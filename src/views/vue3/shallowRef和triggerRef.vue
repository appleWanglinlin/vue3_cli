<template>
  <div>
    <h2>{{ obj.name }}</h2>
    <button @click="edit">修改</button>
  </div>
</template>

<script>
import { ref, shallowRef, triggerRef } from "vue"
export default {
  setup () {
    const obj = shallowRef({ name: 'apple' })
    const edit = () => {
      obj.value.name = 'wll' // 页面上无变化
      triggerRef(obj) // 14、15行结合使用，页面有变化

      // obj.value = { // 页面上有变化
      //   name: 'wll'
      // }
    }
    return {
      obj,
      edit
    }
  }
}
</script>

<style lang="scss" scoped>

</style>