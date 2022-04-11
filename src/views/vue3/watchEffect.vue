<template>
  <input type="text" v-model="name">
  <input type="text" v-model="obj.user.info.age">
  <button @click="addAge">增加年龄</button>
</template>

<script lang="ts">
import { defineComponent,reactive,ref, watchEffect } from 'vue';
export default defineComponent({
  setup() {
    const name = ref('apple')
    const obj = reactive({
      user: {
        info: {
          age: 18
        }
      }
    })
    const stop = watchEffect(() => {
      console.log(obj.user.info.age)
      if (obj.user.info.age === 25) {
        stop() // 停止监听
      }
    })

    watchEffect(onInvalidate => {
      console.log(name.value)
      onInvalidate(() => { // 清除副作用，当副作用即将重新执行时和侦听器被停止时
        console.log('清除副作用')
        clearTimeout(timer)
      })
      const timer = setTimeout(() => { // 模拟异步网络请求
        console.log('请求成功！')
      }, 1000)
    })
    const addAge = () => {
      obj.user.info.age++
    }
    return {
      name,
      obj,
      addAge
    }
  }
})
</script>