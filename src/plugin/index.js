// 对象写法
// export default {
//   install(app, options) {
//     app.config.globalProperties.$name = 'apple'
//   }
// }

// 函数写法
export default function(app) {
  app.config.globalProperties.$name = 'apple'
  app.directive('copy', {
    mounted (el, binding) {
      
    }
  })
  app.provide('myName', 'apple')
}
