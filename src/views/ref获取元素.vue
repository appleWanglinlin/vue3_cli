<template>
  <input type="text" ref='inputRef'>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      console.log('inputRef', inputRef)
      inputRef.value && inputRef.value.focus()
    })
    return {
      inputRef
    }
  }
})
</script>


