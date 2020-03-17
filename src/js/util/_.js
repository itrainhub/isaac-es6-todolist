// 判断是否为对象
export const isObject = obj => (obj !== null && typeof obj === 'object')

// 深克隆
export const cloneDeep = obj => {
  if (isObject(obj)) {
    const result = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
      result[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key]
    }
    return result
  }
  
  return obj
}

// 判断是否为空
// ''/undefined/null/{}/[]
export const isEmpty = param => {
  return (
    typeof param === 'undefined'
    || param === null
    || param === ''
    || Array.isArray(param) && param.length === 0
    || isObject(param) && Object.getOwnPropertyNames(param).length === 0
  )
}

// 空函数
export const noop = () => {}
