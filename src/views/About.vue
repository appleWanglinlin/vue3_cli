<template>
  <div class="about">
    <h6>This is an about page</h6>
    <h6>{{count}}</h6>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'About',
  async setup() {
    const count = ref(12)
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve({count})
      }, 2000)
    })
    return await p
  }
}
</script>

<style>
  .about {
    width: 200px;
    height: 50px;
    background-color: peachpuff;
  }
</style>
