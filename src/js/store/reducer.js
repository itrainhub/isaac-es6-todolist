import { cloneDeep } from '../util'
import { ActionTypes } from './action'

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export const reducer = (state, action) => {
  if (!state)
    return []
  const newState = cloneDeep(state)
  switch(action.type) {
    case ActionTypes.ADD_TODO_ITEM:
      newState.push(action.payload)
      return newState
    case ActionTypes.UPDATE_TODO_ITEM:
      return newState.map(todoItem => {
        if (todoItem.id === action.payload.id) {
          todoItem.isCompleted = !todoItem.isCompleted
        }
        return todoItem
      })
    case ActionTypes.DELETE_TODO_ITEM:
      return newState.filter(todoItem => todoItem.id !== action.payload.id)
    case ActionTypes.EDIT_TODO_ITEM:
      const { id } = action.payload
      return newState.map(item => {
        return item.id === id ? action.payload : item
      })
    default:
      return state
  }
}
