<script>
  import { h } from "vue"
  export default {
    render() {
      return h('div', { class: 'child-content' }, [
        h('h1', null, 'child-title'),
        this.$slots.default ? this.$slots.default() : h('div', null, '我是子组件的默认内容')
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>