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
function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}
/*
  需要创建这样的对象，这样才能实现当属性改变时，对应的依赖函数都会执行
  targetMap<WeakMap>{
    info<Map>: {
      count: count<Dep>,
      name: name<Dep>
    },
    user<Map>: {
      age: age<Dep>
    }
  }
*/
const targetMap = new WeakMap() // targetMap的key只能是对象
function getDep(target, key) {
  // 根据target对象取出对应的Map对象
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 根据key取出对应的Dep对象
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
console.log('targetMap', targetMap)

function reactive(raw) { // raw表示原始的，没加工的数据
  return new Proxy(raw, { // 返回一个新对象
    get(target, key) {
      const dep = getDep(target, key) // 不能放在上面，因为没有key
      dep.depend()
      return target[key]
      // 这里可以写成target[key]，不会造成死循环，
      // 因为target是原来的对象，而返回的是代理对象，也就是说改变了代理对象的属性，才会触发get
      // reactive4-vue2实现.js中不能这么写，因为返回的是原来的对象
    },
    set(target, key, newValue) {
      const dep = getDep(target, key)
      if (target[key] !== newValue) {
        target[key] = newValue
        dep.notify()
      }
    }
  })
}
// 响应式原理-当info.count改变时，其依赖的函数应自己调用
// 当info.count改变，effect1、effect2调用
// 当info.name改变，effect1调用
// 当user.age改变，effect3调用

const info = reactive({ count: 1, name: 'wll' })
console.log('info', info)

const user = reactive({ age: 18 })
watchEffect(() => {
  info.name = 'apple'
  // info.count = info.count + 2
  console.log('effect1', info.count * 2)
  console.log('effect1', info.name)
})
watchEffect(() => {
  // info.count += 2
  console.log('effect2', info.count)
})
watchEffect(() => {
  user.age = 20 
  console.log('effect3', user.age)
})

info.count++




