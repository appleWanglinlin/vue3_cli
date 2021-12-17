<template>
  <div class="todos-header">
    <input type="text" v-model="title" @keyup.enter="add"> 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Todo } from '../types/todo'
export default defineComponent({
  name: 'Header',
  props: {
    addTodo: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const title = ref('')
    const add = () => {
      const text = title.value
      if (!text.trim()) return
      const todo:Todo = {
        id: Date.now(),
        title: text,
        isChecked: false
      }
      props.addTodo(todo)
      title.value = ''
    }
    return {
      title,
      add
    }
  }
})
</script>
<style scoped lang="less">
.todos-header {
  input {
    width: 100%;
    height: 25px;
    outline: none;
  }
}
</style>


