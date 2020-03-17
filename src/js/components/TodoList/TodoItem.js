import Component from "@/base/component"
import { connect, updateTodoItemAction, deleteTodoItemAction } from '@/store'

const mapDispatchToProps = {
  updateTodoItemAction,
  deleteTodoItemAction
}
@connect(null, mapDispatchToProps)
class TodoItem extends Component {
  /**
   * 按钮点击事件处理：修改、删除待办事项
   * @param {*} e 事件event对象
   */
  onClick(e) {
    const target = e.target
    const { id, updateTodoItemAction, deleteTodoItemAction } = this.props
    if (target.classList.contains('btn-update-todo-item')) { // 修改状态
      updateTodoItemAction(id)
    } else if (target.classList.contains('btn-delete-todo-item')) { // 删除
      deleteTodoItemAction(id)
    }
  }

  render() {
    const { id, title, isCompleted } = this.props
    return (`
      <li class="panel-block">
        <div class="container columns is-vcentered">
          <div class="column is-8 txt-todo-item">${title}</div>
          <div class="column is-4">
            <button class="button btn-update-todo-item is-small is-primary" data-id=${id}>标记为${isCompleted ? '未' : '已'}完成</button>
            <button class="button btn-delete-todo-item is-small is-danger" data-id=${id}>删除</button>
          </div>
        </div>
      </li>
    `)
  }
}

export default TodoItem
