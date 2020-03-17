import Component from '@/base/component'
import { context } from '@/util'

// 连接
export const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  class Connect extends Component {
    constructor(props) {
      super(props)
      this.state = {
        allProps: []
      }
      this._updateProps()
      // 状态更新后自动更新视图渲染
      context.store.subscribe(this._updateProps.bind(this))
    }

    /**
     * 将 mapStateToProps、mapDispatchToProps 与 props 合并，传递给包装的组件
     */
    _updateProps() {
      const { store } = context
      // 将 mapStateToProps 返回对象中的状态映射为组件属性
      const stateProps = mapStateToProps ? mapStateToProps(store.getState()) : {}
      // 将 mapDispatchToProps 返回对象中的方法映射为组件属性
      // 这些方法将能实现自动调用 dispatch 修改状态
      let dispatchProps = null
      if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(store.dispatch)
      } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = {}
        Object.keys(mapDispatchToProps).forEach(item => {
          const actionCreator = mapDispatchToProps[item]
          const wrapper = (...args) => {
            const cb = actionCreator.apply(this, args)
            cb.call(this, store.dispatch)
          }
          dispatchProps[item] = wrapper
        })
      } else {
        dispatchProps = {}
      }
      // 修改组件内部 state 值
      // 修改后会触发更新视图操作
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    /**
     * 重写 renderDOM()，返回包装组件对象渲染返回的 dom 元素
     */
    renderDOM() {
      this.el = new WrappedComponent(this.state.allProps).renderDOM()
      return this.el
    }
  }

  return Connect
}
