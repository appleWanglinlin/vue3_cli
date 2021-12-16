<template>
<h5>user:{{user}}</h5>
<h5>age:{{age}}</h5>
<h5>money:{{money}}</h5>
<button @click="updateFn">更新数据</button>
<hr>
<ToRef :age="age" />
</template>

<script lang="ts">
import { defineComponent, toRef, ref, reactive } from 'vue'
import ToRef from '@/components/ToRef.vue'
export default defineComponent({
  components: {
    ToRef
  },
  setup() {
    const user = reactive({
      age: 8,
      money: 10
    })
    const age = toRef(user, 'age')
    const money = ref(user.money)
    const updateFn = (() => {
      user.age += 2
      // age.value += 2

      // user.money += 2
      // money.value += 2
    })
    return {
      user,
      updateFn,
      age,
      money
    }
  }
})
</script>


