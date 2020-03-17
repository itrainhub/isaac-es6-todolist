import { escapeHTML } from "@/util"

export const ActionTypes = {
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
  UPDATE_TODO_ITEM: 'UPDATE_TODO_ITEM',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM',
  EDIT_TODO_ITEM: 'EDIT_TODO_ITEM'
}

let uid = 1

/**
 * 添加待办事项
 * @param {*} todoItemText 新增的待办事项文本
 */
export const addTodoItemAction = todoItemText => dispatch => {
  dispatch({
    type: ActionTypes.ADD_TODO_ITEM,
    payload: {
      id: uid++,
      title: escapeHTML(todoItemText),
      isCompleted: false
    }
  })
}

/**
 * 修改待办事项完成状态
 * @param {*} id
 */
export const updateTodoItemAction = id => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_TODO_ITEM,
    payload: { id }
  })
}

/**
 * 删除待办事项
 * @param {*} id
 */
export const deleteTodoItemAction = id => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_TODO_ITEM,
    payload: { id }
  })
}

/**
 * 保存编辑的待办事项
 * @param {*} todoItem
 */
export const editTodoItemAction = todoItem => dispatch => {
  dispatch({
    type: ActionTypes.EDIT_TODO_ITEM,
    payload: {
      ...todoItem,
      title: escapeHTML(todoItem.title)
    }
  })
}
