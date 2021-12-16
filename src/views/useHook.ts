import { ref, onMounted, onUnmounted, reactive, toRefs } from 'vue';

export default function() {
  // const x = ref(0)
  // const y = ref(0)
  const coord = reactive({
    x: 0,
    y: 0
  })
  const getCoordinate = function(e:MouseEvent) {
    coord.x = e.pageX
    coord.y = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', getCoordinate)
  })
  onUnmounted(() => {
    document.removeEventListener('click', getCoordinate)
  })
  return {
    ...toRefs(coord)
  }
}