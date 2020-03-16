import App from './App'
import { reducer } from './store'
import { createStore } from './util'

const store = createStore(reducer)

const app = new App(store)
const render = () => {
  const innerHTML = app.render()
  document.querySelector('#app').innerHTML = innerHTML
  document.querySelector('.input-todo').focus()
}

render()
store.subscribe(render)
