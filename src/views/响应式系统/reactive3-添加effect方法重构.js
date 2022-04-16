class Dep {
  constructor() {
    // subscribers 订阅者
    this.subscribers = new Set() // 使用集合而非数组，保证Set中值得唯一
  }
  // depend:依赖
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  // 通知
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}
let activeEffect = null
// 响应式原理-当info.count改变时，其依赖的函数应自己调用
const info = { count: 0 }
const dep = new Dep()

/*
  这里没有直接dep.depend(effect)，是要使depend()方法没有参数，因为后面要在数据劫持中去调用depend()去收集依赖
  而在get()方法中是没有副作用函数effect()的
*/
function watchEffect(effect) {
  activeEffect = effect
  dep.depend()
  effect()
  activeEffect = null
}
watchEffect(() => {
  info.count += 1
  console.log(info.count)
})
watchEffect(() => {
  info.count += 2
  console.log(info.count)
})
info.count++
dep.notify()




