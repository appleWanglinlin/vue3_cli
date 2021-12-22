<template>
  <input type="text" v-model="name">
  <input type="text" v-model="obj.user.info.age">
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
    watchEffect(() => {
      console.log('watchEffect')
      console.log(name.value)
      console.log(obj.user.info.age)
    })
    return {
      name,
      obj
    }
  }
})
</script>