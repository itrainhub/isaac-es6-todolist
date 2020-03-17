import { createDOM } from "@/util"

/**
 * 基类
 */
export default class Component {
  constructor(props) {
    this.props = props
    this.state = null
    this.el = null
  }

  /**
   * 修改 state
   * @param {*} state 修改后的 state
   */
  setState(state) {
    this.state = state
    // 状态修改后重新渲染
    const oldEl = this.el
    this.renderDOM()
    // 旧节点存在，则说明已在页面渲染，获取其父节点，否则还未渲染
    const container = oldEl && oldEl.parentNode
    if (!container )
      return
    // 在父节点中添加新节点，删除旧节点
    container.insertBefore(this.el, oldEl)
    container.removeChild(oldEl)
  }

  /**
   * 渲染DOM，生成节点，绑定事件
   */
  renderDOM() {
    this.el = createDOM(this.render()).firstElementChild
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if (key.startsWith('on')) { // 事件方法
        const eventType = key.slice(2).toLowerCase() // 事件名称
        const callback = this[key] // 事件回调函数
        this.el.addEventListener(eventType, callback.bind(this), false)
      }
    })

    return this.el
  }
}
