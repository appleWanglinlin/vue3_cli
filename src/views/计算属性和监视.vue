<template>
  <fieldset>
    <legend>姓名操作</legend>
    姓：<input type="text" v-model="user.firstName">
    名：<input type="text" v-model="user.lastName">
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名1：<input type="text" v-model="fullName1">
    姓名2：<input type="text" v-model="fullName2">
    姓名3：<input type="text" v-model="fullName3">
  </fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';

export default defineComponent({
  setup() {
    const user = reactive({
      firstName: '斛珠',
      lastName: '夫人'
    })
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName
    })
    // console.log('fullName1', fullName1); // 返回的十一个ref的对象

    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val:string) {
        user.firstName = val.split('_')[0]
        user.lastName = val.split('_')[1]
      }
    })

    let fullName3 = ref('')
    watch(user,({ firstName, lastName }) => {
      fullName3.value = firstName + '_' + lastName
    },{ immediate: true, deep: true })
    
    // 不需要加immediate，页面一加载，会默认执行一次
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })
    
    // 监视fullName3，改变user.firstName和user.lastName
    watchEffect(() => {
      user.firstName = fullName3.value.split('_')[0]
      user.lastName = fullName3.value.split('_')[1]
    })

    // watch监视可以监视多个数据
    // 没有更新，因为user.firstName, user.lastName不是响应式数据
    // watch([user.firstName, user.lastName],() => {
    //   console.log('=====')
    // })

    // 可以更新
    // watch([user, fullName3],() => {
    //   console.log('=====')
    // })

    // 监听非响应式数据,使用回调的写法
    // watch([() => user.firstName, () => user.lastName],() => {
    //   console.log('=====')
    // })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
})
</script>


