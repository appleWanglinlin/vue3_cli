<template>
  <div>
    <h2 ref="h2">标题</h2>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
export default {
  setup () {
    const h2 = ref(null)
    // watchEffect(() => {
    //   console.log('watchEffect-h2', h2.value) // 打印2次，第一次为null,第二次在页面挂载后执行(在onMounted后)
    // })
    watchEffect(() => {
      console.log('watchEffect-h2', h2.value)
    }, {
      flush: 'post' // 在组件更新后触发
    })
    onMounted(() => {
      console.log('onMounted-h2', h2.value)
    })
    return {
      h2
    }
  }
}
</script>

<style scoped>

</style>