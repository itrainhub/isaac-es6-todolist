import App from './App'
import { reducer } from './store'
import { createStore, mount, context } from './util'
// 状态仓库
const store = createStore(reducer)
// 保存到上下文中
context.set('store', store)
// 挂载渲染
mount(
  new App(),
  document.querySelector('#root')
)
