<template>
<div class="todos-item"
  :style="{backgroundColor: isMouseenter ? 'red' : '#fff', color: isMouseenter ? '#fff' : '#000'}"
  @mouseenter="mouseHandler(true)"
  @mouseleave="mouseHandler(false)"
>
  <div>
    <input type="checkbox" v-model="isChecked">
    <span>{{ todo.title }}</span>
  </div>
  <button :style="{display: isMouseenter ? 'block' : 'none'}" @click="del">删除</button>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Todo } from '../types/todo'
export default defineComponent({
  name: 'Item',
  props: {
    index: {
      type: Number,
      required: true
    },
    todo: {
      type: Object as () => Todo, // 转为Todo类型
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    },
    updateTodo: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const isMouseenter = ref(false)
    const mouseHandler = (flag:boolean) => {
      isMouseenter.value = flag
    }
    const del = () => {
      if (window.confirm('确定删除吗？')) {
        props.deleteTodo(props.index)
      }
    }
    const isChecked = computed<boolean>({
      get() {
        return props.todo.isChecked
      },
      set(val) {
        props.updateTodo(props.todo, val)
      }
    })
    return {
      isMouseenter,
      mouseHandler,
      del,
      isChecked
    }
  }
})
</script>
<style scoped lang="less">
.todos-item {
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>


