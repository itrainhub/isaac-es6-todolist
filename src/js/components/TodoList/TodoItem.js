export default class TodoItem {
  constructor(todoItem) {
    this.todoItem = todoItem
  }

  render() {
    const { id, title, isCompleted } = this.todoItem
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