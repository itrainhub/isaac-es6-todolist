import TodoItem from './TodoItem'
import { ActionTypes } from '../../store/action'

export default class TodoList {
  constructor(store) {
    this.store = store
    this.addListener()
  }

  addListener() {
    // 修改状态
    document.addEventListener('click', e => {
      const target = e.target
      if (target.classList.contains('btn-update-todo-item')) { // 修改状态
        this.store.dispatch({
          type: ActionTypes.UPDATE_TODO_ITEM,
          payload: {
            id: Number(target.dataset.id)
          }
        })
      } else if (target.classList.contains('btn-delete-todo-item')) { // 删除
        this.store.dispatch({
          type: ActionTypes.DELETE_TODO_ITEM,
          payload: {
            id: Number(target.dataset.id)
          }
        })
      }
    }, false)
  }

  /**
   * 渲染列表项
   * @param {*} todoList
   */
  _renderTodoItem(todoList) {
    if (todoList.length === 0)
      return `<li class="panel-block content">暂无</li>`
    return todoList.map(todoItem => new TodoItem(todoItem).render()).join('')
  }

  /**
   * 已完成
   */
  _renderCompleted() {
    const todoList = this.store.getState().filter(todoItem => todoItem.isCompleted)
    return this._renderTodoItem(todoList)
  }

  /**
   * 未完成
   */
  _renderUncompleted() {
    const todoList = this.store.getState().filter(todoItem => !todoItem.isCompleted)
    return this._renderTodoItem(todoList)
  }

  render() {
    return (`
      <div class="columns is-desktop">
        <div class="column">
          <div class="panel">
            <p class="panel-heading">
              未完成
            </p>
            <ul>
              ${this._renderUncompleted()}
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="panel">
            <p class="panel-heading">
              已完成
            </p>
            <ul>
              ${this._renderCompleted()}
            </ul>
          </div>
        </div>
      </div>
    `)
  }
}