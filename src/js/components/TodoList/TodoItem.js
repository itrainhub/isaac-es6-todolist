import Component from "@/base/component"
import { connect } from '@/redux'
import { updateTodoItemAction, deleteTodoItemAction, editTodoItemAction } from '@/store'

const mapDispatchToProps = {
  updateTodoItemAction,
  deleteTodoItemAction,
  editTodoItemAction
}
@connect(null, mapDispatchToProps)
class TodoItem extends Component {
  state = {
    isEdit: false // 是否修改事项内容
  }

  edit() {
    this.setState({
      isEdit: true
    })
  }

  cancel() {
    this.setState({
      isEdit: false
    })
  }

  /**
   * 按钮点击事件处理：修改、删除待办事项
   * @param {*} e 事件event对象
   */
  onClick(e) {
    const target = e.target
    const { id, updateTodoItemAction, deleteTodoItemAction, editTodoItemAction } = this.props
    const classNames = target.classList
    if (classNames.contains('btn-update-todo-item')) { // 修改状态
      updateTodoItemAction(id)
    } else if (classNames.contains('btn-delete-todo-item')) { // 删除
      deleteTodoItemAction(id)
    } else if (classNames.contains('txt-todo-item')) { // 点击事项文本，编辑，显示对应操作按钮
      this.edit()
      // 编辑文本框获得焦点
      setTimeout(() => this.el.querySelector('.input-edit-todo-item').select(), 0)
    } else if (classNames.contains('btn-save-todo-item')) { // 保存编辑待办事项
      const title = this.el.querySelector('.input-edit-todo-item').value
      editTodoItemAction({
        id,
        title,
        isCompleted: this.props.isCompleted
      })
      this.cancel()
    } else if (classNames.contains('btn-cancel-edit')) { // 取消编辑
      this.cancel()
    }
  }

  /**
   * 文本框失去焦点，取消编辑，相当于 blur 事件，区别在于 blur 不冒泡而 focusout 冒泡
   * @param {*} e 事件event对象
   */
  onFocusOut(e) {
    const target = e.target
    if (target.classList.contains('input-edit-todo-item')) {
      const title = target.value
      // 内容未改变，则说明未修改事项，文本框失去焦点，还原显示
      if (title === this.props.title) {
        this.cancel()
      }
    }
  }

  /**
   * 编辑文本框中回车保存
   * @param {*} e
   */
  onKeydown(e) {
    const target = e.target
    if (target.classList.contains('input-edit-todo-item')) {
      if (e.keyCode === 13) {
        const title = target.value
        const {id, isCompleted, editTodoItemAction} = this.props
        editTodoItemAction({
          id,
          title,
          isCompleted
        })
        this.cancel()
      }
    }
  }

  /**
   * 生成待办事项内容部分html文本，如果是可编辑状态，则生成文本框，
   * 否则直接显示待办事项内容
   */
  _renderTodoItemText() {
    return (
      this.state.isEdit
      ?
      `
        <input class="input is-small input-edit-todo-item" value="${this.props.title}">
      `
      :
      `
        <span>${this.props.title}</span>
      `
    )
  }

  /**
   * 生成待办事项按钮部分html文本，如果是可编辑状态，则生成'保存/取消'按钮，
   * 否则生成'标记xxx/删除'按钮
   */
  _renderButtons() {
    return (
      this.state.isEdit
      ?
      `
        <button class="button btn-save-todo-item is-small is-info">保存</button>
        <button class="button btn-cancel-edit is-small">取消</button>
      `
      :
      `
        <button class="button btn-update-todo-item is-small is-info">标记为${this.props.isCompleted ? '未' : '已'}完成</button>
        <button class="button btn-delete-todo-item is-small is-danger">删除</button>
      `
    )
  }

  render() {
    return (`
      <li class="panel-block">
        <div class="container columns is-vcentered">
          <div class="column is-8 txt-todo-item control">
            ${ this._renderTodoItemText() }
          </div>
          <div class="column is-4">
            ${ this._renderButtons() }
          </div>
        </div>
      </li>
    `)
  }
}

export default TodoItem
