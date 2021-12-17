<template>
  <div class="todos-footer">
    <div>
      <input type="checkbox" v-model="isAll">全选
      <span style="margin-left: 20px;">已完成 {{finishedCount}} / 全部 {{todos.length}}</span>
    </div>
    <button @click="clearFn">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Todo } from '../types/todo'
export default defineComponent({
  name: 'Footer',
  props: {
    todos: {
      type: Array as () => Todo [], // 转为Todo类型数组
      required: true
    },
    clearFinished: {
      type:Function,
      required: true
    },
    allChecked: {
      type:Function,
      required: true
    }
  },
  setup(props) {
    const finishedCount = computed(() => {
      return props.todos.reduce((count, todo) => todo.isChecked ? count + 1 : count, 0)
    })
    let isAll = computed<boolean>({
      get() {
        return finishedCount.value > 0 && finishedCount.value === props.todos.length
      },
      set(val) {
        props.allChecked(val)
      }
    })
    const clearFn = () => {
      props.clearFinished()
    }
    return {
      finishedCount,
      isAll,
      clearFn
    }
  }
})
</script>
<style scoped lang="less">
.todos-footer {
  display: flex;
  justify-content: space-between;
}
</style>


