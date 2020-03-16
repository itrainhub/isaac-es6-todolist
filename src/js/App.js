import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export default class App {
  constructor(store) {
    this.store = store
    this.init()
  }

  init() {
    this.todoHeader = new TodoHeader({
      subtitle: '去日不可追，来日犹可期！'
    })
    this.todoInput = new TodoInput(this.store)
    this.todoList = new TodoList(this.store)
  }

  createDom() {
    const todoHeader = this.todoHeader.render()
    const todoInput = this.todoInput.render()
    const todoList = this.todoList.render()
    return {
      todoHeader,
      todoInput,
      todoList
    }
  }

  render() {
    const { todoHeader, todoInput, todoList } = this.createDom()
    return `
      <div class="container">
        <div>${todoHeader}</div>
        <div class="box" style="margin: 12px 0">${todoInput}</div>
        <div>${todoList}</div>
      </div>
    `
  }
}