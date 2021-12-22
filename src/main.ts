// vue2引入的是Vue构造函数，vue3引入的是createApp工厂函数
// 构造函数一般首字母大写，用new来调用
// 工厂函数可以直接调用
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建应用的实例对象app,类似于之前vue2中的vm,但是比vm更"轻"
const app = createApp(App)
// app.mount('#app') 挂载
app.use(store).use(router).use(ElementPlus).mount('#app')

// vue2中的写法
// const vm = new Vue({
//   render:h => h(App)
// })
// vm.$mount('#app')
