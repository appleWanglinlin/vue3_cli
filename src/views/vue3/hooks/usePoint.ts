import { onBeforeUnmount, onMounted, reactive } from "vue"

export default function() {
  const point = reactive({
    x: 0,
    y: 0
  })
  function getPoint(event:MouseEvent) {
    point.x = event.pageX
    point.y = event.pageY
  }
  onMounted(() => {
    window.addEventListener('click', getPoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', getPoint)
  })
  return point
}