import Component from "@/base/component"
import { isEmpty } from "@/util"

export default class TodoItem extends Component {

  render() {
    const { id, title, isCompleted } = this.props
    return (
      (isEmpty(id))
      ?
      `<li class="panel-block content">暂无</li>`
      :
      `
        <li class="panel-block">
          <div class="container columns is-vcentered">
            <div class="column is-8 txt-todo-item">${title}</div>
            <div class="column is-4">
              <button class="button btn-update-todo-item is-small is-primary" data-id=${id}>标记为${isCompleted ? '未' : '已'}完成</button>
              <button class="button btn-delete-todo-item is-small is-danger" data-id=${id}>删除</button>
            </div>
          </div>
        </li>
      `
    )
  }
}