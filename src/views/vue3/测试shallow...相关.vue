<template>
  <input type="text" v-model="user.name">
  <div>{{user.obj.info.age}}</div>
  <button @click="edit">markRaw-数据更新，页面不更新</button>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef } from 'vue';
export default defineComponent({
  setup() {
    let user = reactive({
      name: 'apple',
      obj: {
        info: {
          age: 18
        }
      }
    })
    // const obj = markRaw(user.obj) // 页面会更新
    const obj = markRaw({
      info: {
        age: 18
      }
    })
    user.obj = obj
    console.log('obj', obj)
    // user.obj = reactive(obj) // 就算再想通过reactive变成响应式也无效

    function edit() {
      user.obj.info.age ++
      console.log('age', user.obj.info.age)
    }
    return {
      user,
      edit
    }
  }
})
</script>