<script>
  import { ref, h } from 'vue'
  import Child from './child.vue'
  export default {
    setup() {
      const name = ref('apple')
      return {
        name
      }
    },
    render() {
      return h('div', { class: 'parent-content' }, [
        h('h1', null, 'parent-title'),
        h(Child, null, {
          default: props => h('div', null, `父传给子的内容: ${this.name}`)
        })
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>