import { createDOM } from "@/util/lang"

/**
 * 基类
 */
export default class Component {
  constructor(props) {
    this.props = props
    this.state = null
    this.el = null
  }

  setState(state) {
    const oldEl = this.el
    this.state = state
    this.renderDOM()
    if (this.onStateChange)
      this.onStateChange(this.el, oldEl)
  }

  renderDOM() {
    this.el = createDOM(this.render()).firstElementChild
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if (key.startsWith('on')) { // 事件
        const eventType = key.slice(2).toLowerCase()
        const callback = this[key]
        this.el.addEventListener(eventType, callback.bind(this), false)
      }
    })

    return this.el
  }
}
