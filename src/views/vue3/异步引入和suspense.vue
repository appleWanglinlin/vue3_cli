<template>
  <div class="father">
    <h6>父组件</h6>
    <suspense>
      <template #default>
        <About />
      </template>
      <template #fallback>
        Loading...
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
// import About from '../About.vue'

import { defineAsyncComponent } from 'vue';
const About = defineAsyncComponent(() => import('../About.vue'))
export default({
  components: {
    About
  }
})
</script>
<style>
  .father {
    width: 300px;
    height: 100px;
    background-color: antiquewhite;
  }
</style>