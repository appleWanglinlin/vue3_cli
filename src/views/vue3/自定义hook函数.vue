<template>
  <div>x:{{point.x}}</div>
  <div>y:{{point.y}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import usePoint from './hooks/usePoint';
export default defineComponent({
  setup() {
    const point = usePoint()
    return {
      point
    }
  }
})
</script>