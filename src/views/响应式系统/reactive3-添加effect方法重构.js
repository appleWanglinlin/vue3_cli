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




