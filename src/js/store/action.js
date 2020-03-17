export const ActionTypes = {
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
  UPDATE_TODO_ITEM: 'UPDATE_TODO_ITEM',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM'
}

let uid = 1

export const addTodoItemAction = todoItemText => dispatch => {
  dispatch({
    type: ActionTypes.ADD_TODO_ITEM,
    payload: {
      id: uid++,
      title: todoItemText,
      isCompleted: false
    }
  })
}

export const updateTodoItemAction = id => dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_TODO_ITEM,
    payload: { id }
  })
}

export const deleteTodoItemAction = id => dispatch => {
  dispatch({
    type: ActionTypes.DELETE_TODO_ITEM,
    payload: { id }
  })
}
