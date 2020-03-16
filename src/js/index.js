import App from './App'
import { reducer } from './store'
import { createStore, mount } from './util'

const store = createStore(reducer)

mount(
  new App({store}),
  document.querySelector('#root')
)
