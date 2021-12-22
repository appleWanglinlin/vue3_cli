<template>
  <h5>{{user}}</h5>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const user = reactive({
      name: 'apple',
      age: 18,
      arr: [0,1,2]
    })
    const update = (() => {
      user.arr[0] = 3
    })
    return {
      user,
      update
    }
  }
})
</script>


