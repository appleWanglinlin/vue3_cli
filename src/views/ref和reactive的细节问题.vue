<template>
  <h5>{{a1}}</h5>
  <h5>{{a2}}</h5>
  <h5>{{a3}}</h5>
  <button @click="fn">按钮</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    let a1 = ref('a1')
    const a2 = reactive({
      name: 'apple'
    })
    const a3 = ref({
      age: '18'
    })
    function fn() {
      console.log('a1', a1)
      console.log('a2', a2)
      console.log('a3', a3)
      a1.value += '==='
      a2.name += '==='
      a3.value.age += '==='
    }
    return {
      a1,
      a2,
      a3,
      fn
    }
  }
})
</script>


