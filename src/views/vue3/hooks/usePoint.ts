import { onBeforeUnmount, onMounted, reactive } from "vue"

interface IPoint {
  x: number,
  y: number
}

export default function():IPoint {
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