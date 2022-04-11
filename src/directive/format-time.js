import dayjs from "dayjs"

export default function(app) {
  app.directive('format-time', {
    mounted(el, binding) {
      let textContent = Number(el.textContent)
      if (textContent) {
        if (textContent.length === 10) textContent *= 1000
        el.textContent = dayjs(Number(el.textContent)).format(binding.value || 'YYYY-MM-DD')
      }
    }
  })
}