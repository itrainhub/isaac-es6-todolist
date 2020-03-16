import { ActionTypes } from "@/store/action"

let uid = 1
export default class TodoInput {
  constructor(store) {
    this.store = store
    this.addListener()
  }

  addListener = () => {
    document.addEventListener('keydown', e => {
      const target = e.target
      if (target.classList.contains('input-todo') && e.keyCode === 13) {
        this.addTodoItem()
      }
    }, false)
    document.addEventListener('click', e => {
      const target = e.target
      if (target.classList.contains('btn-add-todo')) {
        this.addTodoItem()
      }
    })
  }

  addTodoItem() {
    const field = document.querySelector('.input-todo')
    const title = field.value
    const todoItem = {
      id: uid++,
      title,
      isCompleted: false
    }
    this.store.dispatch({
      type: ActionTypes.ADD_TODO_ITEM,
      payload: todoItem
    })
  }

  render() {
    return (`
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input input-todo is-info" type="text" placeholder="添加待办事项">
        </div>
        <div class="control">
          <a class="button is-info btn-add-todo">添加</a>
        </div>
      </div>
  `)
  }
}