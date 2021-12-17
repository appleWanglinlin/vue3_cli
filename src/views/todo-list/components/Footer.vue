<template>
  <div class="todos-footer">
    <div>
      <input type="checkbox">全选
      <span style="margin-left: 20px;">已完成 / 全部</span>
    </div>
    <button>清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Footer',
  setup() {
    return {
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


