<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{count}}
    <button @click="fn">累加</button>
    <hr>
    {{ user.name }}
    {{ user.obj }}
    <button @click="update">更新数据</button>
    <hr>
    <button @click="handleClick">分发事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    msg3: Number
  },
  // 一个组件选项，在组件被创建之前，props 被解析之后执行。它是组合式 API 的入口。
  setup(props, { emit }) {
    // console.log('props', props)
    // console.log('context', context)
    // ref 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property .value。
    // 一般用来定义一个基本类型的响应数据
    let count = ref(0)
    const fn = () => {
      count.value++
    }
    // reactive 返回对象的响应式副本,一个Proxy的代理对象,被代理的目标对象就是reactive中传入的对象
    // 内部基于ES6的Proxy实现，通过代理对象操作原对象内部数据都是响应式的
    // userObj-目标对象，user-代理对象
    const userObj = {
      name: 'apple',
      obj: {
        age: 18,
        arr: [1,2,3]
      }
    }
    const user = reactive(userObj)
    const update = () => {
      // userObj.name += '===' // 只写这一句，页面不会更新

      // user.name = 'wll' // 写这两句时，使用了user,也使用了userObj，页面会更新
      // userObj.obj.age = 24

      user.name = 'wll'
      user.obj.age = 24
      user.obj.arr[0] = 0
    }

    function handleClick() {
      emit('handleClick', '111')
    }
    return {
      count,
      fn,
      user,
      update,
      handleClick
    }
  }
});
</script>

<!-- 添加“scoped”属性，以限制CSS只用于此组件 -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
