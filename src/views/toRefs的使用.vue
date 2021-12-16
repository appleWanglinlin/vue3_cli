<template>
<!-- <h5>name1：{{user.name}}</h5> -->
<!-- <h5>age1：{{user.age}}</h5> -->
<hr>
<h5>name2：{{name}}</h5>
<h5>age2：{{age}}</h5>
<hr>
<h5>name3：{{name3}}</h5>
<h5>age3：{{age3}}</h5>
</template>

<!-- toRefs 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref -->
<!-- 应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用 -->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
function useHook() {
  const user = {
    name3: 'apple',
    age3: 18
  }
  return {
    ...toRefs(user)
  }
}
export default defineComponent({
  setup() {
    const user = reactive({
      name: 'apple',
      age: 18
    })
    // const user2 = toRefs(user)
    const { name, age } = toRefs(user)
    setTimeout(() => {
      name.value += '==='
    }, 1000)
    const { name3, age3 } = useHook()
    return {
      // user,
      name,
      age,
      // ...user2
      // ...toRefs(user)
      name3,
      age3
    }
  }
})
</script>


