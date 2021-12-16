<template>
<h5>{{user}}</h5>
<button @click="updateFn">更新数据</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const user = {
      name: 'apple'
    }
    const updateFn = (() => {
      user.name += '==='
    })
    return {
      user,
      updateFn
    }
  }
})
</script>


