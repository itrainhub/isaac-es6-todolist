import TodoHeader from '@/components/TodoHeader'
import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'
import Component from '@/base/component'
import { mount } from './util'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.registerComponent()
  }

  /**
   * 注册组件
   */
  registerComponent() {
    this.todoHeader = new TodoHeader({
      subtitle: '去日不可追，来日犹可期！'
    })
    this.todoInput = new TodoInput()
    this.todoList = new TodoList()
  }

  /**
   * 重写 renderDOM() 方法
   */
  renderDOM() {
    super.renderDOM()
    mount(this.todoHeader, this.el.querySelector('.todo-header'))
    mount(this.todoInput, this.el.querySelector('.todo-input'))
    mount(this.todoList, this.el.querySelector('.todo-list'))

    return this.el
  }

  render() {
    return `
      <div class="container">
        <div class="todo-header"></div>
        <div class="box todo-input" style="margin: 12px 0"></div>
        <div class="todo-list"></div>
      </div>
    `
  }
}