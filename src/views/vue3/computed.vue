<template>
  姓：<input type="text" v-model="user.firstName">
  <br>
  名：<input type="text" v-model="user.lastName">
  <br>
  <input type="text" v-model="user.fullName">
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
interface IUser{
  firstName: string,
  lastName: string,
  fullName?: string
}
export default defineComponent({
  setup() {
    const user:IUser = reactive({
      firstName: '',
      lastName: ''
    })
    user.fullName = computed({
      get() {
        return user.firstName + '-' + user.lastName
      },
      set(val:string) {
        const arr = val.split('-')
        user.firstName = arr[0]
        user.lastName = arr[1]
      }
    })
    return {
      user
    }
  }
})
</script>
