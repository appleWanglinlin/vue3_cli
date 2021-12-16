<template>
  <h5>{{user}}</h5>
  <button @click="testToRaw">testToRaw</button>
  <button @click="testMarkRow">testMarkRow</button>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, toRaw } from 'vue';
interface UserInfo{
  name: string,
  arr?:string[]
}
export default defineComponent({
  setup() {
    let user = reactive<UserInfo>({
      name: 'apple'
    })
    const testToRaw = () => {
      user = toRaw(user)
      user.name += '==='
    }
    const testMarkRow = () => {
      // user.arr = ['1', '2', '3']
      // const arr = [1,2,3]
      const arr = ['1', '2', '3']
      user.arr = arr
      // user.arr = markRaw(arr)
      user.arr[0] += '==='
      console.log('user', user)
      console.log('user.arr', user.arr)
    }
    return {
      user,
      testToRaw,
      testMarkRow
    }
  }
})
</script>


