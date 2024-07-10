/**
 * 引用拷贝：只复制对象的地址，不会创建新对象
 * 浅拷贝：创建一个新对象，并进行属性复制，对引用类型的属性只会复制其对象地址
 * 深拷贝：完全复制整个对象，包括引用类型的属性
 * 
 * hasOwnProperty() 判断属性是不是对象本身的成员，对象中的原型链中的属性返回false，不用进行拷贝
 */

/**
 * 深拷贝
 */

// 深拷贝自引用对象也是 通过map判断是否已经拷贝过

function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') return // [] 和 {} 和null 都是 object
  let newObj = Array.isArray(obj) ? [] : {} 
  for (let key in obj) { // 对于数组来说，key是index
    if (obj.hasOwnProperty(key)) { // 判断是不是自有属性,忽略掉继承属性，比如原型上的
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}




// 复杂类型
function deepClone(target) {
  if(target instanceof Object) {
      let obj;
      if(Array.isArray(obj)) {
          // 如果是数组，就创建一个[]
          obj = []
      } else if(target instanceof Function) {
          // 返回一个新的函数
        
          obj = function() {
          return target.call(this, ...arguments)
          }
      } else if(target instanceof RegExp) {
          // 拷贝正则表达式
          obj = new RegExp(target.source, target.flags);
      } else if(target instanceof Date) {
          // 日期对象拷贝
          obj= new Date(target)
      } else {
          // 拷贝普通对象
          obj = {}
      }
      for(let key in target) {
          if(target.hasOwnProperty(key)) {
              // 递归遍历对象底层的属性
              obj[key] = deepClone(target[key])
          }
      }
      return obj
  } else {
      return target;
  }
}
 

const deepClones = (arr) => {
  if (arr instanceof Object) {
    let newArr
    if (Array.isArray(arr)) {
      newArr = []
    } else if (arr instanceof Function) {
      return function() {
        return arr.call(this, ...arguments)
      } 
    } else if (arr instanceof RegExp) {
      return new RegExp(arr.source, arr.flags)
      
    } else if (arr instanceof Date) {
      return new Date(arr)
    } else {
      newArr = {}
    } 
    for(let key in arr) {
      if(Object.hasOwnProperty(key)) {
        newArr[key] = deepClones(arr[key])
      }
    }
    return newArr
  } else {
    return arr
  }
}

/**
 * 浅拷贝
 */
function shallowCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
