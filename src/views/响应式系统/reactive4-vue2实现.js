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
  Object.keys(raw).forEach(key => {
    // const dep = new Dep()
    const dep = getDep(raw, key)
    let value = raw[key];

    Object.defineProperty(raw, key, {
      get() {
        dep.depend()
        // return raw[key] // 不能这样写返回值，这样写相当于raw.key，在读取，get方法又会调用，形成递归，导致死循环
        return value
      },
      set(newValue) {
        if (value !== newValue) {
          value = newValue
          dep.notify()
        }
      }
    })
    console.log(key, dep)
  })
  return raw
}
// 响应式原理-当info.count改变时，其依赖的函数应自己调用
// 当info.count改变，effect1、effect2调用
// 当info.name改变，effect1调用
// 当user.age改变，effect3调用

const info = reactive({ count: 1, name: 'wll' })
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




