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

// 上下文
export const context = {
  set(key, value) {
    this[key] = value
  },
  get(key) {
    return this[key]
  },
  remove(key) {
    delete this[key]
  }
}
