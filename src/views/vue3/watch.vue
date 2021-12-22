

<template>
  <input type="text" v-model="name">
  <br><br>
  <input type="text" v-model="age">
  <hr>
  <input type="text" v-model="user.name">
  <br><br>
  <input type="text" v-model="user.age">
  <br><br>
  <input type="text" v-model="user.obj.item.sex">
  <hr>
  <input type="text" v-model="userRef.name">
  <br><br>
  <input type="text" v-model="userRef.obj.item.sex">
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const name = ref('apple')
    const age = ref(18)
    const user = reactive({
      name: 'wll',
      age: '18',
      obj: {
        item: {
          sex: '女'
        }
      }
    })
    const userRef = ref({
      name: 'wll',
      age: '18',
      obj: {
        item: {
          sex: '女'
        }
      }
    })

    // 情况1：监听一个ref定义的数据
    watch(name, (newVal, oldVal) => {
      console.log('name', newVal, oldVal)
    }, {immediate: true})

    // 情况2：监听多个ref定义的数据
    // watch([name, age], (newVal, oldVal) => {
    //   console.log('name或age', newVal, oldVal)
    // },{immediate: true})

    // 情况3：监听reactive定义的数据的全部属性
    /*
      1.注意:此处无法获取到正确的oldVal
      2.注意:强制开启了深度监听（deep配置无效）
    */
    // watch(user,(newVal, oldVal) => { 
    //   console.log('user', newVal, oldVal)
    // },{deep: false})

    // 情况4：监听reactive定义的数据的某个属性(基本类型)
    // watch(() => user.name, (newVal, oldVal) => {
    //   console.log('user.name', newVal, oldVal)
    // })

    // 情况5：监听reactive定义的数据的某些属性(基本类型)
    // watch([() => user.name, () => user.age], (newVal, oldVal) => {
    //   console.log('user.name/user.age', newVal, oldVal)
    // })

    // 情况6：监听reactive定义的数据的某个属性(对象类型)
    /*
      监听user.obj，更改user.obj.item.sex，设置deep: true才会生效
      这种情况下oldVal的值也是不正确的
    */
    // watch(() => user.obj, (newVal, oldVal) => {
    //   console.log('user.obj', newVal, oldVal)
    // }, {deep: true})

    // 情况7：当监听用ref定义对象类型的数据时
    // 写法1
    // watch(userRef.value, (newVal, oldVal) => {
    //   console.log('userRef', newVal, oldVal)
    // })

    // 写法2
    // watch(userRef, (newVal, oldVal) => {
    //   console.log('userRef', newVal, oldVal)
    // },{ deep: true })

    return {
      name,
      age,
      user,
      userRef
    }
  }
})
</script>
