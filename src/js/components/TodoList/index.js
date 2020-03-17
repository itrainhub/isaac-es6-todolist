import TodoItem from './TodoItem'
import Component from '@/base/component'
import { mount } from '@/util'
import { connect } from '@/store'

const mapStateToProps = state => ({todoList: state})
@connect(mapStateToProps)
class TodoList extends Component {
  // 栏目信息（完成、未完成待办事项）
  sections = [
    {
      title: '未完成',
      className: 'list-uncompleted',
      isCompleted: false
    }, {
      title: '已完成',
      className: 'list-completed',
      isCompleted: true
    }
  ]

  /**
   * 渲染列表项
   * @param {*} todoList
   */
  _renderTodoItem() {
    const { todoList } = this.props
    this.sections.forEach(section => {
      const { isCompleted, className } = section
      // 列表项父元素节点（完成/未完成）
      const wrapper = this.el.querySelector('.' + className)
      // 筛选完成/未完成待办事项
      const list = todoList.filter(todoItem => todoItem.isCompleted === isCompleted)
      if (list.length === 0) return
      // 清空父元素节点
      wrapper.innerHTML = ''
      // 循环渲染挂载待办事项
      list.forEach(item => {
        mount(new TodoItem(item), wrapper)
      })
    })
  }

  /**
   * 重写 renderDOM() 方法
   */
  renderDOM() {
    this.el = super.renderDOM()
    this._renderTodoItem()

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
                <ul class="${section.className}">
                  <li class="panel-block content">暂无</li>
                </ul>
              </div>
            </div>
          `)).join('')
        }
      </div>
    `)
  }
}

export default TodoList
