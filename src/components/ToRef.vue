<template>
<h5>子组件</h5>
age:{{age}}
length:{{length}}
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';
function getLength(age:Ref) {
  return computed(() => {
    return age.value.toString().length
  })
}
export default defineComponent({
  name: 'ToRef',
  props: {
    age: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const length = getLength(toRef(props, 'age'))
    return {
      length
    }
  }
})
</script>


