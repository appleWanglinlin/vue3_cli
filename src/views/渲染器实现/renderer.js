// h函数返回一个vnode,vnode就是一个javascript对象
const h = function(tag, props, children) {
  return {
    tag,
    props,
    children
  }
}

// 将voode转为真实元素
const mount = (vnode, container) => {
  const el = vnode.el = document.createElement(vnode.tag)
  if (vnode.props) {
    for(const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) { // 事件 
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else { // 属性
        el.setAttribute(key, value)
      }
    }
  }
  if (vnode.children) { // 只判断了字符串和数组的情况,没判断对象的情况(h函数第三个参数传对象时,同插槽一起使用)
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(item => {
        mount(item, el)
      })
    }
  }
  container.appendChild(el)
}

// vnode改动前后的对比，diff算法
const patch = (n1, n2) => { // 注意，此时的n1对应的虚拟节点已经渲染在页面上(即n1执行过mount方法)，n2并没有
  if (n1.tag !== n2.tag) { // 标签名不一致则直接移除旧的，添加新的
    const n1ElParent = n1.el.parentElement
    n1ElParent.removeChild(n1.el)
    mount(n2, n1ElParent)
  } else {
    // 处理props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    const el = n2.el = n1.el
    for(const key in newProps) {
      /*
        只有当key和value的值都相同时，才不需要做处理
        也就是说，当key相同，value不同时，设置新值；
        当newProps有key，oldProps没有key时，也是设置新值
      */
      if (newProps[key] !== oldProps[key]) {
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLocaleLowerCase(), newProps[key])
        } else {
          el.setAttribute(key, newProps[key])
        }
      }
    }
    for(const key in oldProps) {
      if (!(key in newProps)) { // oldProps中有newProps没有的属性时,移除该属性
        if (key.startsWith('on')) {
          el.removeEventListener(key.slice(2).toLocaleLowerCase(), oldProps[key])
        } else {
          el.removeAttribute(key, oldProps[key])
        }
      }
    }

    // 处理children
    const oldChildren = n1.children || []
    const newChildren = n2.children || []
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') { // oldChildren和newChildren都为string时
        if (newChildren !== oldChildren) { // 不相等时才需要替换
          el.textContent = newChildren
        }
      } else { // newChildren为string，oldChildren为数组时
        el.innerHTML = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') { // newChildren为数组，oldChildren为string时
        el.innerHTML = ''
        newChildren.forEach(item => {
          mount(item, el)
        })
      } else { // oldChildren和newChildren都为数组时
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        /* 
          这里没有考虑移动后顺序改变的情况,如
          n1: v1, v2, v3
          n2: v2, v3, v1（n1改变顺序后）
          这里应该是n1里面的v1与n2里面的v1比较性能会更好，这也是vue中建议使用key(如在for循环中)的原因
          下面是简单实现，将n1的v1与n2的v2对比
        */
        for(let i = 0; i < commonLength; i++) { // 这里相当于已经处理了newChildren.length = oldChildren.length的情况
          patch(oldChildren[i], newChildren[i])
        }

        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach(item => {
            mount(item, el) // 挂载新的
          })
        }

        if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach(item => {
            el.removeChild(item.el) // 移除多的
          })
        }
      }
    }
  }
}