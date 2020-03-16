import TodoItem from './TodoItem'
import { ActionTypes } from '@/store/action'
import Component from '@/base/component'
import { mount, createDOM } from '@/util'

export default class TodoList extends Component {
  // 栏目信息
  sections = [
    {
      title: '未完成',
      className: 'list-uncompleted'
    }, {
      title: '已完成',
      className: 'list-completed'
    }
  ]
  constructor(props) {
    super(props)
    this.store = props.store

    // 仓库数据更新后，自动刷新
    // 先删除已渲染的todo-list
    // 再重新渲染todo-list
    this.store.subscribe(() => {
      this.el.querySelector('.list-uncompleted').innerHTML = ''
      this.el.querySelector('.list-completed').innerHTML = ''
    },this._renderCompleted.bind(this), this._renderUncompleted.bind(this))
  }

  // 修改、删除
  onClick(e) {
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
  }

  /**
   * 渲染列表项
   * @param {*} todoList
   */
  _renderTodoItem(todoList, selector) {
    if (todoList.length === 0)
      mount(new TodoItem({}), this.el.querySelector(selector))

    todoList.forEach(item => {
      mount(new TodoItem(item), this.el.querySelector(selector))
    })
  }

  /**
   * 已完成
   */
  _renderCompleted() {
    const todoList = this.store.getState().filter(todoItem => todoItem.isCompleted)
    this._renderTodoItem(todoList, '.list-completed')
  }

  /**
   * 未完成
   */
  _renderUncompleted() {
    const todoList = this.store.getState().filter(todoItem => !todoItem.isCompleted)
    this._renderTodoItem(todoList, '.list-uncompleted')
  }

  /**
   * 重写 renderDOM() 方法
   */
  renderDOM() {
    this.el = super.renderDOM()
    this._renderUncompleted()
    this._renderCompleted()

    return this.el
  }

  render() {
    return (`
      <div class="columns is-desktop">
        ${
          this.sections.map(section => (`
            <div class="column">
              <div class="panel">
                <p class="panel-heading">${section.title}</p>
                <ul class="${section.className}"></ul>
              </div>
            </div>
          `)).join('')
        }
      </div>
    `)
  }
}