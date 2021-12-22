<template>
  <div>x:{{x}}</div>
  <div>y:{{y}}</div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import usePoint from './hooks/usePoint';
export default defineComponent({
  setup() {
    const point = usePoint()
    return {
      ...toRefs(point)
    }
  }
})
</script>