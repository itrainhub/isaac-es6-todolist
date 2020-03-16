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
