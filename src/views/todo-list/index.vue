<template>
  <div class="todos-container">
    <Header :addTodo="addTodo" />
    <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
    <Footer :todos="todos" :allChecked="allChecked" :clearFinished="clearFinished"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import { Todo } from './types/todo'

export default defineComponent({
  name: 'TodoList',
  components: {
    Header,
    List,
    Footer
  },
  setup() {
    // 规定state对象中的todos数组中元素的数据类型
    const state = reactive<{todos: Todo []}>({
      todos: [
        {id: 1, title: '计划1', isChecked: true }
      ]
    })
    const addTodo = (todo:Todo) => {
      state.todos.unshift(todo)
    }
    const deleteTodo = (index:number) => {
      state.todos.splice(index, 1)
    }
    const updateTodo = (todo:Todo, isChecked: boolean) => {
      todo.isChecked = isChecked
    }
    const clearFinished = () => {
      state.todos = state.todos.filter(todo => !todo.isChecked)
    }
    const allChecked = (isChecked:boolean) => {
      state.todos.forEach(todo => {
        todo.isChecked = isChecked
      })
    }
    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      clearFinished,
      allChecked
    }
  }
})
</script>
<style scoped>
.todos-container {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>


