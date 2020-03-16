// 创建 store，状态管理
export const createStore = reducer => {
  let state = null
  const listeners = []
  const getState = () => state
  const subscribe = (...listener) => listeners.push(...listener)
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(l => l())
  }
  dispatch({})

  return {
    getState,
    subscribe,
    dispatch
  }
}

// 由html生成DOM节点
export const createDOM = html => {
  if (typeof Range !== 'undefined' && Range.prototype.createContextualFragment)
    return document.createRange().createContextualFragment(html)
  // 不劫持Range.prototype.createContextualFragment，则创建 DocumentFragment解决兼容
  const fragment = document.createDocumentFragment()
  const div = document.createElement('div')
  fragment.appendChild(div)
  div.innerHTML = html
  return div
}

// 挂载并渲染元素
export const mount = (component, container) => {
  container.appendChild(component.renderDOM())
  component.onStateChange = (newEl, oldEl) => {
    container.insertBefore(newEl, oldEl)
    container.removeChild(oldEl)
  }
}
