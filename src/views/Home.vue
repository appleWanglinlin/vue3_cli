<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :msg3="12" @handleClick="handleClick"/>
  </div>
</template>

<script lang="ts">
// defineComponent：目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  // 不能是async函数。否则返回的是promise,而不是返回的对象
  // 不建议setup与data、setup与methods同用，如何在data中写了属性，在methods中写了方法，会同setup中的属性和方法合并起来
  // 在beforeCreate之前调用，此时this为undefined
  setup(props, context){
    console.log('props', props)
    console.log('context', context)
    console.log('msg', context.attrs.msg3)
    const setupFn = () => {
      console.log('setup-fn')
    }
    function handleClick(str:string) {
      console.log('父-handleClick', str)
    }
    return {
      setupFn,
      handleClick
    }
  },
  mounted() {
    console.log('this', this)
  }
});
</script>
