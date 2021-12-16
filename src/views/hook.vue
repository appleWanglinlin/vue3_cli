<template>
<h5>x：{{x}}</h5>
<h5>y：{{y}}</h5>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useHook from './useHook';
export default defineComponent({
  setup() {
    let { x, y } = useHook()
    return {
      x,
      y
    }
  }
})
</script>


