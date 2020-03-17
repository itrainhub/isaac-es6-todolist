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
      context.store.subscribe(this._updateProps.bind(this))
    }

    _updateProps() {
      const { store } = context
      const stateProps = mapStateToProps ? mapStateToProps(store.getState()) : {}
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
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    renderDOM() {
      this.el = new WrappedComponent(this.state.allProps).renderDOM()
      return this.el
    }
  }

  return Connect
}