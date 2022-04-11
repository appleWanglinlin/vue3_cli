<script>
import { ref, h } from 'vue'
export default {
  // 写法1--可以不删除template标签
  // setup() {
  //   const count = ref(0)
  //   return () => h('div', null, [
  //     h('h2', null, `${count.value}`),
  //     h('button', {
  //       onclick: () => count.value++
  //     },'+1'),
  //     h('button', {
  //       onclick: () => count.value--
  //     },'-1')
  //   ])
  // }

  // 写法2--页面没展示？？由于之前template标签没有删除
  setup() {
    const count = ref(0)
    return {
      count
    }
  },
  render() {
    return h('div', { class: 'app' }, [
      h('h2', null, `${this.count}`),
      h('button', {
        onClick: () => this.count++
      },'+1'),
      h('button', {
        onClick: () => this.count--
      },'-1')
    ])
  }
}
</script>

<!-- 在单文件组件中使用??? -->
<!-- <script setup>
import { ref, h } from 'vue'
const count = ref(0)
h('div', null, [
  h('h2', null, `${count.value}`),
  h('button', {
    onclick: () => count.value++
  },'+1'),
  h('button', {
    onclick: () => count.value--
  },'-1')
])
</script> -->

<style scoped>

</style>