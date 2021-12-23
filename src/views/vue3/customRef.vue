<template>
  <input type="text" v-model="msg">
  <h6>{{msg}}</h6>
</template>

<script lang="ts">
import { customRef, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const msg = myRef('', 1000)
    let timer:number
    function myRef(value:string, delay:number) {
      return customRef((tract, trigger) => {
        return {
          get() {
            tract() // 通知Vue追踪value的变化
            return value
          },
          set(newVlaue:string) {
            clearTimeout(timer)
            timer = setTimeout(() => {
              trigger() // 通知Vue去重新解析模板
              value = newVlaue
            }, delay)
          }
        }
      })
    }
    return {
      msg
    }
  }
})
</script>