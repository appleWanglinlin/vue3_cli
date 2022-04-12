class Dep {
  constructor() {
    // subscribers 订阅者
    this.subscribers = new Set() // 使用集合而非数组，保证Set中值得唯一
  }
  // 副作用
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
const addOne = () => {
  info.count++
  console.log(info.count)
}
const addTwo = () => {
  info.count += 2
  console.log(info.count)
}
info.count++
dep.addEffect(addOne)
dep.addEffect(addTwo)
dep.notify()


