<template>
  <div class="todos-list">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :index="index"
      :deleteTodo="deleteTodo"
      :updateTodo="updateTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Item from './Item.vue'
export default defineComponent({
  name: 'List',
  props: ['todos', 'deleteTodo', 'updateTodo'],
  components: {
    Item
  },
  setup() {
    return {
    }
  }
})
</script>
<style scoped lang="less">
.todos-list {
  margin: 10px 0 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>


