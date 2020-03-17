// 创建 store，状态管理
export const createStore = reducer => {
  let state = null
  const listeners = []
  const getState = () => state
  const subscribe = (...listener) => listeners.push(...listener)
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(l => l())
  }
  dispatch({})

  return {
    getState,
    subscribe,
    dispatch
  }
}
