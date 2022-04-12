class Dep {
  constructor() {
    // subscribers 订阅者
    this.subscribers = new Set() // 使用集合而非数组，保证Set中值得唯一
  }
  // 副作用-是一个函数的包裹器，在函数被调用之前就启动跟踪。
  addEffect(effect) {
    this.subscribers.add(effect)
  }
  // 通知
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

// 响应式原理-当info.count改变时，其依赖的函数应自己调用
const info = { count: 0 }
const dep = new Dep()

function watchEffect(effect) {
  dep.addEffect(effect)
}
watchEffect(() => {
  info.count++
  console.log(info.count)
})
watchEffect(() => {
  info.count += 2
  console.log(info.count)
})
info.count++
dep.notify()




