import Component from "@/base/component"
import { ActionTypes } from "@/store/action"
import { context } from '@/util'

let uid = 1

export default class TodoInput extends Component {
  // 添加待办事项
  addTodoItem() {
    const field = this.el.querySelector('.input-todo')
    const title = field.value
    const todoItem = {
      id: uid++,
      title,
      isCompleted: false
    }
    context.store.dispatch({
      type: ActionTypes.ADD_TODO_ITEM,
      payload: todoItem
    })
    field.value = ''
    field.focus()
  }

  // 点击按钮添加
  onClick(e) {
    const target = e.target
    if (target.classList.contains('btn-add-todo')) {
      this.addTodoItem()
    }
  }

  // 输入框回车添加
  onKeyDown(e) {
    const target = e.target
    if (target.classList.contains('input-todo') && e.keyCode === 13) {
      this.addTodoItem()
    }
  }

  // 渲染
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
