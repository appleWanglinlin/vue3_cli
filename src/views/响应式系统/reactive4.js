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

function getDep() {
  
}
// 响应式原理-当info.count改变时，其依赖的函数应自己调用
// 当info.count改变，effect1、effect2调用
// 当info.name改变，effect1调用
// 当user.age改变，effect3调用

const info = { count: 0, name: 'wll' }
const user = { age: 18 }

const dep = new Dep()

let activeEffect = null
function watchEffect(effect) {
  activeEffect = effect
  dep.depend()
  effect()
  activeEffect = null
}
watchEffect(() => {
  info.count += 1
  info.name = 'apple'
  console.log('effect1', info.count)
})
watchEffect(() => {
  info.count += 2
  console.log('effect2', info.count)
})
watchEffect(() => {
  user.age = 20 
  console.log('effect3', user.age)
})

info.count++

dep.notify()




